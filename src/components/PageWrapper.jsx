import {
  motion,
} from "framer-motion";

export default function PageWrapper({

  children,

}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.35,
      }}

      className="w-full max-w-[1800px] mx-auto"
    >

      {children}

    </motion.div>
  );
}