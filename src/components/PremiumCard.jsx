import {
  motion,
} from "framer-motion";

export default function PremiumCard({

  children,

  className = "",

  hover = true,

}) {

  return (

    <motion.div

      whileHover={
        hover
          ? {
              y: -5,
            }
          : {}
      }

      transition={{
        duration: 0.25,
      }}

      className={`

      rounded-[32px]

      border border-white/10

      bg-white/5

      backdrop-blur-xl

      shadow-2xl

      ${className}
      `}
    >

      {children}

    </motion.div>
  );
}