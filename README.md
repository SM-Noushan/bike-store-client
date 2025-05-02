# BikeStore: Full-Featured Bike Shop Application

## 🚀 Project Overview

**BikeStore** is a robust and user-friendly bike shop platform that delivers seamless experiences for both customers and administrators. It features secure authentication, smooth product and order management, responsive design, and integrated payment processing via Stripe. The system supports real-time updates using Stripe WebHooks to sync payment data directly into the database, ensuring reliable and up-to-date order tracking.

**🔗 Live Site**: [https://bike-store-by-sm-nowshan.vercel.app](https://bike-store-by-sm-nowshan.vercel.app)

**🔗 Backend API**: [https://bike-store-server-one.vercel.app](https://bike-store-server-one.vercel.app)

### 🔑 Admin Credentials

```
Email: mail@super.admin
Password: admin7
```

---

## ✨ Key Features

### 🧑‍💼 Authentication & User Roles

- **Secure Registration & Login**:

  - Users register with their name, email, and password.
  - Default role: `Customer`. Admins must be manually assigned.
  - Passwords are hashed before storing.

- **JWT Authentication**:

  - Generates and stores tokens in local storage upon login.

- **Logout**:

  - Clears token and redirects to login page.

---

### 🌐 Public Features

- **Home Page**:

  - Responsive navbar with branding and navigation.
  - Promotional banner with carousel support.
  - Featured Products Slider (up to 6), with a "View All" link.
  - Extra testimonials section for.
  - Footer with essential links and social handles.

- **All Products Page**:

  - Dynamic search by brand, name, or category.
  - Filter options for price, model, brand, category, and stock status.
  - Real-time updates on product results.
  - Individual product cards with essential details.

- **Product Details Page**:

  - Full product description, imagery, and a "Buy Now" button.

- **About Page**:

  - Highlights the mission and background of the bike shop.

---

### 🔐 Private Routes (Authenticated Users)

- **Checkout Page**:

  - Validates stock and displays an order form.
  - Includes user and product details, total price, and payment method.
  - Integrates **Stripe Checkout** for secure payments.
  - Uses **Stripe WebHook** to sync payment confirmation with the backend database.

- **Dashboard**:

  - **Admin Dashboard**:

    - Manage users (e.g., deactivation).
    - Full CRUD for products and orders.

  - **Customer Dashboard**:

    - View orders with full details.
    - Update profile and change password securely.

---

### 📦 Order Tracking (In Development)

- **Customer Side**:

  - Real-time order status (Pending → Processing → Shipped → Delivered).
  - Track orders with detailed breakdown (ID, quantity, price, delivery estimate).

- **Admin Side**:

  - Modify order status and expected delivery date via dropdown in the dashboard.

---

## 🛠 Technology Stack

- **Frontend**: ReactJS, TailwindCSS, ShadCN
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Payments**: Stripe Checkout with Stripe WebHook
- **State & Alerts**: Sonner

---

## 🌟 UI/UX Highlights

- Fully responsive on all screen sizes.
- Clean, accessible layouts with intuitive navigation.
- User-friendly error messages for login, registration, and API operations.
- Loaders and toast notifications for all async operations.

---

## 🧪 Getting Started Locally

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (LTS version recommended)

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/sm-noushan/bike-store-client
   cd bike-store-client
   ```

2. **Install Dependencies**:

   ```sh
   npm install
   ```

3. **Set Up Environment Variables**: Create a `.env.local` file in the root directory and add the necessary environment variables. (**Important!**)

4. **Set Up Server**: For detailed information, refer to the [Setup](https://github.com/sm-noushan/bike-store-server) in the back-end repository's `README.md`. (**Important!**)

5. **Run the Application**:

   ```sh
   npm run dev
   ```

6. **Access the Site**: Open your browser and go to `http://localhost:5173/` or `http://192.168.1.12:5173/` from other devices on the same network to view the application.

---

## 🙌 Special Thanks

Thanks for reviewing this project! Your feedback and suggestions are always welcome.
