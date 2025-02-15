import React from "react";

const ProductSpecifications = ({ product }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-6">
      {/* Highlights Section */}
      <div className="border-b pb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Highlights</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-600 text-sm">
          <p>• Category: {product?.category}</p>
          <p>• Price: ${product?.price}</p>
          <p>
            • Rating: {product?.rating?.rate} ⭐ ({product?.rating?.count}{" "}
            Reviews)
          </p>
          <p>• Material: 100% Polyester</p>
          <p>• Wash Type: Machine Wash</p>
          <p>• Fit: Slimmer Fit</p>
          <p>• Comfort: Lightweight & Breathable</p>
          <p>• Moisture Wicking: Yes</p>
        </div>
      </div>

      {/* Other Specifications Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Other Specifications
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-gray-700 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-semibold">Product Name:</span>{" "}
              {product?.title}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {product?.description}
            </p>
            <p>
              <span className="font-semibold">Country of Origin:</span> USA
            </p>
            <p>
              <span className="font-semibold">Brand:</span> Opna
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;
