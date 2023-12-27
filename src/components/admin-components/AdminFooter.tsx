import React from 'react'

import '../../style/footer.css'

const AdminFooter = () => {
  return (
    <footer className="footer">
      <ul className="menu" role="list" aria-label="footer-list">
        <li className="menu__item">
          <a className="menu__link" href="#">
            Privacy Policy
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            Terms of Service
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            Contact
          </a>
        </li>
      </ul>
      <p>&copy;2023 TECHTROVE | All Rights Reserved</p>
    </footer>
  )
}

export default AdminFooter
