import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {

    const [{ basket , user },dispatch] = useStateValue(); 

    const userAuthentification = () =>{
        if(user){
            auth.signOut();
        }
    }

    // everywhere the same basket and same dispatch can be accessed

    return (
        <div className='header'>
            <Link to='/'>
                <img className='header_logo'
                    src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
                    alt='' />
            </Link>

            <div className='header_search'>
                <input className=" header_searchInput"
                    type='text' />
                <SearchIcon className='header_searchIcon' />
                {/* logo */}
            </div>

            <div className='header_nav'>
                
                <Link to={!user && '/login'}>
                    <div className='header_option' onClick={userAuthentification}>
                        <span className='header_option_LineOne'>
                            {(user) ? "Hello " + user.split('@')[0] : "Hello Guest"}
                        </span>
                        <span className='header_option_LineTwo'>
                            {(user)? "Sign Out": "Sign In"}
                        </span>
                    </div>
                </Link>

                <div className='header_option'>
                    <span className='header_option_LineOne'>
                        Returns
                    </span>
                    <span className='header_option_LineTwo'>
                        & Orders
                    </span>
                </div>

                <div className='header_option'>
                    <span className='header_option_LineOne'>
                        Your
                    </span>
                    <span className='header_option_LineTwo'>
                        Prime
                    </span>
                </div>
                <Link to="/checkout">
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon className="header_basket" />
                        <span className="header_option_LineTwo header_basketCount">{basket?.length}</span>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Header
