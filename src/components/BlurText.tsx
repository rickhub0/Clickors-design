import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function BlurText({ text, delay = 0.1, className }: BlurTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={
            isInView
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : {}
          }
          transition={{
            duration: 0.7,
            delay: delay + index * 0.1,
            ease: "easeOut",
            times: [0, 0.5, 1],
          }}
          className="inline-block mr-[0.2em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
