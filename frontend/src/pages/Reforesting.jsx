export default function ReforestationCard() {
    return (
      <div className="max-w-5xl mx-auto my-25 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg space-y-8">
        {/* Title */}
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
          Grow Green, Breathe Clean
        </h1>
  
        {/* Image */}
        <img
          src="https://i.ytimg.com/vi/qRBCbeoqWLA/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-DoACuAiKAgwIABABGC8gZSguMA8=&rs=AOn4CLBGpRL8JP6l7tkwstPcu1ZGsZhbLw"
          alt="Lush forest canopy from above"
          className="rounded-xl w-full"
        />
  
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Why Forests Matter</h2>
          <p className="text-gray-700 text-lg">
            Forests are essential to life on Earth. They provide clean air, regulate climate, prevent soil erosion, and are home to over 80% of terrestrial species. They act as the lungs of our planet, absorbing carbon dioxide and releasing oxygen. Without them, ecosystems collapse and biodiversity declines.
          </p>
        </section>
  
        {/* Importance of Reforestation */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">The Importance of Reforestation</h2>
          <p className="text-gray-700 text-lg">
            Reforestation—the process of replanting trees in deforested areas—is a key strategy in the fight against climate change. Trees act as carbon sinks, drawing down CO₂ from the atmosphere. Forest restoration also revives degraded land, supports water cycles, and helps prevent desertification.
          </p>
        </section>
  
        {/* The Problem: Deforestation */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">The Threat of Deforestation</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            <li><strong>Around 10 million hectares of forest</strong> are lost every year—about the size of Iceland.</li>
            <li><strong>Major causes:</strong> agriculture, logging, mining, urban expansion, and forest fires.</li>
            <li><strong>Impact:</strong> Habitat loss, soil erosion, carbon release, and extinction of flora and fauna.</li>
          </ul>
        </section>
  
        {/* How Trees Help the Planet */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">How Trees Make a Difference</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
            <li><strong>Carbon Storage:</strong> One tree can absorb up to 48 pounds of CO₂ per year.</li>
            <li><strong>Oxygen Production:</strong> An acre of trees can provide enough oxygen for 18 people annually.</li>
            <li><strong>Biodiversity Protection:</strong> Forests provide habitat for 70% of Earth's land animals and plants.</li>
            <li><strong>Water Filtration:</strong> Tree roots purify and regulate water supplies, reducing runoff and erosion.</li>
            <li><strong>Climate Control:</strong> Forests cool the Earth by releasing moisture and shading the ground.</li>
          </ul>
        </section>
  
        {/* Personal Action: What You Can Do */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">How You Can Join the Reforestation Movement</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li><strong>Plant Trees:</strong> Participate in local tree-planting initiatives or start your own.</li>
            <li><strong>Support NGOs:</strong> Donate to or volunteer with organizations like One Tree Planted, Eden Reforestation Projects, and Rainforest Alliance.</li>
            <li><strong>Practice Sustainable Living:</strong> Use recycled paper, avoid palm oil, and eat sustainably.</li>
            <li><strong>Educate Others:</strong> Share information about deforestation and reforestation efforts.</li>
            <li><strong>Offset Your Carbon Footprint:</strong> Fund reforestation projects to balance your emissions.</li>
          </ul>
        </section>
  
        {/* Myths vs. Reality */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Common Myths About Forests</h2>
          <ul className="text-gray-700 text-lg space-y-2">
            <li><strong>Myth:</strong> "Tree planting alone will solve climate change." <br /> <strong>Reality:</strong> Reforestation is vital but must be part of a broader sustainability strategy.</li>
            <li><strong>Myth:</strong> "Only tropical forests matter." <br /> <strong>Reality:</strong> Boreal and temperate forests also play a huge role in carbon storage.</li>
            <li><strong>Myth:</strong> "New forests can replace old-growth forests." <br /> <strong>Reality:</strong> Old forests are irreplaceable in biodiversity and carbon storage capacity.</li>
          </ul>
        </section>
  
        {/* Looking Ahead */}
        <section>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-2">The Future of Our Forests</h2>
          <p className="text-gray-700 text-lg">
            The global reforestation movement is growing rapidly, powered by digital mapping, drone planting, and AI-based monitoring. Government policies, business collaborations, and citizen-led projects are aiming to restore over 350 million hectares of degraded land by 2030. Every tree matters.
          </p>
        </section>
  
        {/* Final Image */}
        <img
          src="https://i.ytimg.com/vi/5Ux6zB24CtM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDR2DPUwKTwTwQuaXovUNQwQTt4QA"
          alt="Volunteers planting trees in a community park"
          className="rounded-xl w-full"
        />
  
        {/* Call to Action */}
        <p className="text-xl text-center text-emerald-700 font-semibold mt-6">
          🌳 Your hands can plant hope. Join the reforestation movement and help Earth breathe again.
        </p>
      </div>
    );
  }
  