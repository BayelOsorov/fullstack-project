import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AdminCard from '../components/admin/admin-card';

const AdminPage = () => {
    return (
        <>
            <Link to='/admin/add'>
                <Button>Add product</Button>
            </Link>
            <AdminCard />
        </>
    );
};

export default AdminPage;