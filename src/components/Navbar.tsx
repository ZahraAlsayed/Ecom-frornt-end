import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="/your-logo.png" alt="Logo" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search products" />
        <button type="button">Search</button>
      </div>
      <div className="categories">
        <span>Electronics</span>
        <span>Computers</span>
        <span>Mobile Phones</span>
        <span>Gaming</span>
        {/* Add more category names */}
      </div>
      <div className="cart">
        <i className="fas fa-shopping-cart"></i>
        <span>0</span>
      </div>
    </nav>
  )
}

export default Navbar
