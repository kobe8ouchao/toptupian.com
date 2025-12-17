export interface Prompt {
  id: string;
  imageUrl: string;
  imageUrls?: string[];
  title: string;
  author: string;
  authorUrl?: string;
  promptText: string;
  likes: number;
  model: string;
}

export const mockPrompts: Prompt[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60',
    imageUrls: [
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1515630278258-407f66498911?w=800&auto=format&fit=crop&q=60'
    ],
    title: 'Neon Cyberpunk City',
    author: 'CyberArtist',
    authorUrl: 'https://twitter.com/cyberartist',
    promptText: 'Cyberpunk city street at night, neon lights, rain reflections, futuristic architecture, cinematic lighting, photorealistic, 8k.',
    likes: 1240,
    model: 'Nano Banana'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&auto=format&fit=crop&q=60',
    title: 'Ethereal Forest Spirit',
    author: 'NatureDreamer',
    authorUrl: 'https://instagram.com/naturedreamer',
    promptText: 'Mystical forest spirit, glowing aura, bioluminescent plants, ancient trees, soft mist, ethereal atmosphere, fantasy art style.',
    likes: 850,
    model: 'Grok'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    title: 'Abstract Liquid Shapes',
    author: 'ModernFlow',
    authorUrl: 'https://dribbble.com/modernflow',
    promptText: 'Abstract 3D liquid shapes, glass texture, iridescent colors, floating in void, studio lighting, minimal composition.',
    likes: 2100,
    model: 'Sora 2'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1614730341194-75c6074065db?w=800&auto=format&fit=crop&q=60',
    title: 'Minimalist Architecture',
    author: 'ArchiBot',
    authorUrl: 'https://twitter.com/archibot',
    promptText: 'Minimalist white concrete architecture, sharp shadows, blue sky, geometric shapes, brutalism, photorealistic.',
    likes: 560,
    model: 'Nano Banana'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1605218427368-35b019b8db6c?w=800&auto=format&fit=crop&q=60',
    title: 'Retro Synthwave Landscape',
    author: 'RetroWave',
    authorUrl: 'https://twitter.com/retrowave',
    promptText: 'Synthwave landscape, purple grid, sun on horizon, mountains, retro 80s style, digital art.',
    likes: 1800,
    model: 'Grok'
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&auto=format&fit=crop&q=60',
    title: 'Steampunk Airship',
    author: 'SteamMaster',
    authorUrl: 'https://artstation.com/steammaster',
    promptText: 'Steampunk airship flying over clouds, brass gears, steam, victorian aesthetic, detailed mechanical parts, adventure atmosphere.',
    likes: 930,
    model: 'Sora 2'
  },
  {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=60',
    title: 'Future Space Station',
    author: 'SpaceExplorer',
    authorUrl: 'https://twitter.com/spaceexplorer',
    promptText: 'Futuristic space station orbiting planet earth, realistic sci-fi, detailed textures, starfield background, 4k render.',
    likes: 1500,
    model: 'Nano Banana'
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60',
    title: 'Golden Hour Portrait',
    author: 'PortraitPro',
    authorUrl: 'https://instagram.com/portraitpro',
    promptText: 'Portrait of a young woman, golden hour lighting, bokeh background, natural skin texture, sharp eyes, cinematic look.',
    likes: 3200,
    model: 'Grok'
  },
   {
    id: '9',
    imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop&q=60',
    title: 'Isometric Room',
    author: 'IsoDesigner',
    authorUrl: 'https://dribbble.com/isodesigner',
    promptText: 'Isometric view of a cozy gamer room, neon lights, pc setup, posters, detailed furniture, 3d render, blender style.',
    likes: 1100,
    model: 'Sora 2'
  }
];
