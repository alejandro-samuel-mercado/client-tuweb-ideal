export interface Plan {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  tagline_en?: string;
  description: string;
  description_en?: string;
  detailedDescription: string;
  detailedDescription_en?: string;
  price: number;
  setupPrice: number;
  monthlyPrice: number;
  price_detail?: string;
  features: string[];
  whatYouGet: { title: string; description: string }[];
  useCases: string[];
  management: { title: string; description: string }[];
  considerations: string[];
  recommendations: string[];
  demos: { name: string; url: string; category: string }[];
  popular: boolean;
  recommended?: boolean;
}


export const plans: Plan[] = [
  {
    id: 1,
    name: "Básico",
    slug: "basico",
    tagline: "Ideal para emprendedores y pequeños negocios",
    description: "Todo lo que necesitas para tener presencia en internet.",
    detailedDescription: "El plan Básico es la solución perfecta para quienes buscan iniciar su camino digital. Ofrece una landing page profesional, rápida y optimizada para dispositivos móviles.",
    price: 299,
    setupPrice: 299,
    monthlyPrice: 25,
    features: [
      "Landing Page One-Page",
      "Diseño Responsive",
      "Dominio .com incluido (1 año)",
      "Hosting incluido (1 año)",
      "Certificado SSL",
      "Formulario de Contacto",
      "Botón de WhatsApp",
      "Integración con Redes Sociales"
    ],
    whatYouGet: [
      {
        title: "Landing Page Profesional",
        description: "Una página web de una sola sección con navegación fluida, diseñada para convertir visitantes en clientes."
      },
      {
        title: "Presencia Digital Completa",
        description: "Incluye dominio, hosting y certificado de seguridad para que no tengas que preocuparte por nada técnico."
      },
      {
        title: "Optimización Móvil",
        description: "Tu sitio se verá perfecto en celulares, tablets y computadoras, garantizando la mejor experiencia de usuario."
      }
    ],
    useCases: [
      "Pequeños Negocios Locales",
      "Portafolios Personales",
      "Lanzamiento de Productos",
      "Tarjetas de Presentación Digitales"
    ],
    management: [
      {
        title: "Autogestionable (Opcional)",
        description: "Podemos integrar un panel simple si necesitas actualizar textos o imágenes frecuentemente."
      },
      {
        title: "Soporte Técnico",
        description: "Te ayudamos con cualquier duda o problema técnico que pueda surgir con tu sitio."
      }
    ],
    considerations: [
      "Limitado a una sola página (One-Page).",
      "No incluye tienda en línea ni pagos.",
      "Diseño basado en plantillas optimizadas."
    ],
    recommendations: [
      "Ideal si es tu primer sitio web.",
      "Perfecto para campañas de publicidad (Google Ads, Facebook Ads).",
      "Ten listas tus fotos y textos para agilizar el proceso."
    ],
    demos: [],
    popular: false
  },
  {
    id: 2,
    name: "Profesional",
    slug: "profesional",
    tagline: "Para negocios que buscan crecer",
    description: "Sitio web multipágina con blog y optimización SEO avanzada.",
    detailedDescription: "El plan Profesional está diseñado para empresas establecidas que necesitan estructurar mejor su información. Incluye múltiples páginas, blog y herramientas de análisis.",
    price: 599,
    setupPrice: 599,
    monthlyPrice: 45,
    features: [
      "Hasta 5 Páginas",
      "Diseño Personalizado",
      "Blog de Noticias",
      "Optimización SEO Básica",
      "Integración con Google Analytics",
      "Panel de Administración",
      "Soporte Prioritario"
    ],
    whatYouGet: [
      {
        title: "Sitio Web Completo",
        description: "Estructura de múltiples páginas (Inicio, Nosotros, Servicios, Blog, Contacto)."
      },
      {
        title: "Gestor de Contenidos",
        description: "Podrás agregar noticias o artículos al blog fácilmente."
      }
    ],
    useCases: [
      "Empresas de Servicios",
      "Consultoras",
      "Instituciones Educativas"
    ],
    management: [
      {
        title: "Panel de Control",
        description: "Acceso total para editar contenidos."
      }
    ],
    considerations: [
      "Requiere más tiempo de desarrollo.",
      "Necesita mantenimiento de contenidos para aprovechar el blog."
    ],
    recommendations: [
      "Si quieres posicionarte en Google (SEO), este es tu plan.",
      "Aprovecha el blog para compartir noticias de tu industria."
    ],
    demos: [],
    popular: true,
    recommended: true
  },
  {
    id: 3,
    name: "E-Commerce",
    slug: "ecommerce",
    tagline: "Vende tus productos online",
    description: "Tienda en línea completa con carrito de compras y pasarela de pagos.",
    detailedDescription: "Vende las 24 horas del día con una tienda en línea robusta y segura. Gestiona productos, pedidos y clientes desde un solo lugar.",
    price: 999,
    setupPrice: 999,
    monthlyPrice: 85,
    features: [
      "Tienda Online Completa",
      "Catálogo de Productos",
      "Carrito de Compras",
      "Pasarela de Pagos (Stripe/PayPal)",
      "Gestión de Inventario",
      "Cuentas de Clientes",
      "Calculadora de Envíos"
    ],
    whatYouGet: [
      {
        title: "Ventas Automatizadas",
        description: "El sistema procesa pagos y pedidos automáticamente."
      },
      {
        title: "Panel de Ventas",
        description: "Control total sobre tus productos, precios y stock."
      }
    ],
    useCases: [
      "Tiendas de Ropa",
      "Venta de Productos Digitales",
      "DropShipping"
    ],
    management: [
      {
        title: "Dashboard E-commerce",
        description: "Métricas de ventas, pedidos recientes y productos más vendidos."
      }
    ],
    considerations: [
      "Requiere configurar pasarelas de pago (comisiones bancarias).",
      "Es importante tener fotos de alta calidad de los productos."
    ],
    recommendations: [
      "Define bien tus políticas de envío y devolución.",
      "Empieza con tus productos estrella."
    ],
    demos: [],
    popular: false
  }
];
