import React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";

interface DrawOutlineButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  radius?: string;
}

export const DrawOutlineButton: React.FC<DrawOutlineButtonProps> = ({
  children,
  color = "#6366f1", // default indigo-500
  radius = "20px", // default rounded
  className = "",
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={`relative inline-block group ${className}`}
      style={{ borderRadius: radius }}
    >
      {/* Content */}
      <div style={{ borderRadius: radius }}>{children}</div>

      {/* TOP */}
      <span
        className="absolute left-0 top-0 h-[2px] w-0 transition-all duration-150 group-hover:w-full"
        style={{ backgroundColor: color, borderRadius: radius }}
      />

      {/* RIGHT */}
      <span
        className="absolute right-0 top-0 w-[2px] h-0 transition-all duration-150 delay-100 group-hover:h-full"
        style={{ backgroundColor: color, borderRadius: radius }}
      />

      {/* BOTTOM */}
      <span
        className="absolute right-0 bottom-0 h-[2px] w-0 transition-all duration-150 delay-200 group-hover:w-full"
        style={{ backgroundColor: color, borderRadius: radius }}
      />

      {/* LEFT */}
      <span
        className="absolute left-0 bottom-0 w-[2px] h-0 transition-all duration-150 delay-300 group-hover:h-full"
        style={{ backgroundColor: color, borderRadius: radius }}
      />
    </div>
  );
};


interface EncryptButtonProps {
  label?: string;
  Icon?: React.ElementType;
  className?: string;
}

const CHARS = "!@#$%^&*():{};|,.<>/?";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

export const EncryptButton = ({
  label = "Encrypt data",
  Icon = FiLock,
  className = "",
}: EncryptButtonProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [text, setText] = useState(label);

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = label.split("").map((char, index) => {
        if (pos / CYCLES_PER_LETTER > index) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");

      setText(scrambled);
      pos++;

      if (pos >= label.length * CYCLES_PER_LETTER) stopScramble();
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(label);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={`group relative overflow-hidden rounded-lg border border-neutral-500 bg-neutral-800 px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-indigo-300 ${className}`}
    >
      <div className="relative z-10 flex items-center gap-2">
        <Icon className="text-lg" />
        <span>{text}</span>
      </div>

      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.button>
  );
};

