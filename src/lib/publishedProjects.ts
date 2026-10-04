import manifest from './publishedManifest.json'
const assets = manifest as Record<string, string[]>
export interface ProjectData {
  slug: string; title: string; category: string; hook: string; meta: string; credit: string;
  group?: string; cover?: string; sections: { title: string; text: string }[];
  details?: { title: string; text: string; disclosure?: boolean }[]; pending?: boolean
}
export const projects: ProjectData[] = [
  {
    slug: 'eggy', title: 'eggy', category: 'Branding', group: 'eggy', cover: 'eggy-2.webp',
    hook: 'An escape plan to escape stereotypes through the lens of century egg.',
    meta: 'Rebranding Sunghua Egg (aka Century Egg) · December 2024\nBranding / Cultural Communication / Food Design / Campaign',
    credit: 'Individual project · Research, strategy, art direction, branding',
    sections: [
      { title: 'Issue', text: 'Century egg is familiar on many Chinese dining tables, yet its appearance and name can make it feel strange or even repulsive to people encountering it for the first time.' },
      { title: 'Idea', text: 'I explored how marketing design can influence individual behaviour and, through repeated exposure, contribute to cultural change. Rather than simply making century eggs look more appealing, I developed eggy as a playful brand that uses storytelling, photography and collaboration to turn unfamiliarity into curiosity.' },
      { title: 'Experience', text: 'Giving Sunghua Egg a personality and a voice, turning an unfamiliar food into a character that could speak directly to its audience. Through its playful and confident monologue, the audience encounters the egg as a voice rather than just a food. The entire brand experience invites people to see beyond its exotic appearance and reconsider their first impression of it.' },
    ], details: [{ title: 'The Escape Plan', text: '' }],
  },
  {
    slug: 'daynight', title: '白夜製作', category: 'Branding', group: 'daynight', cover: 'daynight-14.webp',
    hook: 'Visual identity and graphic design for an independent drama production.',
    meta: 'Day Night Production · Hong Kong\nGraphic Design / Visual Identity / Art Direction',
    credit: 'Lead Graphic Designer · 2025',
    sections: [
      { title: 'The Brief', text: 'I was responsible for the visual communication of 白夜製作 (Day Night Production) and its production of 《白狐之夜》, developing the identity and graphic materials across the production from early recruitment through to the final stage performance. Rather than creating a single fixed identity, the project developed across three phases — each responding to a different stage of the production.' },
      { title: 'The Approach', text: "The visual identity evolved alongside the drama. I developed a restrained identity for 白夜製作 during pre-production, then built a richer visual language for 《白狐之夜》 through research into the Edo period and Japanese Kitsune folklore, translating the atmosphere of the story through colour, texture, line and composition." },
      { title: 'The Production Identity', text: "Throughout the process, I also considered the director’s vision and the visual preferences of the production’s target audience." },
    ], details: [
      { title: '01 — 白夜製作', text: 'A neutral and restrained identity for the production company, designed to establish a flexible visual foundation while the drama was still in development.' },
      { title: '02 — 《白狐之夜》讀劇', text: 'A key visual and supporting identity developed for the play-reading period, introducing the visual world of the production through colour, texture and graphic elements.' },
      { title: '03 — 《白狐之夜》舞台劇', text: 'An evolved key visual for the final stage production, building on the language established during the reading while developing it further for the performance campaign.' },
    ],
  },
  {
    slug: 'gutter', title: 'gutter', category: 'Branding', group: 'gutter', cover: 'gutter-9.webp',
    hook: 'What if your lunch could help you listen to yourself?',
    meta: 'BA Design · Goldsmiths, University of London\nExperience Design / Branding / Food Design / Behavioural Design',
    credit: 'Individual project · Research, concept development, experience design, prototyping & visual identity',
    sections: [
      { title: 'Context', text: 'The project began with my curiosity about fermentation and how food can build human connection through time, memory and care. This led me to explore how design could help people reconnect with their food, their bodies and ultimately their gut feeling.' },
      { title: 'Idea', text: 'I explored how design could reconnect people with their gut feeling, it’s not just about gut health, but the instinctive sense of knowing something without being able to fully explain why. Through my research and experiments, I identified three conditions that support this connection: time, contemplation, and listening & care.' },
      { title: 'Experience', text: 'Gutter is an intervention for busy office workers who rely on meal deals. Combining a digital “gut agent” with a physical seasoning ritual, the experience encourages users to slow down, contemplate and reconnect with their feelings through an ordinary lunch.' },
    ], details: [
      { title: 'The Interactive System', disclosure: true, text: 'From encountering Gutter in the supermarket to having a digital conversation (“Your gut sent you a message”), sauce selection and personalised “letter from gut” through an AI agent. Gutter turns a bland meal deal into the journey of self-reflection and self-realisation.' },
      { title: 'Branding Identity', disclosure: true, text: 'The name Gutter combines “gut” with the graphic-design term “gutter” — the space between elements on a page. The gap becomes a metaphor for creating a breathing space within a packed schedule, where people can contemplate and reconnect with themselves. The logo mark visualises this interactive system into a modular visual language. The logo began with the idea of a power button, symbolising the need to interrupt an automatic routine. This power button is then iterated by the physical design of the sauce squeezing onto the sandwich, giving the logo an immediate connection to food and the meal-deal experience.' },
    ],
  },
  {
    slug: 'glimmera', title: 'Glimmera', category: 'Entertainment Concept', group: 'glimmera', cover: 'glimmera-7.webp',
    hook: 'What would you send to an alien to show them the world we know?',
    meta: 'Disney Imagination Competition 2025 · Finalists\nImmersive Experience / Entertainment / Storytelling / Visual Identity',
    credit: 'Team project · My contribution: team lead, worldbuilding, visual identity & presentation deck',
    sections: [
      { title: 'Context', text: 'Glimmera is a quiet planet hidden within the Milky Way, where life has evolved around a single flower. Its inhabitants, Glimbo, have never known another way of living, until a Golden Disc from Earth accidentally arrives and introduces them to a world of possibilities beyond their own.' },
      { title: 'Idea', text: 'We imagined Glimmera as a world transformed not by the arrival of a new technology, but by the courage to embrace a different perspective. The Golden Disc becomes a catalyst for cultural exchange, helping the Glimbo discover that their own “spark” can create change.' },
      { title: 'Experience', text: "Guests enter Glimmera as tourists on a cultural exchange journey, travelling from its vibrant surface into the deeper layers of the planet to uncover the story behind its transformation. Along the way, they encounter its residents, explore the Museum of Glimmera, participate in the Mora Factory ride, and ultimately witness the city transformed through a spectacular drone show. The journey moves from curiosity to discovery to participation, allowing guests to experience Glimmera’s transformation rather than simply being told its story." },
    ], details: [{ title: 'Details', text: 'The Bird of Paradise became a recurring visual clue throughout Glimmera. Its distinctive form inspired the logo’s “r” and the unique flower found across the planet, linking the identity back to the story of creativity and transformation.' }],
  },
  {
    slug: 'unseen-marine', title: 'The Unseen Marine', category: 'Entertainment Concept', group: 'marine', cover: 'marine-2.webp',
    hook: 'What if the seafood on your plate carried an SOS signal from the ocean?',
    meta: 'Dining Experience / Food Design / Storytelling / Sustainability\nMay 2024',
    credit: 'Individual project · Research, concept development, experience design, food design',
    sections: [
      { title: 'Context', text: 'Inspired by Seaspiracy, I became interested in the gap between the seafood we consume and the environmental realities behind it. The film revealed how much of these facts are hidden behind the seafood on the dining table.' },
      { title: 'Idea', text: 'I translated the investigative structure of a documentary into a dining experience, using each course to uncover another hidden reality of the seafood industry. Instead of presenting sustainability as information to read, the meal itself becomes the medium through which the story is revealed.' },
      { title: 'Experience', text: 'Guests arrive expecting a pleasant seafood dinner, but gradually discover that there is more behind each dish than what appears on the plate. Across four courses, the experience moves from curiosity to revelation, turning the act of eating into an investigation of what lies beneath the surface.' },
    ], details: [
      { title: 'The Dinner', text: '01 — Carpaccio de Salmon\nFish farming and the industrialisation of seafood.\n\n02 — Seafood Chowder\nOverconsumption and the imbalance of marine ecosystems.\n\n03 — Grilled Sea Bream\nVisualising the invisible presence of microplastics into the meal.\n\n04 — Fish Cake\nReimagining another relationship with seafood.' },
      { title: 'Details · The Menu Case', text: 'The menu was designed as more than a guide to the meal. It is made from recycled material, it contains the dinnerware within its structure, turning the act of opening the menu into the first moment of discovery. As the menu reveals what is hidden inside, it introduces the central idea of Unseen Marine: look beyond what is superficially visible.' },
    ],
  },
  { slug: 'from-the-ground', title: 'From the Ground', category: 'Entertainment Concept', hook: 'My 22nd Birthday Dinner', meta: '', credit: '', sections: [], pending: true },
]
export const imagesFor = (p: ProjectData) => (assets[p.group || ''] || []).filter(file => file.endsWith('.webp'))
export const videosFor = (p: ProjectData) => (assets[p.group || ''] || []).filter(file => file.endsWith('.mp4'))
export const coverFor = (p: ProjectData) => p.cover || imagesFor(p)[0]
