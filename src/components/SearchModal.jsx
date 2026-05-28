import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

export default function SearchModal({

  open,
  setOpen,

}) {

  const navigate =
    useNavigate();

  const items = [

    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Habits",
      path: "/habits",
    },

    {
      name: "Analytics",
      path: "/analytics",
    },

    {
      name: "Heatmap",
      path: "/heatmap",
    },

    {
      name: "Leaderboard",
      path: "/leaderboard",
    },

    {
      name: "Notifications",
      path: "/notifications",
    },
  ];

  return (

    <AnimatePresence>

      {open && (

        <>

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            onClick={() =>
              setOpen(false)
            }

            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />

          <motion.div

            initial={{
              opacity: 0,
              y: -30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              y: -20,
            }}

            className="fixed top-24 left-1/2 -translate-x-1/2 z-[101] w-[92%] max-w-2xl rounded-[32px] border border-white/10 bg-[#020617]/95 backdrop-blur-2xl p-6 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
          >

            <input
              autoFocus
              placeholder="Search pages..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-5 outline-none text-lg"
            />

            <div className="mt-5 space-y-3">

              {items.map((item) => (

                <button
                  key={item.path}

                  onClick={() => {

                    navigate(
                      item.path
                    );

                    setOpen(false);

                  }}

                  className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >

                  {item.name}

                </button>

              ))}

            </div>

          </motion.div>

        </>

      )}

    </AnimatePresence>
  );
}