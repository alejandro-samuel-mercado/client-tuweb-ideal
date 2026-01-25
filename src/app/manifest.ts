import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TuWebIdeal - Diseño y Desarrollo Web',
    short_name: 'TuWebIdeal',
    description: 'Creamos tu sitio web profesional con hosting y dominio incluido.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#9333ea', 
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
