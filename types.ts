export interface Teacher {
    id: string;
    name: string;
    prefix: string; // e.g., "دکتر"
    specialty: string;
    bio: string;
    image: string;
}

export interface Course {
    id: string;
    title: string;
    category: string;
    teacherId: string;
    schedule: string[]; // Array to handle multiple codes/times
    duration: string; // e.g., "104 ساعت"
    description: string;
    syllabus: string[];
    image: string;
    featured?: boolean;
}

export interface Category {
    id: string;
    title: string;
    icon: string;
}

export interface Article {
    id: string;
    title: string;
    summary: string;
    date: string;
    image: string;
}