/* eslint-disable prettier/prettier */
import { AiOutlineShoppingCart } from "react-icons/ai"
import Badge from 'react-bootstrap/Badge'

import '../../style/header.css'
const CartIcon = ({value} : {value :number}) => {
    return (
        <div>
            <AiOutlineShoppingCart />
            <Badge bg="warning" text="dark" className="cart-counter">
                {value}
            </Badge>
        </div>
    )
}
export default CartIcon