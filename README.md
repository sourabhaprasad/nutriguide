# Nutriguide - Food Product Explorer

This application allows users to search and explore food products using the [OpenFoodFacts API](https://world.openfoodfacts.org/). It includes features such as:

- Search by product name
- Search by barcode
- Category filtering
- Sorting by name or nutritional grade
- Infinite scrolling product grid

---

## Issues

### Problem

The OpenFoodFacts category list is available at `https://world.openfoodfacts.org/categories.json`, but **this endpoint does not support CORS**, which prevents the frontend from fetching it directly due to browser security restrictions.

### Solution

Implemented a **server-side proxy route** within our Next.js app using the `/api` directory. Here's how:

1. **Created a new API Route**  
   File: `app/api/categories/route.js`  
   This route fetches the category data from OpenFoodFacts on the server-side (which isn’t affected by CORS) and returns a simplified, filtered list of popular categories.

2. **Fetched From Our Own API in the Frontend**  
   The frontend calls `/api/categories`, which successfully returns the category list without CORS issues.

### Benefits

- Bypasses CORS restrictions.
- Keeps frontend clean and secure.
- Allows filtering or customization of the category list.

---

## Technologies Used

- Next.js (App Router)
- Tailwind CSS
- OpenFoodFacts API
