import {
  motion,
} from "framer-motion";

export default function Notifications() {

  const notifications = [

    {
      title:
        "Goal Completed",
      message:
        "A student completed an assigned goal.",
      icon:
        "🎯",
    },

    {
      title:
        "Focus Session Finished",
      message:
        "Productivity session tracked successfully.",
      icon:
        "🧠",
    },

    {
      title:
        "New Student Joined",
      message:
        "A new student joined your mentor workspace.",
      icon:
        "🚀",
    },
  ];

  return (

    <div className="space-y-8">

      <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 backdrop-blur-xl p-10 shadow-2xl">

        <p className="text-cyan-400 uppercase tracking-[6px] text-sm font-semibold">

          Live Notification Center

        </p>

        <h1 className="text-6xl font-black mt-5">

          🔔 Notifications

        </h1>

        <p className="text-slate-400 text-lg mt-5">

          Track real-time productivity activity and accountability updates.

        </p>

      </div>

      <div className="space-y-5">

        {notifications.map(
          (
            notification,
            index
          ) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.08,
              }}
              className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
            >

              <div className="flex items-center gap-5">

                <div className="text-5xl">

                  {
                    notification.icon
                  }

                </div>

                <div>

                  <h2 className="text-2xl font-black">

                    {
                      notification.title
                    }

                  </h2>

                  <p className="text-slate-400 mt-2">

                    {
                      notification.message
                    }

                  </p>

                </div>

              </div>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}