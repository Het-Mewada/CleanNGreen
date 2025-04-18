// import Image from 'next/image';

const SolarImpact = () => {
  return (
    <div className="max-w-5xl mx-auto my-25 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg space-y-8">
      {/* Title */}
      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
        Power Tomorrow with the Sun
      </h1>

      {/* Image */}
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/037/530/413/small/ai-generated-solar-panels-beautiful-sunset-over-a-sunny-farm-photo.jpg"
        alt="Solar array in a sunny field"
        className="rounded-xl w-full"
      />

      {/* Introduction */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">What is Solar Energy?</h2>
        <p className="text-gray-700 text-lg">
          Solar energy is radiant light and heat from the sun that’s harnessed using a range of technologies such as photovoltaic panels (PV), solar thermal systems, and concentrated solar power (CSP). It’s one of the cleanest and most abundant renewable energy sources available.
        </p>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">How Does Solar Power Work?</h2>
        <p className="text-gray-700 text-lg">
          Most commonly, solar energy is captured by photovoltaic cells—semiconductor materials (like silicon) that absorb sunlight and release electrons, creating an electric current. This current is then converted from DC to AC using an inverter, making it usable for homes and businesses.
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          <li><strong>Photovoltaic (PV):</strong> Converts sunlight directly into electricity.</li>
          <li><strong>Solar Thermal:</strong> Heats fluid to produce steam and drive turbines.</li>
          <li><strong>Concentrated Solar Power (CSP):</strong> Uses mirrors/lenses to focus sunlight into a small area for heat-based electricity.</li>
        </ul>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Why Solar? The Key Benefits</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
          <li><strong>Zero Emissions:</strong> Reduces greenhouse gas emissions by replacing fossil fuels.</li>
          <li><strong>Lower Energy Bills:</strong> Save 40-70% on electricity bills over time.</li>
          <li><strong>Low Maintenance:</strong> Minimal upkeep compared to conventional power systems.</li>
          <li><strong>Energy Independence:</strong> Reduce reliance on centralized power grids.</li>
          <li><strong>Job Creation:</strong> The solar industry supports over 4 million jobs worldwide.</li>
        </ul>
      </section>

      {/* Environmental Impact */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Environmental Impact</h2>
        <p className="text-gray-700 text-lg">
          Solar reduces dependence on non-renewable resources, minimizes air and water pollution, and helps slow global warming. A typical residential system offsets:
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg mt-2">
          <li>Over 3,000 lbs of CO₂ annually</li>
          <li>Equivalent to planting 35–40 trees every year</li>
          <li>Reduction in nitrogen oxides and sulfur dioxide—major air pollutants</li>
        </ul>
      </section>

      {/* Common Myths Busted */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Solar Energy: Myths vs. Facts</h2>
        <ul className="text-gray-700 text-lg space-y-2">
          <li><strong>Myth:</strong> "Solar doesn't work on cloudy days." <br /> <strong>Fact:</strong> Panels still generate power from indirect sunlight.</li>
          <li><strong>Myth:</strong> "Solar panels are too expensive." <br /> <strong>Fact:</strong> Costs have dropped over 80% in the last decade.</li>
          <li><strong>Myth:</strong> "Solar only works in hot climates." <br /> <strong>Fact:</strong> Germany, a cloudy country, is a global solar leader.</li>
        </ul>
      </section>

      {/* Trends and the Future */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">The Future of Solar</h2>
        <p className="text-gray-700 text-lg">
          Solar is evolving fast. Technologies like perovskite solar cells, solar windows, and integrated battery storage are reshaping the landscape. With government support and falling costs, solar will likely become the #1 energy source worldwide by 2050.
        </p>
      </section>

      {/* How Users Can Help */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">How You Can Take Action</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
          <li>Install rooftop solar panels or join a community solar program</li>
          <li>Support solar-friendly legislation and local clean energy initiatives</li>
          <li>Educate others about solar benefits and bust common myths</li>
          <li>Optimize home energy use with solar-friendly appliances</li>
        </ul>
      </section>

      {/* Final Image */}
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/040/995/143/small/ai-generated-fields-of-solar-panels-and-systems-to-produce-green-electricity-ai-generated-photo.jpg"
        alt="Modern home with rooftop solar panels"
        className="rounded-xl w-full"
      />

      {/* Call to Action */}
      <p className="text-xl text-center text-emerald-700 font-semibold mt-6">
        🌞 Solar isn’t just a choice—it’s a movement. Join the clean energy revolution today!
      </p>
    </div>
  );
};

export default SolarImpact;