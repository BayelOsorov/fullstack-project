import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/user-actions";

const Pagination = () => {
    const dispatch = useDispatch()
    const pageNumbers = [];
    const handlePage = (page) => {
        dispatch(getProducts(page.toString()))
    }
    useEffect(() => {
        dispatch(getProducts())
    }, [])
    const products = useSelector(state => state.userProducts.products)
    const countOfProducts = useSelector(state => state.userProducts.countOfProducts)


    // console.log(countOfProducts)
    for (let i = 1; i <= Math.ceil(countOfProducts / 6); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="pagination">
            <ul>
                {
                    pageNumbers.map((page) => (
                        <li key={page}>
                            <Button
                                variant="outline-success"
                                style={{
                                    backgroundColor: "#1C374C",
                                    border: "none",
                                    padding: "0 20px",
                                    display: "inline-block",
                                    height: "30px",
                                    marginTop: "13px",
                                    marginRight: "10px",
                                }}
                                onClick={() => {
                                    handlePage(page);
                                }}
                            >
                                {page}
                            </Button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;