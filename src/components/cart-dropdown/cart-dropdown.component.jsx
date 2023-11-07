import Button from '../button/button.component.jsx'
import {CartDropDown, EmptyMessage, CartItemsContainer} from './cart-dropdown.styles'
import CartItem from '../cart-item/cart-item.component.jsx'
import { selectCartItems } from '../../store/cart/cart.selector.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate();

    const goToCheckOutHandler= () => {
        navigate ('/checkout');
        
    }
    return (
        <CartDropDown>
            <CartItemsContainer>
                {cartItems.length ? (
                    cartItems.map ( (item) => (
                        <CartItem key= {item.id} cartItem={item}/>))
                ): (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )
                }
            </CartItemsContainer>
            <Button onClick= {goToCheckOutHandler} >GO TO CHECKOUT</Button>
        </CartDropDown>
    )
}

export default CartDropdown;