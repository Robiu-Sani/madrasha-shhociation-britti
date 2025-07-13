import React from "react";
import {
  HeartHandshake,
  CalendarDays,
  Laptop,
  BookHeart,
  Clock,
} from "lucide-react";

const VolunteerOpportunities = () => {
  const programs = [
    {
      title: "মাদ্রাসা উন্নয়ন কর্মসূচি",
      description: "স্থানীয় মাদ্রাসাগুলোর অবকাঠামো উন্নয়নে সহায়তা",
      commitment: "সাপ্তাহিক ১০-১৫ ঘন্টা",
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "শিক্ষা সহায়তা প্রোগ্রাম",
      description: "পিছিয়ে পড়া শিক্ষার্থীদের বিশেষ ক্লাস নেওয়া",
      commitment: "সপ্তাহে ২ দিন",
      icon: <BookHeart className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "ডিজিটাল স্বেচ্ছাসেবক",
      description: "ওয়েবসাইট ডেভেলপমেন্ট, কন্টেন্ট ক্রিয়েশন",
      commitment: "নমনীয় সময়",
      icon: <Laptop className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "ইভেন্ট ম্যানেজমেন্ট",
      description: "বছরব্যাপী বিভিন্ন কর্মসূচির আয়োজনে সহায়তা",
      commitment: "ইভেন্ট ভিত্তিক",
      icon: <CalendarDays className="w-6 h-6 text-amber-600" />,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            স্বেচ্ছাসেবক কর্মসূচিসমূহ
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            আপনার দক্ষতা ও সময় দিয়ে ইসলামী শিক্ষার প্রসারে অবদান রাখুন
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex items-start">
                <div className="bg-emerald-50 p-3 rounded-lg mr-4">
                  {program.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{program.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{program.commitment}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                স্বেচ্ছাসেবক হওয়ার সুবিধা
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-emerald-200 mr-2">•</span>
                  <span>প্রশিক্ষণ ও দক্ষতা উন্নয়নের সুযোগ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-200 mr-2">•</span>
                  <span>জাতীয় পর্যায়ের নেটওয়ার্কিং</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-200 mr-2">•</span>
                  <span>সনদপত্র ও সুপারিশ লেটার</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-200 mr-2">•</span>
                  <span>বার্ষিক সম্মাননা সন্মেলনে আমন্ত্রণ</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <h4 className="font-bold mb-4 text-emerald-100">
                  আবেদনের যোগ্যতা
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-white/90">
                    <span className="bg-white/20 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2">
                      ✓
                    </span>
                    <span>ন্যূনতম ১৮ বছর</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="bg-white/20 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2">
                      ✓
                    </span>
                    <span>ইসলামী মূল্যবোধে আস্থা</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="bg-white/20 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2">
                      ✓
                    </span>
                    <span>নূন্যতম ৩ মাসের অঙ্গীকার</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <span className="bg-white/20 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2">
                      ✓
                    </span>
                    <span>টিমওয়ার্কের মানসিকতা</span>
                  </div>
                </div>
                <button className="mt-6 px-6 py-3 bg-white text-emerald-600 rounded-lg font-bold hover:bg-gray-100 transition-all w-full">
                  স্বেচ্ছাসেবক ফর্ম
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerOpportunities;
