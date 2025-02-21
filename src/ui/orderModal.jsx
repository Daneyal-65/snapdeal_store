import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, X } from "lucide-react";
import { getCartAsync } from "../store/cart";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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

export default function PlaceOrderModal({ m = "" }) {
  const [open, setOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [selectedItems, setSelectedItems] = React.useState({});
  const [paymentOpen, setPaymentOpen] = React.useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { id } = useParams();
  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCartAsync());
    }
  }, [isAuthenticated, dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleItemSelection = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleProceedToPayment = () => {
    if (!mobile || !address || !pincode) {
      alert("Please fill all required fields.");
      return;
    }

    setPaymentOpen(true);
  };
  //   console.log(selectedItems);
  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{ fontFamily: "sans-serif", color: "#ffff" }}
      >
        <ShoppingCart className="w-6 h-6 mx-2" />
        <span className={`${m}`}> Place Order</span>
      </Button>
      {isAuthenticated ? (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style} className="w-[500px] md:w-[700px] overflow-scroll">
            {/* Header */}
            <div className="flex justify-between p-1 border-b bg-gray-100">
              <h2 className="text-lg font-bold text-red-800">Place Order</h2>
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            {/* Address Fields */}
            <div className="p-4 w-[175px] flex gap-1 flex-wrap md:flex-nowrap">
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="p-2 border"
                required
              />
              <input
                type="text"
                placeholder="Address- area"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 border"
                required
              />
              <input
                type="text"
                placeholder="Pincode - 00000"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className=" p-2 border"
                required
              />
            </div>

            {/* Cart Items */}
            <div className="p-4 overflow-y-auto min-h-[300px]">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                cartItems.map(
                  (cart) =>
                    cart.product && (
                      <div
                        key={cart.product._id}
                        className="flex items-center justify-between p-3 border-b"
                      >
                        <input
                          type="checkbox"
                          checked={selectedItems[cart.product._id] || false}
                          onChange={() => toggleItemSelection(cart.product._id)}
                          className="px-2 mr-2"
                        />
                        <img
                          src={cart.product.image}
                          alt={cart.product.name}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        <div className="flex-1 mx-3">
                          <p className="text-sm font-semibold text-gray-800">
                            {cart.product.name}
                          </p>
                          <p className="text-sm text-red-500 font-bold">
                            ₹{Math.floor(cart.product.price)}.00
                          </p>
                        </div>
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
                      acc +
                      (selectedItems[item.product?._id]
                        ? item.product?.price * item.quantity
                        : 0),
                    0
                  )
                )}
                .00
              </p>
              <Button
                sx={{
                  background: "red",
                  color: "#ffff",
                }}
                onClick={handleProceedToPayment}
                className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-1 text-center rounded"
              >
                Proceed to Payment
              </Button>
            </div>
          </Box>
        </Modal>
      ) : (
        <p>Please log in to place an order.</p>
      )}
      <PaymentModal open={paymentOpen} onClose={() => setPaymentOpen(false)} />
    </div>
  );
}

function PaymentModal({ open, onClose }) {
  const nav = useNavigate();
  const handlePaymentClick = async () => {
    toast.success("order succesfully places !");
    setTimeout(() => {
      nav("/");
      window.location.reload();
    }, 1000);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={style}
        style={{
          border: "none",
          padding: "3rem 2rem",
          borderRadius: "5px",
        }}
      >
        <button
          className="absolute top-1 right-2 hover:text-red-600"
          onClick={() => onClose()}
        >
          {" "}
          <X width={35} height={30} />
        </button>
        <h2 className="text-lg font-bold text-red-600 font-sans">
          Choose Payment Method
        </h2>
        <div className="flex flex-col gap-2 mt-4" onClick={handlePaymentClick}>
          <button className="p-2 bg-white border rounded text-red-600 hover:bg-cyan-100  shadow-2xl transition-all duration-500 ease-in-out ">
            Net Banking
          </button>
          <button className="p-2 bg-white border rounded text-red-600 hover:bg-cyan-100  shadow-2xl transition-all duration-500 ease-in-out ">
            UPI
          </button>
          <button className="p-2 bg-white border rounded text-red-600 hover:bg-cyan-100  shadow-2xl transition-all duration-500 ease-in-out ">
            Cash on Delivery
          </button>
        </div>
        <ToastContainer />
      </Box>
    </Modal>
  );
}
