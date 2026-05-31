import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const honourRoll = defineType({
  name: 'honourRoll',
  title: 'G1 Honour Roll',
  type: 'document',
  icon: StarIcon,
  preview: {
    select: { title: 'horse', subtitle: 'race' },
    prepare({ title, subtitle }) {
      return { title: title || 'Unnamed', subtitle: subtitle || '' }
    },
  },
  fields: [
    defineField({
      name: 'horse',
      title: 'Horse Name',
      type: 'string',
      description: 'The Group 1 winner\'s name.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'race',
      title: 'Race Won',
      type: 'string',
      description: 'e.g. "G1 Melbourne Cup" or "G1 The Goodwood".',
      validation: r => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order in the scrolling ticker. Lower number = earlier in the scroll.',
      initialValue: 99,
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
