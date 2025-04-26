  import { useState } from 'react';

  const CarbonFootprintCalculator = () => {
    const [inputs, setInputs] = useState({
      electricityUsage: '',
      electricitySource: 'grid', // Default to grid electricity
      vehicleKm: '',
      vehicleType: 'petrol',
      publicTransportKm: '',
      dietType: 'vegetarian', // Default to vegetarian as it's more common in India
      flightHours: '',
      wasteProduction: 'medium'
    });
    
    const [results, setResults] = useState({
      totalCO2: null,
      electricityCO2: 0,
      transportCO2: 0,
      dietCO2: 0,
      flightsCO2: 0,
      wasteCO2: 0,
      comparison: '',
      suggestions: []
    });

    const [activeTab, setActiveTab] = useState('calculator');
    const [showInfo, setShowInfo] = useState(null);

    // India-specific emission factors (sources: CEA, TERI, IPCC)
    const calculateFootprint = () => {
      // Electricity emissions (kg CO2/kWh)
      const ELECTRICITY_EMISSIONS = {
        'grid': 0.82,   // India's grid average (CEA 2022)
        'coal': 1.05,   // Coal-dominated grids
        'solar': 0.05,  // Solar PV
        'wind': 0.01,   // Wind
        'hydro': 0.01,   // Hydro
        'mixed': 0.45    // Mixed renewable
      };
      
      // Vehicle emissions (kg CO2/km)
      const VEHICLE_EMISSIONS = {
        'petrol': 0.18,  // Petrol car
        'diesel': 0.16,  // Diesel car
        'cng': 0.14,    // CNG vehicle
        'electric': 0.08, // EV (with India's grid mix)
        'motorcycle': 0.1, // Motorcycle/scooter
        'bus': 0.09      // Public bus
      };
      
      // Public transport emissions (kg CO2/km)
      const PUBLIC_TRANSPORT_EMISSIONS = 0.06; // Average for metro/bus
      
      // Diet emissions (kg CO2/year)
      const DIET_EMISSIONS = {
        'vegan': 800,
        'vegetarian': 1100,
        'eggetarian': 1300,
        'meat-occasional': 1800,  // Meat 1-2 times/week
        'meat-regular': 2500      // Meat 3+ times/week
      };
      
      // Flight emissions (kg CO2/hour)
      const FLIGHT_EMISSIONS = 85; // Domestic flights in India
      
      // Waste emissions (kg CO2/year)
      const WASTE_EMISSIONS = {
        'low': 200,    // Minimal waste, good segregation
        'medium': 400, // Average urban Indian
        'high': 800    // No segregation, lots of food waste
      };
      
      // Convert inputs to numbers
      const electricity = parseFloat(inputs.electricityUsage) || 0;
      const vehicleKm = parseFloat(inputs.vehicleKm) || 0;
      const publicTransportKm = parseFloat(inputs.publicTransportKm) || 0;
      const flightHours = parseFloat(inputs.flightHours) || 0;
      
      // Calculate each component
      const electricityCO2 = electricity * ELECTRICITY_EMISSIONS[inputs.electricitySource] * 12; // Monthly to yearly
      const vehicleCO2 = vehicleKm * VEHICLE_EMISSIONS[inputs.vehicleType] * 52; // Weekly to yearly
      const publicTransportCO2 = publicTransportKm * PUBLIC_TRANSPORT_EMISSIONS * 52;
      const dietCO2 = DIET_EMISSIONS[inputs.dietType] || 1100;
      const flightsCO2 = flightHours * FLIGHT_EMISSIONS;
      const wasteCO2 = WASTE_EMISSIONS[inputs.wasteProduction];
      
      // Total in metric tons
      const totalCO2 = Math.round((electricityCO2 + vehicleCO2 + publicTransportCO2 + dietCO2 + flightsCO2 + wasteCO2) / 1000);
      
      // Comparison text for Indian context
      let comparison;
      if (totalCO2 < 1) {
        comparison = "Exceptional! You're well below India's average (1.8 tons) and close to sustainability targets!";
      } else if (totalCO2 < 1.8) {
        comparison = "Great! You're below India's average carbon footprint of 1.8 tons per person.";
      } else if (totalCO2 < 3) {
        comparison = "You're around India's urban average. Small changes can make a big difference!";
      } else {
        comparison = "Your footprint is higher than average. Let's explore ways to reduce it!";
      }
      
      // Generate personalized suggestions
      const suggestions = [];
      
      if (electricityCO2 > 1000) {
        suggestions.push({
          text: `Switch to renewable energy sources or reduce consumption to lower your ${Math.round(electricityCO2/1000)} ton electricity footprint.`,
          impact: "Potential savings: ~0.5-1 ton/year",
          icon: "⚡"
        });
      }
      
      if (vehicleCO2 > 1000) {
        suggestions.push({
          text: `Consider carpooling, public transport, or switching to an electric vehicle for your ${Math.round(vehicleKm*52)} km annual travel.`,
          impact: "Potential savings: ~0.3-0.8 ton/year",
          icon: "🚗"
        });
      }
      
      if (publicTransportKm < 20 && vehicleKm > 50) {
        suggestions.push({
          text: "Increasing public transport use can significantly reduce your transport emissions.",
          impact: "Potential savings: ~0.2-0.5 ton/year",
          icon: "🚌"
        });
      }
      
      if (inputs.dietType.includes('meat') && dietCO2 > 1500) {
        suggestions.push({
          text: "Reducing meat consumption and choosing local vegetarian options can lower your diet footprint.",
          impact: `Potential savings: ~${Math.round((dietCO2 - DIET_EMISSIONS['vegetarian'])/1000)} ton/year`,
          icon: "🍛"
        });
      }
      
      if (flightsCO2 > 500) {
        suggestions.push({
          text: "Consider trains for domestic travel when possible (Indian railways emit 75% less CO2 than flights).",
          impact: "Potential savings: ~0.2 ton per avoided flight hour",
          icon: "✈️"
        });
      }
      
      if (inputs.wasteProduction === 'high') {
        suggestions.push({
          text: "Improving waste segregation and composting food waste can reduce methane emissions.",
          impact: "Potential savings: ~0.2-0.4 ton/year",
          icon: "🗑️"
        });
      }
      
      if (suggestions.length === 0 && totalCO2 < 1.8) {
        suggestions.push({
          text: "You're already doing great for the Indian context! Share your sustainable practices with others.",
          impact: "Collective action makes the biggest difference",
          icon: "🌟"
        });
      }
      
      setResults({
        totalCO2,
        electricityCO2,
        transportCO2: vehicleCO2 + publicTransportCO2,
        dietCO2,
        flightsCO2,
        wasteCO2,
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

    const toggleInfo = (field) => {
      setShowInfo(showInfo === field ? null : field);
    };

    const percentage = results.totalCO2 ? Math.min(((results.totalCO2 / 3) * 100).toFixed(2), 100) : 0;

    return (
      <section className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-8 border-b">
          <button
            className={`px-6 py-2 font-medium ${activeTab === 'calculator' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button
            className={`px-6 py-2  font-medium ${activeTab === 'info' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('info')}
          >
            Understanding Carbon Footprint
          </button>
        </div>

        {activeTab === 'calculator' ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-green-700 mb-2">India Carbon Footprint Calculator</h2>
              <p className="text-gray-600 mb-6">Calculate your personal carbon emissions based on typical Indian lifestyles and consumption patterns.</p>
              
              <div className="space-y-6">
                {/* Electricity Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <span className="bg-green-100 p-2 rounded-full mr-2">⚡</span>
                    Electricity Consumption
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 flex items-center">
                        Monthly Electricity Usage (kWh)
                        <button 
                          onClick={() => toggleInfo('electricity')}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </label>
                      {showInfo === 'electricity' && (
                        <div className="bg-blue-50 p-2 text-sm text-gray-600 rounded mb-2">
                          Average Indian household uses about 200-250 kWh/month. Check your electricity bill for exact usage.
                        </div>
                      )}
                      <input 
                        type="number" 
                        name="electricityUsage"
                        value={inputs.electricityUsage}
                        onChange={handleInputChange}
                        placeholder="e.g. 200"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        min="0"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Primary Electricity Source</label>
                      <select 
                        name="electricitySource"
                        value={inputs.electricitySource}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="grid">Grid (India average mix)</option>
                        <option value="coal">Coal-dominated grid</option>
                        <option value="solar">Solar power</option>
                        <option value="wind">Wind power</option>
                        <option value="hydro">Hydro power</option>
                        <option value="mixed">Mixed renewable</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Transportation Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <span className="bg-green-100 p-2 rounded-full mr-2">🚗</span>
                    Transportation
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Personal Vehicle Kilometers (per week)</label>
                      <input 
                        type="number" 
                        name="vehicleKm"
                        value={inputs.vehicleKm}
                        onChange={handleInputChange}
                        placeholder="e.g. 100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        min="0"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                      <select 
                        name="vehicleType"
                        value={inputs.vehicleType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="petrol">Petrol Car</option>
                        <option value="diesel">Diesel Car</option>
                        <option value="cng">CNG Vehicle</option>
                        <option value="electric">Electric Vehicle</option>
                        <option value="motorcycle">Motorcycle/Scooter</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">Public Transport Kilometers (per week)</label>
                      <input 
                        type="number" 
                        name="publicTransportKm"
                        value={inputs.publicTransportKm}
                        onChange={handleInputChange}
                        placeholder="e.g. 50"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Diet Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <span className="bg-green-100 p-2 rounded-full mr-2">🍛</span>
                    Diet
                  </h3>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Diet Type</label>
                    <select 
                      name="dietType"
                      value={inputs.dietType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="vegan">Vegan (no animal products)</option>
                      <option value="vegetarian">Vegetarian (dairy included)</option>
                      <option value="eggetarian">Eggetarian (eggs + dairy)</option>
                      <option value="meat-occasional">Meat-Occasional (1-2 times/week)</option>
                      <option value="meat-regular">Meat-Regular (3+ times/week)</option>
                    </select>
                  </div>
                </div>

                {/* Flights Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <span className="bg-green-100 p-2 rounded-full mr-2">✈️</span>
                    Air Travel
                  </h3>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Flight Hours (per year)</label>
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
                </div>

                {/* Waste Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <span className="bg-green-100 p-2 rounded-full mr-2">🗑️</span>
                    Waste Production
                  </h3>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Waste Habits</label>
                    <select 
                      name="wasteProduction"
                      value={inputs.wasteProduction}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="low">Low (good segregation, composting)</option>
                      <option value="medium">Medium (some segregation)</option>
                      <option value="high">High (no segregation, frequent food waste)</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={calculateFootprint}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Calculate My Footprint
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Carbon Footprint Results</h3>
              
              {results.totalCO2 === null ? (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                  <img src="https://cdn-icons-png.flaticon.com/512/992/992700.png" alt="Calculator" className="w-24 mx-auto mb-4 opacity-50" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Enter Your Details</h4>
                  <p className="text-gray-500">Fill in your consumption patterns to see your personalized carbon footprint analysis.</p>
                </div>
              ) : (
                <>
                  {/* Summary Card */}
                  <div className={`mb-6 p-4 rounded-lg ${
                    results.totalCO2 < 1 ? 'bg-green-100 border border-green-200' :
                    results.totalCO2 < 1.8 ? 'bg-blue-100 border border-blue-200' :
                    results.totalCO2 < 3 ? 'bg-yellow-100 border border-yellow-200' : 'bg-red-100 border border-red-200'
                  }`}>
                    <div className="flex items-center mb-2">
                      <span className={`text-2xl mr-2 ${
                        results.totalCO2 < 1 ? 'text-green-600' :
                        results.totalCO2 < 1.8 ? 'text-blue-600' :
                        results.totalCO2 < 3 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {results.totalCO2} tons CO₂/year
                      </span>
                    </div>
                    <p className="font-medium text-gray-800">{results.comparison}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Your Footprint</span>
                      <span className="text-sm font-medium text-gray-700">
                        {(results.totalCO2).toFixed(2)} tons
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full ${
                          results.totalCO2 < 1 ? 'bg-green-500' :
                          results.totalCO2 < 1.8 ? 'bg-blue-500' :
                          results.totalCO2 < 3 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>0</span>
                      <span>India Avg: 1.8</span>
                      <span>Urban High: 3+</span>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">Emissions Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="bg-green-100 p-2 rounded-full mr-2">⚡</span>
                          <span className="text-sm text-gray-700">Electricity</span>
                        </div>
                        <span className="text-sm font-medium">{(results.electricityCO2/1000).toFixed(2)} tons</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="bg-green-100 p-2 rounded-full mr-2">🚗</span>
                          <span className="text-sm text-gray-700">Transportation</span>
                        </div>
                        <span className="text-sm font-medium">{(results.transportCO2/1000).toFixed(2)} tons</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="bg-green-100 p-2 rounded-full mr-2">🍛</span>
                          <span className="text-sm text-gray-700">Diet</span>
                        </div>
                        <span className="text-sm font-medium">{(results.dietCO2/1000).toFixed(2)} tons</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="bg-green-100 p-2 rounded-full mr-2">✈️</span>
                          <span className="text-sm text-gray-700">Flights</span>
                        </div>
                        <span className="text-sm font-medium">{(results.flightsCO2/1000).toFixed(2)} tons</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="bg-green-100 p-2 rounded-full mr-2">🗑️</span>
                          <span className="text-sm text-gray-700">Waste</span>
                        </div>
                        <span className="text-sm font-medium">{(results.wasteCO2/1000).toFixed(2)} tons</span>
                      </div>
                    </div>
                  </div>

                  {/* Suggestions */}
                  {results.suggestions.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-3">Personalized Reduction Tips</h4>
                      <div className="space-y-3">
                        {results.suggestions.map((suggestion, index) => (
                          <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-start">
                              <span className="text-lg mr-2">{suggestion.icon}</span>
                              <div>
                                <p className="text-gray-700">{suggestion.text}</p>
                                <p className="text-xs text-green-600 mt-1 font-medium">{suggestion.impact}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comparison */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">How You Compare</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Your footprint:</span>
                        <span className="text-sm font-medium">{results.totalCO2} tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">India Average:</span>
                        <span className="text-sm">1.8 tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700">Global Target (2050):</span>
                        <span className="text-sm">0.5 tons</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Understanding Carbon Footprint</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-2">What is a Carbon Footprint?</h3>
                <p className="text-gray-600">
                  Your carbon footprint is the total amount of greenhouse gases (including carbon dioxide and methane) that are generated by your actions. In India, the average carbon footprint is about 1.8 tons per person per year, much lower than the global average but growing rapidly with urbanization.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-2">Why It Matters for India</h3>
                <p className="text-gray-600 mb-2">
                  As one of the fastest growing economies, India's choices today will significantly impact global climate change. While our per capita emissions are low, our massive population means small individual changes can have huge collective impact.
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>India is the 3rd largest emitter globally after China and the US</li>
                  <li>70% of our electricity comes from coal</li>
                  <li>The transport sector accounts for 13% of our emissions</li>
                  <li>Agriculture contributes 18% of our greenhouse gases</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-2">Key Areas to Reduce</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <span className="bg-green-100 p-2 rounded-full mr-2">⚡</span>
                    <div>
                      <h4 className="font-medium text-gray-700">Energy</h4>
                      <p className="text-sm text-gray-600">Switch to LED bulbs, use energy-efficient appliances, and consider solar options where possible.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-green-100 p-2 rounded-full mr-2">🚗</span>
                    <div>
                      <h4 className="font-medium text-gray-700">Transport</h4>
                      <p className="text-sm text-gray-600">Use public transport, carpool, or switch to electric vehicles. Indian railways emit 75% less than flights.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-green-100 p-2 rounded-full mr-2">🍛</span>
                    <div>
                      <h4 className="font-medium text-gray-700">Food</h4>
                      <p className="text-sm text-gray-600">Reduce food waste, eat seasonal local produce, and moderate meat consumption.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-green-100 p-2 rounded-full mr-2">🗑️</span>
                    <div>
                      <h4 className="font-medium text-gray-700">Waste</h4>
                      <p className="text-sm text-gray-600">Segregate waste, compost food scraps, and reduce single-use plastics.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-gray-800 mb-2">Calculation Methodology</h3>
                <p className="text-gray-600 mb-2">
                  Our calculator uses India-specific emission factors from credible sources:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                  <li>Electricity: Central Electricity Authority (CEA) 2022 data</li>
                  <li>Transport: TERI and ARAI vehicle emission studies</li>
                  <li>Diet: IPCC agricultural emissions adjusted for Indian diets</li>
                  <li>Waste: CPCB estimates for Indian waste management</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  };

  export default CarbonFootprintCalculator;