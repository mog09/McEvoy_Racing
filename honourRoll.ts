import { defineField, defineType } from 'sanity'
import { TrophyIcon } from '@sanity/icons'

export const raceResult = defineType({
  name: 'raceResult',
  title: 'Race Results',
  type: 'document',
  icon: TrophyIcon,
  // What shows in the Sanity list view
  preview: {
    select: { title: 'horse', subtitle: 'race', media: 'active' },
    prepare({ title, subtitle }) {
      return { title: title || 'Unnamed horse', subtitle: subtitle || '' }
    },
  },
  fields: [
    defineField({
      name: 'active',
      title: 'Show on website?',
      type: 'boolean',
      description: 'Turn OFF to hide this result without deleting it.',
      initialValue: true,
    }),
    defineField({
      name: 'horse',
      title: 'Horse Name',
      type: 'string',
      description: 'The horse\'s name exactly as it appears in the racebook.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Result Label',
      type: 'string',
      description: 'The label that appears on the card. Touchdown = win, First Down = placed.',
      options: {
        list: [
          { title: 'Touchdown (Win)', value: 'Touchdown' },
          { title: 'First Down (2nd or 3rd)', value: 'First Down' },
          { title: 'In The Hunt (Minor placing)', value: 'In The Hunt' },
          { title: 'Showstopper (Feature win)', value: 'Showstopper' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'result',
      title: 'Race Class Badge',
      type: 'string',
      description: 'The badge shown in the top corner of the card.',
      options: {
        list: [
          { title: 'Group 1', value: 'Group 1' },
          { title: 'Group 2', value: 'Group 2' },
          { title: 'Group 3', value: 'Group 3' },
          { title: 'Listed', value: 'Listed' },
          { title: 'Winner', value: 'Winner' },
          { title: 'Placed', value: 'Placed' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'race',
      title: 'Race & Venue',
      type: 'string',
      description: 'e.g. "The Goodwood, Morphettville"',
      validation: r => r.required(),
    }),
    defineField({
      name: 'detail',
      title: 'Race Detail',
      type: 'string',
      description: 'e.g. "1200m · 1st of 14 · 31 May"',
      validation: r => r.required(),
    }),
    defineField({
      name: 'bg',
      title: 'Card Colour',
      type: 'string',
      description: 'Background colour style for the card. Rotate through 1-5.',
      options: {
        list: [
          { title: 'Colour 1 (Dark Orange)', value: 'sc-bg-1' },
          { title: 'Colour 2 (Deep Navy)', value: 'sc-bg-2' },
          { title: 'Colour 3 (Forest Green)', value: 'sc-bg-3' },
          { title: 'Colour 4 (Burgundy)', value: 'sc-bg-4' },
          { title: 'Colour 5 (Slate)', value: 'sc-bg-5' },
        ],
        layout: 'radio',
      },
      initialValue: 'sc-bg-1',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower number = shows first in the scoreboard. Most recent race should be 1.',
      initialValue: 99,
    }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
})
