import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/Splash";
import LandingPage from "./pages/Landing";
//CUSTOMER
import AuthPage from "./customer/pages/AuthPage";
import ServicesPage from "./customer/pages/ServicesPage";
import BookingPage from "./customer/pages/BookingPage";
import PaymentPage from "./customer/pages/PaymentPage";
import UpiPaymentPage from "./customer/pages/UpiPaymentPage";
import CardPaymentPage from "./customer/pages/CardPaymentPage";
import CodPaymentPage from "./customer/pages/CodPaymentPage";
import NetBankingPage from "./customer/pages/NetBankingPage";
import WalletPaymentPage from "./customer/pages/WalletPaymentPage";
import BookingSuccessPage from "./customer/pages/BookingSuccessPage";
import MyBookingsPage from "./customer/pages/MyBookingsPage";
import BookingDetails from "./customer/pages/BookingDetails";
 // PROVIDER 
import LoginPage from "./provider/pages/Login";
import RegisterPage from "./provider/pages/Register";
import ProviderServices from "./provider/pages/Services";
import ProviderBooking from "./provider/pages/ProviderBooking";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<LandingPage />} />
        {/* CUSTOMER ROUTES */}
        <Route path="/customer" element={<AuthPage />} />
        <Route path="/customer/services" element={<ServicesPage />} />
        <Route path="/customer/booking" element={<BookingPage />} />
        <Route path="/customer/payment" element={<PaymentPage />} />
        <Route path="/customer/payment/upi" element={<UpiPaymentPage />} />
        <Route path="/customer/payment/card" element={<CardPaymentPage />} />
        <Route path="/customer/payment/cod" element={<CodPaymentPage />} />
        <Route path="/customer/payment/netbanking" element={<NetBankingPage />} />
        <Route path="/customer/payment/wallet" element={<WalletPaymentPage />} />
        <Route path="/customer/booking-success" element={<BookingSuccessPage />} />
        <Route path="/customer/my-bookings" element={<MyBookingsPage />} />
        <Route path="/customer/booking-details" element={<BookingDetails />} />

         {/* PROVIDER ROUTES */}
        <Route path="/provider" element={<LoginPage />} />
        <Route path="/provider/register" element={<RegisterPage />} />
        <Route path="/provider/services" element={<ProviderServices />} />
        <Route path="/provider/bookings" element={<ProviderBooking />} />
      </Routes>
    </Router>
  );
}

 export default App;