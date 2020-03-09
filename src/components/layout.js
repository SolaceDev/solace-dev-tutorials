import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import SubFooter from "./subFooter"
import Footer from "./footer"

import "../css/layout.css"

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
