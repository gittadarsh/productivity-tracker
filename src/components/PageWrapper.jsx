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
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.35,
      }}

      className="relative z-10"
    >

      {/* PREMIUM PAGE CONTAINER */}

      <div className="space-y-8">

        {children}

      </div>

    </motion.div>
  );
}