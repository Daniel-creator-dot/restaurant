import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bed, 
  Utensils, 
  Sparkles, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  MapPin, 
  Phone, 
  Mail,
  ChevronRight,
  ChevronLeft,
  Star
} from 'lucide-react';
import { cn } from './lib/utils';

const NAV_LINKS = [
  { name: 'Lodging', href: '#lodging' },
  { name: 'Restaurant', href: '#restaurant' },
  { name: 'Massage', href: '#massage' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    id: 'lodging',
    title: 'Luxury Lodging',
    description: 'Experience serenity in our eco-conscious suites, where nature meets comfort. Each room is designed to harmonize with the surrounding landscape.',
    longDescription: 'Our suites are more than just a place to sleep; they are a sanctuary. Built using sustainable local materials, each unit features large panoramic windows that bring the outside in. Enjoy private terraces, outdoor showers, and custom-made furniture by local artisans.',
    icon: Bed,
    image: './src/lib/images/signaturebyrockwilliam-67.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Panoramic Views', 'Organic Linens', 'Private Terrace', 'Natural Cooling'],
    details: [
      { label: 'Starting at', value: 'GH₵ 3,500 / night' },
      { label: 'Capacity', value: '2-4 Guests' },
      { label: 'Amenities', value: 'Mini-bar, Wi-Fi, Safe' }
    ],
    items: [
      { name: 'Forest Suite', price: 'GH₵ 3,500', desc: 'Cozy suite nestled in the canopy' },
      { name: 'Garden Villa', price: 'GH₵ 5,200', desc: 'Spacious villa with private garden' },
      { name: 'Mountain Loft', price: 'GH₵ 6,500', desc: 'Luxury loft with panoramic peaks view' }
    ]
  },
  {
    id: 'restaurant',
    title: 'Bar & Restaurant',
    description: 'A culinary journey through local flavors. Our farm-to-table approach ensures every dish is a celebration of the earth\'s bounty.',
    longDescription: 'Our kitchen is the heart of Terra Santa. We work exclusively with local farmers to source organic, seasonal ingredients. Our bar features a curated selection of natural wines and craft cocktails infused with herbs from our own garden.',
    icon: Utensils,
    image: './src/lib/images/1024-Bar_CRLX4838-HDR1.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1628143460432-0f0476483472?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Craft Cocktails', 'Local Ingredients', 'Alfresco Dining', 'Wine Cellar'],
    details: [
      { label: 'Hours', value: '7:00 AM - 11:00 PM' },
      { label: 'Cuisine', value: 'Organic Fusion' },
      { label: 'Signature', value: 'Terra Garden Salad' }
    ],
    items: [
      { name: 'Terra Garden Salad', price: 'GH₵ 250', desc: 'Freshly picked greens and edible flowers' },
      { name: 'Grilled Sea Bass', price: 'GH₵ 450', desc: 'Wild-caught with lemon-herb butter' },
      { name: 'Organic Ribeye', price: 'GH₵ 650', desc: 'Grass-fed beef with roasted roots' },
      { name: 'Craft Cocktails', price: 'GH₵ 200', desc: 'Botanical infusions and local spirits' }
    ]
  },
  {
    id: 'massage',
    title: 'Holistic Massage',
    description: 'Rejuvenate your body and soul with our signature treatments. Our therapists use organic oils and ancient techniques to restore balance.',
    longDescription: 'Escape to our outdoor spa pavilion, surrounded by the sounds of nature. We offer a range of treatments from deep tissue massage to aromatherapy and hot stone therapy, all designed to release tension and promote deep relaxation.',
    icon: Sparkles,
    image: './src/lib/images/maxresdefault.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Aromatherapy', 'Deep Tissue', 'Hot Stone', 'Outdoor Pavilion'],
    details: [
      { label: 'Session', value: '60 / 90 Minutes' },
      { label: 'Products', value: 'Organic Essential Oils' },
      { label: 'Setting', value: 'Private Garden Pavilion' }
    ],
    items: [
      { name: 'Deep Tissue Massage', price: 'GH₵ 1,600', desc: '60 minutes of intensive muscle release' },
      { name: 'Aromatherapy Session', price: 'GH₵ 1,500', desc: '60 minutes with essential oils' },
      { name: 'Hot Stone Therapy', price: 'GH₵ 2,200', desc: '90 minutes of deep warming relaxation' }
    ]
  }
];

const TESTIMONIALS = [
  {
    name: 'Ama Mansa',
    text: 'A truly magical experience. The attention to detail in the lodging and the quality of the food is unmatched.',
    rating: 5
  },
  {
    name: 'Kofi Boateng',
    text: 'The most relaxing weekend I\'ve had in years. The massage was transformative.',
    rating: 5
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = (service?: typeof SERVICES[0]) => {
    if (service) setSelectedService(service);
    setIsBookingOpen(true);
    setIsMenuOpen(false);
  };

  const nextImage = () => {
    if (selectedService?.gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedService.gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedService?.gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedService.gallery.length) % selectedService.gallery.length);
    }
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingOpen(false);
      setSelectedService(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        scrolled ? "glass-nav py-3 shadow-sm" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="font-serif text-2xl font-bold tracking-tighter text-terra-green group">
            TERRA <span className="text-terra-gold group-hover:text-terra-clay transition-colors">SANTA</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] hover:text-terra-gold transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-terra-gold transition-all group-hover:w-full" />
              </a>
            ))}
            <button 
              onClick={() => handleBookNow()}
              className="btn-primary py-2.5 px-7 text-[11px] uppercase tracking-widest"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-terra-green hover:bg-terra-green/5 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-terra-cream md:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="text-4xl font-serif hover:text-terra-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="p-8 border-t border-terra-green/5">
              <button 
                onClick={() => handleBookNow()}
                className="btn-primary w-full py-4 text-sm uppercase tracking-widest"
              >
                Book Your Stay
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="./src/lib/images/caption.jpg" 
            alt="Ghana Resort Landscape" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-terra-cream/10" />
        </motion.div>

        <div className="relative z-10 text-center text-terra-cream px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[0.3em] text-[9px] md:text-xs mb-6 font-bold opacity-90">
              A Sacred Sanctuary for the Senses
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-[100px] lg:text-[120px] font-serif mb-10 leading-[0.95] md:leading-[0.9] tracking-tighter">
              Rediscover <br /> <span className="italic font-light">Your Essence</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <button 
                onClick={() => handleBookNow()}
                className="btn-primary w-full sm:w-auto bg-terra-cream text-terra-green hover:bg-terra-gold hover:text-terra-cream border-none shadow-xl shadow-black/10"
              >
                Book Now
              </button>
              <a 
                href="#lodging"
                className="btn-outline w-full sm:w-auto border-terra-cream/40 text-terra-cream hover:bg-terra-cream hover:text-terra-green backdrop-blur-sm flex items-center justify-center"
              >
                View More
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-terra-cream/60 flex flex-col items-center gap-3"
        >
          <p className="text-[9px] uppercase tracking-[0.3em] font-bold">Discover More</p>
          <div className="w-px h-16 bg-gradient-to-b from-terra-cream/40 to-transparent" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-terra-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4"
          >
            Our Offerings
          </motion.p>
          <h2 className="text-5xl md:text-6xl font-serif mb-6">The Terra Experience</h2>
          <div className="w-16 h-0.5 bg-terra-gold mx-auto opacity-50" />
        </div>

        <div className="space-y-40">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "flex flex-col lg:flex-row items-center gap-16 lg:gap-32",
                index % 2 !== 0 && "lg:flex-row-reverse"
              )}
            >
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-4 py-2 px-4 bg-terra-green/5 rounded-full text-terra-gold">
                  <service.icon size={20} />
                  <span className="uppercase tracking-[0.2em] text-[9px] font-black">0{index + 1} — {service.id}</span>
                </div>
                <h3 className="text-5xl font-serif leading-tight">{service.title}</h3>
                <p className="text-xl text-terra-green/70 font-light leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-terra-gold/40 group-hover:bg-terra-gold transition-colors" />
                      <span className="text-sm font-medium text-terra-green/80">{feature}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    setSelectedService(service);
                    setCurrentImageIndex(0);
                  }}
                  className="btn-outline border-terra-green/20 hover:border-terra-green group flex items-center gap-3"
                >
                  View More
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="flex-1 relative">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <div className="absolute -inset-6 border border-terra-gold/10 rounded-[40px] -z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="rounded-[32px] shadow-2xl w-full aspect-[4/5] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                {/* Decorative element */}
                <div className={cn(
                  "absolute -bottom-10 -z-10 w-48 h-48 bg-terra-gold/5 blur-3xl rounded-full",
                  index % 2 === 0 ? "-right-10" : "-left-10"
                )} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-terra-green/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-terra-cream rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-terra-green hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="md:w-1/2 h-80 md:h-auto relative group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={selectedService.gallery?.[currentImageIndex] || selectedService.image} 
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {selectedService.gallery && selectedService.gallery.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-terra-green transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-terra-green transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                    
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedService.gallery.map((_, i) => (
                        <div 
                          key={i}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all",
                            i === currentImageIndex ? "bg-white w-4" : "bg-white/40"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-terra-green/40 to-transparent md:hidden" />
              </div>

              <div className="md:w-1/2 p-6 md:p-16 overflow-y-auto">
                <div className="flex items-center gap-3 text-terra-gold mb-4 md:mb-6">
                  <selectedService.icon size={20} className="md:w-6 md:h-6" />
                  <span className="uppercase tracking-widest text-[9px] md:text-[10px] font-black">Terra Experience</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif mb-6 md:mb-8 leading-tight">{selectedService.title}</h2>
                <p className="text-base md:text-lg text-terra-green/70 leading-relaxed mb-8 md:mb-10 font-light">
                  {selectedService.longDescription}
                </p>
                
                <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-terra-gold mb-2 md:mb-4">Pricing & Options</h4>
                  {selectedService.items?.map((item) => (
                    <div key={item.name} className="flex justify-between items-start border-b border-terra-green/5 pb-3 md:pb-4">
                      <div>
                        <p className="font-serif text-base md:text-lg">{item.name}</p>
                        <p className="text-[10px] md:text-xs text-terra-green/50">{item.desc}</p>
                      </div>
                      <span className="font-bold text-sm md:text-base text-terra-green">{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-terra-gold mb-2 md:mb-4">Quick Info</h4>
                  {selectedService.details?.map((detail) => (
                    <div key={detail.label} className="flex justify-between items-center border-b border-terra-green/5 pb-3 md:pb-4">
                      <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold opacity-40">{detail.label}</span>
                      <span className="font-serif text-base md:text-lg">{detail.value}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleBookNow(selectedService)}
                  className="btn-primary w-full py-4 text-sm uppercase tracking-widest"
                >
                  Book This Experience
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-terra-green/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-terra-cream rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl p-6 md:p-12 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-8 right-8 text-terra-green/40 hover:text-terra-green transition-colors"
              >
                <X size={24} />
              </button>

              {bookingSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-terra-gold/10 rounded-full flex items-center justify-center mx-auto text-terra-gold">
                    <Sparkles size={40} />
                  </div>
                  <h2 className="text-4xl font-serif">Booking Received</h2>
                  <p className="text-terra-green/60">Thank you for choosing Terra Santa. We will contact you shortly to confirm your reservation.</p>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h2 className="text-4xl font-serif mb-2">Book Your Experience</h2>
                    <p className="text-terra-green/50 text-sm italic">
                      {selectedService ? `Reserving: ${selectedService.title}` : "Complete the details below to begin your journey."}
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black opacity-40">Full Name</label>
                        <input required type="text" className="w-full px-5 py-4 bg-terra-green/5 border-none rounded-2xl focus:ring-2 focus:ring-terra-gold outline-none transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black opacity-40">Phone Number</label>
                        <input required type="tel" className="w-full px-5 py-4 bg-terra-green/5 border-none rounded-2xl focus:ring-2 focus:ring-terra-gold outline-none transition-all" placeholder="0591156756" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black opacity-40">Email Address</label>
                      <input required type="email" className="w-full px-5 py-4 bg-terra-green/5 border-none rounded-2xl focus:ring-2 focus:ring-terra-gold outline-none transition-all" placeholder="your@email.com" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black opacity-40">Arrival Date</label>
                        <input required type="date" className="w-full px-5 py-4 bg-terra-green/5 border-none rounded-2xl focus:ring-2 focus:ring-terra-gold outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black opacity-40">Preferred Time</label>
                        <input required type="time" className="w-full px-5 py-4 bg-terra-green/5 border-none rounded-2xl focus:ring-2 focus:ring-terra-gold outline-none transition-all" />
                      </div>
                    </div>

                    <button type="submit" className="btn-primary w-full py-5 text-sm uppercase tracking-widest mt-4">
                      Confirm Reservation Request
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Section */}
      <section id="about" className="bg-terra-green text-terra-cream py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">Rooted in Tradition, <br /> Inspired by Nature</h2>
            <p className="text-terra-cream/70 text-base md:text-lg leading-relaxed font-light">
              Terra Santa was born from a desire to create a space where guests could disconnect from the digital world and reconnect with the natural one. Our name reflects our commitment to the land—a sacred trust we honor through sustainable practices and mindful hospitality.
            </p>
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-terra-cream/10">
              <div>
                <p className="text-2xl md:text-4xl font-serif text-terra-gold">12</p>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-60">Private Suites</p>
              </div>
              <div>
                <p className="text-2xl md:text-4xl font-serif text-terra-gold">100%</p>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-60">Organic Kitchen</p>
              </div>
              <div>
                <p className="text-2xl md:text-4xl font-serif text-terra-gold">50+</p>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-60">Local Artisans</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src="./src/lib/images/DSC7487-scaled.jpg" 
              alt="Nature 1" 
              className="rounded-2xl aspect-[3/4] object-cover mt-8 md:mt-12 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src="./src/lib/images/chinese-mix.jpg" 
              alt="Nature 2" 
              className="rounded-2xl aspect-[3/4] object-cover shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-terra-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-16 italic">"A sanctuary for the modern soul."</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="space-y-4">
                <div className="flex justify-center gap-1 text-terra-gold">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic text-terra-green/80">"{t.text}"</p>
                <p className="uppercase tracking-widest text-xs font-bold">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl font-serif mb-6">Get in Touch</h2>
              <p className="text-terra-green/70">Ready to begin your journey? Contact us for reservations or special inquiries.</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-terra-green/5 flex items-center justify-center text-terra-gold">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-50">Location</p>
                    <a 
                      href="https://www.google.com/maps?q=5.711341903497965,-0.17314146981624945" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium hover:text-terra-gold transition-colors text-sm"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
                <div className="w-full h-48 rounded-2xl overflow-hidden shadow-lg">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.804494567891!2d-0.17314146981624945!3d5.711341903497965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5wrAsLrAsLXgsLjgsLgg4LCo4LCw4LGN!5e0!3m2!1sen!2sgh!4v1234567890" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title="Terra Santa Location"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-terra-green/5 flex items-center justify-center text-terra-gold">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-50">Phone</p>
                  <p className="font-medium">0591156756</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-terra-green/5 flex items-center justify-center text-terra-gold">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-50">Email</p>
                  <p className="font-medium">terrasantalodgings@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-terra-green/20 flex items-center justify-center hover:bg-terra-green hover:text-terra-cream transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-terra-green/20 flex items-center justify-center hover:bg-terra-green hover:text-terra-cream transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <form className="bg-white p-10 rounded-3xl shadow-xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-50">First Name</label>
                <input type="text" className="w-full px-4 py-3 bg-terra-cream/50 border-none rounded-xl focus:ring-2 focus:ring-terra-gold outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-50">Last Name</label>
                <input type="text" className="w-full px-4 py-3 bg-terra-cream/50 border-none rounded-xl focus:ring-2 focus:ring-terra-gold outline-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold opacity-50">Email Address</label>
              <input type="email" className="w-full px-4 py-3 bg-terra-cream/50 border-none rounded-xl focus:ring-2 focus:ring-terra-gold outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold opacity-50">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-terra-cream/50 border-none rounded-xl focus:ring-2 focus:ring-terra-gold outline-none resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full py-4">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-terra-green text-terra-cream/40 py-12 px-6 border-t border-terra-cream/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm">© 2026 Terra Santa Eco-Resort. All rights reserved.</p>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-terra-gold">Privacy Policy</a>
            <a href="#" className="hover:text-terra-gold">Terms of Service</a>
            <a href="#" className="hover:text-terra-gold">Careers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
