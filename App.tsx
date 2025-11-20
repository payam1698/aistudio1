import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ChevronLeft, Calendar, Clock, User, Search, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';
import { COURSES, TEACHERS, CATEGORIES, BLOG_POSTS } from './constants';
import { Course, Teacher } from './types';
import VoiceAssistant from './VoiceAssistant';

// --- Shared Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'خانه', path: '/' },
    { name: 'دوره‌ها', path: '/courses' },
    { name: 'اساتید', path: '/teachers' },
    { name: 'درباره ما', path: '/about' },
    { name: 'تماس با ما', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
               <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                 ر
               </div>
               <span className="font-bold text-2xl text-primary-900 tracking-tight">روانکارگاه</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                } px-3 py-2 text-base font-medium transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/courses" className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition shadow-lg shadow-primary-500/30">
              ثبت نام آنلاین
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-400">موسسه روانکارگاه</h3>
            <p className="text-slate-400 leading-relaxed text-justify">
              مرکز تخصصی آموزش‌های روانشناسی و مشاوره، با هدف ارتقای سطح دانش و مهارت متخصصین حوزه سلامت روان. ما متعهد به ارائه باکیفیت‌ترین دوره‌های آموزشی با حضور اساتید برجسته کشور هستیم.
            </p>
            <div className="flex space-x-4 space-x-reverse mt-6">
              <a href="#" className="text-slate-400 hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition"><Twitter size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-400">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-slate-400 hover:text-white transition block">دوره‌های آموزشی</Link></li>
              <li><Link to="/teachers" className="text-slate-400 hover:text-white transition block">اساتید ما</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-white transition block">درباره ما</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition block">تماس با ما</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-400">اطلاعات تماس</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-500 shrink-0 mt-1" size={20} />
                <span className="text-slate-400">تهران، خیابان شریعتی، روبروی حسینیه ارشاد، کوچه هدیه، پلاک ۸، واحد ۱۴</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary-500 shrink-0" size={20} />
                <span className="text-slate-400" dir="ltr">0935 468 4499</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary-500 shrink-0" size={20} />
                <span className="text-slate-400 font-sans">info@ravankargah.ir</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          © ۱۴۰۲ تمامی حقوق برای موسسه روانکارگاه محفوظ است.
        </div>
      </div>
    </footer>
  );
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const teacher = TEACHERS.find(t => t.id === course.teacherId);
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-slate-100 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <Link to={`/course/${course.id}`} className="block w-full h-full">
            <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
            />
        </Link>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary-700 shadow-sm">
          {course.category}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <Link to={`/course/${course.id}`} className="block">
            <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
            {course.title}
            </h3>
        </Link>
        
        {teacher ? (
            <Link to={`/teacher/${teacher.id}`} className="flex items-center gap-2 mb-4 hover:bg-slate-50 p-1 -mx-1 rounded-lg transition group/teacher">
                <img src={teacher.image} alt={teacher.name} className="w-8 h-8 rounded-full object-cover border border-slate-200"/>
                <span className="text-sm text-slate-600 group-hover/teacher:text-primary-600 transition">{teacher.prefix} {teacher.name}</span>
            </Link>
        ) : (
            <div className="flex items-center gap-2 mb-4 p-1 -mx-1">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-slate-400"/>
                </div>
                <span className="text-sm text-slate-600">مدرس مهمان</span>
            </div>
        )}
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center text-slate-500 text-sm gap-2">
             <Clock size={16} className="text-accent-500"/>
             <span>{course.duration}</span>
          </div>
          <Link 
            to={`/course/${course.id}`} 
            className="block w-full text-center bg-slate-50 hover:bg-primary-600 hover:text-white text-slate-700 font-medium py-2.5 rounded-lg transition duration-200 border border-slate-200 hover:border-transparent"
          >
            مشاهده جزئیات
          </Link>
        </div>
      </div>
    </div>
  );
};

const TeacherCard: React.FC<{ teacher: Teacher }> = ({ teacher }) => {
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition border border-slate-100 group">
      <div className="w-32 h-32 mx-auto mb-4 relative">
        <div className="absolute inset-0 bg-primary-100 rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition"></div>
        <img 
          src={teacher.image} 
          alt={teacher.name} 
          className="w-full h-full rounded-full object-cover relative z-10 border-4 border-white"
        />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-1">{teacher.prefix} {teacher.name}</h3>
      <p className="text-primary-600 text-sm font-medium mb-3">{teacher.specialty}</p>
      <Link 
        to={`/teacher/${teacher.id}`} 
        className="inline-flex items-center text-slate-500 hover:text-primary-600 text-sm font-medium transition"
      >
        مشاهده رزومه <ChevronLeft size={16} />
      </Link>
    </div>
  );
};

// --- Pages ---

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-slate-900 h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/psychology-hero/1920/1080" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              مسیر حرفه‌ای شدن در <span className="text-primary-400">روانشناسی</span> از اینجا آغاز می‌شود
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              موسسه روانکارگاه با بهره‌گیری از اساتید مجرب و سرفصل‌های استاندارد بین‌المللی، شما را برای ورود به دنیای حرفه‌ای درمان و مشاوره آماده می‌کند.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses" className="bg-primary-600 text-white px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-primary-700 transition text-center shadow-lg shadow-primary-500/25">
                مشاهده دوره‌ها
              </Link>
              <Link to="/about" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-white/20 transition text-center">
                درباره موسسه
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-slate-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                 {[
                     { num: '+۵۰', label: 'دوره فعال' },
                     { num: '+۲۰۰۰', label: 'دانش‌آموخته' },
                     { num: '+۲۰', label: 'استاد برجسته' },
                     { num: '+۱۰', label: 'سال سابقه' },
                 ].map((stat, idx) => (
                     <div key={idx}>
                         <div className="text-4xl font-bold text-primary-600 mb-2">{stat.num}</div>
                         <div className="text-slate-500 font-medium">{stat.label}</div>
                     </div>
                 ))}
             </div>
         </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">دپارتمان‌های آموزشی</h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link to={`/courses?cat=${cat.title}`} key={cat.id} className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 border border-slate-100 group">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition">
                    <BookOpen size={24} />
                </div>
                <h3 className="font-semibold text-slate-700 text-sm">{cat.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">دوره‌های ویژه و پرطرفدار</h2>
                <div className="w-16 h-1 bg-primary-500 rounded-full"></div>
            </div>
            <Link to="/courses" className="hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-800">
                مشاهده همه <ChevronLeft className="mr-1" size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.filter(c => c.featured).slice(0, 3).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/courses" className="inline-block px-6 py-2 border border-primary-600 text-primary-600 rounded-lg font-medium">
                مشاهده همه دوره‌ها
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">تازه های بلاگ</h2>
                <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_POSTS.map(post => (
                    <div key={post.id} className="group cursor-pointer">
                        <div className="rounded-xl overflow-hidden mb-4 h-48">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                        </div>
                        <div className="flex items-center text-sm text-slate-400 mb-2">
                            <Calendar size={14} className="ml-1"/> {post.date}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary-600 transition">{post.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{post.summary}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

const CoursesPage = () => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get('cat');
    if (catParam) setSelectedCat(catParam);
  }, [location]);

  const filteredCourses = COURSES.filter(course => {
    const matchesCat = selectedCat === 'all' || course.category === selectedCat;
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                          course.teacherId.toLowerCase().includes(search.toLowerCase()); // Simplified
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">تقویم آموزشی</h1>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-2 no-scrollbar">
                    <button 
                        onClick={() => setSelectedCat('all')}
                        className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition ${selectedCat === 'all' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                        همه دوره‌ها
                    </button>
                    {CATEGORIES.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCat(cat.title)}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition ${selectedCat === cat.title ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>
                
                <div className="relative w-full md:w-64">
                    <input 
                        type="text" 
                        placeholder="جستجوی دوره..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                </div>
            </div>
        </div>

        {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <div className="text-slate-400 text-lg">دوره‌ای با این مشخصات یافت نشد.</div>
            </div>
        )}
      </div>
    </div>
  );
};

const SingleCoursePage = () => {
    const { id } = useParams();
    const course = COURSES.find(c => c.id === id);
    const teacher = TEACHERS.find(t => t.id === course?.teacherId);

    if (!course) return <div className="p-20 text-center">دوره یافت نشد</div>;

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/courses" className="inline-flex items-center text-slate-500 hover:text-primary-600 mb-6">
                    <ArrowLeft size={20} className="ml-1"/> بازگشت به لیست دوره‌ها
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <img src={course.image} alt={course.title} className="w-full h-64 md:h-96 object-cover"/>
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-primary-5 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">{course.category}</span>
                                </div>
                                <h1 className="text-3xl font-bold text-slate-900 mb-6">{course.title}</h1>
                                
                                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <BookOpen size={24} className="text-primary-500"/>
                                    معرفی دوره
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-justify mb-8">
                                    {course.description}
                                </p>

                                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <CheckCircle size={24} className="text-primary-500"/>
                                    سرفصل‌های دوره
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {course.syllabus.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 shrink-0"></div>
                                            <span className="text-slate-700 text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Info Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border-t-4 border-primary-500">
                            <h3 className="font-bold text-lg mb-6 text-slate-800">اطلاعات برگزاری</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-slate-500 mb-1 flex items-center gap-1"><Clock size={14}/> مدت دوره</div>
                                    <div className="font-bold text-slate-800">{course.duration}</div>
                                </div>
                                <div className="border-t border-slate-100 pt-4">
                                    <div className="text-sm text-slate-500 mb-2 flex items-center gap-1"><Calendar size={14}/> زمان برگزاری</div>
                                    <div className="space-y-2">
                                        {course.schedule.map((s, i) => (
                                            <div key={i} className="text-sm font-medium text-slate-800 bg-slate-50 p-2 rounded border border-slate-200">{s}</div>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-500/30 mt-6">
                                    پیش ثبت نام دوره
                                </button>
                                <p className="text-xs text-center text-slate-400 mt-2">جهت هماهنگی نهایی با شما تماس گرفته خواهد شد</p>
                            </div>
                        </div>

                        {/* Teacher Card */}
                        {teacher && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h3 className="font-bold text-lg mb-4 text-slate-800">مدرس دوره</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={teacher.image} alt={teacher.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"/>
                                    <div>
                                        <div className="font-bold text-slate-800">{teacher.prefix} {teacher.name}</div>
                                        <div className="text-xs text-slate-500 mt-1">{teacher.specialty}</div>
                                    </div>
                                </div>
                                <Link to={`/teacher/${teacher.id}`} className="text-primary-600 text-sm font-medium hover:underline">
                                    مشاهده رزومه کامل
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const TeachersPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">اساتید و هیئت علمی</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
                افتخار ما همکاری با برجسته‌ترین اساتید روانشناسی کشور است که علاوه بر دانش آکادمیک، دارای سال‌ها تجربه بالینی هستند.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEACHERS.map(teacher => (
                <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
        </div>
      </div>
    </div>
  );
};

const TeacherDetailPage = () => {
    const { id } = useParams();
    const teacher = TEACHERS.find(t => t.id === id);
    const teacherCourses = COURSES.filter(c => c.teacherId === id);

    if (!teacher) return <div className="p-20 text-center">استاد یافت نشد</div>;

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-12">
                     <div className="bg-slate-900 h-32 md:h-48 relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                     </div>
                     <div className="px-8 pb-8">
                         <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6">
                             <img src={teacher.image} alt={teacher.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"/>
                             <div className="text-center md:text-right pb-2">
                                 <h1 className="text-3xl font-bold text-slate-800">{teacher.prefix} {teacher.name}</h1>
                                 <p className="text-primary-600 font-medium text-lg">{teacher.specialty}</p>
                             </div>
                         </div>
                         
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                             <div className="lg:col-span-2">
                                 <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">درباره استاد</h3>
                                 <p className="text-slate-600 leading-relaxed text-justify text-lg">
                                     {teacher.bio}
                                 </p>
                                 <p className="text-slate-600 leading-relaxed text-justify mt-4">
                                    ایشان از مدرسین باسابقه موسسه روانکارگاه بوده و کارگاه‌های متعددی را با رضایت بالای دانشجویان برگزار کرده‌اند. رویکرد تدریس ایشان مبتنی بر کیس‌های واقعی و تمرین‌های عملی است.
                                 </p>
                             </div>
                             <div>
                                 <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                     <h3 className="text-lg font-bold text-slate-800 mb-4">آمار عملکرد</h3>
                                     <ul className="space-y-3">
                                         <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                                             <span className="text-slate-500 text-sm">دوره‌های فعال</span>
                                             <span className="font-bold text-primary-600">{teacherCourses.length}</span>
                                         </li>
                                         <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                                             <span className="text-slate-500 text-sm">سابقه همکاری</span>
                                             <span className="font-bold text-slate-700">+۵ سال</span>
                                         </li>
                                         <li className="flex justify-between items-center">
                                             <span className="text-slate-500 text-sm">رضایت دانشجویان</span>
                                             <span className="font-bold text-accent-600">۴.۸/۵</span>
                                         </li>
                                     </ul>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>

                 <h2 className="text-2xl font-bold text-slate-800 mb-6 pr-2 border-r-4 border-primary-500">دوره‌های در حال برگزاری</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {teacherCourses.map(course => (
                         <CourseCard key={course.id} course={course} />
                     ))}
                 </div>
            </div>
        </div>
    )
}

const AboutPage = () => {
    return (
        <div className="bg-white min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">درباره روانکارگاه</h1>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        پل ارتباطی میان دانشگاه و اتاق درمان
                    </p>
                </div>

                <div className="prose prose-lg max-w-none text-slate-700 text-justify">
                    <p>
                        موسسه روانکارگاه با هدف ارتقای سطح علمی و عملی دانشجویان و فارغ‌التحصیلان رشته روانشناسی و مشاوره تأسیس شده است. ما بر این باوریم که آموزش آکادمیک به تنهایی برای تبدیل شدن به یک درمانگر حاذق کافی نیست و نیاز به آموزش‌های تخصصی، سوپرویژن و کارورزی زیر نظر اساتید باتجربه وجود دارد.
                    </p>
                    <p>
                        در روانکارگاه، ما تلاش می‌کنیم با برگزاری دوره‌های جامع و کاربردی در حوزه‌های مختلف روان‌درمانی (CBT، طرحواره، روانکاوی)، کودک و نوجوان، و مهارت‌های زندگی، فاصله‌ی میان تئوری و عمل را کاهش دهیم.
                    </p>
                    
                    <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
                        <div className="bg-slate-50 p-6 rounded-xl text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle/></div>
                            <h3 className="font-bold mb-2">کیفیت آموزش</h3>
                            <p className="text-sm text-slate-500">بهره‌گیری از بهترین اساتید کشور</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl text-center">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><User/></div>
                            <h3 className="font-bold mb-2">پشتیبانی</h3>
                            <p className="text-sm text-slate-500">همراهی گام‌به‌گام تا ورود به بازار کار</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl text-center">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"><BookOpen/></div>
                            <h3 className="font-bold mb-2">مدرک معتبر</h3>
                            <p className="text-sm text-slate-500">ارائه گواهی پایان دوره قابل ترجمه</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ContactPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-8 md:p-12">
                        <h1 className="text-3xl font-bold text-slate-800 mb-6">تماس با ما</h1>
                        <p className="text-slate-600 mb-8">
                            برای ثبت‌نام در دوره‌ها، مشاوره آموزشی یا هرگونه سوال، از طریق راه‌های زیر با ما در ارتباط باشید.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                                    <MapPin size={20}/>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-1">آدرس</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">تهران، خیابان شریعتی، روبروی حسینیه ارشاد، کوچه هدیه، پلاک ۸، واحد ۱۴</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                                    <Phone size={20}/>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-1">تلفن تماس</h3>
                                    <p className="text-slate-500 text-sm font-sans" dir="ltr">0935 468 4499</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                                    <Mail size={20}/>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-1">پست الکترونیک</h3>
                                    <p className="text-slate-500 text-sm font-sans">info@ravankargah.ir</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2 bg-slate-100 p-8 md:p-12 flex flex-col justify-center">
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <h3 className="font-bold text-xl mb-4 text-slate-800">فرم درخواست مشاوره</h3>
                            <input type="text" placeholder="نام و نام خانوادگی" className="w-full p-3 rounded-lg border-none shadow-sm focus:ring-2 focus:ring-primary-500 outline-none"/>
                            <input type="tel" placeholder="شماره تماس" className="w-full p-3 rounded-lg border-none shadow-sm focus:ring-2 focus:ring-primary-500 outline-none text-right" dir="rtl"/>
                            <textarea placeholder="پیام شما..." rows={4} className="w-full p-3 rounded-lg border-none shadow-sm focus:ring-2 focus:ring-primary-500 outline-none"></textarea>
                            <button className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition shadow-lg shadow-primary-500/20">ارسال پیام</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Main App Component ---

function App() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<SingleCoursePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teacher/:id" element={<TeacherDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <VoiceAssistant />
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
