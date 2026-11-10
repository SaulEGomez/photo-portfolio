import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Caption',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Web Master Image',
      type: 'image',
      options: {
        hotspot: true, // Enables visual cropping and focus points in sanity studio
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'medium',
      title: 'Capture Medium',
      type: 'string',
      options: {
        list: [
          { title: 'Digital', value: 'digital' },
          { title: 'Film', value: 'film' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'takenAt',
      title: 'Date Taken (Capture Date)',
      type: 'date',
      description: 'Optional. Used for chronological sorting. Falls back to creation date if left blank.',
      // Intentionally left without .required() so it is fully optional
    }),
    defineField({
      name: 'exif',
      title: 'Technical EXIF & Gear Details',
      type: 'object',
      fields: [
        defineField({ name: 'camera', title: 'Camera Body', type: 'string' }),
        defineField({ name: 'lens', title: 'Lens', type: 'string' }),
        defineField({ 
          name: 'filmStock', 
          title: 'Film Stock', 
          type: 'string',
          description: 'e.g., Kodak Portra 400, Ilford HP5',
          // Automatically hides this field in the studio if medium is set to digital
          hidden: ({ document }) => document?.medium !== 'film',
        }),
        defineField({ name: 'iso', title: 'ISO', type: 'number' }),
        defineField({ name: 'aperture', title: 'Aperture', type: 'string', description: 'e.g., f/2.8' }),
        defineField({ name: 'shutterSpeed', title: 'Shutter Speed', type: 'string', description: 'e.g., 1/500s' }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location of Shot',
      type: 'string',
      description: 'e.g., Madrid, Spain or Santa Cruz, CA',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      location: 'location',
      date: 'takenAt',
    },
    prepare({ title, media, location, date }) {
      return {
        title: title || 'Untitled',
        subtitle: [location, date].filter(Boolean).join(' • '),
        media: media,
      }
    },
  },
})