import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool }    from '@sanity/vision'
import { schemaTypes }   from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'McEvoy Racing',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('McEvoy Racing CMS')
          .items([
            // Grouped sections for clarity
            S.listItem()
              .title('📊  Scoreboard — Race Results')
              .child(S.documentTypeList('raceResult').title('Race Results')),

            S.listItem()
              .title('📅  Game Day — Race Schedule')
              .child(S.documentTypeList('raceSchedule').title('Race Schedule')),

            S.listItem()
              .title('🏇  Get In The Game — Syndicates')
              .child(S.documentTypeList('syndicate').title('Syndicates')),

            S.listItem()
              .title('🏆  G1 Honour Roll')
              .child(S.documentTypeList('honourRoll').title('G1 Honour Roll')),

            S.listItem()
              .title('👋  Careers — Job Listings')
              .child(S.documentTypeList('careerPosition').title('Career Positions')),

            S.divider(),

            // Singleton — site settings
            S.listItem()
              .title('⚙️  Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    visionTool(), // Lets developers test GROQ queries directly in the studio
  ],

  schema: { types: schemaTypes },
})
