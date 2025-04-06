import Link from "next/link";

export default function Home() {
  return (
    <main className="text-[#2E2E2E] flex flex-col min-h-screen">
      <section
        className="relative flex items-center justify-center text-center px-4 py-10 h-screen sm:h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5966430/pexels-photo-5966430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="relative z-10 text-white px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Food Product Explorer
          </h1>
          <p className="text-base sm:text-lg max-w-xl mx-auto">
            Discover nutritional information about thousands of food products
            using the OpenFoodFacts API.
          </p>
        </div>
      </section>

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
            Search and explore food products from around the world. Get
            ingredient info, nutrition grades, and more.
          </p>
          <Link
            href="/about"
            className="px-6 py-3 bg-[#237BF1] hover:bg-[#1E63C0] text-white rounded-lg text-base sm:text-lg transition"
          >
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
}
