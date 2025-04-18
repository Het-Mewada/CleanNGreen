export default function WasteReducing() {
    return (
      <div className="max-w-5xl mx-auto my-25 p-8 bg-gradient-to-br from-emerald-50 to-teal-50rounded-2xl shadow-lg space-y-8">
        {/* Title */}
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
          Reducing Land Waste: Why It Matters
        </h1>
  
        {/* Image */}
        <img
          src="https://www.iasexpress.net/wp-content/uploads/2022/04/waste-mgmt.jpg"
          alt="Piled landfill site with recyclable materials"
          className="rounded-xl w-full"
        />
  
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">What is Land Waste?</h2>
          <p className="text-gray-700 text-lg">
            Land waste, also known as solid waste, refers to the accumulation of discarded materials—household trash, industrial byproducts, packaging, construction debris, and more—that end up in landfills. Mismanagement of this waste leads to overfilled landfills, soil and water pollution, and loss of valuable land resources.
          </p>
        </section>
  
        {/* Where Does It Go? */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Where Does Land Waste End Up?</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            <li><strong>Landfills:</strong> Waste is compacted and buried but contributes to methane emissions and groundwater contamination.</li>
            <li><strong>Incinerators:</strong> Burns waste to reduce volume, but releases toxic gases and particulates.</li>
            <li><strong>Illegal Dumping:</strong> A serious environmental hazard that pollutes ecosystems and water bodies.</li>
            <li><strong>Oceans:</strong> Plastic waste often finds its way into marine environments, threatening wildlife.</li>
          </ul>
        </section>
  
        {/* Environmental & Social Impact */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">The Impact of Land Waste</h2>
          <p className="text-gray-700 text-lg">
            The consequences of unmanaged land waste are far-reaching:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg mt-2">
            <li><strong>Land Degradation:</strong> Depletes arable land that could be used for farming or green spaces.</li>
            <li><strong>Greenhouse Gas Emissions:</strong> Landfills produce methane, a gas 25x more potent than CO₂.</li>
            <li><strong>Health Hazards:</strong> Communities near landfills face increased risk of respiratory and waterborne diseases.</li>
            <li><strong>Loss of Biodiversity:</strong> Improper disposal disrupts ecosystems and harms animals who ingest waste.</li>
          </ul>
        </section>
  
        {/* Solutions: Small Changes, Big Impact */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">What You Can Do to Reduce Land Waste</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li><strong>Reduce:</strong> Buy only what you need. Choose products with minimal or no packaging.</li>
            <li><strong>Reuse:</strong> Repair, donate, or creatively reuse items instead of discarding them.</li>
            <li><strong>Recycle:</strong> Sort recyclables (paper, plastic, metal, glass) and ensure they are clean and dry.</li>
            <li><strong>Compost:</strong> Organic waste like food scraps and yard trimmings can enrich soil instead of landfills.</li>
            <li><strong>Switch to Reusables:</strong> Use cloth bags, metal straws, and refillable bottles.</li>
            <li><strong>Support Circular Economy:</strong> Buy from brands that reuse materials and practice sustainable manufacturing.</li>
          </ul>
        </section>
  
        {/* Debunking Misconceptions */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Myths vs. Reality</h2>
          <ul className="text-gray-700 text-lg space-y-2">
            <li><strong>Myth:</strong> "Landfills are safe and managed well." <br /> <strong>Reality:</strong> Most landfills leak pollutants into the environment and are ticking time bombs for nearby communities.</li>
            <li><strong>Myth:</strong> "One person can’t make a difference." <br /> <strong>Reality:</strong> Collective action starts with individuals. One person reducing waste by 50% can prevent hundreds of pounds of landfill each year.</li>
            <li><strong>Myth:</strong> "Everything can be recycled." <br /> <strong>Reality:</strong> Many items are not recyclable or contaminate entire batches—proper sorting is crucial.</li>
          </ul>
        </section>
  
        {/* Looking Ahead */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">The Future of Waste Management</h2>
          <p className="text-gray-700 text-lg">
            Innovations like smart bins, AI-powered sorting, zero-waste communities, and biodegradable packaging are transforming waste management. Policies encouraging Extended Producer Responsibility (EPR) will ensure companies take back what they produce.
          </p>
        </section>
  
        {/* Final Image */}
        <img
          src="https://cdn.trendhunterstatic.com/thumbs/522/oscar.jpeg?auto=webp"
          alt="Household recycling and compost bins"
          className="rounded-xl w-full"
        />
  
        {/* Call to Action */}
        <p className="text-xl text-center text-emerald-700 font-semibold mt-6">
          🗑️ It starts with one choice. Let's reclaim our land and protect our planet—one less item in the trash at a time.
        </p>
      </div>
    );
  }
  