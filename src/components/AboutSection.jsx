import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const AboutSection = () => {

    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const introRef = useRef(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // Title animation
        gsap.fromTo(
            titleRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 30%",
                    toggleActions: "play none none reverse",
                }
            }
        )

        // Intro text animation
        gsap.fromTo(
            introRef.current,
            { y: 50, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "top 20%",
                    toggleActions: "play none none reverse",
                }
            }
        )
    }, [])

    return (
        <section
            ref={sectionRef}
            className="min-h-screen relative overflow-hidden bg-gradient-to-b from-violet-950 via-violet-900 to-black"
        >
            <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
                {/* Title Section - Reduced size */}
                <div className="text-center mb-6 md:mb-10">
                    <h1
                        ref={titleRef}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white opacity-0 mb-4 tracking-tight"
                    >
                        About Me
                    </h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full opacity-80"></div>
                </div>

                {/* Content Section - Wider container */}
                <div className="w-full max-w-7xl px-4 md:px-6">
                    <div 
                        ref={introRef}
                        className="bg-gradient-to-br from-violet-900/30 to-black/40 backdrop-blur-sm border border-violet-700/30 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl opacity-0 w-full"
                    >
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                    Software Engineer & Digital Solutions Developer
                                </h3>
                                <p className="text-purple-300 text-sm">
                                    LUT University • Finland
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                                I am a Software Engineering postgraduate specializing in 
                                <span className="font-semibold text-cyan-300"> Digital Systems and Service Development </span>
                                at LUT University, currently based in Finland.
                            </p>

                            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                                With hands-on experience in 
                                <span className="font-semibold text-purple-300"> full-stack development, software architecture, and digital twin solutions</span>, 
                                I focus on creating intuitive, user-centered applications across web, mobile, and interactive systems.
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-violet-800/50">
                            <h4 className="text-base md:text-lg font-bold text-white mb-3">Technical Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Node.js', 'Docker', 'MongoDB', 'C#', 'Python', 'Unity', 'AWS', 'TypeScript', 'GraphQL', 'Figma', 'Blender', 'API', 'Git', 'Tailwind CSS', 'CSS', 'HTML', 'JavaScript', 'AI', 'CNN', 'Resnet', 'SMTP', 'WMA','SMA','SME', 'RFID'].map((tech, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1.5 bg-violet-900/50 text-cyan-200 rounded-full text-xs md:text-sm font-medium border border-violet-700/50 hover:bg-violet-800/70 transition-colors duration-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-violet-800/50">
                            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                                With industry experience in both development and quality assurance, 
                                I bring a detail-oriented approach to delivering{' '}
                                <span className="font-semibold text-purple-300">scalable, reliable, and engaging digital solutions</span>{' '}
                                from system design through to deployment.
                            </p>
                        </div>
                    </div>

                    {/* Decorative elements - positioned outside the container */}
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection