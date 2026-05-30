export default function LoadingScreen() {

  return (

    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

      <div className="text-center">

        <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />

        <h1 className="text-4xl font-black mt-8">

          Initializing Productivity OS

        </h1>

        <p className="text-slate-400 text-lg mt-4">

          Syncing intelligence systems...

        </p>

      </div>

    </div>
  );
}