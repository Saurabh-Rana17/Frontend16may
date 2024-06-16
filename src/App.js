import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider,} from "react-router-dom";

import Search from "./Pages/Search/Search.jsx";
import SignUp from "./Pages/Auth/SignUp.jsx";
import SignIn from "./Pages/Auth/SignIn.jsx";
import Category from "./Pages/Category/Category.jsx";
import Layout from "./Pages/Layout/Layout.jsx";
import Hotel from "./Pages/Hotel/Hotel.jsx";
import React from "react";
import Activate from "./Pages/Auth/Activate.jsx";
import ValidateOtp from "./Pages/Auth/ValidateOtp.jsx";
import Error from "./Pages/Error/Error.jsx";
import Packages from "./Pages/Packages/Packages.jsx";
import PackageDetail from "./Pages/Packages/PackageDetail.jsx";
import HotelDetail from "./Pages/Hotel/HotelDetail.jsx";
import InquirySuccess from "./components/success/InquirySuccess.jsx";
import StateProvider from "./store/StateProvider.jsx";
import UserProvider from "./store/UserProvider.jsx";
import BookingSuccess from "./components/success/BookingSuccess.jsx";
import Home from "./Pages/Home/Home.jsx";
import Cab from "./Pages/Cab/Cab.jsx";
import Inquiry from "./Pages/Inquiry/Inquiry.jsx";
import Explore from "./Pages/Explore/Explore.jsx";
import Details from "./Pages/Explore/Details.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Homestay from "./Pages/Homestay/Homestay.jsx";
import HomestayDetail from "./Pages/Homestay/HomestayDetail.jsx";
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout.jsx";
import ManageHotel from "./Pages/Admin/Hotel/ManageHotel.jsx";
import ManageHomestay from "./Pages/Admin/Homestay/ManageHomestay.jsx";
import ManageTour from "./Pages/Admin/Tour/ManageTour.jsx";
import ManageTourPackage from "./Pages/Admin/TourPackage/ManageTourPackage.jsx";
import AddHotel from "./Pages/Admin/Hotel/AddHotel.jsx";
import UpdateHotel from "./Pages/Admin/Hotel/UpdateHotel.jsx";
import DeleteHotel from "./Pages/Admin/Hotel/DeleteHotel.jsx";
import UpdateHotelForm from "./Pages/Admin/Hotel/UpdateHotelForm.jsx";
import UpdateHomestay from "./Pages/Admin/Homestay/UpdateHomestay.jsx";
import UpdateHomestayForm from "./Pages/Admin/Homestay/UpdateHomestayForm.jsx";
import DeleteHomestay from "./Pages/Admin/Homestay/DeleteHomestay.jsx";
import AddHomestay from "./Pages/Admin/Homestay/AddHomestay.jsx";
import AddTour from "./Pages/Admin/Tour/AddTour.jsx";
import UpdateTour from "./Pages/Admin/Tour/UpdateTour.jsx";
import UpdateTourForm from "./Pages/Admin/Tour/UpdateTourForm.jsx";
import DeleteTour from "./Pages/Admin/Tour/DeleteTour.jsx";
import AddTourPackage from "./Pages/Admin/TourPackage/AddTourPackage.jsx";
import UpdateTourPackage from "./Pages/Admin/TourPackage/UpdateTourPackage.jsx";
import UpdateTourPackageForm from "./Pages/Admin/TourPackage/UpdateTourPackageForm.jsx";
import DeleteTourPackage from "./Pages/Admin/TourPackage/DeleteTourPackage.jsx";
import AdminSignIn from "./Pages/Auth/AdminSignIn";
import AdminProvider from "./store/AdminProvider";

const queryClient = new QueryClient();
export default function App() {
    const router = createBrowserRouter(createRoutesFromElements(<Route errorElement={<Error/>} path="/"
                                                                       element={<Layout/>}>
        <Route index exact element={<Home/>}/>
        <Route path="/home" exact element={<Navigate to="/"/>}/>
        <Route path="/search/:query" element={<Search/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/tour/:id" element={<Details/>}/>
        <Route path="/category/:category" element={<Category/>}/>
        <Route path="/hotel" element={<Hotel/>}/>
        <Route path="/cab" element={<Cab/>}/>
        <Route path="/contact" element={<Inquiry/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/activate" element={<Activate/>}/>
        <Route path="/verify" element={<ValidateOtp/>}/>
        <Route path="/packages" element={<Packages/>}/>
        <Route path="/package/:id" element={<PackageDetail/>}/>
        <Route path="/hotel/:id" element={<HotelDetail/>}/>
        <Route path="/admin-signIn" element={<AdminSignIn/>}/>
        <Route path="/success" element={<BookingSuccess/>}/>
        <Route path="/inquirysuccess" element={<InquirySuccess/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/homestay" element={<Homestay/>}/>
        <Route path="/homestay/:id" element={<HomestayDetail/>}/>
        <Route path="/admin" element={<AdminLayout/>}>
            <Route path="managehotel" element={<ManageHotel/>}>
                <Route path="add" element={<AddHotel/>}/>
                <Route path="update" element={<UpdateHotel/>}/>
                <Route path="update/:id" element={<UpdateHotelForm/>}/>
                <Route path="delete" element={<DeleteHotel/>}/>
            </Route>
            <Route path="managehomestay" element={<ManageHomestay/>}>
                <Route path="add" element={<AddHomestay/>}/>
                <Route path="update" element={<UpdateHomestay/>}/>
                <Route path="update/:id" element={<UpdateHomestayForm/>}/>
                <Route path="delete" element={<DeleteHomestay/>}/>
            </Route>
            <Route path="managetour" element={<ManageTour/>}>
                <Route path="add" element={<AddTour/>}/>
                <Route path="update" element={<UpdateTour/>}/>
                <Route path="update/:id" element={<UpdateTourForm/>}/>
                <Route path="delete" element={<DeleteTour/>}/>
            </Route>
            <Route path="managetourpackage" element={<ManageTourPackage/>}>
                <Route path="add" element={<AddTourPackage/>}/>
                <Route path="update" element={<UpdateTourPackage/>}/>
                <Route path="update/:id" element={<UpdateTourPackageForm/>}/>
                <Route path="delete" element={<DeleteTourPackage/>}/>
            </Route>
        </Route>
    </Route>));
    return (<>
        <QueryClientProvider client={queryClient}>
            <StateProvider>
                <UserProvider>
                    <AdminProvider>
                        <RouterProvider router={router}/>
                    </AdminProvider>


                </UserProvider>
            </StateProvider>
        </QueryClientProvider>
    </>);
}
