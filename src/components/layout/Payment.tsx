import React, { useEffect, useState } from 'react'
import DropIn from 'braintree-web-drop-in-react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../redux/store'
import { toast } from 'react-toastify'
import {
  Product,
  fetchBrainTreeToken,
  payWithBraintree
} from '../../redux/slices/products/productSlice'

import '../../style/cart.css'
import '../../style/table.css'

const Payment = ({ cartItems, amount }: { cartItems: Product[]; amount: number }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [braintreeClientToken, setBraintreeClientToken] = useState(null)
  const [instance, setInstance] = useState()

  const getBraintreeClientToken = async () => {
    try {
      const res = await dispatch(fetchBrainTreeToken())
      setBraintreeClientToken(res.payload.clientToken)
    } catch (error) {
      throw new Error('can not fetch the token')
    }
  }

  useEffect(() => {
    getBraintreeClientToken()
  }, [])
  const handlePayment = async () => {
    const { nonce } = await instance.requestPaymentMethod()
    const response = await dispatch(payWithBraintree({ nonce, cartItems, amount }))
    toast.success(response.payload.message)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        {braintreeClientToken && (
          <DropIn
            options={{ authorization: braintreeClientToken }}
            onInstance={(instance) => setInstance(instance)}
          />
        )}
      </div>
      <div>
        <div>
          <button
            style={{
              backgroundColor: '#FF8E0A',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={handlePayment}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Payment
