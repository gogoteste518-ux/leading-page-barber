import { motion } from 'framer-motion';

const galleryImages = [
  'https://images.unsplash.com/photo-1699641975121-5c3f55a553e5?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1672274303996-ddfcb2a94250?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1706769015484-248bd241945c?crop=entropy&cs=srgb&fm=jpg&q=85',
  'https://images.unsplash.com/photo-1768938896401-fe52fd18d3af?crop=entropy&cs=srgb&fm=jpg&q=85'
];

export default function Gallery() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)'
        }}
      />

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
            <span className="text-secondary ml-4">TRABALHOS</span>
          </h2>
          <p className="text-lg text-gray-400 font-body">
            Cada corte é uma obra de arte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group overflow-hidden aspect-square"
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image}
                alt={`Work ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <span className="text-primary font-heading text-2xl uppercase">URBAN CUTS</span>
              </div>
              {/* Border accent */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}