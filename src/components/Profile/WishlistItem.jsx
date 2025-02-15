import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveItemFromWishList } from "../../store/menu";
import { addToBag } from "../../store/cart";
import Modal from "../../ui/Modal";

const WishlistPage = () => {
  // all the require states
  const [wishlistItems, setWishlistItems] = React.useState([]);
  const dispatch = useDispatch(); // dispatcher hook
  // get the state data form redux store
  const wishlist = useSelector((state) => state.wishlist.value);
  // update the local state
  useEffect(() => {
    setWishlistItems(wishlist);
  }, [wishlist]);
  // conver to indian rupees
  const formatPrice = (price) => {
    return `Rs.${price * 82}`;
  };
  // if no items is there show a message
  return wishlist.length > 0 ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl font-medium text-gray-900 mb-6">
        My Wishlist{" "}
        <span className="text-gray-500 font-normal">
          {wishlistItems.length} items
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id + Math.random()}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="relative pt-[133%]">
              {" "}
              {/* 4:3 Aspect Ratio */}
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <button
                onClick={() => dispatch(RemoveItemFromWishList(item.id))}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                aria-label="Remove item"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-sm text-gray-900 font-medium truncate mb-2">
                {item.name}
              </h3>

              <div className="mb-4 flex items-center">
                <span className="text-sm font-bold text-gray-900">
                  {formatPrice(item.price)}
                </span>
                {item.originalPrice && (
                  <span className="ml-2 text-xs text-gray-500 line-through">
                    {formatPrice(item.originalPrice)}
                  </span>
                )}
                {item.discount && (
                  <span className="ml-2 text-xs text-rose-500">
                    ({item.discount})
                  </span>
                )}
              </div>

              <button
                className="w-full py-2 px-4 border border-rose-500
               text-rose-500 font-medium text-sm rounded hover:bg-rose-500
                hover:text-white transition-colors duration-300"
                onClick={() => {
                  dispatch(addToBag(item));
                  dispatch(RemoveItemFromWishList(item.id));
                }}
              >
                MOVE TO BAG
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Your wishlist is empty</p>
        </div>
      )}
    </div>
  ) : (
    <Modal />
  );
};

export default WishlistPage;
