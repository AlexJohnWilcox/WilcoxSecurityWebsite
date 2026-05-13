import { motion } from 'framer-motion'

const services = [
  {
    title: 'Network Hardening',
    description: 'Secure your router, set up firewalls, segment your network, and lock down access points.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="#22c55e" strokeWidth="2" />
        <circle cx="11" cy="11" r="3.5" fill="#22c55e" />
      </svg>
    ),
  },
  {
    title: 'Device Hardening',
    description: 'Patch, configure, and lock down every device on your network — laptops, phones, smart home, and more.',
    icon: (
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
        <rect x="1" y="1" width="16" height="20" rx="3" stroke="#22c55e" strokeWidth="2" />
        <line x1="5" y1="6" x2="13" y2="6" stroke="#22c55e" strokeWidth="1.5" />
        <line x1="5" y1="10" x2="11" y2="10" stroke="#22c55e" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Security Assessments',
    description: 'A full evaluation of your current setup — what\'s working, what\'s vulnerable, and what to fix first.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="11" y="1" width="14" height="14" rx="3" transform="rotate(45 11 1)" stroke="#22c55e" strokeWidth="2" />
      </svg>
    ),
  },
]

export function Services() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.28 }}
      className="px-6 py-16 md:px-12 md:py-20"
    >
      <h1 className="font-oswald text-[45px] font-bold tracking-[0.02em] text-text-primary mb-2">
        SERVICES
      </h1>
      <div className="w-12 h-[3px] bg-accent rounded-sm mb-3" />
      <p className="text-text-body text-[18px] mb-10">
        Security solutions tailored to your needs — no jargon, no complexity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map(({ title, description, icon }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-white border border-border rounded-xl p-7 hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <div className="w-11 h-11 bg-highlight-bg rounded-lg flex items-center justify-center mb-4">
              {icon}
            </div>
            <h3 className="font-oswald text-[21px] font-semibold text-text-primary mb-2">
              {title}
            </h3>
            <p className="text-text-muted text-[16px] leading-relaxed mb-4">
              {description}
            </p>
            <span className="font-oswald text-[15px] text-accent tracking-[0.08em] cursor-pointer hover:underline">
              LEARN MORE →
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
