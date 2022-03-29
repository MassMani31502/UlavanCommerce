import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getDoc, doc } from "firebase/firestore";
import fireDB from '../fireconfig';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
function Productinfo() {
    const { cartItems } = useSelector(state => state.cartReducer)
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product })
    }

    async function getData() {
        try {
            setLoading(true);
            const productTemp = await getDoc(
                doc(fireDB, "products", params.productid)
            );

            setProduct(productTemp.data());
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Layout loading={loading}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                {product && (<div>
                   <h1>{product.name}</h1>
                    <img src={product.imageURL} className="product-info-img" />
                    <hr />
                    <h3>{product.description}</h3>
                    <div className='d-flex justify-content-end my-3'>
                        <button onClick={() => addToCart(product)}>ADD TO CART</button>
                    </div>
                </div>
                )}
                </div>
                </div>
            </div>
        </Layout>
    )
}

export default Productinfo;