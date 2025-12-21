// DynamicContent.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Initiatives() {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  let content;

  if (path === "/initiatives/solar-projects") {
    content = (
      <div className="max-w-100mx-auto  bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg space-y-10">
        {/* Hero Section Container */}
        <div className="relative h-screen w-full">
          {/* Hero Image */}
          <div className="absolute inset-0">
            <img
              src="https://wallpapers.com/images/hd/solar-panel-1920-x-1080-background-o1bfvhmd5ua6jwzg.jpg"
              alt="Solar array in a sunny field"
              loading="eager"
              className="absolute w-full h-full object-cover"
            />
            {/* Image overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
          </div>

          {/* Header Section - Centered */}
          <header className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-4 px-4">
            <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 leading-tight">
              Power Tomorrow with the{" "}
              <span className="bg-orange-500 px-2 rounded-4 text-yellow-200">
                {" "}
                Sun
              </span>
            </h1>
            <p className="text-xl text-white font-medium max-w-3xl">
              Harnessing clean, renewable energy for a sustainable future
            </p>
          </header>

          {/* Image Caption at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-teal-700/90 p-3 text-center text-white text-sm">
            Solar farms can power thousands of homes while preserving natural
            landscapes
          </div>
        </div>

        {/* Introduction */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            What is Solar Energy?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Solar energy is radiant light and heat from the sun that's harnessed
            using technologies like photovoltaic panels (PV), solar thermal
            systems, and concentrated solar power (CSP). As one of the cleanest
            and most abundant renewable energy sources, solar power currently
            provides about 3% of global electricity but is growing faster than
            any other energy source.
          </p>
          <div className="mt-4 p-4 bg-teal-50 rounded-md border-l-4 border-teal-400">
            <p className="text-teal-800 font-medium">
              Did you know? The amount of sunlight that strikes Earth's surface
              in 90 minutes could power global energy consumption for an entire
              year.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            How Does Solar Power Work?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Solar energy conversion happens through several technologies, each
            with unique advantages for different applications:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Photovoltaic (PV)
              </h3>
              <p className="text-gray-700">
                Semiconductor materials (like silicon) absorb sunlight,
                releasing electrons to create direct current (DC) electricity,
                which is converted to alternating current (AC) for use.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Solar Thermal
              </h3>
              <p className="text-gray-700">
                Uses sunlight to heat a fluid, producing steam that drives
                turbines to generate electricity, often with integrated storage
                for consistent power supply.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Concentrated Solar (CSP)
              </h3>
              <p className="text-gray-700">
                Mirrors or lenses concentrate sunlight onto a small area to
                generate high temperatures (up to 1,000°C) for industrial
                processes or electricity generation.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Why Solar? The Key Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    Environmental Sustainability
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Zero operational emissions, reduces water usage compared to
                    fossil fuels, and helps combat climate change.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    Economic Advantages
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Save 40-70% on electricity bills with payback periods
                    typically 5-8 years for residential systems.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    Energy Independence
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Reduces reliance on imported fuels and centralized grids,
                    with options for off-grid living.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Low Maintenance</h3>
                  <p className="text-gray-700 text-sm">
                    No moving parts means minimal upkeep—just occasional
                    cleaning and system checks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="mx-9 grid md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">4.4%</div>
            <div className="text-sm text-gray-600">of global electricity</div>
            <div className="text-xs text-gray-500 mt-1">
              from solar PV (2022)
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">1.3 TW</div>
            <div className="text-sm text-gray-600">global capacity</div>
            <div className="text-xs text-gray-500 mt-1">
              enough for ~260M homes
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">82%</div>
            <div className="text-sm text-gray-600">cost reduction</div>
            <div className="text-xs text-gray-500 mt-1">since 2010</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">4.9M</div>
            <div className="text-sm text-gray-600">jobs worldwide</div>
            <div className="text-xs text-gray-500 mt-1">in solar industry</div>
          </div>
        </div>

        {/* Environmental Impact */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Environmental Impact
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Solar energy significantly reduces environmental harm compared to
            conventional energy sources. A typical 6kW residential solar system
            can offset:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
              <div className="font-bold text-teal-700">3,000+ lbs</div>
              <div className="text-gray-700 text-sm">of CO₂ annually</div>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
              <div className="font-bold text-teal-700">35-40 trees</div>
              <div className="text-gray-700 text-sm">
                worth of carbon sequestration
              </div>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
              <div className="font-bold text-teal-700">75% less</div>
              <div className="text-gray-700 text-sm">
                water use than coal plants
              </div>
            </div>
          </div>
          <div className="mt-6 bg-amber-50 p-4 rounded-md border-l-4 border-amber-400">
            <p className="text-amber-800">
              <span className="font-bold">Recycling Note:</span> Over 95% of
              solar panel materials can be recycled, and manufacturers are
              developing even more sustainable designs.
            </p>
          </div>
        </section>

        {/* Myths vs Facts */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Solar Energy: Myths vs. Facts
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div className="font-bold text-red-700 mb-1">Myth</div>
              <p>"Solar doesn't work in cold or cloudy climates."</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400 ml-6">
              <div className="font-bold text-green-700 mb-1">Fact</div>
              <p>
                Solar panels actually operate more efficiently in cooler
                temperatures. Germany—with similar sunlight to Alaska—generates
                about 10% of its electricity from solar.
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div className="font-bold text-red-700 mb-1">Myth</div>
              <p>
                "Solar panels require more energy to manufacture than they
                produce."
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400 ml-6">
              <div className="font-bold text-green-700 mb-1">Fact</div>
              <p>
                Modern panels have an energy payback period of just 1-4 years
                and typically last 25-30 years, producing clean energy for
                decades.
              </p>
            </div>
          </div>
        </section>

        {/* Future of Solar */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            The Future of Solar Technology
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Solar innovation is accelerating with breakthroughs that promise to
            revolutionize how we harness sunlight:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mr-3">
                NEW
              </span>
              <span>
                <strong>Perovskite solar cells:</strong> Potential for higher
                efficiency (over 30%) and lower production costs than silicon.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mr-3">
                NEW
              </span>
              <span>
                <strong>Bifacial panels:</strong> Capture sunlight on both
                sides, increasing energy yield by 10-20%.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mr-3">
                NEW
              </span>
              <span>
                <strong>Solar skins:</strong> Customizable appearances that
                blend with rooftops while generating power.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mr-3">
                NEW
              </span>
              <span>
                <strong>Floating solar farms:</strong> Installing panels on
                water bodies to conserve land and reduce evaporation.
              </span>
            </li>
          </ul>
        </section>

        {/* How to Get Started */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            How You Can Go Solar
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">For Homeowners</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    Get a professional solar assessment for your property
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Explore financing options (loans, leases, PPAs)</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Check for local incentives and tax credits</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">
                For Renters & Others
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Join a community solar program</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Invest in solar stocks or green energy funds</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Advocate for solar policies in your community</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl  overflow-hidden shadow-md">
            <div className="bg-teal-700/90 p-3 text-center text-white text-sm">
              The future is bright with solar energy—clean, affordable, and
              increasingly accessible
            </div>
          </div>
        </section>
      </div>
    );
  } else if (path === "/initiatives/manage-waste") {
    content = (
      <div className="max-w-100mx-auto bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg space-y-10">
        {/* Hero Section */}
        <div className="relative h-screen w-full">
          <div className="absolute inset-0">
            <img
              src="/images/reduce-waste.avif"
              alt="Overflowing landfill with bulldozer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <header className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-4 px-4">
            <h1 className="text-white">
              Waste Less,{" "}
              <span className="bg-amber-600 px-2 rounded-4 text-amber-100">
                Live More
              </span>
            </h1>
            <p className="text-xl text-white font-medium max-w-3xl">
              Transforming waste management for cleaner land and healthier
              communities
            </p>
          </header>

          <div className="absolute bottom-0 left-0 right-0 bg-teal-700/90 p-3 text-center text-white text-sm">
            The world generates 2.01 billion tons of municipal solid waste
            annually
          </div>
        </div>

        {/* Introduction */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            The Land Waste Crisis
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Every year, humanity generates enough waste to fill 800,000
            Olympic-sized swimming pools. Improper disposal contaminates soil,
            pollutes waterways, and accounts for 5% of global greenhouse gas
            emissions through landfill methane.
          </p>
          <div className="mt-4 p-4 bg-teal-50 rounded-md border-l-4 border-teal-400">
            <p className="text-teal-800 font-medium">
              Did you know? 91% of plastic isn't recycled, and 8 million tons
              end up in oceans yearly.
            </p>
          </div>
        </section>

        {/* Waste Pathways */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Where Our Waste Goes
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Landfills
              </h3>
              <p className="text-gray-700">
                54% of global waste ends up here, leaching toxins and producing
                methane 25x worse than CO₂.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Incinerators
              </h3>
              <p className="text-gray-700">
                Burns 13% of waste but releases dioxins and heavy metals into
                the air.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Environment
              </h3>
              <p className="text-gray-700">
                33% escapes into nature, choking wildlife and entering food
                chains as microplastics.
              </p>
            </div>
          </div>
        </section>

        {/* Impacts */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            The Ripple Effects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Health Costs</h3>
                  <p className="text-gray-700 text-sm">
                    Waste pickers and nearby communities face 50% higher cancer
                    rates due to toxic exposure.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Economic Loss</h3>
                  <p className="text-gray-700 text-sm">
                    $375B yearly in lost recyclable materials and cleanup costs.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Land Squandering</h3>
                  <p className="text-gray-700 text-sm">
                    Landfills occupy space equivalent to 1.5x Manhattan yearly.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Wildlife Harm</h3>
                  <p className="text-gray-700 text-sm">
                    1M seabirds and 100K marine mammals die annually from
                    plastic ingestion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="mx-9 grid md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">2.01B</div>
            <div className="text-sm text-gray-600">tons of waste/year</div>
            <div className="text-xs text-gray-500 mt-1">Global generation</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">99%</div>
            <div className="text-sm text-gray-600">of products</div>
            <div className="text-xs text-gray-500 mt-1">
              become trash within 6 months
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">75%</div>
            <div className="text-sm text-gray-600">of waste</div>
            <div className="text-xs text-gray-500 mt-1">
              is recyclable or compostable
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">$201B</div>
            <div className="text-sm text-gray-600">market potential</div>
            <div className="text-xs text-gray-500 mt-1">
              in circular economy by 2025
            </div>
          </div>
        </div>

        {/* Solutions */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Waste Reduction Strategies
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Zero-Waste Lifestyle
              </h3>
              <p className="text-gray-700">
                Refuse single-use items, carry reusables, and choose
                package-free alternatives.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Composting
              </h3>
              <p className="text-gray-700">
                Diverts 30% of household waste from landfills while creating
                nutrient-rich soil.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Upcycling
              </h3>
              <p className="text-gray-700">
                Transform waste materials into higher-value products (e.g.,
                glass jars into storage).
              </p>
            </div>
          </div>
        </section>

        {/* Myths vs Facts */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Waste Myths Debunked
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div className="font-bold text-red-700 mb-1">Myth</div>
              <p>"Biodegradable plastics break down quickly anywhere."</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400 ml-6">
              <div className="font-bold text-green-700 mb-1">Fact</div>
              <p>
                Most require industrial composting facilities—in landfills, they
                behave like regular plastic.
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div className="font-bold text-red-700 mb-1">Myth</div>
              <p>"Recycling solves our waste problems completely."</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400 ml-6">
              <div className="font-bold text-green-700 mb-1">Fact</div>
              <p>
                Only 9% of plastic is recycled globally. Reduction and reuse are
                far more effective.
              </p>
            </div>
          </div>
        </section>

        {/* Future Innovations */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            The Future of Waste
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mr-3">
                NEW
              </span>
              <span>
                <strong>Chemical recycling:</strong> Breaks plastics down to
                molecular level for infinite reuse.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mr-3">
                NEW
              </span>
              <span>
                <strong>Edible packaging:</strong> Seaweed-based wrappers that
                dissolve or can be eaten.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mr-3">
                NEW
              </span>
              <span>
                <strong>AI waste sorting:</strong> Robots with computer vision
                achieve 95% sorting accuracy.
              </span>
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Start Your Waste-Free Journey
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">At Home</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    Conduct a trash audit to identify reduction opportunities
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    Set up composting (even apartment-friendly bokashi systems)
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">In Community</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    Advocate for better municipal recycling/composting programs
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    Organize neighborhood swap events for unused items
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md">
            <div className="bg-teal-700/90 p-3 text-center text-white text-sm">
              The average person generates 4.9 pounds of trash daily—small
              changes by millions create monumental impact.
            </div>
          </div>
        </section>
      </div>
    );
  } else if (path === "/initiatives/reforestation") {
    content = (
      <div className="max-w-100mx-auto bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg space-y-10">
        {/* Hero Section */}
        <div className="relative h-screen w-full">
          <div className="absolute inset-0">
            <img
              src="/images/trees.avif"
              alt="Lush green forest canopy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <header className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-4 px-4">
            <h1 className="text-white">
              Grow Tomorrow's{" "}
              <span className="bg-green-600 px-2 rounded-4 text-lime-200">
                Forests
              </span>{" "}
              Today
            </h1>
            <p className="text-xl text-white font-medium max-w-3xl">
              Restoring ecosystems for a cooler, greener planet
            </p>
          </header>

          <div className="absolute bottom-0 left-0 right-0 bg-teal-700/90 p-3 text-center text-white text-sm">
            A single tree can absorb up to 48 lbs of CO₂ per year
          </div>
        </div>

        {/* Introduction */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Why Forests Matter
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Forests are Earth's natural carbon sinks, absorbing 2.6 billion tons
            of CO₂ annually. They regulate climate, prevent soil erosion, and
            house 80% of terrestrial biodiversity. Yet, we lose 10 million
            hectares yearly—equivalent to 27 soccer fields every minute.
          </p>
          <div className="mt-4 p-4 bg-teal-50 rounded-md border-l-4 border-teal-400">
            <p className="text-teal-800 font-medium">
              Did you know? The Amazon produces 20% of the world's oxygen and
              stores 10 years worth of human CO₂ emissions.
            </p>
          </div>
        </section>

        {/* How Reforestation Works */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            How Reforestation Helps
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Carbon Sequestration
              </h3>
              <p className="text-gray-700">
                Mature trees absorb 48 lbs of CO₂ yearly, with forests storing
                400+ billion tons globally.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Biodiversity
              </h3>
              <p className="text-gray-700">
                Reforestation revives habitats for endangered species like
                orangutans and jaguars.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-700 text-lg mb-2">
                Water Cycles
              </h3>
              <p className="text-gray-700">
                Tree roots prevent erosion and filter 75% of freshwater supplies
                globally.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Key Benefits of Reforestation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    Climate Regulation
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Forests absorb 30% of annual CO₂ emissions and cool local
                    areas by 2-8°C.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Economic Value</h3>
                  <p className="text-gray-700 text-sm">
                    Forests provide $75B yearly in timber and support 1.6B
                    livelihoods.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Health Impact</h3>
                  <p className="text-gray-700 text-sm">
                    Urban trees reduce respiratory illnesses by filtering 85% of
                    air pollutants.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 rounded-full mr-3 mt-1">
                  <svg
                    className="w-5 h-5 text-teal-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    Disaster Prevention
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Mangroves reduce tsunami damage by up to 90% and prevent
                    coastal erosion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="mx-9 grid md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">10M</div>
            <div className="text-sm text-gray-600">hectares lost/year</div>
            <div className="text-xs text-gray-500 mt-1">Size of Iceland</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">80%</div>
            <div className="text-sm text-gray-600">terrestrial species</div>
            <div className="text-xs text-gray-500 mt-1">live in forests</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">1.6B</div>
            <div className="text-sm text-gray-600">people depend</div>
            <div className="text-xs text-gray-500 mt-1">on forests</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
            <div className="text-3xl font-bold text-teal-600">350M</div>
            <div className="text-sm text-gray-600">hectares targeted</div>
            <div className="text-xs text-gray-500 mt-1">
              for restoration by 2030
            </div>
          </div>
        </div>

        {/* Myths vs Facts */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Reforestation Myths vs Facts
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div className="font-bold text-red-700 mb-1">Myth</div>
              <p>
                "Any tree planting is good—location and species don't matter."
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400 ml-6">
              <div className="font-bold text-green-700 mb-1">Fact</div>
              <p>
                Native species in ecologically appropriate areas have 4x higher
                survival rates and benefit local wildlife.
              </p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div className="font-bold text-red-700 mb-1">Myth</div>
              <p>"Forests regrow naturally without human help."</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400 ml-6">
              <div className="font-bold text-green-700 mb-1">Fact</div>
              <p>
                Severely degraded lands may take centuries to recover without
                active restoration efforts.
              </p>
            </div>
          </div>
        </section>

        {/* Future Tech */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            Innovations in Reforestation
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mr-3">
                NEW
              </span>
              <span>
                <strong>Drone planting:</strong> Fires seed pods at 120,000
                trees/day with 80% survival rates.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mr-3">
                NEW
              </span>
              <span>
                <strong>Biochar:</strong> Enhances soil with carbon-rich
                charcoal to boost tree growth by 40%.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-800 rounded-full px-2 py-1 text-xs font-bold mr-3">
                NEW
              </span>
              <span>
                <strong>Mycorrhizal fungi:</strong> Symbiotic networks help
                trees share nutrients and communicate.
              </span>
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-3 pb-2 border-b border-emerald-100">
            How You Can Help
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Direct Action</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>
                    Join tree-planting events (check local parks departments)
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Donate to vetted orgs ($1 = 1+ tree planted)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">
                Lifestyle Choices
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Use Ecosia (search engine that plants trees)</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Choose FSC-certified wood products</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md">
            <div className="bg-teal-700/90 p-3 text-center text-white text-sm">
              Every second, we lose a forest area the size of a football field.
              Act now—our planet's lungs depend on it.
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    content = <div className="p-4 text-xl">404 Not Found</div>;
  }

  return <>{content}</>;
}
