"use client";
import { useState } from "react";

export default function SearchHeader({ onSearch }) {
  const [search, setSearch] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const handleSearch = () => {
    onSearch({ search, barcode, category, sort });
  };

  return (
    <div className="bg-[#FAFAF9] text-[#2E2E2E] w-full p-4 border-b border-[#E5E7EB] shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 gap-3 flex-wrap w-full">
        <div className="flex flex-col flex-1">
          <label className="text-xs font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="By name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 text-sm rounded-md border border-[#E5E7EB] focus:outline-none"
          />
        </div>

        <div className="flex flex-col flex-1">
          <label className="text-xs font-medium mb-1">Barcode</label>
          <input
            type="text"
            placeholder="Enter barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="p-2 text-sm rounded-md border border-[#E5E7EB] focus:outline-none"
          />
        </div>

        <div className="flex flex-col flex-1">
          <label className="text-xs font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 text-sm rounded-md border border-[#E5E7EB] bg-white focus:outline-none"
          >
            <option value="">All</option>
            <option value="snacks">Snacks</option>
            <option value="beverages">Beverages</option>
            <option value="dairy">Dairy</option>
            <option value="cereals">Cereals</option>
          </select>
        </div>

        <div className="flex flex-col flex-1">
          <label className="text-xs font-medium mb-1">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 text-sm rounded-md border border-[#E5E7EB] bg-white focus:outline-none"
          >
            <option value="">None</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="grade-asc">Nutrition Grade (Asc)</option>
            <option value="grade-desc">Nutrition Grade (Desc)</option>
          </select>
        </div>

        <div className="flex justify-end w-full lg:w-auto lg:mt-[24px]">
          <button
            onClick={handleSearch}
            className="w-full lg:w-auto px-5 py-2 bg-[#6FCF97] hover:bg-[#4CAF72] text-white text-sm font-medium rounded-md transition"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
