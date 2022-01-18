import React from 'react'
import "./Subtotal.css"
import  CurrencyFormat  from "react-currency-format"
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {
    const history = useHistory();
    const [{basket , user},dispatch] =useStateValue();
    return (
      <div className="subtotal">
        <CurrencyFormat
          value={getBasketTotal(basket)}
          displayType={"text"}
          thousandSeparator={true}
          decimalScale={2}
          prefix={"₹"}
          renderText={(value) => (
            <div>
              <p>
                Subtotal ({basket.length} items:)
                <strong style={{ marginLeft: 10 + "px" }}>{value}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
              </small>
            </div>
          )}
        />
        <button
          onClick={(e) =>
            user ? history.push("/payment") : history.push("./login")
          }
        >
          Proceed to checkout
        </button>
      </div>
    );
}

export default Subtotal;
