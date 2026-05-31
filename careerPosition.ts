import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const syndicate = defineType({
  name: 'syndicate',
  title: 'Syndicates',
  type: 'document',
  icon: UsersIcon,
  preview: {
    select: { title: 'name', subtitle: 'breeding', media: 'horseImage' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Unnamed syndicate', subtitle: subtitle || '', media }
    },
  },
  fields: [
    defineField({
      name: 'active',
      title: 'Show on website?',
      type: 'boolean',
      description: 'Turn OFF when the syndicate is fully subscribed or closed. Turn back ON if a spot opens up.',
      initialValue: true,
    }),
    defineField({
      name: 'num',
      title: 'Syndicate Number',
      type: 'string',
      description: 'Display number, e.g. "01", "02". Used for ordering.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Syndicate Name',
      type: 'string',
      description: 'e.g. "Team Zanzara"',
      validation: r => r.required(),
    }),
    defineField({
      name: 'breeding',
      title: 'Breeding Line',
      type: 'string',
      description: 'e.g. "3yo Filly — Shalaa × Zarabi"',
      validation: r => r.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'The pitch for this syndicate. Write as if talking to an excited potential owner.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'horseImage',
      title: 'Horse Photo',
      type: 'image',
      description: 'Upload a landscape photo of the horse (at least 1200px wide). JPG or PNG.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'spotsTotal',
      title: 'Total Shares Available',
      type: 'number',
      description: 'Total number of shares in this syndicate, e.g. 20 or 10.',
    }),
    defineField({
      name: 'spotsTaken',
      title: 'Shares Already Sold',
      type: 'number',
      description: 'Update this every time a share is sold. The progress bar updates automatically.',
      initialValue: 0,
    }),
    defineField({
      name: 'buyIn',
      title: 'Buy-In Price',
      type: 'string',
      description: 'e.g. "$12,500" — include the dollar sign.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'monthly',
      title: 'Estimated Monthly Cost',
      type: 'string',
      description: 'e.g. "~$680". Leave blank for private/bespoke syndicates.',
    }),
    defineField({
      name: 'base',
      title: 'Home Base',
      type: 'string',
      description: 'Training location, e.g. "Flemington" or "Morphettville".',
      options: {
        list: ['Flemington', 'Morphettville', 'Ballarat', 'You Decide'],
      },
    }),
    defineField({
      name: 'target',
      title: 'Target Race / Programme',
      type: 'string',
      description: 'e.g. "Spring Carnival Group races" or "G1 Australian Guineas".',
    }),
    defineField({
      name: 'badgeType',
      title: 'Badge Style',
      type: 'string',
      description: 'Controls the colour of the badge on the card.',
      options: {
        list: [
          { title: 'Urgent (Orange) — few spots left', value: 'urgent' },
          { title: 'Filling (Dark) — selling but not urgent', value: 'filling' },
          { title: 'Bespoke (Outlined) — private ownership', value: 'bespoke' },
        ],
        layout: 'radio',
      },
      initialValue: 'filling',
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'e.g. "4 Spots Left" or "8 Spots Left" or "Bespoke".',
      validation: r => r.required(),
    }),
    defineField({
      name: 'btnText',
      title: 'Button Text',
      type: 'string',
      description: 'Text on the card button, e.g. "View Full Profile" or "Enquire Privately".',
      initialValue: 'View Full Profile',
    }),
    defineField({
      name: 'syndId',
      title: 'Internal ID',
      type: 'slug',
      description: 'Auto-generated from the name. Do not change after creation.',
      options: { source: 'name', maxLength: 96 },
      validation: r => r.required(),
    }),
  ],
  orderings: [
    { title: 'Syndicate Number', name: 'numAsc', by: [{ field: 'num', direction: 'asc' }] },
  ],
})
