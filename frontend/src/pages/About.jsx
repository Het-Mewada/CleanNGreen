import {
  FaLeaf,
  FaRecycle,
  FaSolarPanel,
  FaHandsHelping,
} from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import { MdEco } from "react-icons/md";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="min-h-screen mt-15 relative py-20 bg-green-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 md:py-24">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-green-300">Eco-Sphere</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Empowering sustainable living through innovation, education, and
              community action
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" items-center">
            <div className="mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our <span className="text-green-600">Story</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Eco-Sphere was born in 2020 from a simple idea: sustainability
                should be accessible, practical, and rewarding for everyone. Our
                founders, a group of environmental scientists and tech
                enthusiasts, saw the gap between climate awareness and
                actionable solutions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What started as a small blog about eco-friendly living has grown
                into a comprehensive platform helping thousands reduce their
                environmental impact through:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Personalized carbon footprint analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Practical sustainability guides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Verified eco-friendly product recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Community-driven environmental initiatives</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Purpose</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving meaningful change through education, innovation, and
              collective action
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <GiEarthAmerica className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Mission</h3>
              </div>
              <p className="text-gray-600">
                To empower individuals and communities with the knowledge,
                tools, and inspiration to reduce their environmental impact. We
                believe small, consistent actions create monumental change when
                multiplied across communities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <MdEco className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Vision</h3>
              </div>
              <p className="text-gray-600">
                A world where sustainable living is the norm, not the exception.
                Where every person understands their connection to nature and
                takes responsibility for preserving it for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:border-green-300 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaLeaf className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sustainability First
                </h3>
              </div>
              <p className="text-gray-600">
                Every decision we make is evaluated through an environmental
                lens. We practice what we preach in our operations and
                partnerships.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:border-green-300 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaHandsHelping className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Community Power
                </h3>
              </div>
              <p className="text-gray-600">
                Real change happens together. We foster supportive communities
                where members learn from and inspire each other.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:border-green-300 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaSolarPanel className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Innovative Solutions
                </h3>
              </div>
              <p className="text-gray-600">
                We combine cutting-edge technology with timeless ecological
                wisdom to create practical solutions for modern living.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:border-green-300 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaRecycle className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Circular Thinking
                </h3>
              </div>
              <p className="text-gray-600">
                We promote systems where waste is designed out and materials
                keep their value through reuse and regeneration.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:border-green-300 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <GiEarthAmerica className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Scientific Integrity
                </h3>
              </div>
              <p className="text-gray-600">
                Our content is rigorously researched and reviewed by
                environmental experts to ensure accuracy and reliability.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-100 hover:border-green-300 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <MdEco className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Joyful Activism
                </h3>
              </div>
              <p className="text-gray-600">
                Sustainability should be fulfilling, not frustrating. We focus
                on positive, rewarding approaches to eco-living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Meet Our <span className="text-green-300">Team</span>
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Passionate individuals dedicated to making sustainability
              accessible
            </p>
          </div> */}

      {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Ruchi Gondaliya",
                role: "Founder & CEO",
                bio: "Environmental scientist with 15 years in sustainability research",
                img: "images/admins/ruchi.jpg"
              },
              {
                name: "Nandini Patel",
                role: "CTO",
                bio: "Green tech innovator building our digital platforms",
                img: "images/admins/nandini.jpg"
              },
              {
                name: "Yogesh Patel",
                role: "Head of Education",
                bio: "Former teacher creating our sustainability curriculum",
                img: "images/admins/yogesh.jpg"
              },
              {
                name: "Het Mewada",
                role: "Community Manager",
                bio: "Connects our members to local environmental initiatives",
                img: "images/admins/het.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-green-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 ">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-green-300 font-medium mb-3">{member.role}</p>
                  <p className="text-green-100">{member.bio}</p>
                </div>
              </div>
            ))}
          </div> */}
      {/* </div>
      </section> */}

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Impact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Together with our community, we're making a difference
            </p>
          </div>

          <div className=" text-center">
            {[
              { number: "4,230+", label: "Active Community Members" },
              { number: "2,865 tons", label: "CO₂ Reduced Annually" },
              //   { number: "120+", label: "Sustainability Guides Published" },
              { number: "36", label: "Local Cleanup Initiatives Supported" },
            ].map((stat, index) => (
              <div
                key={index}
                className=" stretch-1 m-2 bg-green-50 p-8 rounded-xl"
              >
                <p className="text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
