import React, { useContext, useEffect, useState } from 'react';


import Grid from '@mui/material/Grid';
import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProducts } from '../redux/user-actions';
import UserCards from '../components/our-products/user-cards';
const AllUserProducts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserProducts())
    }, [])
    const products = useSelector(state => state.userProducts.products)
    console.log(products);
    return (
        <>
            <Container fixed  >
                <Grid container >
                    {
                        products.length > 0 ? (
                            products.map((item) => (
                                <UserCards key={item.id} item={item} />
                            ))
                        ) : (
                            <h2>Loading...</h2>
                        )
                    }
                </Grid>
            </Container >
        </>
    );
};

export default AllUserProducts;
