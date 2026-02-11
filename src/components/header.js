import PropTypes from "prop-types"
import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import solaceDevLogo from "../images/solace-developers-logo-white.svg"
import NavBar from "./nav-main"
// import EDABanner from "./header/eda-banner"
// import LightningBanner from "./header/lightning-banner"

const Header = ({ siteTitle }) => (
  <>
    {/* <EDABanner /> */}
    {/* <LightningBanner /> */}
    <Navbar />
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
