export default function HeroSection() {
  return (
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
  );
}
