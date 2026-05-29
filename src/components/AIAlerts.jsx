import {
  motion,
} from "framer-motion";

export default function LiveActivityFeed({

  activities = [],

}) {

  return (

    <div className="space-y-5">

      {activities.map(
        (
          item,
          index
        ) => (

          <motion.div

            key={index}

            initial={{
              opacity: 0,
              x: -20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
          >

            <div className="flex items-start gap-5">

              <div className="text-4xl">

                {item.icon}

              </div>

              <div>

                <h3 className="text-2xl font-black">

                  {item.title}

                </h3>

                <p className="text-slate-400 mt-2">

                  {item.description}

                </p>

              </div>

            </div>

          </motion.div>
        )
      )}

    </div>
  );
}