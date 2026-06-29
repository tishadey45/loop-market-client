/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

export default function SuccessStories() {
  const stories = [
    {
      id: 1,
      name: "Tahmid Rahman",
      role: "Verified Seller",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      text: "আমি লুপ মার্কেটে আমার পুরনো ক্যামেরাটা মাত্র ৩ দিনের মধ্যে ভালো দামে বিক্রি করতে পেরেছি! সেলার ড্যাশবোর্ড এবং মেসেজিং সিস্টেম খুবই চমৎকার ছিল।",
      rating: 5,
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      role: "Happy Buyer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      text: "বিশ্বস্ত কোনো সোর্স থেকে প্রি-লভড ল্যাপটপ কেনার ট্রাস্ট পাচ্ছিলাম না। এখানে এসে ইউজারের রেটিং দেখে একদম অথেনটিক একটি প্রোডাক্ট পেয়েছি।",
      rating: 5,
    }
  ];

  return (
    <div className="py-20 bg-gray-50/50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-5">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900">Success Stories From Our Community</h2>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-2xl border border-gray-100 shadow-xs p-8 relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <Quote className="absolute top-6 right-8 text-emerald-100" size={50} />
              
              <div>
                {/* Ratings */}
                <div className="flex gap-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Story text */}
                <p className="text-gray-600 text-sm leading-7 mb-6 italic">
                  &ldquo;{story.text}&rdquo;
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-4 border-t pt-4 border-gray-50">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{story.name}</h4>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                    {story.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}