import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';

const ContactMe = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Title animation
        gsap.fromTo(
            titleRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        // Animate contact cards
        gsap.fromTo(
            ".contact-card",
            { y: 30, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            }
        );
    }, []);

    const contacts = [
        {
            icon: <FiMail className="w-6 h-6" />,
            title: "Email",
            info: "hollupathirageisuru@gmail.com",
            color: "from-purple-500 to-pink-500",
            link: "mailto:hollupathirageisuru@gmail.com"
        },
        {
            icon: <FiPhone className="w-6 h-6" />,
            title: "Phone",
            info: "+358 41 740 7206",
            color: "from-cyan-500 to-blue-500",
            link: "tel:+358441234567"
        },
        {
            icon: <FiMapPin className="w-6 h-6" />,
            title: "Location",
            info: "Lahti, Finland",
            color: "from-emerald-500 to-teal-500",
            link: "https://maps.app.goo.gl/VeSBkVBohf1jzSoy8"
        }
    ];

    const socials = [
        { icon: <FiGithub />, link: "https://github.com/isurukaldera?tab=repositories", color: "hover:bg-gray-800 hover:text-white" },
        { icon: <FiLinkedin />, link: "https://www.linkedin.com/in/isuru-kaldera/", color: "hover:bg-blue-600 hover:text-white" },
    ];

    return (
        <section id="contact"
            ref={sectionRef}
            className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-purple-950/30 to-black"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black"></div>
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 opacity-0"
                    >
                        Let's Connect
                    </h2>
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent to-purple-500"></div>
                        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"></div>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                    </div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Have a work in mind or just want to chat? I'm always open to discussing new opportunities.
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                    {contacts.map((contact, index) => (
                        <a
                            key={index}
                            href={contact.link}
                            className="contact-card opacity-0 group"
                        >
                            <div className="bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-purple-500/50 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                                <div className="flex flex-col items-center text-center">
                                    {/* Icon with gradient */}
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${contact.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="text-white">
                                            {contact.icon}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-3">
                                        {contact.title}
                                    </h3>
                                    
                                    <p className="text-gray-300 group-hover:text-cyan-300 transition-colors duration-300">
                                        {contact.info}
                                    </p>
                                    
                                    {/* Hover line effect */}
                                    <div className="w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mt-4 transition-all duration-300"></div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Social Links */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-8">
                        Find me on
                    </h3>
                    
                    <div className="flex justify-center gap-6 mb-12">
                        {socials.map((social, index) => (
                            <a
                                key={index}
                                href={social.link}
                                className={`p-4 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
                            >
                                <span className="text-xl">
                                    {social.icon}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    
                </div>

                {/* Footer Note */}
                <div className="text-center mt-16 pt-8 border-t border-gray-800/50">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Isuru Hollupathirage. All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ContactMe;