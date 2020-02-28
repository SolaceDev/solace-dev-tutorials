import React from "react"
import PropTypes from "prop-types"

import Header from "./Header"
import Footer from "./Footer"
import Community from "./Community"
import "../css/Layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mb6">{children}</main>
      <Community />
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
