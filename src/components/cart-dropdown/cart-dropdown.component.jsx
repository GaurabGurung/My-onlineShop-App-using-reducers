import Button from '../button/button.component.jsx'
import {CartDropDown, EmptyMessage, CartItemsContainer} from './cart-dropdown.styles'
import CartItem from '../cart-item/cart-item.component.jsx'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context.jsx'
import { useNavigate } from 'react-router-dom'


const CartDropdown = () => {
    const { cartItems} = useContext(CartContext);
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