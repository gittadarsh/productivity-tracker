export default function LoadingSkeleton() {

  return (

    <div className="space-y-8 animate-pulse">

      {/* HERO */}

      <div className="h-52 rounded-[36px] bg-white/5 border border-white/10" />

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {[1, 2, 3, 4].map((item) => (

          <div
            key={item}
            className="h-40 rounded-[30px] bg-white/5 border border-white/10"
          />

        ))}

      </div>

      {/* CONTENT */}

      <div className="h-[500px] rounded-[36px] bg-white/5 border border-white/10" />

    </div>
  );
}