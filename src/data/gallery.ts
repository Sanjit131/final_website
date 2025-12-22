export interface GalleryImage {
    id: number;
    filename: string;
    title: string;
    width: number;
    height: number;
    createdAt: string;
}

export const gallery: GalleryImage[] = [
    {
        "id": 1,
        "filename": "/gallery_uploads/1766339592.578848_WhatsApp_Image_2025-11-25_at_6.23.19_PM.jpeg",
        "title": "The First Step - Club Orientation",
        "width": 1080,
        "height": 1440,
        "createdAt": "2025-12-21T23:23:12.580289"
    },
    {
        "id": 2,
        "filename": "/gallery_uploads/1766339649.592794_IMG-20251104-WA0023.jpg",
        "title": "Club service Project with Rotaract Club of MOP Vaishnava",
        "width": 1080,
        "height": 1440,
        "createdAt": "2025-12-21T23:24:09.592794"
    },
    {
        "id": 3,
        "filename": "/gallery_uploads/1766339682.554503_20251019_115005_1.jpg",
        "title": "Anna Vriksha - Food Donation",
        "width": 1080,
        "height": 1440,
        "createdAt": "2025-12-21T23:24:42.562796"
    }
];
