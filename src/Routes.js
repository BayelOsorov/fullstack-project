import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/main-page-content/Navbar/Navbar';
import AddPage from './pages/add-page';
import AdminPage from './pages/admin-page';
import EditPage from './pages/edit-page';
import MainPage from './pages/main-page';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/admin/add' element={<AddPage />} />
                {/* <Route path='/admin/edit' element={<EditPage />} /> */}
                <Route path='/admin' element={<AdminPage />} />

            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;