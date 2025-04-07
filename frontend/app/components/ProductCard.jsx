"use client";
import Link from "next/link";

export default function ProductCard({ product }) {
  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "bg-green-200 text-green-800";
      case "B":
        return "bg-lime-200 text-lime-800";
      case "C":
        return "bg-yellow-200 text-yellow-800";
      case "D":
        return "bg-orange-200 text-orange-800";
      case "E":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden flex flex-col h-full">
        <div className="w-full h-48 flex justify-center items-center bg-white p-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
          />
        </div>

        <div className="p-4 flex flex-col justify-between flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-[#2E2E2E]">
              {product.name}
            </h3>
            <button
              onClick={handleAddToCart}
              className="text-sm bg-[#6FCF97] hover:bg-[#4CAF72] text-white px-3 py-1 rounded-md"
            >
              Add to Cart
            </button>
          </div>
          <p className="text-sm text-[#6B7280] mb-2">
            Category: {product.category}
          </p>
          <div
            className={`inline-block px-3 py-1 text-xs font-medium rounded ${getGradeColor(
              product.nutritionGrade
            )}`}
          >
            Nutrition Grade: {product.nutritionGrade || "Unknown"}
          </div>
        </div>
      </div>
    </Link>
  );
}
