'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface PhotoGalleryProps {
  latestPhoto: any
  archivePhotos: any[]
}

export default function PhotoGallery({ latestPhoto, archivePhotos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('grid')

  return (
    <>
      {/* 2. HERO SECTION: LATEST HIGHLIGHT (Clickable) */}
      {latestPhoto ? (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Latest Dispatch / Highlight
            </span>
            <span className="text-xs text-neutral-500">
              {new Date(latestPhoto.publishedAt).toLocaleDateString()}
            </span>
          </div>
          
          <div 
            onClick={() => setSelectedPhoto(latestPhoto)}
            className="relative group rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer"
          >
            {latestPhoto.image && (
              <Image
                src={urlFor(latestPhoto.image).width(1200).url()}
                alt={latestPhoto.title || 'Latest photograph'}
                width={1200}
                height={800}
                className="w-full h-auto object-cover max-h-[70vh] transition-transform duration-500 group-hover:scale-[1.01]"
                priority
              />
            )}
            <div className="p-4 flex justify-between items-center bg-neutral-900/80 backdrop-blur-sm border-t border-neutral-800/50">
              <div>
                <h2 className="font-medium text-sm text-neutral-200">
                  {latestPhoto.title || 'Untitled'}
                </h2>
                <p className="text-xs text-neutral-400 capitalize">
                  {latestPhoto.medium} {latestPhoto.exif?.camera ? `• ${latestPhoto.exif.camera}` : ''}
                </p>
              </div>
              {latestPhoto.location && (
                <span className="text-xs text-neutral-400">{latestPhoto.location}</span>
              )}
            </div>
          </div>
        </section>
      ) : (
        <div className="text-center py-12 text-neutral-500 border border-dashed border-neutral-800 rounded-lg mb-20">
          No photos published yet. Head over to <code className="text-neutral-300">/studio</code> to upload your first shot!
        </div>
      )}

      {/* 3. SEAMLESS ARCHIVE GRID / FEED TOGGLE */}
      {archivePhotos.length > 0 && (
        <section>
          <div className="border-t border-neutral-800 pt-8 mb-8 flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Full Archive
            </h3>

            {/* View Mode Toggle Controls */}
            <div className="flex items-center bg-neutral-900 p-1 rounded-lg border border-neutral-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Grid View"
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('feed')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  viewMode === 'feed'
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Single Image Stream View"
              >
                Feed
              </button>
            </div>
          </div>

          {/* MODE A: GRID VIEW */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {archivePhotos.map((photo: any) => (
                <div 
                  key={photo._id} 
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative bg-neutral-900 rounded-md overflow-hidden aspect-square border border-neutral-800/60 cursor-pointer"
                >
                  {photo.image && (
                    <Image
                      src={urlFor(photo.image).width(600).url()}
                      alt={photo.title || 'Portfolio photo'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-xs text-neutral-200 font-medium truncate">
                      {photo.title || 'Untitled'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* MODE B: INSTAGRAM-STYLE SINGLE IMAGE FEED VIEW */
            <div className="flex flex-col gap-12 max-w-2xl mx-auto">
              {archivePhotos.map((photo: any) => (
                <article 
                  key={photo._id}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-sm"
                >
                  <div 
                    onClick={() => setSelectedPhoto(photo)}
                    className="relative w-full cursor-pointer bg-black"
                  >
                    {photo.image && (
                      <Image
                        src={urlFor(photo.image).width(1200).url()}
                        alt={photo.title || 'Feed photograph'}
                        width={1200}
                        height={900}
                        className="w-full h-auto object-contain max-h-[80vh]"
                      />
                    )}
                  </div>
                  <div className="p-4 flex justify-between items-center border-t border-neutral-800/60">
                    <div>
                      <h4 className="font-medium text-sm text-neutral-200">
                        {photo.title || 'Untitled'}
                      </h4>
                      <p className="text-xs text-neutral-400 capitalize mt-0.5">
                        {photo.medium} {photo.exif?.camera ? `• ${photo.exif.camera}` : ''}
                      </p>
                    </div>
                    <div className="text-right text-xs text-neutral-500">
                      {photo.location && <div>{photo.location}</div>}
                      <div>{new Date(photo.publishedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* LIGHTBOX MODAL OVERLAY */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-neutral-300 hover:text-white flex items-center justify-center transition-colors border border-neutral-700"
            >
              ✕
            </button>

            {/* Expanded Image Viewer */}
            <div className="relative w-full h-[60vh] bg-black flex items-center justify-center">
              {selectedPhoto.image && (
                <Image
                  src={urlFor(selectedPhoto.image).width(1600).url()}
                  alt={selectedPhoto.title || 'Lightbox photo'}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* Metadata Footer */}
            <div className="p-6 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-base font-semibold text-neutral-100">
                  {selectedPhoto.title || 'Untitled'}
                </h3>
                <p className="text-xs text-neutral-400 capitalize mt-1">
                  {selectedPhoto.medium} 
                  {selectedPhoto.exif?.camera ? ` • ${selectedPhoto.exif.camera}` : ''}
                  {selectedPhoto.exif?.lens ? ` • ${selectedPhoto.exif.lens}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-neutral-400">
                {selectedPhoto.location && (
                  <span className="flex items-center gap-1">
                    📍 {selectedPhoto.location}
                  </span>
                )}
                <span>
                  {new Date(selectedPhoto.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
