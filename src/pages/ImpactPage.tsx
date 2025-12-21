import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { API_BASE_URL } from '../config';
import { projects as defaultProjects } from '../data/projects';

const ImpactPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const data = await response.json();
        // Map backend projects to display format and combine with existing hardcoded ones
        const backendProjects = data.map((p: any) => ({
          id: p.id + 1000, // Offset to avoid conflicts
          title: p.title,
          date: p.eventDate || (p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-') : 'Recent'),
          location: p.venue || 'RACREC',
          description: p.oneLiner || p.description, // Use one-liner for card, fallback to description
          image: p.image ? `${API_BASE_URL}/uploads/${p.image}` : '/default-image.jpg',
          category: p.avenue,
          details: p.description, // Full description for modal
          isSignature: p.isSignature,
          status: p.status
        }));
        setProjects(backendProjects);
        setLoading(false);
      } catch (error) {
        console.log('Backend not available, using default projects');
        // If backend is not available, use default projects
        setProjects(defaultProjects);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);



  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'club', label: 'Club Service' },
    { id: 'community', label: 'Community Service' },
    { id: 'international', label: 'International Service' },
    { id: 'professional', label: 'Professional Service' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

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
            <h1 className="text-3xl md:text-5xl font-bold text-text-dark mb-4">
              Our Impact in Action
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the transformative projects and events that showcase our commitment to service and community development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeFilter === filter.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-text-dark'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading projects...</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={`${activeFilter}-${project.id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05
                    }}
                  >
                    <ProjectCard {...project} priority={index < 3} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-600 text-lg">
                No projects found for the selected category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text-dark mb-4">
              Project Impact Summary
            </h2>
            <p className="text-gray-600">
              A snapshot of our collective achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: projects.length, label: "Total Projects", color: "text-primary" },
              { number: 5000, label: "Lives Impacted", color: "text-accent" },
              { number: 49, label: "Volunteers", color: "text-primary" },
              { number: 15, label: "Years in Services", color: "text-accent" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.number}+
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImpactPage; 