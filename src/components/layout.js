import React from "react"
import PropTypes from "prop-types"

import Header from "./Header"
import SubFooter from "./SubFooter"
import Footer from "./Footer"

import "../css/Layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mb4">{children}</main>
      <SubFooter />
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
