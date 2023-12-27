import { useNavigate, useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import jwtDecode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'

import { activateUser } from '../services/userServices'

import '../style/register.css'

const ActivatePage = () => {
  const navigate = useNavigate()

  const { token } = useParams()
  const decoded = jwtDecode(String(token))
  const handelActivate = async () => {
    try {
      const response = await activateUser(String(token))
      toast.success(`The account has been activated, please log in`)
      navigate('/login')
    } catch (error) {
      toast.error(`${error.response.data.massage}`)
    }
  }

  return (
    <div>
      <div className="center">
        <img
          src="https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446913/l4jfqz1qr7l7pizru9r4.png"
          alt="Logo"
          width={190}
        />
        <h1>Activate Account</h1>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <img
          src="https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446818/mhtp6yowrohc90zbptbj.png"
          alt="Logo"
          width={290}
        />
        <br></br>
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh'
          }}>
          welcome back, {decoded.name}
        </h2>
        <br></br>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh'
          }}>
          <Typography variant="body1">
            Click here to activate your account and then go to log in
          </Typography>
        </div>{' '}
        <br></br>
        <button onClick={handelActivate} type="submit" value="activate">
          Activate your Account{' '}
        </button>
      </div>
    </div>
  )
}

export default ActivatePage
