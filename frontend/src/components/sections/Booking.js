import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const services = [
    'FADE STREET',
    'BARBA KING',
    'COMBO VIP',
    'PLATINADO',
    'RISCOS & ART',
    'KIDS STYLE'
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/bookings`, formData);
      console.log('Booking created:', response.data);
      
      toast.success('Agendamento realizado com sucesso!', {
        description: `Confirmação enviada para ${formData.email}`,
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Erro ao agendar', {
        description: 'Tente novamente ou entre em contato conosco.',
      });
    } finally {
      setLoading(false);
    }
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
            Transforme seu visual agora mesmo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black/50 border-2 border-border p-8 md:p-12 backdrop-blur-sm"
          data-testid="booking-form-container"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  data-testid="booking-name-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border-2 border-border focus:border-primary text-white placeholder:text-gray-600 p-4 outline-none transition-colors font-body"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="booking-email-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border-2 border-border focus:border-primary text-white placeholder:text-gray-600 p-4 outline-none transition-colors font-body"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  data-testid="booking-phone-input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border-2 border-border focus:border-primary text-white placeholder:text-gray-600 p-4 outline-none transition-colors font-body"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Serviço
                </label>
                <select
                  id="service"
                  name="service"
                  data-testid="booking-service-select"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border-2 border-border focus:border-primary text-white p-4 outline-none transition-colors font-body"
                >
                  <option value="">Escolha um serviço</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  data-testid="booking-date-input"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-black border-2 border-border focus:border-primary text-white p-4 outline-none transition-colors font-body"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Horário
                </label>
                <select
                  id="time"
                  name="time"
                  data-testid="booking-time-select"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border-2 border-border focus:border-primary text-white p-4 outline-none transition-colors font-body"
                >
                  <option value="">Escolha um horário</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                Observações (opcional)
              </label>
              <textarea
                id="notes"
                name="notes"
                data-testid="booking-notes-input"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full bg-black border-2 border-border focus:border-primary text-white placeholder:text-gray-600 p-4 outline-none transition-colors font-body resize-none"
                placeholder="Alguma preferência ou observação?"
              />
            </div>

            <motion.button
              type="submit"
              data-testid="booking-submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'AGENDANDO...' : 'CONFIRMAR AGENDAMENTO'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}