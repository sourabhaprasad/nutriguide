"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ProductGrid from "../components/ProductGrid";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  const formatCategories = (tags) => {
    if (!Array.isArray(tags)) return "Unknown";
    return tags
      .map((tag) => tag.split(":")[1])
      .map((cat) =>
        cat.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
      )
      .join(", ");
  };

  const fetchProducts = async (pageNum = 1) => {
    try {
      if (barcode) {
        const res = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );
        const data = await res.json();

        if (data.status === 1) {
          const p = data.product;
          const product = {
            id: p.code,
            name: p.product_name || "Unnamed Product",
            image: p.image_front_small_url,
            category: formatCategories(p.categories_tags),
            nutritionGrade: p.nutrition_grades?.toUpperCase() || "N/A",
          };

          setProducts([product]);
          setHasMore(false);
        } else {
          setProducts([]);
          setHasMore(false);
        }

        return;
      }

      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page=${pageNum}&page_size=20&fields=product_name,code,image_front_small_url,nutrition_grades,categories_tags&json=1`
      );
      const data = await res.json();

      const newProducts = data.products
        .filter((p) => {
          const matchesSearch =
            !searchTerm ||
            p.product_name?.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesBarcode = !barcode || p.code === barcode;

          const matchesCategory =
            !category || p.categories_tags?.includes(category.toLowerCase());

          return matchesSearch && matchesBarcode && matchesCategory;
        })
        .map((p) => ({
          id: p.code,
          name: p.product_name || "Unnamed Product",
          image: p.image_front_small_url,
          category: formatCategories(p.categories_tags),
          nutritionGrade: p.nutrition_grades?.toUpperCase() || "N/A",
        }));

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        const sortedProducts = sortProducts(newProducts, sortOption);
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNewProducts = sortedProducts.filter(
            (p) => !existingIds.has(p.id)
          );
          return [...prev, ...uniqueNewProducts];
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const sortProducts = (products, option) => {
    const nutritionOrder = { A: 1, B: 2, C: 3, D: 4, E: 5, N: 6, NA: 6 };

    return [...products].sort((a, b) => {
      switch (option) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "nutrition-asc":
          return (
            (nutritionOrder[a.nutritionGrade] || 6) -
            (nutritionOrder[b.nutritionGrade] || 6)
          );
        case "nutrition-desc":
          return (
            (nutritionOrder[b.nutritionGrade] || 6) -
            (nutritionOrder[a.nutritionGrade] || 6)
          );
        default:
          return 0;
      }
    });
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();

      console.log("Fetched category data:", data);

      let topCategories;

      if (Array.isArray(data)) {
        topCategories = data.map((name) => ({
          name,
          value: name.toLowerCase().replace(/\s+/g, "-"),
        }));
      } else if (Array.isArray(data.tags)) {
        topCategories = data.tags
          .filter((cat) => cat.products > 1000)
          .slice(0, 30)
          .map((cat) => ({
            name: cat.name,
            value: cat.id,
          }));
      } else {
        throw new Error("Unexpected category data format");
      }

      setCategories(topCategories.slice(0, 5));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1); // Fetch fresh data on filter change
  }, [searchTerm, barcode, category, sortOption]);

  useEffect(() => {
    if (page !== 1) fetchProducts(page);
  }, [page]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setBarcode("");
    setCategory("");
    setSortOption("");
    setProducts([]);
    setPage(1);
    setHasMore(true);
  };

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "100px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1);
  };

  return (
    <main className="bg-[#FAFAF9] min-h-screen px-4 py-6">
      <form
        onSubmit={handleFilterSubmit}
        className="flex flex-wrap gap-3 mb-4 mt-12 md:mt-0 items-end justify-center"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-40 px-2 py-1 border rounded text-sm"
            placeholder="chocolate"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Barcode</label>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="w-40 px-2 py-1 border rounded text-sm"
            placeholder="123456789"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-40 px-2 py-1 border rounded text-sm"
          >
            <option value="">All</option>
            {categories.length === 0 ? (
              <option disabled>Loading...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Sort</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-40 px-2 py-1 border rounded text-sm"
          >
            <option value="">None</option>
            <option value="name-asc">A-Z</option>
            <option value="name-desc">Z-A</option>
            <option value="nutrition-asc">Nutrition A-Z</option>
            <option value="nutrition-desc">Nutrition Z-A</option>
          </select>
        </div>

        <button
          type="submit"
          className="h-9 w-28 bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition self-end"
        >
          Apply
        </button>

        <button
          type="button"
          onClick={handleClearFilters}
          className="h-9 w-28 bg-gray-500 text-white text-sm px-3 py-1 rounded hover:bg-gray-600 transition self-end"
        >
          Clear
        </button>

        <button
          type="button"
          className="h-9 w-28 bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition self-end"
        >
          View Cart
        </button>
      </form>

      <ProductGrid products={products} />

      {hasMore && (
        <div ref={loader} className="text-center py-10 text-gray-500">
          Loading more products...
        </div>
      )}
    </main>
  );
}
