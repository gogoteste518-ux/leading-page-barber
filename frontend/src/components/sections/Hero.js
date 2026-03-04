import { motion } from 'framer-motion';

export default function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading uppercase tracking-tighter leading-[0.9] mb-6"
            style={{
              textShadow: '0 0 40px rgba(212, 175, 55, 0.5), 0 0 80px rgba(212, 175, 55, 0.2)'
            }}
          >
            <span className="text-foreground">EUCLIDES</span>
            <br />
            <span className="text-primary">CORTES</span>
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl font-body text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          EXCELÊNCIA • PRECISÃO • ESTILO IMPECÁVEL
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button
            data-testid="hero-booking-btn"
            onClick={scrollToBooking}
            className="bg-primary text-black font-bold uppercase tracking-wider hover:bg-secondary hover:scale-105 transition-all duration-300 px-8 py-4 text-lg shadow-lg shadow-primary/20"
          >
            AGENDAR HORÁRIO
          </button>
          <button
            data-testid="hero-services-btn"
            onClick={scrollToServices}
            className="border-2 border-primary text-primary font-bold uppercase tracking-wider hover:bg-primary hover:text-black hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
          >
            NOSSOS SERVIÇOS
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </section>
  );
}