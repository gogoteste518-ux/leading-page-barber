import { motion } from 'framer-motion';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', testId: 'footer-instagram' },
    { icon: Facebook, href: '#', label: 'Facebook', testId: 'footer-facebook' },
  ];

  const contactInfo = [
    { icon: Phone, text: '(11) 99999-9999', testId: 'footer-phone' },
    { icon: Mail, text: 'contato@euclidescortes.com', testId: 'footer-email' },
    { icon: MapPin, text: 'Rua da Excelência, 123 - São Paulo', testId: 'footer-address' },
  ];

  return (
    <footer className="bg-black border-t-2 border-primary py-12 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-heading uppercase text-primary mb-4">EUCLIDES CORTES</h3>
            <p className="text-gray-400 font-body leading-relaxed">
              Excelência em cortes, precisão e atendimento de qualidade. Seu estilo é nossa missão.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-heading uppercase text-foreground mb-4">CONTATO</h4>
            <div className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors" data-testid={item.testId}>
                    <Icon className="w-5 h-5" />
                    <span className="font-body">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Social & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-heading uppercase text-foreground mb-4">REDES SOCIAIS</h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    data-testid={social.testId}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-muted border border-border hover:border-primary flex items-center justify-center transition-colors group"
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                  </motion.a>
                );
              })}
            </div>
            <div className="text-gray-400 font-body space-y-1">
              <p className="font-bold text-foreground">HORÁRIO</p>
              <p>Segunda a Sexta: 09h - 20h</p>
              <p>Sábado: 09h - 18h</p>
              <p>Domingo: Fechado</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border text-center text-gray-500 font-body"
        >
          <p>© 2024 Euclides Cortes. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Excelência e profissionalismo em cada corte</p>
        </motion.div>
      </div>
    </footer>
  );
}