import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link className="link" to="/">blogs</Link>
      <Link className="link" to="/users">users</Link>
    </nav>
  )}

export default Navbar