import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiMapPin } from 'react-icons/fi';

interface ProjectCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  details?: string;
  gallery?: string[];
  priority?: boolean;
}

const ProjectCard = ({ title, date, location, description, image, details, gallery, priority = false }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-video overflow-hidden bg-gray-200">
          <img
            src={image}
            alt={title}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            decoding="async"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-text-dark mb-2">{title}</h3>

          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FiCalendar className="w-4 h-4 mr-1" />
            <span>{date}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-3">
            <FiMapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2">{description}</p>

          <button className="text-primary font-semibold hover:text-secondary transition-colors">
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto rounded-t-lg"
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-text-dark mb-4">{title}</h2>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  <span>{date}</span>
                  <span className="mx-2">•</span>
                  <FiMapPin className="w-4 h-4 mr-2" />
                  <span>{location}</span>
                </div>

                <p className="text-gray-700 mb-4">{description}</p>

                {details && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">Event Details</h3>
                    <p className="text-gray-700">{details}</p>
                  </div>
                )}

                {gallery && gallery.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Event Gallery</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {gallery.slice(0, 6).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${title} gallery ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard; 