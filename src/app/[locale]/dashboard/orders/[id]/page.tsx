"use client";

import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import Logger from "@/lib/logger";
import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { use, useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  content: string;
  imageUrl?: string;
  sender: {
    id: number;
    name: string;
    role: string;
  };
  createdAt: string;
}

interface Order {
  id: number;
  plan: string;
  status: string;
  timeline: {
    steps: {
      title: string;
      status: "completed" | "current" | "pending";
      date: string | null;
    }[];
  };
  deliveryDate?: string;
  messages: Message[];
  project?: {
    name: string;
    url: string;
    adminPanelUrl: string;
    adminUsername?: string;
    adminPassword?: string;
    documentationUrl: string;
    description: string;
  };
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user, loading } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [prevMessageCount, setPrevMessageCount] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("OrderDetails");

  const fetchOrder = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      Logger.error("Error fetching order", error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchOrder();
      const interval = setInterval(fetchOrder, 5000);
      return () => clearInterval(interval);
    }
  }, [user, id]);

  useEffect(() => {
    if (!order?.messages) return;

    const currentCount = order.messages.length;
    const hasNewMessages = currentCount > prevMessageCount;

    if (isInitialLoad || (hasNewMessages && shouldAutoScroll)) {
      if (chatContainerRef.current) {
        const container = chatContainerRef.current;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: isInitialLoad ? "auto" : "smooth",
        });
      }
      if (isInitialLoad) setIsInitialLoad(false);
    }

    if (currentCount !== prevMessageCount) {
      setPrevMessageCount(currentCount);
    }
  }, [order?.messages, shouldAutoScroll, prevMessageCount, isInitialLoad]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedImage) return;

    try {
      const formData = new FormData();
      formData.append("content", newMessage);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await fetch(
        `${API_URL}/api/orders/${id}/messages`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (res.ok) {
        setNewMessage("");
        setSelectedImage(null);
        setImagePreview(null);
        setShouldAutoScroll(true);
        fetchOrder();
      }
    } catch (error) {
      Logger.error("Error sending message", error);
    }
  };

  if (loading || !user || !order) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
          >
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("title_prefix")}{order.id.toString().padStart(4, "0")}
            </h1>
            <p className="text-foreground/60 capitalize">{t("plan_prefix")} {order.plan}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="fixed bottom-15 right-6 z-50 animate-bounce ">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 text-white p-2 rounded-full shadow-2xl hover:bg-green-500 transition-all group w-16 h-16"
              >
                <div className="w-8 h-8 flex items-center justify-center m-auto">
                  <svg
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
              </a>
            </div>

            {(order.status === "PENDING" ||
              order.status === "PAYMENT_PENDING") && (
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg
                    className="w-24 h-24 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span>🚀</span> {t("payment.title")}
                </h2>
                <p className="text-foreground/80 mb-6 text-lg leading-relaxed">
                  {t("payment.desc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      const chatInput = document.querySelector(
                        'input[placeholder="' + t("chat.placeholder") + '"]'
                      ) as HTMLInputElement;
                      if (chatInput) {
                        chatInput.value =
                          t("payment.chat_template") +
                          order.id;
                        chatInput.focus();
                      }
                    }}
                    className="flex-1 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    <span>💬</span> {t("payment.chat_button")}
                  </button>
                  <a
                    href="https://wa.me/1234567890" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition-all flex items-center justify-center gap-2"
                  >
                    <span>📱</span> {t("payment.whatsapp_button")}
                  </a>
                </div>
              </div>
            )}

            {order.deliveryDate && order.status !== "FINISHED" && (
              <div className="bg-foreground/5 border border-foreground/10 rounded-3xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl text-primary">
                  📅
                </div>
                <div>
                  <div className="text-sm text-foreground/60">
                    {t("delivery.label")}
                  </div>
                  <div className="text-xl font-bold text-foreground">
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}

            {order.status !== "FINISHED" && (
              <div className="bg-card border border-foreground/10 rounded-3xl p-8">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  {t("timeline.title")}
                </h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-foreground/20 before:to-transparent">
                  {order.timeline?.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 bg-card group-[.is-active]:bg-primary group-[.is-active]:border-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        {step.status === "completed" ? (
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : step.status === "current" ? (
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        ) : (
                          <div className="w-3 h-3 bg-foreground/30 rounded-full" />
                        )}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-foreground/10 bg-foreground/5 shadow">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                          <div className="font-bold text-foreground">
                            {step.title}
                          </div>
                          {step.date && (
                            <time className="font-caveat font-medium text-primary">
                              {new Date(step.date).toLocaleDateString()}
                            </time>
                          )}
                        </div>
                        <div className="text-foreground/60 text-sm">
                          {step.status === "completed"
                            ? t("timeline.status.completed")
                            : step.status === "current"
                            ? t("timeline.status.current")
                            : t("timeline.status.pending")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Proyecto Terminado - Vista Detallada */}
            {order.status === "FINISHED" && order.project && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 border border-green-500/30 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-3xl">
                      🎉
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {t("finished.title")}
                      </h2>
                      <h3 className="text-xl text-green-500 font-medium">
                        {order.project.name || t("finished.default_name")}
                      </h3>
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-8 text-lg leading-relaxed">
                    {order.project.description ||
                      t("finished.default_desc")}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <a
                      href={order.project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-background/50 rounded-xl border border-foreground/10 hover:bg-foreground/5 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        🌐
                      </div>
                      <div>
                        <div className="font-bold text-foreground">
                          {t("finished.visit_site.title")}
                        </div>
                        <div className="text-sm text-foreground/60">
                          {t("finished.visit_site.desc")}
                        </div>
                      </div>
                    </a>
                    <a
                      href={order.project.adminPanelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-background/50 rounded-xl border border-foreground/10 hover:bg-foreground/5 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        ⚙️
                      </div>
                      <div>
                        <div className="font-bold text-foreground">
                          {t("finished.admin_panel.title")}
                        </div>
                        <div className="text-sm text-foreground/60">
                          {t("finished.admin_panel.desc")}
                        </div>
                      </div>
                    </a>
                  </div>

                  {(order.project.adminUsername ||
                    order.project.adminPassword) && (
                    <div className="bg-black/80 rounded-xl p-6 border border-white/10 mb-8">
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-yellow-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        {t("finished.credentials.title")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/10 p-3 rounded-lg">
                          <span className="text-xs text-gray-400 uppercase block mb-1">
                            {t("finished.credentials.user")}
                          </span>
                          <code className="text-green-400 font-mono">
                            {order.project.adminUsername}
                          </code>
                        </div>
                        <div className="bg-white/10 p-3 rounded-lg">
                          <span className="text-xs text-gray-400 uppercase block mb-1">
                             {t("finished.credentials.password")}
                          </span>
                          <code className="text-green-400 font-mono">
                            {order.project.adminPassword}
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  {order.project.documentationUrl && (
                    <a
                      href={order.project.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-foreground/10 hover:bg-foreground/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold text-foreground">
                            {t("finished.documentation.title")}
                          </div>
                          <div className="text-sm text-foreground/60">
                            {t("finished.documentation.desc")}
                          </div>
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-foreground/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-foreground/10 rounded-3xl h-[600px] flex flex-col overflow-hidden sticky top-32">
              <div className="p-6 border-b border-foreground/10 bg-foreground/5">
                <h2 className="text-lg font-bold text-foreground">
                  {t("chat.title")}
                </h2>
                <p className="text-sm text-foreground/60">
                 {t("chat.subtitle")}
                </p>
              </div>

              <div
                ref={chatContainerRef}
                onScroll={handleScroll}
                className="flex-grow overflow-y-auto p-5 space-y-4 bg-background/50 custom-scrollbar"
              >
                {order.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender.role === "CLIENT" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm ${
                        msg.sender.role === "CLIENT"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-foreground/10 text-foreground rounded-bl-none"
                      }`}
                    >
                      {msg.imageUrl && (
                        <img
                          src={`${API_URL}${msg.imageUrl}`}
                          alt="Uploaded content"
                          className="max-w-full rounded-lg mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() =>
                            window.open(
                              `${API_URL}${msg.imageUrl}`,
                              "_blank"
                            )
                          }
                        />
                      )}
                      {msg.content && <p>{msg.content}</p>}
                    </div>
                    <span className="text-[10px] text-foreground/40 mt-1.5 px-1 font-medium">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={handleSendMessage}
                className="p-4 bg-card border-t border-foreground/10"
              >
                {imagePreview && (
                  <div className="mb-4 relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border border-foreground/20"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
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
                )}
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-12 h-12 flex-shrink-0 bg-foreground/5 rounded-2xl text-foreground hover:bg-foreground/10 transition-all border border-foreground/10 flex items-center justify-center"
                  >
                    <svg
                      className="w-6 h-6"
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
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={t("chat.placeholder")}
                    className="flex-grow min-w-0 px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-2xl text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-foreground/40"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() && !selectedImage}
                    className="w-12 h-12 flex-shrink-0 bg-primary rounded-2xl text-white hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
