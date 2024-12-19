import { Routes, Route } from "react-router-dom";

// Import middleware for authentication
import MiddlewareAuth from "./middlewares/MiddlewareAuth";

import { Layout, LayoutTab, PublicLayout } from "./components/Layout";

// Import components and pages
import { Admin, Cart, NotFound, Shop } from "./pages";

import {
  AddProduct,
  EditProduct,
  Products,
  Orders,
  Users,
} from "./features/Admin";

import {
  ChangePassword,
  Login,
  Register,
  ConfirmResetPassword,
  SendResetPasswordLink,
  VerifyEmail,
  RequireAuth,
} from "./features/Auth";
import { AllProducts, ListFilterProducts } from "./features/Shop";
import { CheckoutDetail, CheckoutSuccess } from "./features/Checkout";

// Import role constants for authorization
import { CartDetail } from "./features/Cart";

function App() {
  return (
    <Routes>
      {/* Main layout route */}
      <Route path="/" element={<Layout />}>
        {/* Middleware to handle authentication */}
        <Route element={<MiddlewareAuth />}>
          {/* Public routes */}
          <Route index element={<PublicLayout />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/verify-email" element={<VerifyEmail />} />
          <Route
            path="/account/reset-password-link"
            element={<SendResetPasswordLink />}
          />
          <Route
            path="/account/reset-password-confirm/:id/:token"
            element={<ConfirmResetPassword />}
          />
          <Route path="/account/change-password" element={<ChangePassword />} />

          {/* Layout with tab navigation */}
          <Route element={<LayoutTab />}>
            {/* Admin routes with role-based access control */}
            <Route element={<RequireAuth allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<Admin />}>
                <Route index element={<Products />} />
                <Route path="products">
                  <Route index element={<Products />} />
                  <Route path="create-product" element={<AddProduct />} />
                  <Route
                    path="edit-product/:productId"
                    element={<EditProduct />}
                  />
                </Route>
                <Route path="orders" element={<Orders />} />
                <Route path="users" element={<Users />} />
              </Route>
            </Route>

            {/* Shop routes */}
            <Route path="/shop" element={<Shop />}>
              <Route index element={<AllProducts />} />
              <Route path=":categorySlug" element={<ListFilterProducts />} />
            </Route>

            {/* Cart routes */}
            <Route path="/cart" element={<Cart />}>
              <Route index element={<CartDetail />} />
            </Route>

            {/* Checkout routes */}
            <Route path="/checkout">
              <Route index element={<CheckoutDetail />} />
              <Route path="success" element={<CheckoutSuccess />} />
            </Route>
          </Route>
        </Route>
      </Route>
      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
