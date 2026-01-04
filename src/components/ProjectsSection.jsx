import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const projectImages = [
  {
    id: 1,
    title: "FINJOBS",
    description: "A job portal that allows users to view job listings, apply for jobs, and manage applications",
    imageSrc: "/logo/project-1.png",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    github: "https://github.com/isurukaldera/FinJobs?tab=readme-ov-file",
    live: "https://finjobs.onrender.com",
    color: "from-purple-600 to-cyan-500"
  },
  {
    id: 2,
    title: "HAUNTED ESCAPE",
    description: "A horror game with one stage for university project using Unity & Blender",
    imageSrc: "/logo/project-2.png",
    tags: ["Unity", "C#", "WebGL", "Blender"],
    github: "https://github.com/isurukaldera/Haunted-Escape",
    live: "https://hollupathirage.itch.io/haunted-escape",
    color: "from-blue-600 to-emerald-500"
  },
  {
    id: 3,
    title: "RETAIL DIGITAL TWIN",
    description: "A functional digital twin prototype for retail inventory management developed as part of Master's thesis research",
    imageSrc: "/logo/project-3.png",
    tags: ["Unity", "C#", "SQL", "Python", "FastAPI"],
    github: "https://github.com/isurukaldera/ThesisDTPrototype",
    live: "https://lutpub.lut.fi/bitstream/handle/10024/170818/Mastersthesis_Hollupathirage_Isuru.pdf?sequence=1&isAllowed=y",
    color: "from-rose-600 to-orange-500"
  },
  {
    id: 4,
    title: "POSH E-COMMERCE",
    description: "Responsive front-end e-commerce website developed using HTML and CSS",
    imageSrc: "/logo/project-4.png",
    tags: ["HTML", "CSS"],
    github: "https://github.com/isurukaldera/Fully-Responsive-Posh-Ecommerce-Website",
    live: "https://poshecommerce.netlify.app/",
    color: "from-violet-600 to-pink-500"
  },
  {
    id: 5,
    title: "E-COMMERCE FRONT-END",
    description: "Static front-end e-commerce website focusing on responsive design and accessibility",
    imageSrc: "/logo/project-5.png",
    tags: ["HTML", "CSS"],
    github: "https://github.com/isurukaldera/Front-End-2024-25",
    live: "https://fancy-mooncake-103b18.netlify.app/products",
    color: "from-indigo-600 to-cyan-400"
  },
  {
    id: 6,
    title: "FOOD DELIVERY APP",
    description: "Android-based food delivery application developed using Java and Firebase",
    imageSrc: "/logo/project-6.png",
    tags: ["Android Studio", "Java"],
    github: "https://github.com/isurukaldera/Android-Application-Food-Deilivry-App-?tab=readme-ov-file",
    live: "#",
    color: "from-indigo-600 to-cyan-400"
  },
]

const ProjectsSection = () => {
  const sectionsRef = useRef(null)
  const titleRef = useRef(null)
  const titleLineRef = useRef(null)
  const triggerRef = useRef(null)
  const horizontalRef = useRef(null)
  const contentRef = useRef(null)
  const [currentProject, setCurrentProject] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Touch events for mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      setIsDragging(true)
      setStartX(e.touches[0].pageX - horizontalRef.current.offsetLeft)
      setScrollLeft(horizontalRef.current.scrollLeft)
    }

    const handleTouchMove = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.touches[0].pageX - horizontalRef.current.offsetLeft
      const walk = (x - startX) * 2
      horizontalRef.current.scrollLeft = scrollLeft - walk
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
    }

    // Mouse drag events for desktop
    const handleMouseDown = (e) => {
      setIsDragging(true)
      setStartX(e.pageX - horizontalRef.current.offsetLeft)
      setScrollLeft(horizontalRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - horizontalRef.current.offsetLeft
      const walk = (x - startX) * 2
      horizontalRef.current.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const container = horizontalRef.current
    if (container) {
      // Keep touch events
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleTouchEnd)
      
      // Keep mouse drag events
      container.addEventListener('mousedown', handleMouseDown)
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseup', handleMouseUp)
      container.addEventListener('mouseleave', handleMouseUp)

      return () => {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
        container.removeEventListener('mousedown', handleMouseDown)
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseup', handleMouseUp)
        container.removeEventListener('mouseleave', handleMouseUp)
      }
    }
  }, [isDragging, startX, scrollLeft])

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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
          trigger: sectionsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Title line animation
    gsap.fromTo(
      titleLineRef.current,
      { width: "0%", opacity: 0 },
      {
        width: "100%",
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Content fade in
    gsap.fromTo(
      contentRef.current,
      { 
        y: 30,
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionsRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        }
      }
    )

    // Background parallax effect
    gsap.fromTo(
      sectionsRef.current,
      {  
        backgroundPosition: "50% 0%"  
      },
      {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionsRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    )

    // Individual project animations
    const panels = gsap.utils.toArray(".project-card")
    panels.forEach((panel, i) => {
      gsap.fromTo(panel,
        { 
          scale: 0.95,
          y: 50,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Hover animation only on desktop
      if (window.innerWidth > 768) {
        panel.addEventListener('mouseenter', () => {
          gsap.to(panel, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          })
        })

        panel.addEventListener('mouseleave', () => {
          gsap.to(panel, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Navigation functions
  const scrollToProject = (index) => {
    if (horizontalRef.current) {
      const projectWidth = horizontalRef.current.clientWidth
      horizontalRef.current.scrollTo({
        left: index * projectWidth,
        behavior: 'smooth'
      })
      setCurrentProject(index)
    }
  }

  // Handle scroll events for updating current project
  useEffect(() => {
    const handleScroll = () => {
      if (horizontalRef.current) {
        const scrollPercentage = horizontalRef.current.scrollLeft / 
          (horizontalRef.current.scrollWidth - horizontalRef.current.clientWidth)
        const newProject = Math.round(scrollPercentage * (projectImages.length - 1))
        setCurrentProject(newProject)
      }
    }

    const container = horizontalRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      ref={sectionsRef}
      id="projects"
      className="relative py-12 md:py-20 min-h-screen bg-gradient-to-b from-black via-violet-950/10 to-black overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 md:w-96 md:h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 md:w-96 md:h-96 bg-cyan-600/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 mb-8 md:mb-12 relative z-10">
        <div className="text-center mb-8">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-6 opacity-0"
          >
            Featured Projects
          </h2>
          
          <div className="flex justify-center items-center gap-3 md:gap-4 mb-6">
            <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-transparent to-purple-500"></div>
            <div
              ref={titleLineRef}
              className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 rounded-full"
            ></div>
            <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Main horizontal scrolling container */}
      <div 
        ref={horizontalRef}
        className="relative overflow-x-auto overflow-y-hidden h-[500px] md:h-[70vh] lg:h-[80vh] snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          ref={contentRef}
          className="flex h-full min-w-max px-4 md:px-8"
        >
          {projectImages.map((project) => (
            <div
              key={project.id}
              className="project-card flex-shrink-0 w-[85vw] md:w-[90vw] h-full px-2 md:px-4 snap-center"
            >
              <div className="relative h-full flex items-center">
                <div className="relative w-full max-w-6xl mx-auto">
                  {/* Mobile Layout (Stacked) */}
                  <div className="md:hidden space-y-4">
                    {/* Image Container */}
                    <div className="relative group">
                      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-violet-900/20 to-black/40 backdrop-blur-sm">
                        <img
                          className="w-full h-40 object-cover transition-transform duration-500"
                          src={project.imageSrc}
                          alt={project.title}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      
                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-semibold text-cyan-400 px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                          #{project.id}
                        </span>
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="space-y-3 px-1">
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/5 text-gray-300 rounded-lg text-xs font-medium border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-white/5 text-gray-300 rounded-lg text-xs font-medium border border-white/10">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-900 to-black text-gray-300 border border-gray-800"
                        >
                          <FiGithub className="w-4 h-4" />
                          <span className="text-xs font-medium">Code</span>
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          <span className="text-xs font-medium">Live</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout (Grid) */}
                  <div className="hidden md:grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                    {/* Image Container */}
                    <div className="relative group">
                      <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900/20 to-black/40 backdrop-blur-sm shadow-xl lg:shadow-2xl">
                        <img
                          className="w-full h-56 lg:h-64 xl:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                          src={project.imageSrc}
                          alt={project.title}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-3 -left-3 w-6 h-6 lg:w-8 lg:h-8 border-t-2 border-l-2 border-purple-500/50 rounded-tl-lg" />
                      <div className="absolute -bottom-3 -right-3 w-6 h-6 lg:w-8 lg:h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
                    </div>

                    {/* Content Container */}
                    <div className="space-y-4 lg:space-y-6">
                      <div className="flex items-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                        <span className="text-xs lg:text-sm font-semibold text-cyan-400 px-2 lg:px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                          Project #{project.id}
                        </span>
                        <div className="w-12 lg:w-16 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-300 text-sm lg:text-base xl:text-lg leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 lg:gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 lg:px-3 py-1 lg:py-1.5 bg-white/5 text-gray-300 rounded-full text-xs lg:text-sm font-medium border border-white/10 hover:bg-white/10 hover:text-white hover:border-purple-500/30 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-3 lg:gap-4 pt-3 lg:pt-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 lg:gap-2 px-3 lg:px-5 py-2 lg:py-3 rounded-lg bg-gradient-to-r from-gray-900 to-black text-gray-300 hover:text-white border border-gray-800 hover:border-purple-500/50 transition-all duration-300 group"
                        >
                          <FiGithub className="w-4 h-4 lg:w-5 lg:h-5 group-hover:text-purple-400 transition-colors" />
                          <span className="text-sm lg:text-base font-medium">Code</span>
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 lg:gap-2 px-3 lg:px-5 py-2 lg:py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                        >
                          <FiExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                          <span className="text-sm lg:text-base font-medium">Live Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots for mobile */}
      <div className="md:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-20">
        <div className="flex gap-2 mb-2">
          {projectImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentProject 
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 scale-125' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium text-cyan-300">
            {currentProject + 1} / {projectImages.length}
          </span>
        </div>
      </div>

      {/* Navigation dots for desktop */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-20">
        <div className="flex gap-3 mb-3">
          {projectImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentProject 
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 scale-125' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium text-cyan-300">
            {currentProject + 1} / {projectImages.length}
          </span>
        </div>
      </div>

      {/* Custom scrollbar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-full overflow-hidden z-10">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full transition-all duration-300"
          style={{ 
            width: `${((currentProject + 1) / projectImages.length) * 100}%` 
          }}
        />
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default ProjectsSection