import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroBg from '../assets/hero-bg.png'

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative h-screen -mt-[73px] flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Cream gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(250,248,245,0.96) 0%, rgba(250,248,245,0.88) 38%, rgba(250,248,245,0.45) 65%, rgba(250,248,245,0.15) 100%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 px-6 md:px-12 pt-[73px] max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-oswald text-[40px] md:text-[68px] font-bold leading-[1.05] tracking-[0.02em] text-text-primary mb-5"
        >
          NETWORK SECURITY<br />MADE SIMPLE.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-text-body text-[17px] max-w-[480px] leading-relaxed mb-9"
        >
          Professional security for your home network and small business — so you can focus on what matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-4"
        >
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-accent text-white font-oswald text-[16px] font-semibold tracking-[0.1em] rounded-md hover:bg-green-600 transition-colors"
          >
            GET PROTECTED
          </Link>
          <Link
            to="/services"
            className="px-8 py-3.5 border-[1.5px] border-border-button text-text-body font-oswald text-[16px] tracking-[0.1em] rounded-md hover:border-text-muted transition-colors"
          >
            OUR SERVICES
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
