import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Trash } from "lucide-react";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function ProductsComponent({
  limit = null,
  homePageComponent = false,
}) {
  const { user, setUser } = useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  console.log(user);
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  useEffect(() => {
    if (!homePageComponent) {
      if (!token && !error) {
        setError("You must login to use this feature");
        return;
      }
    }
    axios
      .get(`${__API_URL__}/products`)
      .then((res) => {
        const allProducts = res.data;

        // Apply limit if it's a valid positive integer
        const finalProducts =
          Number.isInteger(limit) && limit > 0
            ? allProducts.slice(0, limit)
            : allProducts;

        setProducts(finalProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [limit]);
  console.log(user);
  async function handleAddToCart({ productId, userId = user?._id }) {

    if(!token){
      toast.error("Login to Add Item in Cart")
      return
    }
    // Add product to cart
    let quantity = 1;
    try {
      const res = await axios.post(
        `${__API_URL__}/users/cart/add`,
        {
          userId,
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCart = res.data.cart; // Assuming backend returns full cart
      setUser((prev) => ({
        ...prev,
        cart: updatedCart,
      }));
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  }

  async function removeProductFromCart(productId) {
    // Remove product from cart
    console.log("Product Id : ", productId);
    try {
      const res = await axios.delete(`${__API_URL__}/users/cart/remove`, {
        data: {
          productId: productId,
          userId: user._id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedCart = res.data.cart; // Assuming backend returns full cart
      showcart();
      setUser((prev) => ({
        ...prev,
        cart: updatedCart,
      }));
      console.log(user);
    } catch (err) {
      console.er;
    }
  }
  async function showcart() {
    try {
      const response = await axios.get(`${__API_URL__}/users/cart/view`, {
        params: { userId: user?._id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError(null);
      console.log("cart products : ", response.data);
      setCartProducts(response.data);
    } catch (error) {
      error.status === 401
        ? setError("Login to access cart")
        : setError("Unexpexted Error occured while fetching cart");
      console.error("Error fetching cart products:", error);
    } finally {
      setLoading(false);
    }
  }

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => {
        return total + product.priceAtTime * product.quantity;
      }, 0)
      .toFixed(2);
  };
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

          {error && (
            <div className="bg-red-50 mx-auto border border-red-400 text-red-700 px-4 py-3 rounded shadow-md z-50 max-w-md w-full text-center">
              <strong className="font-semibold">Error: </strong>
              <span>{error}</span>
            </div>
          )}
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
                      ₹{product.price}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full transition-all duration-300 flex items-center"
                      onClick={() =>
                        handleAddToCart({
                          productId: product?._id,
                        })
                      }
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
            </div>
          ))}
        </div>

        {homePageComponent ? (
          <></>
        ) : (
          <div
            onClick={() => {
              showcart();
              setIsCartOpen(!isCartOpen);
            }}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
          >
            <Badge
              badgeContent={user?.cart?.length || 0}
              color="warning"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{
                "& .MuiBadge-badge": {
                  top: -14,
                  right: -4,
                },
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </div>
        )}

        {isCartOpen && (
          <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br min-h-120 from-emerald-50 to-teal-50 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
                <button
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  onClick={() => {
                    setIsCartOpen(false);
                  }}
                >
                  <h1> &times;</h1>
                </button>
              </div>

              {loading ? (
                <div className="p-6 text-center text-lg">
                  Loading your cart...
                </div>
              ) : error ? (
                <div className="p-6 text-center text-lg text-red-600">
                  {error}
                </div>
              ) : cartProducts.length === 0 ? (
                <div className="p-6 text-center text-lg">
                  Your cart is empty
                </div>
              ) : (
                <>
                  <div className="overflow-y-auto p-6 flex-grow">
                    <div className="grid grid-cols-14 gap-4 font-semibold pb-4 border-b border-gray-200">
                      <div className="col-span-6">Product</div>
                      <div className="col-span-2 text-right">Price</div>
                      <div className="col-span-2 text-right">Quantity</div>
                      <div className="col-span-2 text-right">Total</div>
                      <div className="col-span-2 text-right">Remove</div>
                    </div>

                    {cartProducts.map((product, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-13 gap-4 py-4 border-b border-gray-200 items-center"
                      >
                        <div className="col-span-6 flex items-center space-x-4">
                          <img
                            src={
                              product.product.imageUrl ||
                              "https://via.placeholder.com/50"
                            }
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium">
                              {product.product.name}
                            </h4>
                            {product.description && (
                              <p className="text-gray-500 text-sm">
                                {product.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          ₹{product.priceAtTime.toFixed(2)}
                        </div>
                        <div className="col-span-2 ml-8">
                          {product.quantity}
                        </div>
                        <div className="col-span-2 text-left font-medium">
                          ₹{(product.priceAtTime * product.quantity).toFixed(2)}
                        </div>
                        <div
                          className="mx-auto"
                          onClick={() => {
                            // console.log("before update : " , updatedCart)
                            console.log("Onclick : ", product.product._id);
                            removeProductFromCart(product.product._id);
                          }}
                        >
                          <Trash />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-xl font-bold">
                      <span>Total: </span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <button className="bg-[#278783] hover:bg-green-700 text-white px-6 py-2 rounded">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* View All CTA */}
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
