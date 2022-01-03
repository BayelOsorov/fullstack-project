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
import { deleteProduct, getProducts } from '../../redux/actions';

const AdminCard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [])
    const products = useSelector(state => state.products.products)
    // console.log(products);
    // products.map(item => console.log(item.data))
    return (

        <div>
            <Container fixed className='card-container' >
                <Grid container >

                    {
                        products.length > 0 ? (
                            products.map(item => (
                                item.data.map(elem => (
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
                                            <Button onClick={() => deleteProduct(elem.id)} variant='outlined' color='error'>Delete</Button>
                                            <Link to={`/admin/edit/${elem.id}`}>
                                                <Button variant='contained' >Edit</Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                ))
                            ))

                        ) : (<h2>ggg</h2>)

                    }
                    {/* {
                        products.map((item) => (
                            <Card key={item.data.id} className='grid-content-card' sx={{ maxWidth: 300 }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="240"
                                    image={item.data.image}
                                />
                                <CardContent>
                                    <p className='card-title' >
                                        {item.data.name}
                                    </p>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>brand:</strong>  {item.data.brand}
                                    </Typography>
                                    <Tooltip title={item.data.description} >
                                        <p> {item.data.description.slice(0, 20)}...</p>
                                    </Tooltip>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.data.price} com
                                    </Typography>
                                </CardContent>
                                <CardActions className='admin-cards' >
                                    <Button onClick={() => deleteProduct(item.data.id)} variant='outlined' color='error'>Delete</Button>
                                    <Link to={`/admin/edit/${item.data.id}`}>
                                        <Button variant='contained' >Edit</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        ))
                    } */}
                </Grid>
            </Container >
        </div>
    );
};

export default AdminCard;