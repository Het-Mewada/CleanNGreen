import { useState } from 'react';

const CarbonFootprintCalculator = () => {
  const [inputs, setInputs] = useState({
    energyUsage: '',
    vehicleMiles: '',
    dietType: 'meat-moderate',
    flightHours: ''
  });
  
  const [results, setResults] = useState({
    totalCO2: null,
    energyCO2: 0,
    transportCO2: 0,
    dietCO2: 0,
    flightsCO2: 0,
    comparison: '',
    suggestions: []
  });

  const calculateFootprint = () => {
    // Constants based on EPA and other scientific sources
    const KWH_TO_CO2 = 0.92; // lbs CO2 per kWh (US average)
    const GASOLINE_CO2 = 19.6; // lbs CO2 per gallon burned
    const AVG_MPG = 25; // Average miles per gallon
    
    // Diet emissions (kg CO2/year)
    const DIET_EMISSIONS = {
      'vegan': 1100,
      'vegetarian': 1400,
      'meat-moderate': 2300,
      'meat-heavy': 3300
    };
    
    // Flight emissions (kg CO2/hour)
    const FLIGHT_EMISSIONS = 90; // kg CO2 per hour in air
    
    // Convert inputs to numbers
    const energy = parseFloat(inputs.energyUsage) || 0;
    const miles = parseFloat(inputs.vehicleMiles) || 0;
    const flightHours = parseFloat(inputs.flightHours) || 0;
    
    // Calculate each component
    const energyCO2 = (energy * KWH_TO_CO2 * 12) / 2.205; // Convert lbs to kg and multiply by 12 months
    const transportCO2 = (miles * 52 / AVG_MPG * GASOLINE_CO2) / 2.205; // Convert lbs to kg and multiply by 52 weeks
    const dietCO2 = DIET_EMISSIONS[inputs.dietType] || 2000;
    const flightsCO2 = flightHours * FLIGHT_EMISSIONS;
    
    // Total in metric tons
    const totalCO2 = Math.round((energyCO2 + transportCO2 + dietCO2 + flightsCO2) / 1000);
    
    // Comparison text
    let comparison;
    if (totalCO2 < 2000) {
      comparison = "Excellent! You're below the global target of 2 tons.";
    } else if (totalCO2 < 6000) {
      comparison = "Good! You're below the European average of 6 tons.";
    } else if (totalCO2 < 16000) {
      comparison = "You're around the US average of 16 tons - room for improvement!";
    } else {
      comparison = "Your footprint is higher than average - let's work on reducing it!";
    }
    
    // Generate personalized suggestions
    const suggestions = [];
    
    if (energyCO2 > 3000) {
      suggestions.push({
        text: `Switch to renewable energy or improve home insulation to reduce your ${Math.round(energyCO2/1000)} ton energy footprint.`,
        impact: "Could save ~2 tons/year"
      });
    }
    
    if (transportCO2 > 2000) {
      suggestions.push({
        text: `Consider carpooling, public transport, or an electric vehicle for your ${Math.round(miles*52)} annual miles.`,
        impact: "Could save ~1.5 tons/year"
      });
    }
    
    if (inputs.dietType.includes('meat') && dietCO2 > 2000) {
      suggestions.push({
        text: "Reducing meat consumption by half could significantly lower your diet footprint.",
        impact: `Could save ~${Math.round((dietCO2 - DIET_EMISSIONS['vegetarian'])/1000)} tons/year`
      });
    }
    
    if (flightsCO2 > 1000) {
      suggestions.push({
        text: "Consider video conferencing instead of short flights when possible.",
        impact: `Each avoided hour saves ~90kg CO2`
      });
    }
    
    if (suggestions.length === 0 && totalCO2 < 2000) {
      suggestions.push({
        text: "You're already doing great! Share your sustainable practices with others.",
        impact: "Collective action makes the biggest difference"
      });
    }
    
    setResults({
      totalCO2,
      energyCO2,
      transportCO2,
      dietCO2,
      flightsCO2,
      comparison,
      suggestions
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const percentage = results.totalCO2 ? Math.min(Math.round((results.totalCO2 / 16) * 100), 100) : 0;

  return (
    <section className="max-w-4xl mx-auto my-14 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Carbon Footprint Calculator</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Home Energy Usage (kWh/month)</label>
            <input 
              type="number" 
              name="energyUsage"
              value={inputs.energyUsage}
              onChange={handleInputChange}
              placeholder="e.g. 500"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Vehicle Miles (per week)</label>
            <input 
              type="number" 
              name="vehicleMiles"
              value={inputs.vehicleMiles}
              onChange={handleInputChange}
              placeholder="e.g. 100"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Diet Type</label>
            <select 
              name="dietType"
              value={inputs.dietType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="meat-moderate">Meat-Moderate (3-5 days/week)</option>
              <option value="meat-heavy">Meat-Heavy (daily)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Flights (hours/year)</label>
            <input 
              type="number" 
              name="flightHours"
              value={inputs.flightHours}
              onChange={handleInputChange}
              placeholder="e.g. 5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
            />
          </div>
          <button 
            onClick={calculateFootprint}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105"
          >
            Calculate My Footprint
          </button>
        </div>

        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Estimated Impact</h3>
          
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Your Footprint</span>
              <span className="text-sm font-medium text-gray-700">
                {results.totalCO2 !== null ? `${results.totalCO2} tons CO₂/year` : '0 kg CO₂/year'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-green-600 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">0</span>
              <span className="text-xs text-gray-500">Avg: 12</span>
              <span className="text-xs text-gray-500">High: 24+</span>
            </div>
          </div>

          {results.totalCO2 === null ? (
            <div className="mb-6">
              <p className="text-lg font-medium text-center py-2 px-4 bg-green-100 text-green-800 rounded-md">
                Enter your details to see your impact
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className={`text-lg font-medium text-center py-2 px-4 rounded-md ${
                  results.totalCO2 < 2 ? 'bg-green-100 text-green-800' :
                  results.totalCO2 < 6 ? 'bg-blue-100 text-blue-800' :
                  results.totalCO2 < 16 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {results.comparison}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Breakdown:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Home Energy:</span>
                    <span className="text-sm font-medium">{Math.round(results.energyCO2/1000)} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Transportation:</span>
                    <span className="text-sm font-medium">{Math.round(results.transportCO2/1000)} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Diet:</span>
                    <span className="text-sm font-medium">{Math.round(results.dietCO2/1000)} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Flights:</span>
                    <span className="text-sm font-medium">{Math.round(results.flightsCO2/1000)} tons</span>
                  </div>
                </div>
              </div>

              {results.suggestions.length > 0 && (
                <div className="mt-6 space-y-4" id="suggestions">
                  <h4 className="font-medium text-gray-800">Personalized Suggestions:</h4>
                  <ul className="space-y-3">
                    {results.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 bg-green-100 text-green-800 p-1 rounded-full mr-2">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-gray-700">{suggestion.text}</p>
                          <p className="text-sm text-gray-500 mt-1">{suggestion.impact}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">How You Compare</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Your footprint:</span>
                <span className="text-sm font-medium">
                  {results.totalCO2 !== null ? `${results.totalCO2} tons` : '--'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">US Average:</span>
                <span className="text-sm">16 tons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Global Target:</span>
                <span className="text-sm">2 tons</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarbonFootprintCalculator;