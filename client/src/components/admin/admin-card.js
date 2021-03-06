import React, { useEffect } from 'react';
// card
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Tooltip } from "@mui/material";

// grid
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../redux/actions';
import Pagination from '../our-products/pagination';
import { getProducts } from '../../redux/user-actions';

const AdminCard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [])
    const products = useSelector(state => state.products.products)
    return (

        <div>
            <Container fixed className='card-container' >
                <Grid container >

                    {
                        products.length > 0 ? (
                            products.map(elem => (

                                <Card key={elem.id} className='grid-content-card' sx={{ maxWidth: 300 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="240"
                                        image={elem.image}
                                    />
                                    <CardContent>
                                        <p className='card-title' >
                                            {elem.name}
                                        </p>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>brand:</strong>  {elem.brand}
                                        </Typography>
                                        <Tooltip title={elem.description} >
                                            <p> {elem.description.slice(0, 20)}...</p>
                                        </Tooltip>
                                        <Typography variant="body2" color="text.secondary">
                                            {elem.price} com
                                        </Typography>
                                    </CardContent>
                                    <CardActions className='admin-cards' >
                                        <Button onClick={() => {
                                            dispatch(deleteProduct(elem.id))
                                            dispatch(getProducts())
                                        }} variant='outlined' color='error'>Delete</Button>
                                        <Link to={`/admin/edit/${elem.id}`}>
                                            <Button variant='contained' >Edit</Button>
                                        </Link>
                                    </CardActions>
                                </Card>

                            ))

                        ) : (<h2>Loading...</h2>)

                    }
                </Grid>
                <Pagination />
            </Container >
        </div>
    );
};

export default AdminCard;