import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PhotoAlbum } from 'react-photo-album';
import type { RenderPhotoProps } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { API_BASE_URL } from '../config';

const GalleryPage = () => {
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState<any[]>([]);
  const [projectCount, setProjectCount] = useState(0);

  // Fetch gallery images from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/gallery`);
        const data = await response.json();

        // Map backend gallery to photo format
        const galleryPhotos = data.map((img: any) => ({
          src: `${API_BASE_URL}/gallery-uploads/${img.filename}`,
          width: img.width,
          height: img.height,
          title: img.title
        }));

        setPhotos(galleryPhotos);
      } catch (error) {
        console.log('Backend not available, using default gallery');
        setPhotos(defaultPhotos);
      }
    };

    const fetchProjectCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjectCount(data.length);
        }
      } catch (error) {
        console.error('Failed to fetch project count:', error);
      }
    };

    fetchGallery();
    fetchProjectCount();
  }, []);

  // Default gallery photos (fallback)
  const defaultPhotos = [
    { src: "/gallery/IMG-20250811-WA0092.jpg", width: 1080, height: 1440, title: "Gallery" },
    { src: "/gallery/IMG-20250811-WA0091.jpg", width: 1080, height: 1440, title: "Gallery" },
    { src: "/gallery/IMG-20250811-WA0090.jpg", width: 1440, height: 1080, title: "Gallery" },
    { src: "/gallery/IMG-20250811-WA0089.jpg", width: 1080, height: 1440, title: "Gallery" },
    { src: "/gallery/IMG-20250811-WA0088.jpg", width: 1080, height: 1440, title: "Gallery" },
    { src: "/gallery/IMG-20250811-WA0087.jpg", width: 1080, height: 1440, title: "Gallery" },
    { src: "/gallery/WhatsApp Image 2025-08-11 at 23.23.53_d9a3a398.jpg", width: 1440, height: 1080, title: "Gallery" },
    { src: "/gallery/WhatsApp Image 2025-08-11 at 23.53.44_cad40f9b.jpg", width: 1440, height: 1080, title: "Gallery" },
    { src: "/gallery/WhatsApp Image 2025-08-11 at 23.54.34_96d14cf5.jpg", width: 1440, height: 1080, title: "Gallery" },
    { src: "/gallery/WhatsApp Image 2025-08-11 at 23.55.09_75deba56.jpg", width: 1440, height: 1080, title: "Gallery" },
  ];

  const renderPhoto = ({ imageProps: { alt, style, ...rest } }: RenderPhotoProps<any>) => (
    <motion.div
      className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <img
        alt={alt}
        style={{ ...style, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        {...rest}
      />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="section-padding-top pt-40 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
              Our Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A visual journey through our impactful projects, memorable events, and the amazing people who make it all possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-dark mb-2">
                Capturing Moments of Impact
              </h2>
              <p className="text-gray-600">
                Click on any image to view it in full size
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PhotoAlbum
              photos={photos}
              layout="masonry"
              columns={(containerWidth) => {
                if (containerWidth < 640) return 1;
                if (containerWidth < 768) return 2;
                if (containerWidth < 1024) return 3;
                return 4;
              }}
              spacing={16}
              padding={8}
              renderPhoto={renderPhoto}
              onClick={({ index }) => setIndex(index)}
            />
          </motion.div>

          {/* Gallery Stats */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {photos.length}+
                </div>
                <p className="text-gray-600">Memorable Moments</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">
                  {projectCount}+
                </div>
                <p className="text-gray-600">Events Captured</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  150+
                </div>
                <p className="text-gray-600">Smiles Shared</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        carousel={{
          finite: true,
        }}
        render={{
          slide: ({ slide, rect }) => (
            <div style={{ position: "relative", width: rect.width, height: rect.height }}>
              <img
                src={slide.src}
                alt={(slide as any).title || ''}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
              {(slide as any).title && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  {(slide as any).title}
                </div>
              )}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default GalleryPage; 