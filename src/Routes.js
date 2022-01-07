import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/main-page-content/Navbar/Navbar';
import AddPage from './pages/add-page';
import AdminPage from './pages/admin-page';
import DetailPage from './pages/detail-page';
import EditPage from './pages/edit-page';
import LoginPage from './pages/login-page';
import MainPage from './pages/main-page';
import RegisterPage from './pages/register-page';
import AllUserProducts from './pages/user-products';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/admin/add' element={<AddPage />} />
                <Route path='/admin/edit/:id' element={<EditPage />} />
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/products' element={<AllUserProducts />} />
                <Route path='/product/:id' element={<DetailPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />


            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;