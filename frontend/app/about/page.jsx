export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mt-10 mb-4">
        About Food Product Explorer
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        Food Product Explorer is a user-friendly web application built to help
        users discover detailed information about a wide range of food products
        from around the world. It uses the{" "}
        <a
          href="https://world.openfoodfacts.org/"
          target="_blank"
          className="text-blue-500 underline hover:text-blue-700"
        >
          OpenFoodFacts API
        </a>
        , an open-source database of food products, to provide insights into
        ingredients, nutritional values, and categories.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        What You Can Do Here:
      </h2>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
        <li>Search for food products by name or barcode</li>
        <li>Browse by categories like beverages, snacks, dairy, etc.</li>
        <li>View detailed nutrition grades and ingredient lists</li>
        <li>Sort and filter based on nutrition or product name</li>
        <li>Access product images and data from global entries</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Tech Stack</h2>
      <p className="text-lg text-gray-700 mb-6">
        This app is built using <strong>Next.js</strong> for fast,
        server-rendered pages, <strong>Tailwind CSS</strong> for styling, and
        leverages the power of the <strong>OpenFoodFacts API</strong> to fetch
        real-time product data.
      </p>
    </main>
  );
}
