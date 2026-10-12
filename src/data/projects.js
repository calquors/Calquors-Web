// Every product Calquors has shipped. Home, Work and Studio all read from here,
// so adding a product or updating a number only happens in one place.
export const PROJECTS = [
  {
    slug: 'omeglevc',
    name: 'OmegleVC',
    logo: '/omeglevc-logo.jpeg',
    kicker: 'Social · Video chat',
    cats: ['web', 'mobile'],
    tagline: 'Random and group video chat — meet new people through video calls, group chats and live voice rooms.',
    platforms: ['Web', 'Android'],
    color: 'oklch(0.66 0.19 255)',
    featured: true,
    stats: [
      { v: '3,550+', k: 'Registered users' },
      { v: '50k+', k: 'Visitors' },
      { v: '4.8★', k: 'Google Play rating' },
    ],
    links: [
      { kind: 'web', label: 'omeglevc.com', url: 'https://omeglevc.com' },
      { kind: 'play', label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.omeglevc.app' },
    ],
  },
  {
    slug: 'klyq',
    name: 'Klyq',
    kicker: 'Social · Android',
    cats: ['mobile'],
    tagline: 'Meet, chat and connect with adults nearby — one-to-one and group chat, plus voice and video calls once both people agree.',
    platforms: ['Android'],
    color: 'oklch(0.68 0.2 350)',
    links: [
      { kind: 'play', label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.halo.android' },
    ],
  },
  {
    slug: 'revfit',
    name: 'Revfit',
    kicker: 'Fitness · iOS',
    cats: ['mobile'],
    tagline: 'A native iOS fitness app with workout tracking, progress analytics and personalised training plans.',
    platforms: ['iOS'],
    color: 'oklch(0.72 0.17 150)',
    links: [
      { kind: 'web', label: 'revfit.app', url: 'https://revfit.app' },
      { kind: 'appstore', label: 'App Store', url: 'https://apps.apple.com/ch/app/revfit/id6759456031' },
    ],
  },
  {
    slug: 'rivelo',
    name: 'Rivelo Labs',
    kicker: 'Engineering',
    cats: ['engineering', 'web'],
    tagline: 'Our engineering arm — internal tools, experimental apps and the platforms behind Calquors client work.',
    platforms: ['Web', 'iOS', 'Android'],
    color: 'oklch(0.74 0.13 195)',
    links: [
      { kind: 'web', label: 'rivelolabs.com', url: 'https://www.rivelolabs.com' },
    ],
  },
]

// Headline numbers shown in the proof band on the home page.
export const PROOF = [
  { v: '3,550+', k: 'Registered users on OmegleVC' },
  { v: '50k+', k: 'Visitors to OmegleVC' },
  { v: '4.8★', k: 'OmegleVC on Google Play' },
  { v: `${PROJECTS.length}`, k: 'Products live today' },
]
