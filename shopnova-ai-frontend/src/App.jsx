import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import LoginPage from "./pages/Auth/LoginPage";

import RegisterPage from "./pages/Auth/RegisterPage";

import VerifyOtpPage from "./pages/Auth/VerifyOtpPage";

import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";

import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import ProfilePage from "./pages/Profile/ProfilePage";

import EditProfilePage from "./pages/Profile/EditProfilePage";

import ChangePasswordPage from "./pages/Profile/ChangePasswordPage";

import AddressListPage from "./pages/Address/AddressListPage";

import AddAddressPage from "./pages/Address/AddAddressPage";

import EditAddressPage from "./pages/Address/EditAddressPage";

import HomePage from "./pages/Home/HomePage";

import GuestRoute from "./components/routes/GuestRoute";

import ProtectedRoute from "./components/routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Guest */}

      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Route>
      </Route>

      {/* Protected */}

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route
          path="/profile/change-password"
          element={<ChangePasswordPage />}
        />
        <Route path="/address" element={<AddressListPage />} />
        <Route path="/address/add" element={<AddAddressPage />} />
        <Route
  path="/address/edit/:id"
  element={<EditAddressPage />}
/>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
