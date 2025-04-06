import Link from "next/link";

export default function ExploreSection() {
  return (
    <section
      className="relative flex items-center justify-center px-6 h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/16211537/pexels-photo-16211537/free-photo-of-shelves-in-grocery-store.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="relative z-10 flex flex-col items-center text-center gap-6 px-4 max-w-2xl">
        <p className="text-white text-xl sm:text-2xl leading-relaxed">
          Search and explore food products from around the world. Get ingredient
          info, nutrition grades, and more.
        </p>
        <Link
          href="/about"
          className="px-6 py-3 bg-[#237BF1] hover:bg-[#1E63C0] text-white rounded-lg text-base sm:text-lg transition"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
