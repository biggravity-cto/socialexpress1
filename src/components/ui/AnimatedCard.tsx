
import React, { useState, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// Create a type that omits the conflicting event handlers
type AnimatedCardProps = {
  children: React.ReactNode;
  delay?: number;
  hover?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "delay" | "hover" | "className">;

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  hover = true,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={cn(
        "rounded-xl bg-white border border-gray-100 p-6 shadow-sm transition-all duration-300",
        hover && "hover:shadow-md hover:translate-y-[-2px]",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay / 10 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
