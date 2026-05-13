import '@testing-library/jest-dom'

// jsdom does not implement IntersectionObserver; mock it so framer-motion's
// whileInView prop doesn't throw during tests.
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
