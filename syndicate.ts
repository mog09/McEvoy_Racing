import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const raceSchedule = defineType({
  name: 'raceSchedule',
  title: 'Race Schedule',
  type: 'document',
  icon: CalendarIcon,
  preview: {
    select: { title: 'horse', subtitle: 'race' },
    prepare({ title, subtitle }) {
      return { title: title || 'Unnamed', subtitle: subtitle || '' }
    },
  },
  fields: [
    defineField({
      name: 'active',
      title: 'Show on website?',
      type: 'boolean',
      description: 'Turn OFF after the race has run to hide it without deleting.',
      initialValue: true,
    }),
    defineField({
      name: 'horse',
      title: 'Horse Name',
      type: 'string',
      description: 'The horse running in this race.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      description: 'Just the day number, e.g. "07" or "14".',
      validation: r => r.required().max(2),
    }),
    defineField({
      name: 'month',
      title: 'Month',
      type: 'string',
      description: 'Three-letter month abbreviation, e.g. "Jun", "Jul", "Aug".',
      options: {
        list: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'race',
      title: 'Race Name',
      type: 'string',
      description: 'e.g. "Magic Night Stakes — Group 2"',
      validation: r => r.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      description: 'e.g. "Royal Randwick, Sydney"',
      validation: r => r.required(),
    }),
    defineField({
      name: 'distance',
      title: 'Distance',
      type: 'string',
      description: 'e.g. "1200m"',
      validation: r => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Usually leave as "LOCKED IN". Change if scratched or status changes.',
      initialValue: 'LOCKED IN',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower number = appears higher in the schedule. Use the date as a guide (0607 for 7 Jun).',
      initialValue: 9999,
    }),
  ],
  orderings: [
    { title: 'Date Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
})
