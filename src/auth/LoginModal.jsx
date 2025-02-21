import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import LoginForm from "./loginForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} style={{ fontFamily: "sans-serif" }}>
        <LoginButton />
      </Button>
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
          }}
        >
          <div className="flex justify-center  flex-col items-center py-4 gap-1 ">
            <LoginForm />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

function LoginButton() {
  return (
    <span
      className="w-20 h-10 text-white bg-red-700 hover:bg-gray-100 pt-2

       hover:text-black outline-none bolder-none
          font-sans transition-all duration-1000 ease-in-out rounded-2xl"
    >
      Sign In
    </span>
  );
}
