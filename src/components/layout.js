import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Resources from "./resources"
import Footer from "./footer"

import "../css/layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Resources />
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
