import { useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function ProductsComponent() {
  const [products, setProducts] = useState([    {
    name: "Solar Panel X200",
    brand: "suntech",
    description: "high-efficiency monocrystalline solar panel for home and commercial use.",
    category: "Solar Panel",
    certifications: "Energy Star",
    materials: "Monocrystalline Silicon",
    shippingEcoFriendly: true,
    stock: 12,
    price: 299.99,
    imageUrl: "https://www.servokon.com/images/solar-01.png",
  },
  {
    name: "EcoCharge Inverter",
    brand: "greenvolt",
    description: "compact and efficient inverter with smart grid support.",
    category: "Inverter",
    certifications: "ISO 9001",
    materials: "Recycled Aluminum",
    shippingEcoFriendly: false,
    stock: 0,
    price: 189.5,
    imageUrl: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/687f26a5-6f4d-45b1-a67d-a5d07156f8fc_Eco-Watt%20XL%20Rapid%201650%20inverter-1.png",
  },
  {
    name: "Sustain Battery Pack",
    brand: "voltcore",
    description: "long-lasting battery pack with fast charging capability.",
    category: "Battery",
    certifications: "UL Certified",
    materials: "Lithium Iron Phosphate",
    shippingEcoFriendly: true,
    stock: 7,
    price: 499.0,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuDEhSy2uvR3HG9Bo3b6cK4PQk3zN0ioE6lw&s",
  },]);

  useEffect(() => {

    // Fetch eco products
    axios
      .get(`${__API_URL__}/products`)
      .then((res) => {
        console.log(res.data);

        setProducts(res.data.slice(0, 3));
      })
      .catch((err) => console.error(err));

  }, []);
    
    return (
        
        <section className="relative py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
<div className="container mx-auto px-4">
  {/* Section Header */}
  <div className="text-center mb-16">
    <span className="inline-block px-3 py-1 text-xs font-semibold text-teal-800 bg-teal-100 rounded-full mb-4">
      Conscious Consumerism
    </span>
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
        Sustainably Crafted
      </span>
    </h2>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      Products designed with the planet in mind - every detail matters
    </p>
  </div>

  {/* Products Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    {products.map((product, index) => (
      <div
        key={index}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        {/* Product Image with Floating Badges */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {product.category}
            </span>
            {product.certifications && (
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {product.certifications}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs font-medium shadow-sm">
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Pre-order"}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          {/* Brand and Name */}
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-500">
              {product.brand.charAt(0).toUpperCase() +
                product.brand.slice(1)}
            </span>
            <h3 className="text-xl font-bold text-gray-900">
              {product.name.charAt(0).toUpperCase() +
                product.name.slice(1)}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description.charAt(0).toUpperCase() +
              product.description.slice(1)}
          </p>

          {/* Sustainability Metrics */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                Materials
              </span>
              <span className="text-xs font-medium text-emerald-700">
                {product.materials + " "}
              </span>
            </div>
          </div>

          {/* Shipping Info */}
          {product.shippingEcoFriendly && (
            <div className="flex items-center mb-4 text-sm text-teal-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Eco-friendly shipping
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-2xl font-bold text-emerald-600">
                ${product.price}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full transition-all duration-300 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* View All CTA */}
  <div className="text-center">
    <Link
      to="/marketplace"
      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
    >
      Explore Our Sustainable Marketplace
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  </div>
</div>
</section>
)
        }  