import { X } from "lucide-react";
import Button from "../ui/Button";
import { isOpen, removeFromCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartModal = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.toggle);
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    let time = setTimeout(() => {
      dispatch(isOpen(true));
    }, 500);
    return () => clearTimeout(time);
  });

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center m-auto top-12
         bg-opacity-50 z-50 h-full w-full bg-black shadow-2xl ${
           isCartOpen ? "flex" : "hidden"
         } transition-all duration-300 ease-in-out z-50 border-l border-gray-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b bg-gray-100 w-[600px] md:w-[80%]">
        <h2 className="text-lg font-bold text-gray-800">Shopping Cart</h2>
        <button
          onClick={() => {
            dispatch(isOpen(false));
            nav(-1);
          }}
          className="text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 overflow-y-auto h-[60%] bg-white w-[600px] md:w-[80%]">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border-b"
            >
              {/* Item Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md border"
              />
              {/* Item Details */}
              <div className="flex-1 mx-3">
                <p className="text-sm font-semibold text-gray-800">
                  {item.title}
                </p>
                <p className="text-sm text-red-500 font-bold">₹{item.price}</p>
              </div>
              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700 font-semibold text-sm"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-100 w-[600px] md:w-[80%] mt-1 mb-2">
        <p className="text-lg font-semibold text-gray-800">
          Total: ₹{cartItems.reduce((acc, item) => acc + item.price, 0)}
        </p>
        <Button className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartModal;
