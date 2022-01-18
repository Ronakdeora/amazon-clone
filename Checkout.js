import React from 'react'
import Subtotal from './Subtotal'
import './Checkout.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {
    const [{ basket }, dispatch] = useStateValue();
    return (
        <div className='checkout'>
            <div className="checkout_left">
                <img className='checkout_ad'
                    src="https://pidapi.com/wp-content/uploads/2021/11/amazon-advertising-campaign-management-guide.jpg" alt=""
                />
                <div>
                    <h2 className="checkout_title">
                        Your Shopping Basket
                    </h2>

                    {basket.map((item) => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>

            <div className="checkout_right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout;
