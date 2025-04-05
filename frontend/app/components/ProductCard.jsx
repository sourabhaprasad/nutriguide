"use client";
import Link from "next/link";

export default function ProductCard({ product }) {
  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "bg-green-500 text-white";
      case "B":
        return "bg-lime-500 text-white";
      case "C":
        return "bg-yellow-400 text-black";
      case "D":
        return "bg-orange-500 text-white";
      case "E":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden">
        <div className="w-full h-auto flex justify-center items-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-auto h-auto max-h-40"
          />
        </div>
        <div className="p-4">
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
          <p className="text-sm text-[#6B7280]">Category: {product.category}</p>
          <div
            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getGradeColor(
              product.nutritionGrade
            )}`}
          >
            {product.nutritionGrade}
          </div>
        </div>
      </div>
    </Link>
  );
}
