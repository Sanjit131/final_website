import { motion } from 'framer-motion';
import { BiSolidDonateBlood, BiSolidUser } from 'react-icons/bi';
import { BsAwardFill, BsFillHeartFill, BsFillLightbulbFill, BsGraphUpArrow, BsHeart } from 'react-icons/bs';
import { FiCalendar, FiAward, FiUsers, FiHeart, FiEye, FiVideo, FiZoomIn, FiCheckCircle, FiPower } from 'react-icons/fi';

const StoryPage = () => {
  const timeline = [
    {
      year: "2010",
      title: "Foundation",
      description: "The club was founded with a vision to empower young leaders, marking its inception with the initiation of its signature blood donation camp.",
      icon: FiHeart
    },
    {
      year: "2011",
      title: "Charter Year",
      description: "Chartered in 2011, the club has consistently upheld Rotary’s values through impactful service initiatives.",
      icon: FiCalendar
    },
    {
      year: "2015",
      title: "Vision Awareness",
      description: "Adhigathur village situated nearby was adopted by the Rotaract. An eye check up camp and eye donation awareness camp were organized.",
      icon: FiEye
    },
    {
      year: "2019",
      title: "Recognition",
      description: "The club received the Rotary Citation with Platinum Distinction for outstanding community service and service excellence.",
      icon: FiAward
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Adapted to virtual platforms and continued serving during challenging times.",
      icon: FiVideo
    },
    {
      year: "2024",
      title: "Blood Donation",
      description: "The club has collected over 1500 units of blood marking a major milestone.",
      icon: BiSolidDonateBlood
    },
    {
      year: "2025",
      title: "Continued Growth",
      description: "The club is actively growing and contributing towards the community.",
      icon: BsGraphUpArrow
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/gallery/WhatsApp Image 2025-08-11 at 23.23.53_d9a3a398.jpg"
            alt="Story Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-sans">
            Our Story
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
            From humble beginnings to impactful leadership - discover the journey that shaped RACREC into what it is today.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-gray-600 text-lg">
              Driving positive change through leadership and service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="bg-background p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-text-dark mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To drive service-oriented action, professional development, and collaborative leadership. We empower members to build essential skills, engage in high-impact initiatives, and leverage Rotary’s network to transform ideas into measurable community results.
              </p>
            </motion.div>

            <motion.div
              className="bg-background p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-text-dark mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To cultivate leaders who deliver practical solutions and grow personally and professionally. We envision a movement that goes beyond checking boxes, where youth think globally and act locally to create meaningful, sustainable change.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 text-lg">
              Milestones that shaped our path to impact
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-px h-full w-1 bg-primary"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline Point */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 pl-12 md:pl-0' : 'md:pl-8 pl-12'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-3">
                      <item.icon className="w-6 h-6 text-primary mr-3" />
                      <span className="text-2xl font-bold text-primary">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-dark mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Service Above Self",
                description: "We prioritize the needs of others and the community above personal interests.",
                icon: BsFillHeartFill
              },
              {
                title: "Leadership Development",
                description: "We nurture and develop leadership skills in every member.",
                icon: BsAwardFill
              },
              {
                title: "Integrity",
                description: "We maintain the highest standards of honesty and ethical behavior.",
                icon: BiSolidUser
              },
              {
                title: "Innovation",
                description: "We embrace new ideas and creative solutions to address challenges.",
                icon: BsFillLightbulbFill
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoryPage;