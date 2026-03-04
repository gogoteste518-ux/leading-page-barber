import "@/App.css";
import { Toaster } from 'sonner';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Booking from './components/sections/Booking';
import Footer from './components/sections/Footer';

function App() {
  return (
    <div className="App bg-background text-foreground overflow-x-hidden">
      <Toaster 
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#0a0a0a',
            color: '#ffffff',
            border: '2px solid #D4AF37',
          },
        }}
      />
      <Hero />
      <Services />
      <Booking />
      <Footer />
    </div>
  );
}

export default App;