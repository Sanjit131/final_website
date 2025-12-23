export interface Project {
    id: number;
    title: string;
    description: string;
    oneLiner: string;
    eventDate: string;
    venue: string;
    avenue: string;
    isSignature: boolean;
    status: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
    details?: string; // Optional for compatibility
}

export const projects: Project[] = [
    {
        "id": 1,
        "title": "UDHIRAM",
        "description": "Udhiram, the club's signature blood donation initiative, witnessed massive participation from students, faculty, and the public. With eight hospitals operating simultaneously, volunteers managed registrations, logistics, and donor flow efficiently. The drive successfully collected 650 units of blood, reinforcing the club's legacy in community health service.",
        "oneLiner": "A large-scale blood donation drive creating life-saving impact.",
        "eventDate": "09-10-2025",
        "venue": "Indoor Auditorium, REC",
        "avenue": "community",
        "isSignature": true,
        "status": "active",
        "image": "/uploads/IMG_3163.JPG",
        "createdAt": "2025-12-21T21:54:12.097867",
        "updatedAt": "2025-12-22T07:56:06.377009"
    },
    {
        "id": 2,
        "title": "Uzhavaram",
        "description": "Uzhavaram marked the first project of the tenure, bringing Rotaractors together for a temple cleanup drive at Nagathamman Temple. The day began with a pooja, followed by systematic cleaning of the rooftop and temple premises. Volunteers worked with dedication, restoring cleanliness and serenity to the sacred space. The project concluded with a final pooja and appreciation from the Temple Committee, setting a strong service-oriented tone for the year.",
        "oneLiner": "A purpose-driven temple cleanup initiating the Rotaract year with service and spirituality.",
        "eventDate": "06-07-2025",
        "venue": "Nagathamman Temple, Kodambakkam",
        "avenue": "community",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/IMG-20250706-WA0149.jpg",
        "createdAt": "2025-12-21T22:23:31.437046"
    },
    {
        "id": 3,
        "title": "Sayonara",
        "description": "Sayonara was a warm farewell event organized to honor senior Rotaractors. The celebration began with a cheerful gathering and lunch, followed by shared stories and photo moments. The evening continued at Chetpet Eco Park with a cake-cutting ceremony, emotional reflections, and gratitude-filled conversations. The event beautifully celebrated friendships, transitions, and lasting connections beyond the Rotaract journey.",
        "oneLiner": "A heartfelt farewell celebrating memories, mentorship, and meaningful bonds.",
        "eventDate": "20-07-2025",
        "venue": "Nahdi Mandi, Arumbakkam & Chetpet Eco Park",
        "avenue": "club",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/IMG_0119.JPG",
        "createdAt": "2025-12-21T22:27:28.488772"
    },
    {
        "id": 4,
        "title": "Thoorigai",
        "description": "Thoorigai was a career guidance and STEM awareness program aimed at motivating school students. The session featured insightful talks on career planning, overcoming fear, engineering opportunities, and the role of STEM and AI in education. Interactive discussions and real-world insights empowered students to think confidently about their future paths.",
        "oneLiner": "Inspiring young minds to explore careers through STEM awareness.",
        "eventDate": "09-08-2025",
        "venue": "Kalpavriksha Tuition Centre, West Mambalam",
        "avenue": "professional",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/20250809_133106.jpg",
        "createdAt": "2025-12-21T22:31:13.536840"
    },
    {
        "id": 5,
        "title": "ARAM",
        "description": "ARAM marked the 16th Installation Ceremony of the Rotaract Club of Rajalakshmi Engineering College. The event formally inducted the President and Executive Team for the new tenure, featuring ceremonial traditions, leadership handover, introduction of core and board officials, and the launch of official club collaterals. The ceremony symbolized continuity, responsibility, and a promising beginning.",
        "oneLiner": "Our 16th installation ceremony ushering in a new Rotaract leadership.",
        "eventDate": "12-08-2025",
        "venue": "Main Seminar Hall, Rajalakshmi Engineering College",
        "avenue": "professional",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/Copy of IMG_1433.JPG",
        "createdAt": "2025-12-21T22:39:52.507099",
        "updatedAt": "2025-12-21T23:14:31.122250"
    },
    {
        "id": 6,
        "title": "Mirage",
        "description": "Mirage was a joint virtual session conducted with the Rotaract Club of PSGR Krishnammal College for Women. Centered on innovation and technology, the event featured expert talks on ideation, startups, sustainability, and entrepreneurship. Interactive activities and discussions encouraged creative thinking and cross-club collaboration.",
        "oneLiner": "A collaborative virtual meet exploring innovation and technology.",
        "eventDate": "26-08-2025",
        "venue": "Google Meet (Online)",
        "avenue": "professional",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/IMG-20251104-WA0016 (1).jpg",
        "createdAt": "2025-12-21T22:41:31.929902"
    },
    {
        "id": 7,
        "title": "Design Decode",
        "description": "Design Decode was an online training session aimed at enhancing members' graphic design skills. Participants learned Photoshop fundamentals, advanced tools, and real-time poster creation. The practical approach, combined with interactive Q&A, made the session both engaging and skill-oriented.",
        "oneLiner": "A hands-on Photoshop workshop unlocking creative design skills.",
        "eventDate": "28-08-2025",
        "venue": "Google Meet (Online)",
        "avenue": "professional",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/d2.jpeg",
        "createdAt": "2025-12-21T22:43:06.567288"
    },
    {
        "id": 8,
        "title": "Decode DaVinci",
        "description": "Decode DaVinci was an online video editing workshop focusing on DaVinci Resolve. Members were guided through the interface, advanced editing techniques, color grading, masking, and 3D text creation. Live demonstrations and interactive discussions empowered participants to confidently explore video production.",
        "oneLiner": "Mastering video editing through structured DaVinci Resolve training.",
        "eventDate": "31-08-2025",
        "venue": "Google Meet (Online)",
        "avenue": "professional",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/v2.png",
        "createdAt": "2025-12-21T22:44:01.309481"
    },
    {
        "id": 9,
        "title": "Anna Vriksha 2.0",
        "description": "Anna Vriksha 2.0 focused on distributing wholesome meals to the homeless across multiple localities. Volunteers worked in teams to ensure respectful and efficient distribution, connecting meaningfully with the community. The initiative strengthened social responsibility and empathy among members.",
        "oneLiner": "A compassionate food distribution drive serving the underserved.",
        "eventDate": "19-10-2025",
        "venue": "Urban Square, Guindy",
        "avenue": "community",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/20251019_115005 (1).jpg",
        "createdAt": "2025-12-21T22:46:54.559774",
        "updatedAt": "2025-12-21T22:47:32.535920"
    },
    {
        "id": 10,
        "title": "From Coffee to Covers",
        "description": "From Coffee to Covers was a joint virtual fellowship with the Rotaract Club of MOP Vaishnav College for Women. Through icebreakers, games, and interactive activities, members bonded over shared Rotaract experiences. The session overflowed with laughter, reflections, and genuine camaraderie, capturing the essence of fellowship.",
        "oneLiner": "A lively virtual fellowship turning conversations into connections.",
        "eventDate": "21-10-2025",
        "venue": "Google Meet (Online)",
        "avenue": "club",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/IMG-20251104-WA0023.jpg",
        "createdAt": "2025-12-21T22:48:54.220553"
    },
    {
        "id": 11,
        "title": "The First Step",
        "description": "The First Step introduced members to the history, values, and opportunities within Rotary and Rotaract. The session covered avenues of service, district platforms, and impactful humanitarian initiatives, leaving members informed, inspired, and motivated to actively engage in Rotaract.",
        "oneLiner": "An orientation session laying the foundation of Rotary and Rotaract.",
        "eventDate": "25-11-2025",
        "venue": "Google Meet (Online)",
        "avenue": "professional",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/WhatsApp Image 2025-11-25 at 6.23.19 PM.jpeg",
        "createdAt": "2025-12-21T22:50:20.628794"
    },
    {
        "id": 12,
        "title": "Ascend",
        "description": "Ascend was a structured seminar focusing on teamwork, time management, and leadership. Where Our Past Presidents shared practical insights and real-life experiences, equipping members with essential skills for personal growth and effective club functioning.",
        "oneLiner": "A leadership and skill-building seminar shaping future Rotaractors.",
        "eventDate": "30-11-2025",
        "venue": "Google Meet (Online)",
        "avenue": "professional",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/Screenshot 2025-11-30 163046.png",
        "createdAt": "2025-12-21T22:54:55.684543"
    },
    {
        "id": 13,
        "title": "Bowls & Bonds",
        "description": "Bowls & Bonds was a vibrant board members' meet-up marking the start of a new tenure. What began as casual introductions quickly turned into a lively session filled with bowling, music, laughter, and team bonding. The event fostered unity between core and board members and concluded with a shared lunch, setting the foundation for a collaborative and enthusiastic Rotaract year.",
        "oneLiner": "A high-energy board meet blending bowling, bonding, and team spirit.",
        "eventDate": "02-08-2025",
        "venue": "Du Bowl, Thousand Lights",
        "avenue": "club",
        "isSignature": false,
        "status": "active",
        "image": "/uploads/Untitled design (5)-min.png",
        "createdAt": "2025-12-21T22:59:27.352714",
        "updatedAt": "2025-12-21T23:32:34.786799"
    },
];
