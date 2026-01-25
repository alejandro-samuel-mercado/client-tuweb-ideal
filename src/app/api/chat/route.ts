import { FAQ_DATA, WEBSITE_CONTEXT } from "@/data/faq";
import Logger from "@/lib/logger";
import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

function includesAny(text: string, keywords: string[]): boolean {
  return keywords.some(k => text.includes(k));
}

function findLocalResponse(message: string): string | null {
  const lowerMsg = message.toLowerCase();
  
  // 1. GREETINGS
  if (includesAny(lowerMsg, ["hola", "buenos dias", "buenas", "que tal", "hello", "hi"])) {
    return "¡Hola! ¿En qué puedo ayudarte hoy con tu sitio web?";
  }

  // 2. PRICES / COSTS
  if (includesAny(lowerMsg, ["precio", "costo", "valor", "sale", "cuesta", "tarifa", "cotizacion", "presupuesto"])) {
    return "Nuestros planes comienzan desde $299 USD (Básico) hasta $2,999 USD (Empresarial). Todos incluyen hosting y dominio el primer año.";
  }

  // 3. PLANS (General or Specific)
  if (includesAny(lowerMsg, ["plan", "planes", "servicios", "paquetes"])) {
     // Check for specific plans
     if (lowerMsg.includes("basic") || lowerMsg.includes("básico")) return "El Plan Básico ($299 USD) incluye Landing Page, Diseño Responsive, Hosting y Dominio.";
     if (lowerMsg.includes("negocio")) return "El Plan Negocio ($599 USD) incluye 5 páginas, Blog y formulario avanzado.";
     if (lowerMsg.includes("tienda") || lowerMsg.includes("e-commerce")) return "El Plan Tienda Online ($999 USD) incluye catálogo, carrito y pagos online.";
     if (lowerMsg.includes("empesarial") || lowerMsg.includes("medida")) return "El Plan Empresarial ($2,999+) es para desarrollos a medida complejos.";
     
     return "Tenemos 4 planes principales: Básico ($299), Negocio ($599), Tienda Online ($999) y Empresarial ($2,999+). ¿Te gustaría detalle de alguno?";
  }

  // 4. DELIVERY TIME
  if (includesAny(lowerMsg, ["tiempo", "demora", "tardan", "entrega", "cuando esta"])) {
    return "El tiempo de entrega depende del plan: Básico (3-5 días), Negocio (1-2 semanas), Tienda Online (2-4 semanas).";
  }

  // 5. HOSTING & DOMAINS
  if (includesAny(lowerMsg, ["hosting", "dominio", "servidor", "alojamiento", "domain"])) {
    return "¡Sí! Todos nuestros planes incluyen Hosting de alta velocidad y Dominio .com GRATIS por el primer año.";
  }

  // 6. CONTACT
  if (includesAny(lowerMsg, ["contacto", "mail", "correo", "whatsapp", "telefono", "llamar", "ubicacion"])) {
    return "Puedes contactarnos directamente a contacto@tuwebideal.com o al +54 9 11 1234-5678. Estamos de Lunes a Viernes de 9 a 18hs.";
  }

  // 7. PAYMENTS
  if (includesAny(lowerMsg, ["pago", "pagar", "tarjeta", "cuotas", "paypal", "stripe", "metodos"])) {
    return "Aceptamos tarjetas de crédito/débito via PayPal, Stripe y Mercado Pago. Para Argentina también transferencia bancaria.";
  }

  // 8. SERVICES (Design, SEO)
  if (includesAny(lowerMsg, ["seo", "google", "posicionamiento"])) {
    return "Todos nuestros sitios incluyen optimización SEO básica (meta etiquetas, estructura, velocidad). Para SEO avanzado ofrecemos planes mensuales.";
  }
  if (includesAny(lowerMsg, ["diseño", "rediseño", "logo", "branding"])) {
    return "Hacemos diseño web 100% personalizado y moderno. También podemos ayudarte con tu Logo y Branding si lo necesitas.";
  }

  for (const item of FAQ_DATA) {
    if (lowerMsg.includes(item.q.toLowerCase())) {
      return item.a;
    }
  }
  
  return null;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const localResponse = findLocalResponse(message);
    if (localResponse) {
      Logger.info("Chatbot used local response");
      return NextResponse.json({ reply: localResponse });
    }
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("No OpenAI Key configured");
      }

      const faqContext = FAQ_DATA
        .map(f => `Q: ${f.q}\nA: ${f.a}`)
        .join("\n\n");

      const systemPrompt = `${WEBSITE_CONTEXT}

INFORMACIÓN FRECUENTE (FAQ):
${faqContext}

Respondé de forma clara, breve y profesional.
Si la pregunta no tiene relación con desarrollo web o la agencia, amablemente indica que tu propósito es asistir con consultas sobre TuWebIdeal.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      const reply = completion.choices[0].message.content;
      return NextResponse.json({ reply: reply });

    } catch (aiError) {
      Logger.warn("OpenAI failed or not configured, using fallback.", aiError);
      
      return NextResponse.json({ 
        reply: "Lo siento, en este momento no puedo procesar consultas complejas. Por favor contáctanos directamente a contacto@tuwebideal.com para asistencia personalizada." 
      });
    }

  } catch (error) {
    Logger.error("Critical error in chat route:", error);
    return NextResponse.json(
      { reply: "Hubo un error inesperado. Por favor intenta más tarde." },
      { status: 200 } 
    );
  }
}
