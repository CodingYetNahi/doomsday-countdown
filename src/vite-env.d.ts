/// <reference types="vite/client" />

interface Window {
  adsbygoogle?: Record<string, unknown>[]
  dataLayer?: IArguments[]
  gtag?: (...args: unknown[]) => void
}
