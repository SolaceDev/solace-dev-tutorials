import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"
import "../css/layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
