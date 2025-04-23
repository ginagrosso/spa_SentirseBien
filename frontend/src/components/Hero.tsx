'use client';

export default function Hero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center font-roboto text-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero.png')" }}>
      <div className="absolute inset-0 bg-[#015249]/30 backdrop-blur-sm"></div>      

      <div className="relative z-10 max-w-2xl px-4">
        <h2 className="text-4xl md:text-5xl font-semibold italic text-white mb-14 md:whitespace-nowrap">
          Tu refugio de serenidad te espera.</h2>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(150%+1.3px)] h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none">
          <path
            fill="#F5F9F8"
            d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,64C672,53,768,43,864,53.3C960,64,1056,96,1152,90.7C1248,85,1344,43,1392,21.3L1440,0L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
