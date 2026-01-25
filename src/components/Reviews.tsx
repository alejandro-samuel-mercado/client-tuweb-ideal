"use client";

import { API_URL } from "@/config";
import Logger from "@/lib/logger";
import initialReviews from "@/lib/testimonials";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";


export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Reviews");

  useEffect(() => {
    setMounted(true);
    fetch(`${API_URL}/api/reviews`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mappedReviews = data.map((r: any) => ({
            id: r.id,
            name: r.name,
            role: "Cliente Verificado",
            content: r.comment,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.name}`,
            rating: r.rating,
          }));
          setReviews((prev) => [...prev, ...mappedReviews]);
        }
      })
      .catch((err) => Logger.error("Error fetching reviews:", err));
  }, [t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitSuccess(false);
          setNewReview({ name: "", rating: 5, comment: "" });
        }, 2000);
      }
    } catch (error) {
      Logger.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-foreground mb-6"
        >
          {t("title_start")} <span className="gradient-text">{t("title_highlight")}</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-foreground/60 max-w-2xl mx-auto mb-8"
        >
          {t("subtitle")}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-primary/25"
        >
          {t("leave_review_btn")}
        </motion.button>
      </div>

      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

      {/* Marquee Container */}
      <div className="flex w-full overflow-hidden">
        <motion.div 
            className="flex gap-8 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                duration: 40, 
                ease: "linear", 
                repeat: Infinity 
            }}
            whileHover={{ animationPlayState: "paused" }}
        >
            {/* Duplicate list multiple times for seamless infinite scroll */}
            {[...reviews, ...reviews, ...reviews].map((review, idx) => (
            <div
                key={`${review.name}-${idx}`}
                className="w-[400px] flex-shrink-0 p-8 rounded-3xl bg-background/40 border border-foreground/10 backdrop-blur-sm hover:bg-foreground/5 transition-colors shadow-sm"
            >
                <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 p-0.5 border border-primary/30">
                   <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-foreground">{review.name}</h3>
                    <p className="text-sm text-primary">{review.role || "Cliente"}</p>
                </div>
                </div>

                <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <svg
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                </div>

                <p className="text-foreground/70 leading-relaxed italic">"{review.content}"</p>
            </div>
            ))}
        </motion.div>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-foreground/10 rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t("modal.title")}
            </h3>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <p className="text-foreground text-lg">{t("modal.success_msg")}</p>
                <p className="text-foreground/50 text-sm mt-2">
                  {t("modal.moderation_msg")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-foreground/70 mb-1">
                    {t("modal.name_label")}
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground/70 mb-1">
                    {t("modal.rating_label")}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, rating: star })
                        }
                        className={`text-2xl transition-transform hover:scale-110 ${
                          star <= newReview.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-foreground/70 mb-1">
                    {t("modal.comment_label")}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 shadow-lg hover:shadow-primary/30"
                >
                  {submitting ? t("modal.submitting_btn") : t("modal.submit_btn")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
