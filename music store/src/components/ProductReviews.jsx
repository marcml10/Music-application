import { useState } from "react";

export default function ProductReviews({ rating, reviewCount, isLoggedIn, onLoginRequest }) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Alex M.",
      date: "2 days ago",
      rating: 5,
      title: "Absolutely incredible clarity",
      text: "I've been using these for professional studio work and the frequency response is flat and true. You can hear every subtle detail in the mix."
    },
    {
      id: 2,
      name: "Sarah T.",
      date: "1 week ago",
      rating: 5,
      title: "Worth every penny",
      text: "Upgraded from a budget setup and the difference is night and day. The build quality feels premium and they look great on my desk."
    },
    {
      id: 3,
      name: "David K.",
      date: "2 months ago",
      rating: 4,
      title: "Great sound, slightly heavy",
      text: "The audio performance is flawless. My only minor complaint is that it's a bit heavier than I expected, but that probably speaks to the solid construction."
    }
  ];

  const handleWriteReview = () => {
    if (isLoggedIn) {
      setShowReviewForm(true);
    } else {
      onLoginRequest?.();
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-6 md:p-10 shadow-2xl border border-slate-100 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill={i < Math.floor(rating) ? "#FCA5A5" : "#E5E7EB"}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xl font-bold text-slate-900">{Number(rating).toFixed(1)} out of 5</span>
          </div>
          <p className="text-sm text-slate-500 mt-1">Based on {reviewCount} verified ratings</p>
        </div>
        
        <button 
          onClick={handleWriteReview}
          className="bg-slate-50 text-slate-900 border border-slate-200 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors whitespace-nowrap"
        >
          Write a Review
        </button>
      </div>

      {/* Write Review Form */}
      {showReviewForm && (
        <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100 animate-fade-in">
          <h3 className="font-bold text-lg text-slate-900 mb-4">Write a Review</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
              <div className="flex gap-1 cursor-pointer">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-300 hover:text-red-300 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input type="text" placeholder="Summarize your experience" className="w-full border-slate-200 rounded-lg p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Review</label>
              <textarea rows={4} placeholder="What did you like or dislike?" className="w-full border-slate-200 rounded-lg p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowReviewForm(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">Cancel</button>
              <button onClick={() => setShowReviewForm(false)} className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800">Submit Review</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center flex-shrink-0">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill={i < review.rating ? "#FCA5A5" : "#E5E7EB"}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{review.date}</span>
                </div>
              </div>
            </div>
            
            <h5 className="font-bold text-slate-800 mb-2">{review.title}</h5>
            <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
