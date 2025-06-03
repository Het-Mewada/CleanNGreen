import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function InsertData() {
  const [activeTab, setActiveTab] = useState("stats");
  const [successMessage, setSuccessMessage] = useState("");

  const showSuccess = () => {
    setSuccessMessage("Data added successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };
  const token = JSON.parse(localStorage.getItem("user")).token;

  const handleSubmit = async (e, endpoint, data) => {
    e.preventDefault();
    try {
      await axios.put(`${__API_URL__}/admin/${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccess();
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the data");
    }
  };

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "home",
    imageUrl: "",
    materials: [],
    shippingEcoFriendly: false,
    stock: 0,
    brand: "",
  });

  const [newMaterial, setNewMaterial] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addMaterial = () => {
    if (newMaterial && !product.materials.includes(newMaterial)) {
      setProduct((prev) => ({
        ...prev,
        materials: [...prev.materials, newMaterial],
      }));
      setNewMaterial("");
    }
  };

  const removeTag = (type, value) => {
    setProduct((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${__API_URL__}/admin/products/add`,
        {
          ...product,
          price: parseFloat(product.price),
          carbonFootprint: parseFloat(product.carbonFootprint) || 0,
          stock: parseInt(product.stock),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="bg-gray-100  min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          Eco Admin Dashboard
        </h1>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {["stats", "products"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-medium text-sm rounded-t-lg mr-2 ${
                activeTab === tab
                  ? "bg-green-600 text-white"
                  : "hover:bg-green-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            {successMessage}
          </div>
        )}

        {/* Stats Form */}
        {activeTab === "stats" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              Update Statistics
            </h2>
            <form
              onSubmit={(e) =>
                handleSubmit(e, "stats", {
                  treesPlanted: e.target.treesPlanted.value,
                  co2Reduced: e.target.co2Reduced.value,
                  cleanEnergy: e.target.cleanEnergy.value,
                  users: e.target.users.value,
                })
              }
              className="space-y-4"
            >
              {/* Stats form fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Trees Planted
                </label>
                <input
                  type="number"
                  name="treesPlanted"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <label className="block text-sm font-medium text-gray-700">
                CO:2
              </label>
              <input
                type="number"
                name="co2Reduced"
                // required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />{" "}
              <label className="block text-sm font-medium text-gray-700">
                cleanEnergy
              </label>
              <input
                type="number"
                name="cleanEnergy"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />{" "}
              <label className="block text-sm font-medium text-gray-700">
                users
              </label>
              <input
                type="number"
                name="users"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {/* Other stats fields... */}
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add Stats
              </button>
            </form>
          </div>
        )}

        {/* Product Form */}
        {activeTab === "products" && (
          <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-green-700 mb-6">
              Add New Sustainable Product
            </h1>
            <form onSubmit={handleSubmit2} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price ($)*
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category*
                  </label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="home">Home Goods</option>
                    <option value="fashion">Fashion</option>
                    <option value="beauty">Beauty</option>
                    <option value="food">Food</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Stock Quantity*
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Image URL*
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={product.imageUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Materials
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    placeholder="Add material (e.g. organic cotton)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={addMaterial}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.materials.map((material) => (
                    <span
                      key={material}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {material}
                      <button
                        type="button"
                        onClick={() => removeTag("materials", material)}
                        className="ml-2 text-green-600 hover:text-green-800 focus:outline-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="shippingEcoFriendly"
                  checked={product.shippingEcoFriendly}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Eco-friendly shipping
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add Sustainable Product
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default InsertData;
