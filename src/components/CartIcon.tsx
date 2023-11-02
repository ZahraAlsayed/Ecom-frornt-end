/* eslint-disable prettier/prettier */
import { AiOutlineShoppingCart } from "react-icons/ai"

import Badge from 'react-bootstrap/Badge'

const CartIcon = ({value} : {value :number}) => {
    return (
        <div>
            <AiOutlineShoppingCart />
            <Badge bg="warning" text="dark">
                {value}
            </Badge>
        </div>
    )
}
export default CartIcon