import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  // Singleton — only one document of this type should ever exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'url',
      description: 'URL to the looping background video on the homepage. Can be a YouTube embed URL, Vimeo embed URL, or a direct .mp4 link.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'The main stable enquiry email, e.g. "info@mcevoyracing.com.au".',
      validation: r => r.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'e.g. "+61 8 8234 0000"',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      description: 'Full URL to the Instagram page.',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      description: 'Full URL to the Facebook page.',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Full URL to the YouTube channel.',
    }),
  ],
})
