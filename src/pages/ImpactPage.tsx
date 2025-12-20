import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { API_BASE_URL } from '../config';

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
          date: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Recent',
          location: 'RACREC',
          description: p.description,
          image: p.image ? `${API_BASE_URL}/uploads/${p.image}` : '/default-image.jpg',
          category: p.avenue,
          details: p.description,
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

  // Default hardcoded projects (fallback)
  const defaultProjects = [
    // Community Service events from public/Communityservice
    {
      id: 10,
      title: "Udhiram",
      date: "12th October 2024, 3rd April 2025",
      location: "Indoor Auditorium, Rajalakshmi Engineering College",
      description: "A successful blood donation camp uniting students for a life-saving cause.",
      image: "/Communityservice/Udhiram.jpg",
      category: "community",
      details: "A total of 1,502 units of blood were collected in two drives held on 12th October 2024 and 3rd April 2025, with 780 and 722 units respectively, showcasing an inspiring spirit of service and compassion."
    },
    {
      id: 11,
      title: "Guru Prashansa 2.0",
      date: "5th September 2024",
      location: "Rajalakshmi Engineering College",
      description: "A heartfelt Teachers’ Day tribute celebrating mentorship and guidance.",
      image: "/Communityservice/Guru_Prashansa.jpg",
      category: "community",
      details: "Guru Prashansa 2.0 honored educators for their dedication and impact on shaping young minds. The celebration included distributing sweets as a token of appreciation and gifting personalized motivational cards to inspire and acknowledge teachers’ invaluable contributions."
    },
    {
      id: 12,
      title: "Silent Streets",
      date: "30th January 2025",
      location: "Rajalakshmi Engineering College",
      description: "A powerful mime performance spreading road safety awareness through expressions and actions.",
      image: "/Communityservice/Silent_Streets.jpg",
      category: "community",
      details: "Silent Streets used the art of mime to highlight the dangers of careless driving, emphasizing the importance of road safety. With synchronized movements and impactful gestures, performers engaged the audience and delivered the message in a creative, dialogue-free manner."
    },

    // International Service events from public/internationalservice
    {
      id: 13,
      title: "Letterhead Exchange",
      date: "11 August 2025",
      location: "Anna Nagar Tower Park",
      description: "Strengthening global bonds through our first-ever Twin Club Agreement.",
      image: "/internationalservice/Letterhead_Exchange.jpg",
      category: "international",
      details: "The International Service Avenue of RACREC achieved a major milestone this year with the signing of its first Twin Club Agreement, fostering global partnerships, cultural exchange, and collaborative projects that align with international goals."
    },
    {
      id: 14,
      title: "Red Ribbon Reach",
      date: "11 August 2025",
      location: "Google Meet (Online)",
      description: "Raising awareness on infection risks through expert insights.",
      image: "/internationalservice/Red_Ribbon_Reach.jpg",
      category: "international",
      details: "An enlightening virtual session led by Poongodi Santhanakumarsamy, focusing on the chances of infection, modes of transmission, and preventive measures. The event aimed to spread accurate medical awareness among participants for informed health practices."
    },
    {
      id: 15,
      title: "The Twin Pact",
      date: "11 August 2025",
      location: "Google Meet (Online)",
      description: "Empowering minds with knowledge on infection risks and prevention.",
      image: "/internationalservice/The_Twin_Pact.jpg",
      category: "international",
      details: "A virtual awareness session led by Poongodi Santhanakumarsamy, focusing on chances of infection, modes of transmission, and preventive measures. The session provided participants with factual insights to make informed health choices and spread awareness within their communities."
    },

    // Professional Service events from public/Professonialservice
    {
      id: 16,
      title: "Prompt IQ",
      date: "28 February 2025",
      location: "Idea Factory, Rajalakshmi Engineering College",
      description: "Unleashing creativity through the art and science of prompt engineering.",
      image: "/Professonialservice/Prompt _IQ.jpg",
      category: "professional",
      details: "PromptIQ, hosted by the Rotaract Club of Rajalakshmi Engineering College in collaboration with the IEEE Computer Society of REC, was an intellectually stimulating event exploring the world of prompt engineering. Featuring interactive activities, team-based problem-solving, and an engaging keynote by Mr. Gokul V, the session equipped participants with practical AI communication skills, real-world use cases, and best practices to inspire innovation."
    },
    {
      id: 17,
      title: "Victo-Ryla",
      date: "30 April 2025",
      location: "Rajalakshmi Engineering College",
      description: "Empowering youth through leadership, confidence, and service.",
      image: "/Professonialservice/Victo_Ryla.jpg",
      category: "professional",
      details: "VICTO-RYLA ‘25 was a one-day leadership summit by the Rotaract Club of Rajalakshmi Engineering College, designed to inspire and empower young individuals through impactful sessions and engaging activities. With powerful talks from renowned speakers including entrepreneurs, innovators, AI specialists, and mental health advocates, the event fostered leadership skills, confidence, and a spirit of service among youth."
    },
    {
      id: 18,
      title: "Figma Flow",
      date: "28th August, 2024",
      location: "Online (Google Meet)",
      description: "Interactive virtual session on UI/UX design with Figma, blending theory and hands-on practice.",
      image: "/Professonialservice/Figma_Flow.jpg",
      category: "professional",
      details: "A virtual session introducing students to UI/UX design with a focus on Figma, covering design thinking, user-centered approaches, and practical demonstrations."
    },


    // Club Service events from public/clubservice
    {
      id: 7,
      title: "Actopia",
      date: "29th September 2024",
      location: "Anna Nagar Tower Park",
      description: "A fun-filled joint event bonding over games, laughter, and new connections.",
      image: "/clubservice/Actopia.jpg",
      category: "club",
      details: "Actopia brought together members from two clubs for a day of icebreaker games, laughter, and camaraderie. The lively dumb charades session set the tone for stronger bonds and future collaborations."
    },
    {
      id: 8,
      title: "Memomania",
      date: "19th Feb 2025",
      location: "Online (Gmeet)",
      description: "A virtual celebration of humor and creativity through fun, lighthearted memes.",
      image: "/clubservice/Memomania.jpg",
      category: "club",
      details: "Memomania brought members together online to share and enjoy witty, respectful, and relatable memes, sparking laughter and strengthening bonds in a lively virtual setting."
    },
    {
      id: 9,
      title: "Brunch 'N' Bowl",
      date: "12th Aug 2024",
      location: "Besant Nagar, Edward's Elliot's Beach",
      description: "Morning at Besant Nagar Beach followed by a hearty brunch, bonding over food and laughter.",
      image: "/clubservice/Brunch'N'Bowl.jpg",
      category: "club",
      details: "Members enjoyed a serene morning at Besant Nagar Beach, soaking in the calm breeze and connecting through conversations. The outing ended with a delightful brunch at Murugan Idli Shop, filled with authentic flavors, laughter, and bonding moments."
    }
  ];

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
      <section className="section-padding-top bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
              Our Impact in Action
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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