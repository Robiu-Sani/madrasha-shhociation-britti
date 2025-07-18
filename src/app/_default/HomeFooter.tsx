"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Users,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const HomeFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 text-white pt-16 pb-8 px-4 relative overflow-hidden">
      {/* Decorative gradient lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-emerald-400/10 blur-2xl"></div>
      <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-teal-500/10 blur-2xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                width={50}
                height={50}
                alt="মাদ্রাসা এসোসিয়েশন লোগো"
                className="rounded-lg"
              />
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-200">
                মাদ্রাসা এসোসিয়েশন
              </h3>
            </div>
            <p className="text-teal-100">
              ইসলামী শিক্ষা ও মূল্যবোধের বিকাশে নিবেদিত মাদ্রাসাগুলোর জন্য একটি
              ঐক্যবদ্ধ প্ল্যাটফর্ম।
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="#"
                className="text-emerald-300 hover:text-white transition-all hover:scale-110"
              >
                <BookOpen size={20} />
              </Link>
              <Link
                href="#"
                className="text-emerald-300 hover:text-white transition-all hover:scale-110"
              >
                <Users size={20} />
              </Link>
              <Link
                href="#"
                className="text-emerald-300 hover:text-white transition-all hover:scale-110"
              >
                <GraduationCap size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-emerald-400/30">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-3">
              {[
                "আমাদের ইতিহাস",
                "সদস্য মাদ্রাসাসমূহ",
                "একাডেমিক ক্যালেন্ডার",
                "পরীক্ষা ব্যবস্থাপনা",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-teal-100 hover:text-emerald-300 hover:pl-2 transition-all flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-emerald-400/30">
              যোগাযোগ
            </h4>
            <ul className="space-y-4 text-teal-100">
              <li className="flex items-start gap-3">
                <MapPin
                  className="text-emerald-400 mt-1 flex-shrink-0"
                  size={16}
                />
                <span>১২৩ ইসলামী রোড, ঢাকা-১২০৬</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="text-emerald-400 mt-1 flex-shrink-0"
                  size={16}
                />
                <span>info@madrasa-association.org</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="text-emerald-400 mt-1 flex-shrink-0"
                  size={16}
                />
                <span>+৮৮০ ১২৩৪ ৫৬৭৮৯</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-emerald-400/30">
                সামাজিক যোগাযোগ
              </h4>
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: <Facebook size={18} />, label: "Facebook" },
                  { icon: <Youtube size={18} />, label: "YouTube" },
                  { icon: <Twitter size={18} />, label: "Twitter" },
                  { icon: <Instagram size={18} />, label: "Instagram" },
                  { icon: <Linkedin size={18} />, label: "LinkedIn" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href="#"
                    className="p-2 rounded-full bg-white/5 hover:bg-emerald-600/20 backdrop-blur border border-emerald-400/20 hover:border-emerald-500 text-white transition-all"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3 pb-2 border-b border-emerald-400/30">
                নিউজলেটার
              </h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল লিখুন"
                  className="px-3 py-2 rounded-lg placeholder:text-white bg-white/5 border border-emerald-400/20 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 flex-grow text-sm placeholder-teal-200/70 text-white backdrop-blur"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30"
                >
                  সাবমিট
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-teal-600/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-teal-200 text-sm">
            © {new Date().getFullYear()} মাদ্রাসা এসোসিয়েশন. সর্বস্বত্ব
            সংরক্ষিত।
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {["গোপনীয়তা নীতি", "ব্যবহারের শর্তাবলী", "সহায়তা"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-teal-200 hover:text-emerald-400 text-sm transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
