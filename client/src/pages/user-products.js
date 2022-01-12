import React, { useContext, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/user-actions';
import UserCards from '../components/our-products/user-cards';
import Pagination from '../components/our-products/pagination';
const AllUserProducts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [])
    const products = useSelector(state => state.userProducts.products)
    const navigate = useNavigate()
    let object = new URLSearchParams(window.location.search);
    const [brandValue, setBrandValue] = useState("");
    const filterProducts = (key, value) => {
        object.set(key, value);
        let newUrl = `${window.location.pathname}?${object.toString()}`;
        navigate(newUrl);
        dispatch(getProducts())
        setBrandValue(value);
    }

    useEffect(() => {
        setBrandValue(object.get("brand"));
    }, [object]);

    return (
        <>
            <div className='radio-content' >
                <FormControl className="radio-btn" component="fieldset">
                    <FormLabel component="legend">Type</FormLabel>
                    <RadioGroup
                        onChange={(e) => filterProducts("brand", e.target.value)}
                        row
                        aria-label="brand"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel
                            value="lamp"
                            control={<Radio />}
                            label="Lamp"
                        />
                        <FormControlLabel
                            value="pillow"
                            control={<Radio />}
                            label="Pillow"
                        />
                        <FormControlLabel
                            value="linens"
                            control={<Radio />}
                            label="Linens"
                        />
                    </RadioGroup>
                </FormControl>
            </div>
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
                <Pagination />
            </Container >
        </>
    );
};

export default AllUserProducts;
