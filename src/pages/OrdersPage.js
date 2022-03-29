import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout';
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from '../fireconfig';

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const userid = JSON.parse(localStorage.getItem('currentUser')).user.uid

    useEffect(() => {
        getData()
    }, []);

    async function getData() {
        try {
            setLoading(true);
            const result = await getDocs(collection(fireDB, "orders"));
            const ordersArray = []
            result.forEach((doc) => {

                ordersArray.push(doc.data());
                setLoading(false);
            });
            console.log(ordersArray)

            setOrders(ordersArray)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return <Layout loading={loading}>
        <div className='p-2'>

        {orders.filter(obj=>obj.userid === userid).map((order) => {
            return <table className='table mt-3 order '>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.cartItems.map((item) => {
                        return <tr>
                            <td><img src={item.imageURL} alt="" height="90" width="100" /></td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    })}
                </tbody>
            </table>
         

            order.cartItems.map()
        })}
     </div>

    </Layout>
}

export default OrdersPage;