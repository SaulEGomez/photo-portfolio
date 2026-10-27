import { client } from '@/sanity/lib/client'
import PhotoGallery from './components/PhotoGallery'

export const instant = false 

async function getPhotos() {
  const query = `*[_type == "photo"] | order(publishedAt desc)`
  return await client.fetch(query, {}, { cache: 'no-store' })
}

export default async function Home() {
  const photos = await getPhotos()
  const latestPhoto = photos[0]
  const archivePhotos = photos.slice(1)

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 max-w-5xl mx-auto font-sans">
      
      {/* 1. PROFILE HEADER */}
      <header className="flex flex-col items-center text-center mb-16 space-y-4">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700">
          {/* Add your profile picture here later */}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Saul Gomez</h1>
        <p className="text-neutral-400 max-w-md text-sm leading-relaxed">
          My personal analog & digital archives documenting just about anything.
        </p>
      </header>

      {/* 2 & 3. INTERACTIVE GALLERY & LIGHTBOX */}
      <PhotoGallery latestPhoto={latestPhoto} archivePhotos={archivePhotos} />

    </main>
  )
}
