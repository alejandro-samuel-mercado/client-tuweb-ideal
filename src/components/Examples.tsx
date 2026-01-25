"use client";
import { API_URL } from "@/config";
import Logger from "@/lib/logger";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface ExampleProject {
  id: number;
  title: string;
  description: string;
  description_en?: string;
  imageUrl: string;
  category: string;
  url?: string;
}

export default function Examples() {
  const t = useTranslations("Examples");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState<ExampleProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/content/example-projects`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          Logger.error("Projects data is not an array:", data);
          setProjects([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        Logger.error("Error fetching projects:", err);
        setProjects([]);
        setLoading(false);
      });
  }, []);


  const dbCategories = [...new Set(projects.map((p) => p.category))];
  const categories = ["all", ...dbCategories];
  
  const filteredExamples = projects
    .filter(p => locale === 'en' ? !!p.description_en : !!p.description)
    .filter(p => activeCategory === 'all' || p.category === activeCategory);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-background flex justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-secondary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t("title_start")}{" "}
            <span className="gradient-text">
              {t("title_highlight")}
            </span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg scale-105 border-primary"
                  : "bg-foreground/5 border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/10 hover:border-foreground/30"
              }`}
            >
              {category === "all" ? t("categories.all") : category}
            </button>
          ))}
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.map((example) => (
            <div
              key={example.id}
              className="bg-background/40 backdrop-blur-lg border border-foreground/10 rounded-xl overflow-hidden hover:scale-105 transition-all group shadow-sm"
            >
              {/* Image */}
              <div className="relative h-48 bg-foreground/5 overflow-hidden">
                <img
                  src={example.imageUrl}
                  alt={example.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                  {example.url && (
                    <a
                      href={example.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-all bg-white/20 backdrop-blur-sm px-6 py-2 rounded-lg"
                    >
                      {t("view_site")}
                    </a>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {example.title}
                  </h3>
                  <span className="bg-gradient-to-r from-primary to-secondary px-2 py-1 rounded text-xs font-medium text-white">
                    {example.category}
                  </span>
                </div>
                <p className="text-foreground/60 text-sm">
                  {locale === 'en' ? (example.description_en || example.description) : example.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
