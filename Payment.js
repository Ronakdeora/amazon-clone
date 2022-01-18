import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import  {db}  from "./firebase";
import {collection,doc} from "firebase/firestore";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceded] = useState(null);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    //stripe secret(everytime basket changes it refreshes the page and tells what exact amount  customer has to pay)

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe expects the total in a currencies subunits
        //total is a query param
        url: `payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    //client secret
    //clientSecret how much we gonna charge and payment method how we gonnna charge it is a promise
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then( async ({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.id)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        //payIntent = payment confirmation
        setSucceded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("./orders");
        //not push because we don't want them to come back to the payment page thats why we just replace it page
      });
  };

  const handleChange = (e) => {
    //whenever we write into card element 1. we gonna listen for card element changes and display error
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
    //we need two pieces of state
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (
          <Link
            to="/checkout"
            style={{ textDecoration: "none", color: "black" }}
          >
            {basket?.length} items
          </Link>
          )
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment_address">
            <p>{user}</p>
            <p> 208016, IIT kanpur</p>
            <p> UtterPradesh, India</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment_items">
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

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={2}
                  prefix={"₹"}
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  onClick={handleSubmit}
                >
                  <span> {processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
