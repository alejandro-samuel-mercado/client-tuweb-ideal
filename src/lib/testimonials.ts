interface Review {
  id?: number;
  name: string;
  role?: string;
  content: string;
  avatar?: string;
  rating: number;
}
 const initialReviews: Review[] = [
  {
    name: "Ana Martínez",
    role: "Fundadora, YogaLife",
    content:
      "Entendieron perfectamente la esencia de mi marca. El proceso fue muy fluido y el resultado final es hermoso.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    rating: 5,
  },
  {
    name: "Miguel Ángel",
    role: "Director, Constructora M&A",
    content:
      "Profesionalismo puro. Desde el primer contacto hasta la entrega final, todo fue excelente. Muy recomendados.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel",
    rating: 5,
  },
  {
    name: "Sofia Rodriguez",
    role: "CEO, TechStart",
    content: "Increíble atención al detalle. Nuestra web ahora carga rapidísimo y se ve espectacular.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    rating: 5,
  },
  {
    name: "Carlos Ruiz",
    role: "Restaurante El Gusto",
    content: "El sistema de reservas que implementaron ha cambiado nuestro negocio por completo. ¡Gracias!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    rating: 5,
  }
];

export default initialReviews;