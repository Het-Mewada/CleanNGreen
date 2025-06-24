import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { X, ShoppingCart, Package, Trash2 } from 'lucide-react';
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function ProductsComponent({
  limit = null,
  homePageComponent = false,
}) {
  const { user, setUser } = useContext(AuthContext);
  const [orderHistory, setOrderHistory] = useState([null]);
  const [state, setState] = useState({
    products: [],
    cartProducts: [],
    productLoading: false,
    loading: false,
    error: null,
    invalidProfileErr: "",
    isCartOpen: false,
    activeOption: "cart",
    selectAddress: false,
    selectedAddress: null,
  });
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    if (!homePageComponent && !token && !state.error) {
      setState((prev) => ({
        ...prev,
        error: "You must login to use this feature",
      }));
      return;
    }

    const fetchData = async () => {
      setState((prev) => ({ ...prev, productLoading: true }));
      try {
        const productsRes = await axios.get(`${__API_URL__}/products`);
        const finalProducts =
          Number.isInteger(limit) && limit > 0
            ? productsRes.data.slice(0, limit)
            : productsRes.data;

        setState((prev) => ({
          ...prev,
          products: finalProducts,
          productLoading: false,
        }));

        const orders = await axios.get(
          `${__API_URL__}/users/orders/view/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log("order dat : " , orders.data)
        setOrderHistory(orders.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setState((prev) => ({ ...prev, productLoading: false }));
      }
    };

    fetchData();
  }, [limit]);

  const handleStateUpdate = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleAddToCart = async ({ productId }) => {
    if (!token) {
      toast.error("Login to Add Item in Cart");
      return;
    }

    if (window.location.pathname !== "/marketplace") {
      navigate("/marketplace");
    }

    try {
      const res = await axios.post(
        `${__API_URL__}/users/cart/add`,
        { userId: user?._id, productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser((prev) => ({ ...prev, cart: res.data.cart }));
    } catch (err) {
      console.error(err);
    }
  };

  const removeProductFromCart = async (productId) => {
    try {
      const res = await axios.delete(`${__API_URL__}/users/cart/remove`, {
        data: { productId, userId: user._id },
        headers: { Authorization: `Bearer ${token}` },
      });

      showcart();
      setUser((prev) => ({ ...prev, cart: res.data.cart }));
    } catch (err) {
      console.error(err);
    }
  };

  const showcart = async () => {
    handleStateUpdate({
      invalidProfileErr: "",
      isCartOpen: true,
      loading: true,
    });

    try {
      const response = await axios.get(`${__API_URL__}/users/cart/view`, {
        params: { userId: user?._id },
        headers: { Authorization: `Bearer ${token}` },
      });

      handleStateUpdate({
        error: null,
        cartProducts: response.data,
        loading: false,
      });
    } catch (error) {
      handleStateUpdate({
        error:
          error.status === 401
            ? "Login to access cart"
            : "Unexpected Error occurred while fetching cart",
        loading: false,
      });
    }
  };

  const calculateTotal = () =>
    state.cartProducts
      .reduce(
        (total, product) => total + product.priceAtTime * product.quantity,
        0
      )
      .toFixed(2);

  const handleCheckout = async () => {
    if (!state.selectedAddress) {
      handleStateUpdate({ selectAddress: true });
      return;
    }

    try {
      const res = await axios.post(
        `${__API_URL__}/users/cart/checkout`,
        { cartProducts: state.cartProducts, userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
    }
  };

  const validateUserProfile = (user) => {
    if (!user) return false;

    const requiredFields = ["name", "email", "gender", "cart", "address"];
    for (const field of requiredFields) {
      if (
        !user[field] ||
        (Array.isArray(user[field]) && user[field].length === 0)
      ) {
        handleStateUpdate({
          invalidProfileErr: `${field} is missing or empty. Please fill it before proceeding.`,
        });
        return false;
      }
    }

    const address = user.address[0];
    const addressFields = ["houseNo", "street", "locality", "pincode", "state"];
    for (const field of addressFields) {
      if (!address[field]) return false;
    }

    return true;
  };

  const ProductCard = ({ product }) => (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs font-medium shadow-sm">
          {product.stock > 0 ? `${product.stock} in stock` : "Pre-order"}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-500">
            {product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}
          </span>
          <h3 className="text-xl font-bold text-gray-900">
            {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description.charAt(0).toUpperCase() +
            product.description.slice(1)}
        </p>

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Materials</span>
            <span className="text-xs font-medium text-emerald-700">
              {product.materials + " "}
            </span>
          </div>
        </div>

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

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-2xl font-bold text-emerald-600">
              ₹{product.price}
            </p>
          </div>
          <button
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full transition-all duration-300 flex items-center"
            onClick={() => handleAddToCart({ productId: product?._id })}
          >
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
  );

  const CartItem = ({ product }) => (
<div>
  {/* Image + Product Info */}
  <div className="flex flex-col">

  <div>

  <div className="flex items-center space-x-4 col-span-6 w-full">
    <img
      src={product.product.imageUrl || "/images/placeholder.png"}
      alt={product.product.name}
      className="w-12 h-12 object-cover rounded"
    />
    <div>
      <h4 className="font-medium text-sm md:text-base">{product.product.name}</h4>
      {product.description && (
        <p className="text-gray-500 text-xs md:text-sm">{product.description}</p>
      )}
    </div>
  </div>
  </div>
<div className="flex mt-3 sm:flex sm:mt-3">

  {/* Price */}
  <div className="col-span-2 text-center w-full text-sm md:text-base">
    Rate : ₹{product.priceAtTime.toFixed(2)}
  </div>

  {/* Quantity */}
  <div className="col-span-2 text-center w-full text-sm md:text-base">
    Quantity : {product.quantity}
  </div>

  {/* Total */}
  <div className="col-span-2 text-center w-full font-medium text-sm md:text-base">
   Total : ₹{(product.priceAtTime * product.quantity).toFixed(2)}
  </div>

  {/* Remove Icon */}
  <div
    className="mt-2 md:mt-0 text-red-500 hover:text-red-700 cursor-pointer"
    onClick={() => removeProductFromCart(product.product._id)}
  >
    <Trash2 className="w-5 h-5 mx-auto" />
  </div>
</div>
</div>

  </div>
  );
  const addAddress = () => {
    navigate("/profile", {
      state: {
        openEditAddress: true,
        activeState: "add",
      },
    });
  };

  const AddressItem = ({ address }) => (
    <div
      onClick={() => {
        localStorage.setItem("defaultAddress", JSON.stringify(address));
        handleStateUpdate({ selectedAddress: address, selectAddress: false });
        handleCheckout();
      }}
      className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
    >
      <p>
        <strong>House No.:</strong> {address.houseNo}
      </p>
      <p>
        <strong>Street:</strong> {address.street}
      </p>
      <p>
        <strong>Locality:</strong> {address.locality}
      </p>
      <p>
        <strong>Pincode:</strong> {address.pincode}
      </p>
      <p>
        <strong>State:</strong> {address.state}
      </p>
    </div>
  );

  return (
    <section className="relative py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
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

        {state.productLoading && (
          <div className="p-6 text-center text-lg">
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
            Loading Products...
          </div>
        )}

        {state.error && (
          <div className="bg-red-50 mx-auto border border-red-400 text-red-700 px-4 py-3 rounded shadow-md z-50 max-w-md w-full text-center">
            <strong className="font-semibold">Error: </strong>
            <span>{state.error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {state.products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        {!homePageComponent && (
          <div
            onClick={showcart}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
          >
            <Badge
              badgeContent={user?.cart?.length || 0}
              color="warning"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{ "& .MuiBadge-badge": { top: -14, right: -4 } }}
            >
              <ShoppingCartIcon />
            </Badge>
          </div>
        )}

       {state.isCartOpen && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white  rounded-lg shadow-xl w-full min-h-130 max-h-130 max-w-4xl  flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gray-900 text-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">My Account</h1>
          <button
            onClick={() => handleStateUpdate({ isCartOpen: false })}
            className="p-1 rounded-md hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => handleStateUpdate({ activeOption: "cart" })}
            className={`flex-1 py-3 px-4 font-medium text-sm sm:text-base transition-colors relative ${
              state.activeOption === "cart"
                ? "bg-white text-gray-900 font-semibold"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart size={18} />
              <span>Cart</span>
              {user?.cart?.length > 0 && (
                <span className={`absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs ${
                  state.activeOption === "cart" 
                    ? "bg-amber-500 text-white" 
                    : "bg-gray-700 text-white"
                }`}>
                  {user.cart.length}
                </span>
              )}
            </div>
          </button>
          
          <button
            onClick={() => handleStateUpdate({ activeOption: "orders" })}
            className={`flex-1 py-3 px-4 font-medium text-sm sm:text-base transition-colors ${
              state.activeOption === "orders"
                ? "bg-white text-gray-900 font-semibold"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package size={18} />
              <span>Orders</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {state.activeOption === "cart" ? (
          <div className="h-full flex flex-col">
            {/* Cart Content */}
            {state.loading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900 mb-4"></div>
                <p className="text-gray-600">Loading your cart...</p>
              </div>
            ) : state.error ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center bg-red-50 p-4 rounded-lg max-w-md">
                  <AlertCircle className="mx-auto text-red-500 mb-2" size={24} />
                  <p className="text-red-600">{state.error}</p>
                </div>
              </div>
            ) : state.cartProducts.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingCart className="text-gray-300 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-700 mb-1">Your cart is empty</h3>
                <p className="text-gray-500 text-sm">Start shopping to add items</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                  {state.cartProducts.map((product, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <CartItem product={product} />
                    </div>
                  ))}
                </div>

                {/* Cart Footer */}
                <div className="border-t border-gray-200 p-4 bg-gray-50 sticky bottom-0">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-lg font-bold text-gray-900">
                      Total: <span className="text-emerald-600">₹{calculateTotal()}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium transition-colors focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Orders Section */
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-auto p-4">
              {orderHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <Package className="text-gray-300 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No orders yet</h3>
                  <p className="text-gray-500 text-sm">Your completed orders will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orderHistory.map((order, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
                    >
                      {/* Order Header */}
                      <div className="bg-gray-50 p-4 border-b border-gray-200">
                        <div className="flex justify-between sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              Order #{index + 1}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(order.orderedAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-gray-900">
                              ₹{order.totalAmount}
                            </span>
                            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                              {order.status || "Placed"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="divide-y divide-gray-200">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 flex items-start gap-3"
                          >
                            <div className="flex-shrink-0">
                              <img
                                src={item.product?.imageUrl || "/images/placeholder.jpg"}
                                alt={item.product?.name}
                                className="w-16 h-16 object-contain bg-white border border-gray-200 rounded"
                                onError={(e) => {
                                  e.target.src = "/placeholder-product.jpg";
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {item.product?.name}
                              </h4>
                              <p className="text-xs text-gray-500 mb-1">
                                {item.product?.brand || "Generic"}
                              </p>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  Qty: {item.quantity}
                                </span>
                                <span className="font-medium">
                                  ₹{item.priceAtTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
          // </div>
        )}

        {state.selectAddress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-center">
                Select Delivery Address
              </h2>
              <div className="space-y-4 max-h-80 overflow-scroll">
                {Array.isArray(user.address) && user.address.length > 0 ? (
                  user.address.map((address, index) => (
                    <AddressItem key={address._id} address={address} />
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No addresses found.
                  </p>
                )}
              </div>
              <div className="flex">
                <button
                  onClick={() => addAddress()}
                  className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-900"
                >
                  + Add New Address
                </button>
                <button
                  onClick={() => handleStateUpdate({ selectAddress: false })}
                  className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {homePageComponent && (
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
        )}
      </div>
    </section>
  );
}
