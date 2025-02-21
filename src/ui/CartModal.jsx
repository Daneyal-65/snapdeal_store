import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import PlaceOrderModal from "./orderModal";
import {
  getCartAsync,
  removeFromCartAsync,
  updateCartQuantityAsync,
} from "../store/cart";
import LoginForm from "../auth/loginForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export default function CartModal() {
  const [open, setOpen] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCartAsync());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div>
      <Button onClick={handleOpen} style={{ fontFamily: "sans-serif" }}>
        <CartModalButton cartItemsLenth={cartItems.length} />
      </Button>
      {isAuthenticated ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="w-[500px] md:w-[700px]">
            {/* Header */}
            <div className="flex justify-between  p-1 border-b bg-gray-100 ">
              <h2 className="text-lg font-bold text-gray-800">Shopping Cart</h2>
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-4 overflow-y-auto min-h-[300px]">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                cartItems.map(
                  (cart, _) =>
                    cart.product && ( // Add check for cart.product
                      <div
                        key={`${_} ${cart.product.name}`}
                        className="flex items-center justify-between p-3 border-b"
                      >
                        {/* Item Image */}
                        <img
                          src={cart.product.image}
                          alt={cart.product.name}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        {/* Item Details */}
                        <div className="flex-1 mx-3">
                          <p className="text-sm font-semibold text-gray-800">
                            {cart.product.name}
                          </p>
                          <p className="text-sm text-red-500 font-bold">
                            ₹{Math.floor(cart.product.price)}.00
                          </p>
                        </div>

                        {/* quantity */}
                        <div className="flex justify-center items-center gap-2 mx-10 ">
                          <button
                            className="w-10 h-8 text-white bg-red-600 shadow px-2 p-1"
                            onClick={() => {
                              dispatch(
                                updateCartQuantityAsync({
                                  productId: cart.product._id,
                                  quantity: cart.quantity + 1,
                                })
                              );
                              dispatch(getCartAsync());
                            }}
                          >
                            <Plus />{" "}
                          </button>
                          <span className="w-10 h-8 text-black shadow px-2 p-1 text-center">
                            {cart.quantity}
                          </span>
                          <button
                            className="w-10 h-8 text-white bg-red-600 shadow px-2 p-1"
                            onClick={() => {
                              if (cart.quantity > 1) {
                                dispatch(
                                  updateCartQuantityAsync({
                                    productId: cart.product._id,
                                    quantity: cart.quantity - 1,
                                  })
                                );
                              } else {
                                dispatch(removeFromCartAsync(cart.product._id));
                              }
                              dispatch(getCartAsync());
                            }}
                          >
                            <Minus />{" "}
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => {
                            dispatch(removeFromCartAsync(cart.product._id));
                          }}
                          className="text-red-500 hover:text-red-700 font-semibold text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    )
                )
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-100">
              <p className="text-lg font-semibold text-gray-800">
                Total: ₹
                {Math.floor(
                  cartItems.reduce(
                    (acc, item) =>
                      acc + (item.product?.price * item.quantity || 0),
                    0
                  )
                )}
                .00
              </p>
              <div className="bg-red-600 text-white px-6 py-1 rounded-md w-full md:w-auto mt-2 md:mt-0">
                {/* Place Order Button */}
                <PlaceOrderModal m={"ml-[100px]"} />
              </div>
            </div>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{
              border: "none",
              borderRadius: "7px",
              with: "400px",
            }}
          >
            <div className="flex justify-center  flex-col px-8 py-4 gap-1">
              <LoginForm />
            </div>
          </Box>
        </Modal>
      )}{" "}
    </div>
  );
}

function CartModalButton({ cartItemsLenth }) {
  return (
    <span className="flex items-center hover:text-gray-200 text-white">
      <ShoppingCart className="w-6 h-6" />
      <span className="ml-2">Cart</span>
      {cartItemsLenth >= 0 && (
        <span className="ml-1 bg-white text-[#DC143C] text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartItemsLenth}
        </span>
      )}
    </span>
  );
}
