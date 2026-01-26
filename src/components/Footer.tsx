"use client";

import { useData } from "@/context/DataContext";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import {
      FaEnvelope,
      FaFacebook,
      FaInstagram,
      FaLinkedin,
      FaMapMarkerAlt,
      FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const { personalData } = useData();
  const t = useTranslations("Footer");

  return (
    <footer className="bg-background border-t border-foreground/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                T
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                TuWebIdeal
              </span>
            </Link>
            <p className="text-foreground/60 leading-relaxed">
              {t("brand_desc")}
            </p>
            <div className="flex gap-4">
              <a
                href={personalData?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href={personalData?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaFacebook size={18} />
              </a>

              {personalData?.linkedin && (
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/60 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <FaLinkedin size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-6">
              {t("links_title")}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/#planes"
                  className="text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t("links.plans")}
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t("links.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t("links.clients")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-6">{t("legal_title")}</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/terminos"
                  className="text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t("links.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t("links.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {t("links.cookies")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-6">{t("contact_title")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-foreground/60">
                <FaMapMarkerAlt className="mt-1 text-primary shrink-0" />
                <span>
                                   {personalData?.address ? `${personalData.address}` : ""} 
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${personalData?.email}`}
                  className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <FaEnvelope className="text-primary shrink-0" />
                  {personalData?.email || "email@..."}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${personalData?.phone?.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <FaWhatsapp className="text-primary shrink-0" />
                  {personalData?.phone || "+123..."}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-foreground/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-sm">
            © {new Date().getFullYear()} TuWebIdeal. {t("rights")}
          </p>
          <div className="flex items-center gap-2 text-sm text-foreground/50">
            <span>{t("made_with")}</span>
            <span className="text-red-500">UnixxTech</span>
            <span>{t("for_entrepreneurs")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

