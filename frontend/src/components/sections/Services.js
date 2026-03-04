import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Scissors, Zap, Crown, Star, Pen, Baby } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const iconMap = {
  scissors: Scissors,
  razor: Zap,
  crown: Crown,
  star: Star,
  pen: Pen,
  child: Baby,
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-primary">Carregando serviços...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-tight mb-4 text-foreground">
            NOSSOS
            <span className="text-primary ml-4">SERVIÇOS</span>
          </h2>
          <p className="text-lg text-gray-400 font-body max-w-2xl mx-auto">
            Transformação completa com os melhores profissionais da cidade
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Scissors;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group relative bg-muted p-8 border border-border hover:border-primary transition-all duration-300 overflow-hidden"
                data-testid={`service-card-${service.id}`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-black/50 border border-primary/30 group-hover:border-primary transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-heading text-primary">{service.price}</div>
                      <div className="text-sm text-gray-500 font-body">{service.duration}</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-heading uppercase mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-gray-400 font-body leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <button
                    data-testid={`book-service-${service.id}`}
                    onClick={() => {
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-primary font-bold uppercase text-sm tracking-wider hover:text-white transition-colors flex items-center gap-2 group/btn"
                  >
                    AGENDAR
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 group-hover:border-primary transition-colors" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}