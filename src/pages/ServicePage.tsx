import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Link, useParams, Navigate } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";

const serviceData = {
  "design": {
    title: "Editorial Design",
    badge: "Visual Excellence",
    video: "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8",
    description: "Every pixel is intentional. Our AI studies what works across thousands of top sites—then builds yours to outperform them all. We focus on conversion, performance, and aesthetic prestige.",
    features: [
      "Custom layout generation based on brand guidelines",
      "Dynamic typography systems with perfect legibility",
      "Liquid glass (glassmorphism) interface components",
      "Responsive optimization for all device tiers"
    ]
  },
  "ai-engine": {
    title: "AI Engine",
    badge: "Machine Intelligence",
    video: "https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8",
    description: "Your site evolves on its own. AI monitors every click, scroll, and conversion—then optimizes in real time. No manual updates. Ever.",
    features: [
      "Real-time A/B testing and layout optimization",
      "Behavioral analysis of visitor interactions",
      "Automatic content adjustments for personalization",
      "Predictive performance scaling and asset management"
    ]
  }
};

export default function ServicePage() {
  const { slug } = useParams();
  const service = serviceData[slug as keyof typeof serviceData];

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <VideoBackground
          src={service.video}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        <div className="relative z-10 text-center space-y-6 px-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="liquid-glass rounded-full px-4 py-1 text-xs text-white/80 mx-auto w-fit uppercase tracking-widest">
            {service.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-heading italic text-white tracking-tight leading-none">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-8 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="flex-[1.5] space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-heading italic text-white">Wildly reimagined experiences.</h2>
              <p className="text-white/60 font-body font-light text-lg leading-relaxed">
                {service.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12">
               {service.features.map((feature, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="flex gap-4 p-6 liquid-glass rounded-2xl"
                 >
                    <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
                    <p className="text-white/70 font-body font-light text-sm">{feature}</p>
                 </motion.div>
               ))}
            </div>
          </div>

          <div className="flex-1">
             <div className="sticky top-32 liquid-glass rounded-[2.5rem] p-10 space-y-8">
                <h3 className="text-2xl font-heading italic text-white leading-tight">Ready to build the future?</h3>
                <p className="text-white/50 font-body font-light text-sm italic">
                  Join 200+ companies using AI to redefine their digital presence.
                </p>
                <Link to="/auth" className="block w-full liquid-glass-strong rounded-full py-4 text-center text-white font-medium hover:scale-105 transition-transform">
                  Get Started
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
