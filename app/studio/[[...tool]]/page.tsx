import { NextStudio } from 'next-sanity/studio'
import type { Metadata, Viewport } from 'next'
import config from '../../../sanity.config'

export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
  referrer: 'same-origin',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function StudioPage() {
  return <NextStudio config={config} />
}