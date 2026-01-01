import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { MdOutlinePreview } from 'react-icons/md'

const projectImages = [
  {
    id: 1,
    title: "Digital Twin Platform",
    description: "Real-time industrial monitoring system with IoT integration and 3D visualization",
    imageSrc: "/public/logo/project-1.png",
    tags: ["React", "WebGL", "Node.js", "MongoDB", "IoT"],
    github: "#",
    live: "#",
    color: "from-purple-600 to-cyan-500"
  },
  {
    id: 2,
    title: "E-Commerce Analytics",
    description: "Advanced data visualization dashboard for retail insights and predictive analytics",
    imageSrc: "/public/logo/project-2.png",
    tags: ["Next.js", "D3.js", "Python", "PostgreSQL", "AWS"],
    github: "#",
    live: "#",
    color: "from-blue-600 to-emerald-500"
  },
  {
    id: 3,
    title: "AI Assistant App",
    description: "Voice-controlled productivity assistant with natural language processing",
    imageSrc: "/public/logo/project-3.png",
    tags: ["React Native", "OpenAI", "Firebase", "Node.js"],
    github: "#",
    live: "#",
    color: "from-rose-600 to-orange-500"
  },
  {
    id: 4,
    title: "AR Navigation System",
    description: "Augmented reality indoor navigation with real-time positioning",
    imageSrc: "/public/logo/project-4.png",
    tags: ["Unity", "ARKit", "C#", "Blender", "AR"],
    github: "#",
    live: "#",
    color: "from-violet-600 to-pink-500"
  },
  {
    id: 5,
    title: "Cloud Architecture",
    description: "Scalable microservices deployment on AWS with CI/CD pipeline",
    imageSrc: "/public/logo/project-5.png",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    github: "#",
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

  // Mouse wheel horizontal scrolling
  useEffect(() => {
    const handleWheel = (e) => {
      if (horizontalRef.current && sectionsRef.current) {
        const rect = sectionsRef.current.getBoundingClientRect()
        // Only intercept wheel events when mouse is over the projects section
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          e.preventDefault()
          horizontalRef.current.scrollLeft += e.deltaY * 1.5
          
          // Update current project based on scroll position
          const scrollPercentage = horizontalRef.current.scrollLeft / 
            (horizontalRef.current.scrollWidth - horizontalRef.current.clientWidth)
          const newProject = Math.round(scrollPercentage * (projectImages.length - 1))
          setCurrentProject(newProject)
        }
      }
    }

    // Touch events for mobile
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
      // Add wheel event listener
      container.addEventListener('wheel', handleWheel, { passive: false })
      
      // Touch events for mobile
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleTouchEnd)
      
      // Mouse drag events for desktop
      container.addEventListener('mousedown', handleMouseDown)
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseup', handleMouseUp)
      container.addEventListener('mouseleave', handleMouseUp)

      return () => {
        container.removeEventListener('wheel', handleWheel)
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
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
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
        duration: 1.5,
        ease: "power3.inOut",
        delay: 0.3,
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
        y: 50,
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
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
          scale: 0.9,
          y: 100,
          opacity: 0,
          rotationY: 15
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Hover animation
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
      className="relative py-20 min-h-screen bg-gradient-to-b from-black via-violet-950/10 to-black overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 mb-12 relative z-10">
        <div className="text-center mb-8">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 opacity-0 tracking-tight"
          >
            Featured Projects
          </h2>
          
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-purple-500"></div>
            <div
              ref={titleLineRef}
              className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 rounded-full"
            ></div>
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Main horizontal scrolling container */}
      <div 
        ref={horizontalRef}
        className="relative overflow-x-auto overflow-y-hidden h-[70vh] lg:h-[80vh] snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div 
          ref={contentRef}
          className="flex h-full min-w-max px-4 lg:px-8"
        >
          {projectImages.map((project) => (
            <div
              key={project.id}
              className="project-card flex-shrink-0 w-screen lg:w-[90vw] h-full px-4 snap-center"
            >
              <div className="relative h-full flex items-center">
                <div className="relative w-full max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Image Container */}
                    <div className="relative group">
                      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900/20 to-black/40 backdrop-blur-sm shadow-2xl">
                        <img
                          className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                          src={project.imageSrc}
                          alt={project.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-purple-500/50 rounded-tl-lg" />
                      <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
                    </div>

                    {/* Content Container */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                          Project #{project.id}
                        </span>
                        <div className="w-16 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-full text-sm font-medium border border-white/10 hover:bg-white/10 hover:text-white hover:border-purple-500/30 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4 pt-4">
                        <a
                          href={project.github}
                          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-gray-900 to-black text-gray-300 hover:text-white border border-gray-800 hover:border-purple-500/50 transition-all duration-300 group"
                        >
                          <FiGithub className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
                          <span className="font-medium">Code</span>
                        </a>
                        <a
                          href={project.live}
                          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
                        >
                          <FiExternalLink className="w-5 h-5" />
                          <span className="font-medium">Live Demo</span>
                        </a>
                        <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group">
                          <MdOutlinePreview className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                          <span className="font-medium">Preview</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal navigation indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-20">
        {/* Navigation dots */}
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

        {/* Simple counter */}
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
      `}</style>
    </section>
  )
}

export default ProjectsSection