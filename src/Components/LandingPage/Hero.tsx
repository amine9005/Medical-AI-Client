const Hero = () => {
  return (
    <section className="min-h-screen   flex flex-col max-md:gap-20 md:flex-row pb-20 items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col items-center md:items-start">
        <div className="flex flex-wrap items-center justify-center p-1.5 rounded-full border border-slate-400 text-gray-500 text-xs">
          <div className="flex items-center">
            <img
              className="size-7 rounded-full border-3 border-white"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
              alt="userImage1"
            />
            <img
              className="size-7 rounded-full border-3 border-white -translate-x-2"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
              alt="userImage2"
            />
            <img
              className="size-7 rounded-full border-3 border-white -translate-x-4"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
              alt="userImage3"
            />
          </div>
          <p className="-translate-x-2">Join community of 1m+ founders </p>
        </div>
        <h1 className="text-center md:text-left text-5xl leading-[68px] md:text-6xl md:leading-[84px] font-medium max-w-xl text-slate-900">
          Intelligent AI tools built to help.
        </h1>
        <p className="text-center md:text-left text-sm text-slate-700 max-w-lg mt-2">
          Unlock smarter workflows with AI tools designed to boost productivity,
          simplify tasks and help you do more with less effort.
        </p>
        <div className="flex items-center gap-4 mt-8 text-sm">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-md px-7 h-11">
            Get started
          </button>
          <button className="flex items-center gap-2 border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-md px-6 h-11">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-video-icon lucide-video"
            >
              <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
              <rect x="2" y="6" width="14" height="12" rx="2" />
            </svg>
            <span>Watch demo</span>
          </button>
        </div>
      </div>
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-4.png"
        alt="hero"
        className="max-w-xs sm:max-w-sm lg:max-w-md transition-all duration-300"
      />
    </section>
  );
};

export default Hero;
