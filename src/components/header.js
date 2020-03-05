import PropTypes from "prop-types"
import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import solaceDevLogo from "../images/solace-dev-logo-white.png"

const Header = ({ siteTitle }) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="https://solace.com/">
      <a target="_blank" rel="noopener noreferrer" href="https://solace.dev">
        <img src={solaceDevLogo} alt="Solace Developers Logo" />
      </a>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
      <Nav>
        <Nav.Link href="https://solace.com/products/event-broker/cloud/">
          Features
        </Nav.Link>
        <Nav.Link href="https://solace.com/products/event-broker/cloud/pricing/">
          Pricing
        </Nav.Link>
        <Nav.Link href="https://solace.com/learn/">Learn</Nav.Link>
        <Nav.Link href="https://solace.com/contact/">Talk to Sales</Nav.Link>
        <Nav.Link href="https://solace.com/try-it-now/">Try PubSub+</Nav.Link>
        <Nav.Link href="https://console.solace.cloud/login/">Log In</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
