export default function LoadingSkeleton() {

  return (

    <div className="space-y-6 animate-pulse">

      {/* TOP CARD */}

      <div className="bg-slate-800 rounded-3xl p-8">

        <div className="h-10 w-64 bg-slate-700 rounded-xl mb-6"></div>

        <div className="h-6 w-full bg-slate-700 rounded-xl mb-4"></div>

        <div className="h-6 w-3/4 bg-slate-700 rounded-xl"></div>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {[1, 2, 3].map(
          (item) => (

            <div
              key={item}

              className="bg-slate-800 rounded-3xl p-6"
            >

              <div className="h-8 w-40 bg-slate-700 rounded-xl mb-5"></div>

              <div className="h-5 w-full bg-slate-700 rounded-xl mb-3"></div>

              <div className="h-5 w-2/3 bg-slate-700 rounded-xl mb-6"></div>

              <div className="h-12 w-full bg-slate-700 rounded-2xl"></div>

            </div>
          )
        )}

      </div>

    </div>
  );
}