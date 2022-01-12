import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import * as yup from 'yup'
import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/actions';

const AddPage = () => {
    const schema = yup.object({
        name: yup.string().min(3, 'Минимальное количество букв 3').max(30, 'Максимальное количество символов 30').required('Поле обязательно для заполнения'),
        description: yup.string().min(10, 'Минимальное количество букв 3').max(255, 'Максимальное количество символов 30').required('Поле обязательно для заполнения'),
        image: yup.string().required('Поле обязательно для заполнения'),
        price: yup.number().min(3, 'Минимальное количество букв 3').required('Поле обязательно для заполнения'),
        brand: yup
            .string()
            .required("Поле обязательно для заполнения")
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (product) => {
        dispatch(createProduct(product))
        navigate('/admin')
    }
    return (
        <div className='add-page' >
            <h2>Add Product</h2>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    brand: ''
                }}
            >
                {({ handleChange, handleSubmit, values, touched, errors }) => (
                    <form onSubmit={handleSubmit} >
                        <TextField
                            label='Name'
                            type='text'
                            variant='standard'
                            name='name'
                            value={values.name}
                            error={!!errors.name && touched.name}
                            helperText={touched.name ? errors.name : ''}
                            onChange={handleChange}
                        />
                        <TextField
                            label='Description'
                            type='text'
                            variant='standard'
                            name='description'
                            value={values.description}
                            error={!!errors.description && touched.description}
                            helperText={touched.description ? errors.description : ''}
                            onChange={handleChange}
                        />
                        <TextField
                            label='Price'
                            type='number'
                            variant='standard'
                            name='price'
                            value={values.price}
                            error={!!errors.price && touched.price}
                            helperText={touched.price ? errors.price : ''}
                            onChange={handleChange}
                        />
                        <TextField
                            label='Image'
                            type='text'
                            variant='standard'
                            name='image'
                            value={values.image}
                            error={!!errors.image && touched.image}
                            helperText={touched.image ? errors.image : ''}
                            onChange={handleChange}
                        />
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    variant="standard"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="brand"
                                    value={values.brand}
                                    label="Type of product"
                                    onChange={handleChange}
                                    error={!!errors.brand && touched.brand}
                                    helperText={touched.brand ? errors.brand : ""}
                                >
                                    <MenuItem value="pillow">Pillow</MenuItem>
                                    <MenuItem value="lamp">Lamp</MenuItem>
                                    <MenuItem value="linens">Linens</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Button variant='contained' color='primary' type='submit' >Add Product</Button>
                    </form>
                )}
            </Formik>

        </div>
    );
};

export default AddPage;