"use client";

import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import Logger from "@/lib/logger";
import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaBoxOpen, FaClock, FaPlus, FaRocket } from "react-icons/fa";

interface Order {
  id: number;
  plan: string;
  status: string;
  createdAt: string;
  project?: {
    url: string;
  };
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const t = useTranslations("Dashboard");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders);
        }
      } catch (error) {
        Logger.error("Error fetching orders", error);
      } finally {
        setFetching(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading || !user || fetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
      case "ACCEPTED":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "IN_PROGRESS":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "FINISHED":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      default:
        return "bg-foreground/5 text-foreground/60 border-foreground/10";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return t("projects.status.pending");
      case "ACCEPTED":
        return t("projects.status.accepted");
      case "IN_PROGRESS":
        return t("projects.status.in_progress");
      case "FINISHED":
        return t("projects.status.finished");
      default:
        return status;
    }
  };

  const activeOrders = orders.filter(o => o.status === 'IN_PROGRESS' || o.status === 'ACCEPTED').length;
  const finishedOrders = orders.filter(o => o.status === 'FINISHED').length;

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {t("welcome", { name: user.name?.split(' ')[0] })}
            </h1>
            <p className="text-foreground/60 text-lg">{t("subtitle")}</p>
          </div>
          <Link
            href="/#planes"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
          >
           <FaPlus className="text-sm" /> {t("new_project")}
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass p-6 rounded-3xl border border-foreground/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FaBoxOpen className="text-6xl text-primary" />
                </div>
                <h3 className="text-foreground/60 font-medium mb-2">{t("stats.total")}</h3>
                <p className="text-4xl font-bold">{orders.length}</p>
            </div>

            <div className="glass p-6 rounded-3xl border border-foreground/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FaRocket className="text-6xl text-purple-500" />
                </div>
                <h3 className="text-foreground/60 font-medium mb-2">{t("stats.in_progress")}</h3>
                <p className="text-4xl font-bold text-purple-500">{activeOrders}</p>
            </div>

             <div className="glass p-6 rounded-3xl border border-foreground/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FaClock className="text-6xl text-green-500" />
                </div>
                <h3 className="text-foreground/60 font-medium mb-2">{t("stats.finished")}</h3>
                <p className="text-4xl font-bold text-green-500">{finishedOrders}</p>
            </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Orders List */}
            <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FaBoxOpen className="text-primary" /> {t("projects.title")}
                </h2>

                {orders.length === 0 ? (
                <div className="glass border border-foreground/5 rounded-3xl p-12 text-center">
                    <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">🚀</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">
                    {t("projects.empty.title")}
                    </h2>
                    <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                    {t("projects.empty.desc")}
                    </p>
                    <Link href="/#planes" className="text-primary font-bold hover:underline">{t("projects.empty.link")}</Link>
                </div>
                ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                    <Link
                        key={order.id}
                        href={`/dashboard/orders/${order.id}`}
                        className="block glass border border-foreground/5 rounded-2xl p-6 hover:border-primary/30 transition-all hover:shadow-lg group"
                    >
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-bold text-lg capitalize">Plan {order.plan}</span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                        {getStatusLabel(order.status)}
                                    </span>
                                </div>
                                <p className="text-sm text-foreground/50">{t("projects.order_prefix")}{order.id.toString().padStart(4, "0")} • {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            
                            <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                                {t("projects.details")} 
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
                )}
            </div>

            {/* Sidebar / Quick Actions */}
            <div className="space-y-6">
                                 <div className="glass border border-foreground/5 rounded-3xl p-6">
                    <h3 className="font-bold mb-4">{t("sidebar.quick_actions")}</h3>
                    <div className="space-y-3">
                        <Link href="/#planes" className="block w-full text-center py-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors text-sm font-medium">
                            {t("sidebar.new_order")}
                        </Link>
                        <Link href="/contacto" className="block w-full text-center py-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors text-sm font-medium">
                            {t("sidebar.contact_support")}
                        </Link>
                    </div>
                 </div>

               
            </div>
        </div>

      </div>
    </main>
  );
}
