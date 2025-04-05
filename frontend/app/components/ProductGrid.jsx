import ProductCard from "./ProductCard";

export default function ProductGrid({ products, lastRef }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product, idx) => (
        <div
          key={product.id}
          ref={idx === products.length - 1 ? lastRef : null}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
