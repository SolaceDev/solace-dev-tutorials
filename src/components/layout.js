import React from "react"
import PropTypes from "prop-types"

import Header from "./Header"
import Footer from "./Footer"
import "../css/Layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
