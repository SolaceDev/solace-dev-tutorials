import PropTypes from "prop-types"
import React from "react"
import { Navbar, Nav } from "react-bootstrap"
const Header = ({ siteTitle }) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="TODO">Solace</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
      <Nav>
        <Nav.Link href="TODO">Features</Nav.Link>
        <Nav.Link href="TODO">Pricing</Nav.Link>
        <Nav.Link href="TODO">Learn</Nav.Link>
        <Nav.Link href="TODO">Talk to Sales</Nav.Link>
        <Nav.Link href="TODO">Try PubSub+</Nav.Link>
        <Nav.Link href="TODO">Log In</Nav.Link>
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
