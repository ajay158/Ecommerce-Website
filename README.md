# Ecommerce-Website

#Project Overview
-This project is a simple ecommerce application built using ReactJS. The main features include a product listing page, cart functionality, and a checkout form with validation. The project demonstrates usage of React for building the user interface, Zustand for state management, Tailwind CSS for styling, and React Hook Form combined with Yup for form validation.

#Features
#Product Listing
-Products are displayed in a grid system.
-Each product card includes:
-Thumbnail image
-Product name
-Price (formatted in "Rs. 5,000" style)
-Stock availability
-Category
-Description
-Rating (displayed using stars)
-"Add to Cart" button (disabled if out of stock)
-Display of the product's created date in "DD-MM-YYYY" format
-Users can filter products by price or category.

#Cart Functionality
-Products can be added to the cart.
-The cart displays:
  -List of selected products
  -Total amount (total number of selected products)
  -Total price
-Users can increase or decrease the quantity of products in the cart.
-The "Checkout" button:
  -Is disabled if the cart is empty.
  -Redirects users to a checkout page.
  
#Checkout Page
- The checkout form allows users to input:
   -Name
  -Billing address
  -Delivery address
  -Telephone number
  -Current date
-All form fields are validated using Yup with error messages for invalid inputs.
-Form handling is done using React Hook Form.

#Technologies Used
ReactJS: For building the user interface.
Zustand: For state management across the application.
Tailwind CSS / Styled Components: For styling the components and layouts.
React Hook Form: For handling form data and submissions.
Yup: For schema validation of form inputs.

#Project Setup
- Clone the repository
   -git clone https://github.com/yourusername/ecommerce-shop.git
  
- Install dependencies
   -cd ecommerce-shop
   -npm install

- Run the development server
  -npm start
