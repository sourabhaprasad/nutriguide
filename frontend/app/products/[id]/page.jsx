"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${id}.json`
        );
        const data = await res.json();

        if (data.status === 1) {
          setProduct(data.product);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setError("An error occurred while fetching product data.");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (isLoading)
    return <p className="text-center mt-8">Loading product details...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {product.product_name || "Unnamed Product"}
      </h1>
      <img
        src={product.image_front_url || "/placeholder.png"}
        alt={product.product_name || "Product"}
        className="w-auto h-auto max-w-md mx-auto mb-4"
      />

      <div className="space-y-2">
        <p>
          <strong>Code:</strong> {product.code}
        </p>
        <p>
          <strong>Categories:</strong>{" "}
          {product.categories_tags?.join(", ") || "Unknown"}
        </p>
        <p>
          <strong>Nutrition Grade:</strong>{" "}
          {product.nutrition_grades?.toUpperCase() || "N/A"}
        </p>
        <p>
          <strong>Ingredients:</strong>{" "}
          {product.ingredients_text || "Not available"}
        </p>
        <p>
          <strong>Quantity:</strong> {product.quantity || "N/A"}
        </p>
        <p>
          <strong>Brands:</strong> {product.brands || "N/A"}
        </p>
        <p>
          <strong>Labels:</strong> {product.labels_tags?.join(", ") || "None"}
        </p>
      </div>
    </div>
  );
}
