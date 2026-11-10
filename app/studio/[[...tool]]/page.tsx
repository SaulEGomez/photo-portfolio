import { Suspense } from 'react'
import { connection } from 'next/server'
import type { Metadata, Viewport } from 'next'
import { NextStudio } from 'next-sanity/studio'
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

async function DynamicMarker() {
  await connection()
  return null
}

export default function StudioPage() {
  return (
    <>
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>
      <NextStudio config={config} />
    </>
  )
}