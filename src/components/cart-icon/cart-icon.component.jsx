import {CartIconContainer, ShoppingIconContainer,ItemCount} from './cart-icon.styles.jsx';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector.js';
import { useSelector, useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action.js';



const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const toggleIsCartOpen = () => dispatch(setIsCartOpen (!isCartOpen));

    return (

        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconContainer/>   
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;