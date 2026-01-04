import { motion, AnimatePresence } from "framer-motion";
import GooeyNav from './GooeyNav';
import {FiGithub, FiLinkedin, FiMenu, FiX} from 'react-icons/fi';
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const openContactForm = () => {
    setContactFormOpen(true);
    setSubmitStatus('');
  }

  const closeContactForm = () => {
    setContactFormOpen(false);
    setFormData({ name: '', email: '', message: '' });
    setSubmitStatus('');
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      // Send to Netlify Forms
      const formPayload = new URLSearchParams();
      formPayload.append('form-name', 'contact');
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('message', formData.message);
      
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formPayload.toString()
      });
      
      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Auto close form after 2 seconds
      setTimeout(() => {
        closeContactForm();
      }, 2000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const items = [
    { label: "Home", href: "#", onClick: () => scrollToSection("home") },
    { label: "About", href: "#", onClick: () => scrollToSection("about") },
    { label: "Project", href: "#", onClick: () => scrollToSection("projects") },
    { label: "Contact", href: "#", onClick: () => scrollToSection("contact") },
  ];

  return (
    <header className="absolute w-full z-50 transition-all duration-300">
      <div className="container mx-auto lg:px-8 flex items-center justify-between px-4 sm:px-4 mt-2 h-16">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
          className="flex items-center"
        >
          <div className="h-10 w-10 ml-0 rounded-xl overflow-hidden flex items-center justify-center mr-3 md:h-16 md:w-16">
            <img 
              src="/public/Logo/isuru.png"
              alt="Your Name" 
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Desktop Navigation with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.5,
            duration: 1.2,
          }}
          className="lg:flex hidden items-center h-full"
        >
          <div className="h-full flex items-center">
            <GooeyNav
              items={items}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>
        </motion.div>

        {/* Desktop Social Icons and Hire Me Button */}
        <div className="md:flex hidden items-center space-x-4">
          <motion.a 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{delay: 1.3, duration: 0.8}}
            className="text-grey-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-600 transition-colors duration-300"   
            href="https://github.com/isurukaldera?tab=repositories"
          >
            <FiGithub className="w-5 h-5"/>
          </motion.a>
          
          <motion.a 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{delay: 1.3, duration: 0.8}}
            className="text-grey-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-600 transition-colors duration-300"   
            href="https://www.linkedin.com/in/isuru-kaldera/"
          >
            <FiLinkedin className="w-5 h-5"/>
          </motion.a>

          {/* HireMe */}
          <motion.button
            onClick={openContactForm}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{delay: 1.6, duration: 0.8, type: "spring", stiffness: 100, damping: 15}}
            className="ml-8 px-3 py-0.3 rounded-xl bg-gradient-to-r from-white to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-500"
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button
            whileTap={{scale:0.7}}
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-300"
          >
            {isOpen ? <FiX className="h-6 w-6"/> : <FiMenu className="h-6 w-6"/>}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 space-y-5"
      >
        <nav className="flex flex-col space-y-3 pt-4">
          <a 
            onClick={() => {
              scrollToSection("home");
              toggleMenu();
            }}  
            className="text-gray-700 dark:text-gray-300 font-medium py-2 hover:text-violet-600 dark:hover:text-violet-600 transition-colors" 
            href="#"
          >
            Home
          </a>
          <a 
            onClick={() => {
              scrollToSection("about");
              toggleMenu();
            }}  
            className="text-gray-700 dark:text-gray-300 font-medium py-2 hover:text-violet-600 dark:hover:text-violet-600 transition-colors" 
            href="#"
          >
            About
          </a>
          <a 
            onClick={() => {
              scrollToSection("projects");
              toggleMenu();
            }}  
            className="text-gray-700 dark:text-gray-300 font-medium py-2 hover:text-violet-600 dark:hover:text-violet-600 transition-colors" 
            href="#"
          >
            Project
          </a>
          <a 
            onClick={() => {
              scrollToSection("contact");
              toggleMenu();
            }}  
            className="text-gray-700 dark:text-gray-300 font-medium py-2 hover:text-violet-600 dark:hover:text-violet-600 transition-colors" 
            href="#"
          >
            Contact
          </a>
        </nav>
        
        <div className="pt-4 pb-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-5">
            <a href="https://github.com/isurukaldera?tab=repositories" className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-600">
              <FiGithub className="w-5 h-5"/>
            </a>
            <a href="https://www.linkedin.com/in/isuru-kaldera/" className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-600">
              <FiLinkedin className="w-5 h-5"/>
            </a>
          </div>
          <button
            onClick={() => {
              toggleMenu();
              openContactForm();
            }}
            className="mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 text-white font-bold hover:from-violet-700 hover:to-purple-700 transition-all"
          >
            Hire Me
          </button>
        </div>
      </motion.div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {contactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 30 }}
              className="bg-gray-800 dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">
                  Get In Touch
                </h1>
                <button 
                  onClick={closeContactForm}
                  className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  <FiX className="w-6 h-6 text-gray-300 font-bold hover:text-white"/>
                </button>
              </div>

              {/* Contact Form Fields */}
              <form 
                className="space-y-4" 
                onSubmit={handleSubmit}
                name="contact"
                method="POST"
                data-netlify="true"
              >
                {/* Hidden Netlify Field */}
                <input type="hidden" name="form-name" value="contact" />
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white placeholder-gray-400"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white placeholder-gray-400"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Message</label>
                  <textarea
                    rows="4"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can I help you?"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white placeholder-gray-400 resize-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
                    <p className="text-green-400 text-sm">✓ Message sent successfully! I'll get back to you soon.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
                    <p className="text-red-400 text-sm">✗ Something went wrong. Please try again.</p>
                  </div>
                )}
                
                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? {scale: 1.03 } : {}}
                    whileTap={!isSubmitting ? {scale: 0.97 } : {}}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 text-white font-bold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;