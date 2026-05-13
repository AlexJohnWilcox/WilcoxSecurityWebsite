import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const trustSignals = [
  { value: '3+', label: 'Services Offered' },
  { value: '100%', label: 'Hands-On Approach' },
  { value: 'Local', label: 'Community Focused' },
]

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.28 }}
      className="px-6 py-16 md:px-12 md:py-20"
    >
      <h1 className="font-oswald text-[45px] font-bold tracking-[0.02em] text-text-primary mb-2">
        ABOUT
      </h1>
      <div className="w-12 h-[3px] bg-accent rounded-sm mb-10" />

      <div className="flex flex-col md:flex-row gap-12">
        {/* Bio */}
        <div className="flex-1">
          <h2 className="font-oswald text-[27px] font-semibold text-text-primary mb-4">
            Security Engineer.<br />Problem Solver.
          </h2>
          <p className="text-text-body text-[18px] leading-[1.7] mb-4">
            I'm Alex Wilcox — focused on making network and device security
            accessible to everyone, not just enterprise IT teams.
          </p>
          <p className="text-text-body text-[18px] leading-[1.7] mb-8">
            Whether it's your home network or your first office setup, I bring the same rigor
            and attention to detail that protects large organizations — scaled to fit your needs
            and budget.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-5">
            {trustSignals.map(({ value, label }) => (
              <motion.div
                key={label}
                {...fadeUp}
                className="text-center px-5 py-4 bg-highlight-bg rounded-lg"
              >
                <div className="font-oswald text-[27px] font-bold text-accent">{value}</div>
                <div className="text-sm text-text-body mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo placeholder */}
        <div className="md:w-[280px] flex items-center justify-center">
          <div className="w-full h-[340px] bg-[#f0ede8] rounded-xl flex items-center justify-center">
            <span className="font-oswald text-[16px] tracking-[0.1em] text-text-faint text-center">
              YOUR PHOTO
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
