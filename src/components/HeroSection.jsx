import { motion } from "framer-motion";
import RotatingText from './RotatingText'; 
import Spline from '@splinetool/react-spline';


const HeroSection = () => {
  const professions = [
    'Software Architecture',
    'Web Developer', 
    'Digital Twin Developer',
    'Software Engineer',
    'Game Developer'
  ];

  return (
    <section className="h-screen bg-gradient-to-b from-black to-violet-950 flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative">
      <div className="z-40 xl:mb-0 mb-[20%]">
        <motion.h1
        initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 40, delay: 1.3, damping: 25 }}
          className="text-3xl md:text-5xl lg:text-5xl font-bold z-10 mb-6"
        >
          Hi, I'm Isuru Hollupathirage
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 40, delay: 1.5, damping: 25 }}
          className="text-2xl md:text-4xl lg:text-4xl font-bold z-10 mb-6"
        >
          Passionate{' '}
          <RotatingText
            texts={professions}
            mainClassName="inline-flex px-2 py-1 bg-[#00f7ff] text-black overflow-hidden rounded-lg"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.035}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={4000}
          />
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 40, delay: 1.8, damping: 25 }}
          className="text-xl md:text-0.5xl lg:text-0.5xl max-w-2xl text-purple-200"
        >
          A passionate developer with experience across front end and back end technologies. I am seeking internship or junior level opportunities to grow in web development, mobile applications, game development, digital twin solutions, and user experience, while contributing to innovative, scalable, and user focused digital products.
        </motion.p>
      </div>
      {/* Spine 3D */}
       <Spline className="absolute xl:right-[-25%] right-0 top-[-28%] lg:top-0" scene="https://prod.spline.design/l4hOAztVCsXVIOJp/scene.splinecode" />
    </section>
  );
};

export default HeroSection;