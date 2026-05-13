import { useState } from 'react'
import { motion } from 'framer-motion'

const serviceOptions = [
  'Select a service...',
  'Network Hardening',
  'Device Hardening',
  'Security Assessment',
  'Not sure yet',
]

const contactInfo = [
  { label: 'EMAIL', value: 'alexjwilcox@proton.me' },
  { label: 'LOCATION', value: 'McLean, VA' },
  { label: 'RESPONSE TIME', value: 'Within 24 hours' },
]

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.28 }}
      className="px-6 py-16 md:px-12 md:py-20"
    >
      <h1 className="font-oswald text-[45px] font-bold tracking-[0.02em] text-text-primary mb-2">
        CONTACT
      </h1>
      <div className="w-12 h-[3px] bg-accent rounded-sm mb-3" />
      <p className="text-text-body text-[18px] mb-10">
        Have a question or ready to get started? Reach out — I'd love to hear from you.
      </p>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="mb-5">
            <label className="block font-oswald text-[14px] tracking-[0.06em] text-text-primary mb-1.5">
              NAME
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-3.5 bg-white border border-border rounded-lg text-[16px] text-text-primary font-inter outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="mb-5">
            <label className="block font-oswald text-[14px] tracking-[0.06em] text-text-primary mb-1.5">
              EMAIL
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              className="w-full px-4 py-3.5 bg-white border border-border rounded-lg text-[16px] text-text-primary font-inter outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="mb-5">
            <label className="block font-oswald text-[14px] tracking-[0.06em] text-text-primary mb-1.5">
              SERVICE INTERESTED IN
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-white border border-border rounded-lg text-[16px] text-text-muted font-inter outline-none focus:border-accent transition-colors appearance-none"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt === serviceOptions[0] ? '' : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-oswald text-[14px] tracking-[0.06em] text-text-primary mb-1.5">
              MESSAGE
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your setup or what you need help with..."
              rows={4}
              className="w-full px-4 py-3.5 bg-white border border-border rounded-lg text-[16px] text-text-primary font-inter outline-none focus:border-accent transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-9 py-3.5 bg-accent text-white font-oswald text-[16px] font-semibold tracking-[0.1em] rounded-md hover:bg-green-600 transition-colors"
          >
            SEND MESSAGE
          </button>
        </form>

        {/* Sidebar */}
        <div className="md:w-[280px]">
          {contactInfo.map(({ label, value }) => (
            <div key={label} className="mb-8">
              <div className="font-oswald text-[15px] tracking-[0.08em] text-accent mb-2">
                {label}
              </div>
              <p className="text-text-primary text-[17px]">{value}</p>
            </div>
          ))}

          <div className="bg-highlight-bg rounded-xl p-5">
            <div className="font-oswald text-[16px] font-semibold text-text-primary mb-1.5">
              Free Consultation
            </div>
            <p className="text-text-body text-[15px] leading-relaxed">
              Not sure what you need? Let's talk — no commitment, no pressure.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
