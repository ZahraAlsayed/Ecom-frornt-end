/* eslint-disable prettier/prettier */
import React from 'react'
import '../../style/footer.css'
const Footer = () => {
  
  return (
    <footer className="footer">
      <section className="newsletter">
        <div className="newsletter-form">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay up to date with our latest news and offers!</p>
          <form action="#" method="POST">
            <input type="email" name="email" className="email-input" placeholder="Enter your email" required />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
        </div>
      </section>
      <div className="social-icon" role="list" aria-label="social">
        <i className="fa-brands fa-facebook" ></i>
        <i className="fa-brands fa-twitter" ></i>
        <i className="fa-brands fa-instagram" ></i>
      </div>
      <ul className="menu" role="list" aria-label="footer-list">
        <li className="menu__item"><a className="menu__link" href="#">Privacy Policy</a></li>
        <li className="menu__item"><a className="menu__link" href="#">Terms of Service</a></li>
        <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>

      </ul>
      <p>&copy;2023 TECHTROVE | All Rights Reserved</p>
    </footer>
  )
}

export default Footer
