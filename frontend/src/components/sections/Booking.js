import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function Booking() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/message/6KOQ62YOTL7MO1', '_blank');
  };

  return (
    <section id="booking" className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-tight mb-4 text-foreground">
            AGENDE SEU
            <span className="text-primary ml-4">HORÁRIO</span>
          </h2>
          <p className="text-lg text-gray-400 font-body">
            Entre em contato via WhatsApp e garanta seu horário
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black/50 border-2 border-border p-12 md:p-16 backdrop-blur-sm text-center"
          data-testid="booking-whatsapp-container"
        >
          <motion.div
            className="mb-8"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full border-2 border-primary mb-6">
              <MessageCircle className="w-12 h-12 text-primary" />
            </div>
          </motion.div>

          <h3 className="text-2xl md:text-3xl font-heading uppercase text-foreground mb-4">
            FALE CONOSCO NO WHATSAPP
          </h3>
          <p className="text-gray-400 font-body mb-8 max-w-xl mx-auto">
            Clique no botão abaixo para iniciar uma conversa e agendar seu horário de forma rápida e fácil.
          </p>

          <motion.button
            onClick={handleWhatsAppClick}
            data-testid="booking-whatsapp-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-black font-bold uppercase tracking-wider hover:bg-secondary transition-all duration-300 px-12 py-5 text-lg shadow-lg shadow-primary/30 inline-flex items-center gap-3"
          >
            <MessageCircle className="w-6 h-6" />
            AGENDAR VIA WHATSAPP
          </motion.button>

          <p className="text-gray-500 text-sm font-body mt-6">
            Resposta rápida • Atendimento personalizado
          </p>
        </motion.div>
      </div>
    </section>
  );
}