import { Teacher, Course, Category, Article } from './types';

export const TEACHERS: Teacher[] = [
    {
        id: 't1',
        name: 'یعقوب شفیعی‌فرد',
        prefix: 'دکتر',
        specialty: 'درمانگر CBT و طرحواره‌درمانی',
        bio: 'دکتر یعقوب شفیعی‌فرد، متخصص روانشناسی بالینی و مدرس برجسته دوره‌های CBT و طرحواره درمانی با سال‌ها تجربه در آموزش و درمان.',
        image: 'https://picsum.photos/seed/DrShafiei/400/400'
    },
    {
        id: 't2',
        name: 'محمدحسن نادری',
        prefix: 'دکتر',
        specialty: 'روانشناس کودک و نوجوان',
        bio: 'دکتر محمدحسن نادری، متخصص روانشناسی تربیتی و مدرس دوره‌های تخصصی تربیت درمانگر کودک و نوجوان.',
        image: 'https://picsum.photos/seed/DrNaderi/400/400'
    },
    {
        id: 't3',
        name: 'فربد مفیدی',
        prefix: 'دکتر',
        specialty: 'اختلالات یادگیری و اوتیسم',
        bio: 'دکتر فربد مفیدی، متخصص در زمینه تشخیص و درمان اختلالات یادگیری و طیف اوتیسم.',
        image: 'https://picsum.photos/seed/DrMofidi/400/400'
    },
    {
        id: 't4',
        name: 'مهدی عبدلی',
        prefix: 'دکتر',
        specialty: 'سکس‌تراپی و اختلالات روانی',
        bio: 'دکتر مهدی عبدلی، روانپزشک و مدرس دوره‌های تخصصی سکس‌تراپی و آسیب‌شناسی روانی.',
        image: 'https://picsum.photos/seed/DrAbdoli/400/400'
    },
    {
        id: 't5',
        name: 'روح‌الله حدادی',
        prefix: 'دکتر',
        specialty: 'درمانگر اعتیاد',
        bio: 'دکتر روح‌الله حدادی، متخصص درمان‌های سوء مصرف مواد و مدرس دوره‌های MMT.',
        image: 'https://picsum.photos/seed/DrHaddadi/400/400'
    },
    {
        id: 't6',
        name: 'آزادالله کرمی',
        prefix: 'دکتر',
        specialty: 'مشاوره تحصیلی و شغلی',
        bio: 'دکتر آزادالله کرمی، متخصص مشاوره شغلی و تحصیلی با رویکردهای نوین.',
        image: 'https://picsum.photos/seed/DrKarami/400/400'
    }
];

export const CATEGORIES: Category[] = [
    { id: 'c1', title: 'تخصصی روان‌درمانی', icon: 'Brain' },
    { id: 'c2', title: 'کودک و نوجوان', icon: 'Baby' },
    { id: 'c3', title: 'مشاوره و کوچینگ', icon: 'Users' },
    { id: 'c4', title: 'سکس‌تراپی و اعتیاد', icon: 'HeartPulse' },
    { id: 'c5', title: 'مشاوره تحصیلی', icon: 'GraduationCap' },
    { id: 'c6', title: 'تخصصی پیشرفته', icon: 'BookOpen' },
];

export const COURSES: Course[] = [
    // 1. تخصصی روان‌درمانی
    {
        id: 'course-1',
        title: 'تربیت درمانگر و مشاور CBT',
        category: 'تخصصی روان‌درمانی',
        teacherId: 't1',
        schedule: [
            'کد ۱: پنجشنبه و جمعه‌ها (یک هفته در میان) | 15:00–19:00',
            'کد ۲: چهارشنبه‌ها | 09:00–13:00'
        ],
        duration: '104 ساعت',
        description: 'دوره جامع تربیت درمانگر شناختی رفتاری (CBT) شامل مبانی نظری و عملی برای درمان اختلالات شایع.',
        syllabus: [
            'مصاحبه بالینی و تشخیص',
            'اجرا و تفسیر آزمون میلون (MCMI)',
            'تکنیک‌های درمان اختلالات اضطرابی',
            'تکنیک‌های درمان افسردگی',
            'تکنیک‌های درمان وسواس (OCD)',
            'اصول و فنون زوج‌درمانی',
            'مداخله در خیانت‌های زناشویی',
            'مشاوره پیش از ازدواج',
            'تشخیص و درمان اختلالات عملکرد جنسی',
            'فنون مداخله در طلاق'
        ],
        image: 'https://picsum.photos/seed/cbt/800/600',
        featured: true
    },
    {
        id: 'course-2',
        title: 'تربیت درمانگر طرحواره‌درمانی',
        category: 'تخصصی روان‌درمانی',
        teacherId: 't1',
        schedule: ['چهارشنبه‌ها | 15:00–19:00'],
        duration: '40 ساعت',
        description: 'آموزش تخصصی طرحواره درمانی برای شناسایی و تغییر الگوهای ناکارآمد عمیق.',
        syllabus: ['مبانی طرحواره درمانی', 'ذهنیت‌ها', 'تکنیک‌های تجربی', 'تکنیک‌های شناختی'],
        image: 'https://picsum.photos/seed/schema/800/600',
        featured: true
    },
    // 2. روان‌شناسی کودک و نوجوان
    {
        id: 'course-3',
        title: 'تربیت درمانگر کودک و نوجوان',
        category: 'کودک و نوجوان',
        teacherId: 't2',
        schedule: ['یکشنبه‌ها | 15:00–20:00'],
        duration: '140 ساعت',
        description: 'دوره جامع تربیت درمانگر کودک و نوجوان با تمرکز بر اختلالات رفتاری و هیجانی.',
        syllabus: ['مصاحبه با کودک', 'اختلالات اضطرابی کودک', 'بیش‌فعالی و نقص توجه', 'اختلالات رفتاری'],
        image: 'https://picsum.photos/seed/child/800/600',
        featured: true
    },
    {
        id: 'course-4',
        title: 'تشخیص و درمان اختلالات یادگیری',
        category: 'کودک و نوجوان',
        teacherId: 't3',
        schedule: ['یکشنبه‌ها | 14:30–18:30'],
        duration: '16 ساعت',
        description: 'کارگاه تخصصی تشخیص و مداخله در اختلالات یادگیری (LD).',
        syllabus: ['تشخیص اختلال خواندن', 'تشخیص اختلال نوشتن', 'تشخیص اختلال ریاضی', 'راهکارهای درمانی'],
        image: 'https://picsum.photos/seed/learning/800/600'
    },
    {
        id: 'course-5',
        title: 'تشخیص و درمان اختلالات طیف اوتیسم',
        category: 'کودک و نوجوان',
        teacherId: 't3',
        schedule: ['دوشنبه‌ها | 14:30–18:30'],
        duration: '16 ساعت',
        description: 'آموزش تشخیص زودهنگام و مداخلات کارآمد در طیف اوتیسم.',
        syllabus: ['علائم بالینی اوتیسم', 'ابزارهای غربالگری', 'مداخلات رفتاری', 'آموزش والدین'],
        image: 'https://picsum.photos/seed/autism/800/600'
    },
    // 3. مشاوره و کوچینگ
    {
        id: 'course-6',
        title: 'مربی‌گری مهارت‌های زندگی بزرگسالان',
        category: 'مشاوره و کوچینگ',
        teacherId: 't1',
        schedule: ['دوشنبه‌ها | 09:00–13:00'],
        duration: '48 ساعت',
        description: 'دوره تربیت مربی (TOT) مهارت‌های دهگانه زندگی برای بزرگسالان.',
        syllabus: [
            'خودآگاهی و اعتمادبه‌نفس',
            'ارتباط مؤثر و جرأت‌ورزی',
            'مدیریت استرس و کنترل خشم',
            'حل مسئله و تصمیم‌گیری',
            'مذاکره و حل تعارض',
            'تفکر نقادانه',
            'مدیریت کارگاه'
        ],
        image: 'https://picsum.photos/seed/life/800/600'
    },
    {
        id: 'course-7',
        title: 'مربیگری مهارت‌های زندگی کودک و نوجوان',
        category: 'مشاوره و کوچینگ',
        teacherId: 't2',
        schedule: ['دوشنبه‌ها | 09:00–13:00'],
        duration: '50 ساعت',
        description: 'آموزش مهارت‌های زندگی متناسب با سنین کودکی و نوجوانی.',
        syllabus: ['آموزش همدلی به کودکان', 'کنترل خشم در نوجوانان', 'مهارت‌های ارتباطی', 'تفکر خلاق'],
        image: 'https://picsum.photos/seed/childlife/800/600'
    },
    {
        id: 'course-8',
        title: 'مربی‌گری فرزندپروری با رویکرد طرحواره',
        category: 'مشاوره و کوچینگ',
        teacherId: 't1',
        schedule: ['دو جلسه‌ای'],
        duration: '8 ساعت',
        description: 'آموزش اصول فرزندپروری مبتنی بر طرحواره‌ها برای پیشگیری از شکل‌گیری تله‌های زندگی.',
        syllabus: ['نیازهای هیجانی اساسی', 'سبک‌های فرزندپروری', 'طرحواره‌های ناسازگار', 'ترمیم رابطه والد و کودک'],
        image: 'https://picsum.photos/seed/parenting/800/600'
    },
    // 4. سکس‌تراپی و اعتیاد
    {
        id: 'course-9',
        title: 'تربیت سکس‌تراپیست',
        category: 'سکس‌تراپی و اعتیاد',
        teacherId: 't4',
        schedule: ['پنجشنبه‌ها | 15:00–19:00'],
        duration: '80 ساعت',
        description: 'دوره جامع تربیت درمانگر اختلالات جنسی.',
        syllabus: ['فیزیولوژی جنسی', 'اختلالات میل جنسی', 'اختلالات نعوظ و انزال', 'دردهای مقاربتی', 'زوج‌درمانی جنسی'],
        image: 'https://picsum.photos/seed/sextherapy/800/600',
        featured: true
    },
    {
        id: 'course-10',
        title: 'تربیت درمانگر اعتیاد (MMT و ماتریکس)',
        category: 'سکس‌تراپی و اعتیاد',
        teacherId: 't5',
        schedule: ['جمعه‌ها | 15:00–19:00'],
        duration: '50 ساعت',
        description: 'آموزش درمان‌های نگهدارنده و رویکرد ماتریکس در اعتیاد.',
        syllabus: ['مبانی اعتیاد', 'درمان MMT', 'رویکرد ماتریکس', 'پیشگیری از عود'],
        image: 'https://picsum.photos/seed/addiction/800/600'
    },
    // 5. مشاوره تحصیلی
    {
        id: 'course-11',
        title: 'تربیت مشاور تحصیلی',
        category: 'مشاوره تحصیلی',
        teacherId: 't6',
        schedule: ['دوشنبه‌ها | 15:00–19:00'],
        duration: '64 ساعت',
        description: 'آموزش فنون مشاوره تحصیلی، انتخاب رشته و برنامه‌ریزی درسی.',
        syllabus: ['استعدادسنجی', 'هدایت تحصیلی', 'برنامه‌ریزی کنکور', 'افت تحصیلی'],
        image: 'https://picsum.photos/seed/education/800/600'
    },
    // 6. تخصصی پیشرفته
    {
        id: 'course-12',
        title: 'کارورزی CBT و طرحواره‌درمانی',
        category: 'تخصصی پیشرفته',
        teacherId: 't1',
        schedule: ['پنجشنبه و جمعه‌ها | 09:00–13:00'],
        duration: '80 ساعت',
        description: 'دوره عملی و سوپرویژن برای دانشجویان دوره‌های CBT و طرحواره.',
        syllabus: ['کیس ریپورت', 'رول پلی', 'نظارت بالینی', 'اخلاق حرفه‌ای'],
        image: 'https://picsum.photos/seed/internship/800/600'
    },
    {
        id: 'course-13',
        title: 'آموزش اختلالات روانی بر اساس DSM-5-TR',
        category: 'تخصصی پیشرفته',
        teacherId: 't4',
        schedule: ['پنجشنبه‌ها | 09:00–13:00'],
        duration: '60 ساعت',
        description: 'آموزش جامع آسیب‌شناسی روانی بر اساس آخرین نسخه DSM.',
        syllabus: ['تغییرات DSM-5-TR', 'اختلالات خلقی', 'اسکیزوفرنی', 'اختلالات شخصیت'],
        image: 'https://picsum.photos/seed/dsm/800/600'
    },
];

export const BLOG_POSTS: Article[] = [
    {
        id: 'a1',
        title: 'نقش طرحواره‌درمانی در بهبود روابط زوجین',
        summary: 'بررسی تاثیر شناخت تله‌های زندگی در کاهش تعارضات زناشویی...',
        date: '۱۴۰۲/۱۰/۱۵',
        image: 'https://picsum.photos/seed/blog1/600/400'
    },
    {
        id: 'a2',
        title: 'چگونه با اضطراب امتحان مقابله کنیم؟',
        summary: 'راهکارهای عملی برای دانش‌آموزان و دانشجویان جهت مدیریت استرس...',
        date: '۱۴۰۲/۰۹/۲۰',
        image: 'https://picsum.photos/seed/blog2/600/400'
    },
    {
        id: 'a3',
        title: 'علائم هشدار دهنده اوتیسم در کودکان',
        summary: 'آشنایی با نشانه‌های اولیه اختلال طیف اوتیسم در سنین پایین...',
        date: '۱۴۰۲/۰۸/۱۲',
        image: 'https://picsum.photos/seed/blog3/600/400'
    }
];
