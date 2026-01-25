"use client";

import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import Logger from "@/lib/logger";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContratarPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const planSlug = searchParams.get("plan");
  const {plans} = useData();
  const plan = plans.find((plan) => plan.slug === planSlug);
  const t = useTranslations("Hire");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    targetAudience: "",
    description: "",
    designPreferences: "",
    colors: "",
    referenceSites: "",
    pages: "",
    functionalities: "",
    contentReady: "no",
    additionalNotes: "",
    discountCode: "",
  });
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/contratar?plan=${planSlug}`);
    }
  }, [user, loading, router, planSlug]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        {t("loading")}
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + referenceImages.length > 5) {
      alert(t("alerts.max_images"));
      return;
    }
    setReferenceImages([...referenceImages, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setReferenceImages(referenceImages.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (step === 1) {
      if (
        !formData.businessName ||
        !formData.industry ||
        !formData.targetAudience ||
        !formData.description
      ) {
        alert(t("alerts.complete_fields"));
        return;
      }
    } else if (step === 2) {
      if (
        !formData.designPreferences ||
        !formData.colors ||
        !formData.referenceSites
      ) {
        alert(t("alerts.complete_fields"));
        return;
      }
    } else if (step === 3) {
      if (!formData.pages || !formData.functionalities) {
        alert(t("alerts.complete_fields"));
        return;
      }
    }
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step !== 4 || !isSubmitting) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("plan", plan.slug);
      formDataToSend.append("requirements", JSON.stringify(formData));
      formDataToSend.append("discountCode", formData.discountCode);

      referenceImages.forEach((file) => {
        formDataToSend.append("referenceImages", file);
      });

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Error al crear el pedido");
      }

      const data = await response.json();
      router.push("/dashboard");
    } catch (error) {
      Logger.error("Error submitting order:", error);
      alert(t("alerts.error_create"));
    }
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("title")} {plan.name}
          </h1>
          <p className="text-foreground/60">
            {t("subtitle")}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4 text-sm font-medium text-foreground/40">
            <span className={step >= 1 ? "text-primary" : ""}>
              {t("steps.business")}
            </span>
            <span className={step >= 2 ? "text-primary" : ""}>
              {t("steps.design")}
            </span>
            <span className={step >= 3 ? "text-primary" : ""}>
              {t("steps.functionality")}
            </span>
            <span className={step >= 4 ? "text-primary" : ""}>
              {t("steps.confirm")}
            </span>
          </div>
          <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-foreground/10 rounded-3xl p-8 shadow-2xl max-md:px-3 "
        >
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t("business_step.title")}
              </h2>
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("business_step.name_label")}
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:outline-none placeholder:text-foreground/40"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("business_step.industry_label")}
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:outline-none placeholder:text-foreground/40"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("business_step.audience_label")}
                </label>
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:outline-none placeholder:text-foreground/40"
                  placeholder={t("business_step.audience_placeholder")}
                  required
                />
              </div>
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("business_step.desc_label")}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:outline-none h-32 placeholder:text-foreground/40"
                  placeholder={t("business_step.desc_placeholder")}
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t("design_step.title")}
              </h2>
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("design_step.style_label")}
                </label>
                <input
                  type="text"
                  name="designPreferences"
                  value={formData.designPreferences}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:outline-none placeholder:text-foreground/40"
                  placeholder={t("design_step.style_placeholder")}
                  required
                />
              </div>
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("design_step.colors_label")}
                </label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:outline-none placeholder:text-foreground/40"
                  placeholder={t("design_step.colors_placeholder")}
                  required
                />
              </div>
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("design_step.reference_label")}
                </label>
                <textarea
                  name="referenceSites"
                  value={formData.referenceSites}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:outline-none h-32 placeholder:text-foreground/40"
                  placeholder={t("design_step.reference_placeholder")}
                  required
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("design_step.images_label")}
                </label>
                <p className="text-sm text-foreground/60 mb-3">
                  {t("design_step.images_help")}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="inline-block px-6 py-3 bg-primary/20 border border-primary/30 rounded-xl text-primary font-medium hover:bg-primary/30 transition-all cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 inline mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {t("design_step.select_images")}
                </label>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-foreground/10"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t("func_step.title")}
              </h2>
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("func_step.pages_label")}
                </label>
                <input
                  type="text"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:outline-none placeholder:text-foreground/40"
                  placeholder={t("func_step.pages_placeholder")}
                  required
                />
              </div>
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("func_step.func_label")}
                </label>
                <textarea
                  name="functionalities"
                  value={formData.functionalities}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:outline-none h-24 placeholder:text-foreground/40"
                  placeholder={t("func_step.func_placeholder")}
                  required
                />
              </div>
              <div>
                <label className="block text-foreground/80 mb-2">
                  {t("func_step.content_label")}
                </label>
                <select
                  name="contentReady"
                  value={formData.contentReady}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="si">{t("func_step.content_options.yes")}</option>
                  <option value="parcial">{t("func_step.content_options.partial")}</option>
                  <option value="no">{t("func_step.content_options.no")}</option>
                </select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t("confirm_step.title")}
              </h2>
              <div className="bg-foreground/5 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-primary">
                  {t("confirm_step.summary_title")}
                </h3>
                <p className="text-foreground/80">
                  <span className="font-bold">{t("confirm_step.plan_label")}</span> {plan.name} ($
                  {plan.price})
                </p>
                <p className="text-foreground/80">
                  <span className="font-bold">{t("confirm_step.business_label")}</span>{" "}
                  {formData.businessName}
                </p>
                <p className="text-foreground/80">
                  <span className="font-bold">{t("confirm_step.industry_label")}</span>{" "}
                  {formData.industry}
                </p>
                <div className="h-px bg-foreground/10 my-4" />
                <p className="text-sm text-foreground/60">
                  {t("confirm_step.disclaimer")}
                </p>
                <div className="h-px bg-foreground/10 my-4" />
                <div>
                  <label className="block text-foreground/80 mb-2 text-sm">
                    {t("confirm_step.discount_label")}
                  </label>
                  <input
                    type="text"
                    name="discountCode"
                    value={formData.discountCode}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    placeholder={t("confirm_step.discount_placeholder")}
                    className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg text-foreground focus:border-primary focus:outline-none text-sm placeholder:text-foreground/40"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-3 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground font-bold hover:bg-foreground/10 transition-all"
              >
                {t("buttons.back")}
              </button>
            ) : (
              <div /> 
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-primary rounded-xl text-white font-bold hover:bg-primary/90 transition-all"
              >
                {t("buttons.next")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsSubmitting(true);
                  const form = document.querySelector("form");
                  if (form) form.requestSubmit();
                }}
                className="px-10 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-bold hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all"
              >
                {t("buttons.submit")}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
