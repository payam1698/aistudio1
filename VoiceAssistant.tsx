import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import type { LiveServerMessage } from "@google/genai";
import { Mic, MicOff, X, Sparkles, Radio, Volume2, Loader2 } from 'lucide-react';

// --- Audio Utils ---

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    const s = Math.max(-1, Math.min(1, data[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  const bytes = new Uint8Array(int16.buffer);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return {
    data: btoa(binary),
    mimeType: 'audio/pcm;rate=16000',
  };
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Component ---

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [isMicOn, setIsMicOn] = useState(true);
  
  // Refs for audio handling
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  // Helper to safely get API key
  const getApiKey = () => {
    try {
      // @ts-ignore
      if (typeof process !== 'undefined' && process.env) {
        // @ts-ignore
        return process.env.API_KEY;
      }
    } catch (e) {
      console.warn("Unable to access process.env");
    }
    return '';
  };

  const ensureApiKey = async () => {
    const win = window as any;
    if (win.aistudio && win.aistudio.hasSelectedApiKey) {
      const hasKey = await win.aistudio.hasSelectedApiKey();
      if (!hasKey && win.aistudio.openSelectKey) {
        await win.aistudio.openSelectKey();
        // Re-check after dialog
        return await win.aistudio.hasSelectedApiKey();
      }
      return hasKey;
    }
    return true; // Fallback if not in AI Studio environment
  };

  const connect = async () => {
    try {
      setStatus('connecting');
      
      const hasKey = await ensureApiKey();
      if (!hasKey) {
        setStatus('idle');
        return;
      }

      const apiKey = getApiKey();
      if (!apiKey) {
        console.error("API Key not found");
        setStatus('error');
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Setup Audio Contexts
      const win = window as any;
      const AudioContextClass = win.AudioContext || win.webkitAudioContext;
      
      if (!AudioContextClass) {
        console.error("AudioContext not supported");
        setStatus('error');
        return;
      }

      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });
      
      inputContextRef.current = inputCtx;
      outputContextRef.current = outputCtx;
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);

      // Get Microphone Stream
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
         console.error("getUserMedia not supported");
         setStatus('error');
         return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Connect to Gemini Live
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: 'شما "روان‌یار"، دستیار هوشمند و مهربان موسسه روانکارگاه هستید. وظیفه شما راهنمایی کاربران درباره دوره‌های روانشناسی، اساتید، و خدمات موسسه است. پاسخ‌های کوتاه، مفید و با لحنی گرم و حرفه‌ای به زبان فارسی بدهید. اگر کاربر سوال تخصصی روانشناسی پرسید، او را به شرکت در دوره‌ها یا تماس با مشاوران دعوت کنید.',
        },
        callbacks: {
          onopen: () => {
            setStatus('connected');
            
            // Setup Input Processing
            const source = inputCtx.createMediaStreamSource(stream);
            sourceNodeRef.current = source;
            
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;
            
            processor.onaudioprocess = (e) => {
              if (!isMicOn) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session: any) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputContextRef.current) {
              const ctx = outputContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                ctx,
                24000,
                1
              );
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Handle Interruption
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(src => {
                try { src.stop(); } catch (e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            setStatus('idle');
            disconnect();
          },
          onerror: (e) => {
            console.error(e);
            setStatus('error');
          }
        }
      });

      sessionPromiseRef.current = sessionPromise;

    } catch (err) {
      console.error("Connection failed", err);
      setStatus('error');
    }
  };

  const disconnect = () => {
    // Close Session
    if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then((session: any) => {
            try { session.close(); } catch (e) {}
        });
        sessionPromiseRef.current = null;
    }

    // Stop Microphone
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }

    // Close Contexts
    if (inputContextRef.current) {
      inputContextRef.current.close();
      inputContextRef.current = null;
    }
    if (outputContextRef.current) {
      outputContextRef.current.close();
      outputContextRef.current = null;
    }

    setStatus('idle');
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Main Panel */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl mb-4 w-80 overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-primary-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <span className="font-bold">دستیار صوتی روان‌یار</span>
            </div>
            <button onClick={() => { setIsOpen(false); disconnect(); }} className="hover:bg-white/20 p-1 rounded-full transition">
              <X size={18} />
            </button>
          </div>
          
          <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
            {status === 'idle' || status === 'error' ? (
               <div className="text-center">
                 <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Radio size={32} />
                 </div>
                 <p className="text-slate-600 mb-6 text-sm">
                   {status === 'error' ? 'خطا در اتصال. لطفا مجدد تلاش کنید.' : 'برای شروع گفتگو دکمه زیر را بزنید.'}
                 </p>
                 <button 
                   onClick={connect}
                   className="bg-primary-600 text-white px-6 py-2 rounded-full font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-500/30 flex items-center gap-2 mx-auto"
                 >
                   <Mic size={18} />
                   شروع گفتگو
                 </button>
               </div>
            ) : (
              <div className="text-center w-full">
                <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                   {status === 'connecting' ? (
                     <Loader2 className="animate-spin text-primary-400" size={48} />
                   ) : (
                     <>
                        <div className="absolute inset-0 bg-primary-500 rounded-full opacity-20 animate-pulse-ring"></div>
                        <div className="relative bg-white p-4 rounded-full shadow-sm border-2 border-primary-100">
                           <Volume2 className="text-primary-600 animate-pulse" size={32} />
                        </div>
                     </>
                   )}
                </div>
                <div className="text-slate-800 font-bold mb-1">
                  {status === 'connecting' ? 'در حال اتصال...' : 'در حال گفتگو'}
                </div>
                <div className="text-slate-400 text-xs mb-6">
                   {status === 'connected' ? (isMicOn ? 'میکروفون فعال است' : 'میکروفون قطع است') : 'لطفا صبر کنید'}
                </div>

                {status === 'connected' && (
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={toggleMic}
                      className={`p-3 rounded-full transition ${isMicOn ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}
                    >
                      {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>
                    <button 
                      onClick={disconnect}
                      className="p-3 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAB */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 text-white w-14 h-14 rounded-full shadow-xl shadow-primary-600/30 flex items-center justify-center hover:scale-110 transition duration-300 group"
        >
          <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:animate-ping"></div>
          <Sparkles size={24} />
        </button>
      )}
    </div>
  );
}
