import { ArrowUpRight, BarChart3, Palette, Play, Shield, Zap, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import BlurText from "../components/BlurText";
import VideoBackground from "../components/VideoBackground";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="home" className="relative overflow-visible h-[1000px] flex flex-col items-center">
      <VideoBackground
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
        className="absolute left-0 w-full h-auto object-contain z-0 top-[20%]"
      />
      <div className="absolute inset-0 bg-black/5 z-0" />
      <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="relative z-10 pt-[150px] flex flex-col items-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="liquid-glass rounded-full px-1 py-1 flex items-center gap-3 pr-4 mb-12"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold">New</span>
          <span className="text-white/80 text-xs font-medium font-body uppercase tracking-wider">Introducing AI-powered web design.</span>
        </motion.div>

        <BlurText
          text="The Website Your Brand Deserves"
          className="text-6xl md:text-7xl lg:text-[7rem] font-heading italic text-white leading-[0.85] max-w-4xl tracking-[-4px]"
        />

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-sm md:text-base text-white/70 font-body font-light leading-tight max-w-lg"
        >
          Stunning design. Blazing performance. Built by AI, refined by experts.{" "}
          <br className="hidden md:block" />
          This is web design, wildly reimagined.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
           animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
           transition={{ delay: 1.1, duration: 0.6 }}
           className="mt-10 flex items-center gap-6"
        >
          <Link to="/auth" className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white font-medium hover:scale-105 transition-transform">
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          
          <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center liquid-glass group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <span className="text-sm font-medium">Watch the Film</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl p-0 bg-black/90 border-white/10 overflow-hidden rounded-3xl aspect-video">
               <div className="relative w-full h-full">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                    title="Product Showcase"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                  <button 
                    onClick={() => setIsVideoOpen(false)}
                    className="absolute top-6 right-6 p-3 rounded-full liquid-glass-strong text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
               </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>


      <div className="mt-auto w-full pb-12 pt-16 px-8 flex flex-col items-center gap-8 bg-gradient-to-t from-black to-transparent">
        <div className="liquid-glass rounded-full px-4 py-2 text-xs text-white/50 font-body tracking-widest uppercase">
          Trusted by the teams behind
        </div>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
           {["Stripe", "Vercel", "Linear", "Notion", "Figma"].map(partner => (
             <span key={partner} className="text-2xl md:text-4xl font-heading italic text-white tracking-tight">
               {partner}
             </span>
           ))}
        </div>
      </div>
    </section>
  );
};

const StartSection = () => {
  return (
    <section id="process" className="relative min-h-[600px] flex items-center justify-center py-24 overflow-hidden">
      <VideoBackground
        src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-black to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white/80 font-body uppercase tracking-[0.2em] mb-8">
          How It Works
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9] mb-8">
          You dream it. <br/> We ship it.
        </h2>
        <p className="text-white/60 font-body font-light text-base md:text-lg max-w-xl mb-12">
          Share your vision. Our AI handles the rest&mdash;wireframes, design, code, launch. 
          All in days, not quarters.
        </p>
        <Link to="/auth" className="liquid-glass-strong rounded-full px-8 py-3.5 text-white font-medium hover:scale-105 transition-transform">
          Get Started
        </Link>
      </div>
    </section>
  );
};

const FeaturesChess = () => {
  return (
    <section id="services" className="py-32 px-8 lg:px-24 space-y-32">
       <div className="flex flex-col md:flex-row items-center gap-16">
         <div className="flex-1 space-y-8">
           <div className="liquid-glass rounded-full px-4 py-1 text-xs text-white/80 w-fit">Capabilities</div>
           <h3 className="text-4xl md:text-5xl font-heading italic text-white leading-tight">Designed to convert. <br/> Built to perform.</h3>
           <p className="text-white/60 font-body font-light leading-relaxed">
             Every pixel is intentional. Our AI studies what works across thousands of top sites&mdash;then builds yours to outperform them all.
           </p>
           <Link to="/services/design" className="liquid-glass-strong rounded-full px-6 py-2.5 text-white block w-fit">Learn more</Link>
         </div>
         <div className="flex-1 liquid-glass rounded-3xl overflow-hidden aspect-video">
           <img 
             src="https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif" 
             className="w-full h-full object-cover" 
             alt="Feature preview"
             referrerPolicy="no-referrer"
           />
         </div>
       </div>

       <div className="flex flex-col md:flex-row-reverse items-center gap-16">
         <div className="flex-1 space-y-8">
           <div className="liquid-glass rounded-full px-4 py-1 text-xs text-white/80 w-fit">AI Engine</div>
           <h3 className="text-4xl md:text-5xl font-heading italic text-white leading-tight">It gets smarter. <br/> Automatically.</h3>
           <p className="text-white/60 font-body font-light leading-relaxed">
             Your site evolves on its own. AI monitors every click, scroll, and conversion&mdash;then optimizes in real time. No manual updates. Ever.
           </p>
           <Link to="/services/ai-engine" className="liquid-glass-strong rounded-full px-6 py-2.5 text-white block w-fit">See how it works</Link>
         </div>
         <div className="flex-1 liquid-glass rounded-3xl overflow-hidden aspect-video">
           <img 
             src="https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif" 
             className="w-full h-full object-cover" 
             alt="AI Optimization"
             referrerPolicy="no-referrer"
           />
         </div>
       </div>
    </section>
  );
};

const FeaturesGrid = () => {
  const cards = [
    {
      icon: Zap,
      title: "Days, Not Months",
      desc: "Concept to launch at a pace that redefines fast. Because waiting isn't a strategy."
    },
    {
      icon: Palette,
      title: "Obsessively Crafted",
      desc: "Every detail considered. Every element refined. Design so precise, it feels inevitable."
    },
    {
      icon: BarChart3,
      title: "Built to Convert",
      desc: "Layouts informed by data. Decisions backed by performance. Results you can measure."
    },
    {
      icon: Shield,
      title: "Secure by Default",
      desc: "Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included."
    }
  ];

  return (
    <section className="py-32 px-8 lg:px-24">
      <div className="text-center space-y-4 mb-20">
        <div className="liquid-glass rounded-full px-4 py-1 text-xs text-white/80 mx-auto w-fit">Why Us</div>
        <h2 className="text-4xl md:text-6xl font-heading italic text-white">The difference is everything.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="liquid-glass rounded-2xl p-8 space-y-6 hover:translate-y-[-8px] transition-transform duration-500">
            <div className="liquid-glass-strong rounded-full h-12 w-12 flex items-center justify-center text-white">
              <card.icon className="w-6 h-6" />
            </div>
            <h4 className="text-xl text-white font-body font-medium">{card.title}</h4>
            <p className="text-white/50 text-sm font-body font-light leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { val: "200+", label: "Sites launched" },
    { val: "98%", label: "Client satisfaction" },
    { val: "3.2x", label: "More conversions" },
    { val: "5 days", label: "Average delivery" }
  ];

  return (
     <section className="relative min-h-[600px] flex items-center justify-center px-8 lg:px-24 overflow-hidden">
        <VideoBackground
          src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
          className="absolute inset-0 w-full h-full object-cover"
          filter="saturate(0)"
        />
        <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-black to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-6xl liquid-glass rounded-[3rem] p-12 md:p-20 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-4xl md:text-6xl lg:text-7xl font-heading italic text-white">{stat.val}</div>
              <div className="text-white/40 text-xs font-body tracking-[0.2em] uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
     </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      quote: "A complete rebuild in five days. The result outperformed everything we'd spent months building before.",
      name: "Sarah Chen",
      role: "CEO, Luminary"
    },
    {
      quote: "Conversions up 4x. That's not a typo. The design just works differently when it's built on real data.",
      name: "Marcus Webb",
      role: "Head of Growth, Arcline"
    },
    {
      quote: "They didn't just design our site. They defined our brand. World-class doesn't begin to cover it.",
      name: "Elena Voss",
      role: "Brand Director, Helix"
    }
  ];

  return (
    <section id="work" className="py-32 px-8 lg:px-24">
      <div className="text-center space-y-4 mb-20">
        <div className="liquid-glass rounded-full px-4 py-1 text-xs text-white/80 mx-auto w-fit">What They Say</div>
        <h2 className="text-4xl md:text-6xl font-heading italic text-white">Don't take our word for it.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {reviews.map((rev, i) => (
           <div key={i} className="liquid-glass rounded-2xl p-10 space-y-8 flex flex-col justify-between">
             <p className="text-xl text-white/80 font-body font-light italic leading-relaxed">"{rev.quote}"</p>
             <div className="space-y-1 pt-6 border-t border-white/10">
               <div className="text-white text-sm font-medium">{rev.name}</div>
               <div className="text-white/40 text-xs uppercase tracking-wider">{rev.role}</div>
             </div>
           </div>
         ))}
      </div>
    </section>
  );
};

const CtaFooter = () => {
  return (
    <section id="pricing" className="relative min-h-[800px] flex flex-col pt-32 overflow-hidden">
      <VideoBackground 
        src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 w-full h-[300px] bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-12">
        <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-heading italic text-white leading-[0.85] tracking-tight mb-8">
           Your next website <br/> starts here.
        </h2>
        <p className="text-white/60 font-body font-light text-base md:text-lg max-w-xl mb-12">
          Book a free strategy call. See what AI-powered design can do. 
          No commitment, no pressure. Just possibilities.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link to="/auth" className="liquid-glass-strong rounded-full px-8 py-4 text-white font-medium text-lg hover:scale-105 transition-transform text-center">
             Book a Call
          </Link>
          <button className="bg-white text-black rounded-full px-8 py-4 font-medium text-lg hover:bg-white/90 transition-colors">
             View Pricing
          </button>
        </div>
      </div>

      <footer className="relative z-10 mt-auto border-t border-white/10 pt-8 pb-12 px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white/40 text-xs font-body">
          &copy; 2026 Clickors Design. All rights reserved.
        </div>
        <div className="flex gap-8">
           {["Privacy", "Terms", "Contact"].map(item => (
             <a key={item} href="#" className="text-white/40 text-xs hover:text-white transition-colors">{item}</a>
           ))}
        </div>
      </footer>
    </section>
  );
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <div className="bg-black">
        <StartSection />
        <FeaturesChess />
        <FeaturesGrid />
        <Stats />
        <Testimonials />
        <CtaFooter />
      </div>
    </>
  );
}
