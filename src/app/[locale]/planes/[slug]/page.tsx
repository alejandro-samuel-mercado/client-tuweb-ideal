import PlanChatTrigger from "@/components/PlanChatTrigger";
import ThemeGate from "@/components/ThemeGate";
import { Plan } from "@/data/plans";
import { Link } from "@/navigation";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { API_URL } from "@/config";

export const dynamic = "force-dynamic";

async function getPlan(slug: string): Promise<Plan | null> {
    if (!API_URL) {
        console.error("API_URL is not defined in environment variables");
        return null;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        console.log(`Fetching plan for slug: ${slug} from ${API_URL}`);

        const res = await fetch(`${API_URL}/api/content/plans`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            console.error(`Failed to fetch plans: ${res.status}`);
            return null;
        }

        const plans: Plan[] = await res.json();
        return plans.find((p) => p.slug === slug) || null;
    } catch (error) {
        console.error("Error fetching plan from API:", error);
        return null;
    }
}


interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const plan = await getPlan(slug);
    if (!plan) return { title: "Plan No Encontrado" };
    return { title: `Plan ${plan.name} - TuWebIdeal`, description: plan.tagline };
}


export default async function PlanPage({ params }: Props) {
    const { slug, locale } = await params;
    setRequestLocale(locale);

    const plan = await getPlan(slug);
    if (!plan) notFound();

    const t = await getTranslations("PlanDetails");
    const tNav = await getTranslations("Navbar");


    return (
        <ThemeGate>
            <div className="min-h-screen text-foreground pt-32 pb-20 overflow-hidden relative">
                {/* Background Elements */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    {/* Breadcrumb */}
                    <div className="mb-8 flex items-center gap-2 text-sm text-foreground/60 animate-fade-in-up">
                        <Link href="/" className="hover:text-primary transition-colors">
                            {t("links.home")}
                        </Link>
                        <span>/</span>
                        <Link
                            href="/#planes"
                            className="hover:text-primary transition-colors"
                        >
                            {t("breadcrumb")}
                        </Link>
                        <span>/</span>
                        <span className="text-primary">{plan.name}</span>
                    </div>

                    {/* Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 animate-fade-in-up delay-100">
                        <div>
                            {plan.popular && (
                                <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold mb-6 shadow-lg">
                                    ⭐ {t("popular")}
                                </div>
                            )}
                            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
                                Plan <span className="gradient-text">{plan.name}</span>
                            </h1>
                            <p className="text-2xl text-foreground/80 mb-8 font-light leading-relaxed">
                                {plan.tagline}
                            </p>
                            <div className="bg-foreground/5 rounded-3xl p-8 border border-foreground/10 mb-8 inline-block">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-sm font-bold text-foreground/40">$</span>
                                    <span className="text-6xl font-black text-foreground tracking-tighter">
                                        {plan.setupPrice}
                                    </span>
                                    <span className="text-xl font-bold text-foreground/30">USD</span>
                                </div>
                                <div className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">
                                    {t("setup_fee_label") || "Pago Inicial de Activación"}
                                </div>

                                <div className="flex items-center gap-3 py-3 px-4 bg-background/50 rounded-2xl border border-foreground/5 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-foreground/80 font-bold text-sm">
                                        + ${plan.monthlyPrice} / {"mes de abono mensual"}
                                    </span>
                                </div>

                                {/* Monthly Includes Box */}
                                <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 shadow-sm">
                                    <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        {t("monthly_includes.title")}
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {(t.raw("monthly_includes.items") as string[]).map((item, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/80 leading-relaxed">
                                                <svg className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {plan.price_detail && (
                                    <p className="mt-5 text-[11px] text-foreground/40 font-medium italic text-center">
                                        * {plan.price_detail}
                                    </p>
                                )}
                            </div>

                            <p className="text-foreground/70 text-lg mb-10 leading-relaxed">
                                {plan.detailedDescription}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={`/contratar?plan=${plan.slug}`}
                                    className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all text-center"
                                >
                                    {t("buttons.hire")}
                                </Link>
                                <Link
                                    href="/#planes"
                                    className="px-8 py-4 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground font-bold text-lg hover:bg-foreground/10 transition-all text-center"
                                >
                                    {t("buttons.compare")}
                                </Link>
                            </div>
                        </div>

                        {/* Feature Highlight Card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
                            <div className="relative bg-background/60 backdrop-blur-xl border border-foreground/10 rounded-3xl p-8 h-full">
                                <h3 className="text-2xl font-bold text-foreground mb-6">
                                    {t("includes_title")}
                                </h3>
                                <ul className="space-y-4">
                                    {plan.features?.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3 text-foreground/80"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg
                                                    className="w-4 h-4 text-primary"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-lg">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* What You Get Section */}
                    <div className="mb-24 animate-fade-in-up delay-200">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                            {t("what_you_get_title", { name: plan.name })}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {plan.whatYouGet?.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-card border border-foreground/5 rounded-2xl p-8 hover:bg-foreground/5 transition-colors shadow-sm"
                                >
                                    <h3 className="text-xl font-bold text-foreground mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-foreground/70 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Use Cases & Management */}
                    {((plan.useCases?.length ?? 0) > 0 || (plan.management?.length ?? 0) > 0) && (
                        <div className={`grid grid-cols-1 ${((plan.useCases?.length ?? 0) > 0 && (plan.management?.length ?? 0) > 0) ? 'lg:grid-cols-2' : ''} gap-16 mb-24 animate-fade-in-up delay-300`}>
                            {/* Use Cases */}
                            {(plan.useCases?.length ?? 0) > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                                        <span className="text-3xl">🎯</span> {t("ideal_for")}
                                    </h3>
                                    <div className="space-y-4">
                                        {plan.useCases?.map((useCase, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-foreground/5"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                <span className="text-foreground/80">{useCase}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Management */}
                            {(plan.management?.length ?? 0) > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                                        <span className="text-3xl">⚙️</span> {t("management")}
                                    </h3>
                                    <div className="space-y-6">
                                        {plan.management?.map((item, idx) => (
                                            <div key={idx}>
                                                <h4 className="text-lg font-bold text-foreground mb-2">
                                                    {item.title}
                                                </h4>
                                                <p className="text-foreground/60 text-sm">
                                                    {item.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Considerations & Recommendations */}
                    {((plan.recommendations?.length ?? 0) > 0 || (plan.considerations?.length ?? 0) > 0) && (
                        <div className="bg-secondary/5 border border-foreground/10 rounded-3xl p-8 md:p-12 mb-24 animate-fade-in-up delay-400">
                            <div className={`grid grid-cols-1 ${((plan.recommendations?.length ?? 0) > 0 && (plan.considerations?.length ?? 0) > 0) ? 'md:grid-cols-2' : ''} gap-12`}>
                                {(plan.recommendations?.length ?? 0) > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-6 text-primary">
                                            💡 {t("recommendations")}
                                        </h3>
                                        <ul className="space-y-4">
                                            {plan.recommendations?.map((rec, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-3 text-foreground/70 text-sm"
                                                >
                                                    <span className="text-primary mt-1">•</span>
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {(plan.considerations?.length ?? 0) > 0 && (
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-6 text-secondary">
                                            ℹ️ {t("considerations")}
                                        </h3>
                                        <ul className="space-y-4">
                                            {plan.considerations?.map((cons, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-3 text-foreground/70 text-sm"
                                                >
                                                    <span className="text-secondary mt-1">•</span>
                                                    {cons}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Example Projects Gallery */}
                    {(plan.projects && plan.projects.length > 0) && (
                        <div className="mb-24 animate-fade-in-up delay-500">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center flex items-center justify-center gap-3">
                                <span className="text-4xl">✨</span> Proyectos de Ejemplo
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {plan.projects.map((project: any, idx: number) => (
                                    <div key={idx} className="glass-strong rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 group border border-foreground/10 shadow-lg">
                                        <div className="aspect-video relative overflow-hidden bg-foreground/5">
                                            {project.imageUrl && (
                                                <img 
                                                    src={project.imageUrl} 
                                                    alt={project.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                                />
                                            )}
                                        </div>
                                        <div className="p-6 bg-gradient-to-b from-card to-background">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-foreground line-clamp-1">{project.title}</h3>
                                            </div>
                                            <p className="text-foreground/70 text-sm line-clamp-2 max-h-10">{project.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bottom CTA */}
                    <div className="text-center animate-fade-in-up delay-500">
                        <h2 className="text-3xl font-bold text-foreground mb-8">
                            {t("cta.title")}
                        </h2>
                        <Link
                            href={`/contratar?plan=${plan.slug}`}
                            className="inline-block px-12 py-5 bg-foreground text-background rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg"
                        >
                            {t("cta.button", { name: plan.name })}
                        </Link>
                        <p className="mt-6 text-foreground/50">
                            {t("cta.text")} <PlanChatTrigger />
                        </p>
                    </div>
                </div>
            </div></ThemeGate>
    );
}
