import { motion } from "framer-motion";

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
        duration: 0.3,
      }}

      className="w-full min-h-screen p-6 xl:p-8"
    >

      {children}

    </motion.div>
  );
}