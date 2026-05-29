export default function SmartEmptyState({

  title,

  description,

}) {

  return (

    <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center shadow-2xl">

      <h2 className="text-4xl font-black">

        {title}

      </h2>

      <p className="text-slate-400 text-lg mt-5 max-w-2xl mx-auto">

        {description}

      </p>

    </div>
  );
}