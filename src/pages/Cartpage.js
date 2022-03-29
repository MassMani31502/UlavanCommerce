import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { addDoc, collection } from 'firebase/firestore'
import fireDB from '../fireconfig';
import { toast } from 'react-toastify'

function Cartpage() {
    const { cartItems } = useSelector(state => state.cartReducer)
    const [totalAmount, setTotalAmount] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((cartItem) => {
          temp = Number(temp) + Number(cartItem.price)
        })
        setTotalAmount(temp)
},[cartItems])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const deleteFromCart = (product) => {
        dispatch({ type: 'DELETE_FROM_CART', payload: product })
    }

    const placeOrder = async () => {
        const addressInfo = {
            name,
            address,
            pincode,
            phoneNumber
        }
        console.log(addressInfo);

        const orderInfo = {
            cartItems,
            addressInfo,
            email: JSON.parse(localStorage.getItem("currentUser")).user.email,
            userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,

        }

        try {
            setLoading(true);
            const result = await addDoc(collection(fireDB, "orders"), orderInfo)
            setLoading(false)
            toast.success('Order Placed Successfully');
            handleClose()

        } catch (error) {
            setLoading(false)
            toast.error('Order failed');

        }
    };

    return (
        <Layout loading={loading}>
            <table className='table mt-30'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => {
                        return <tr>
                            <td><img src={item.imageURL} alt="" height="90" width="100" /></td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><FaTrash onClick={() => deleteFromCart(item)} /></td>
                        </tr>
                    })}
                </tbody>
                <div className="d-flex justify-content-end">
                <h1 className="total-amount">Total Amount = {totalAmount} RS/-</h1>

            </div>
            </table>

            <div className="d-flex justify-content-end mt-30">
                <button onClick={handleShow}>PLACE ORDER</button>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add your address</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="register-form">

                    <h2>Place Order</h2>

                    <hr />

                    <input type="text" className='form-control' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                    <textarea className="form-control" rows={3}
                        type="text" placeholder='Address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    <input type="number" className='form-control' placeholder='Pincode' value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
                    <input type="number" className='form-control' placeholder='Phone Number' value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                    <hr />

                </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>
                        Close
                    </button>
                    <button onClick={placeOrder}>
                        Order
                    </button>
                </Modal.Footer>
            </Modal>
</Layout>
    )
}

export default Cartpage