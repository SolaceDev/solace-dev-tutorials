import PropTypes from "prop-types"
import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import solaceDevLogo from "../images/solace-developers-logo-white.svg"
// import EDABanner from "./header/eda-banner"
// import LightningBanner from "./header/lightning-banner"

const Header = ({ siteTitle }) => (
  <>
    {/* <EDABanner /> */}
    {/* <LightningBanner /> */}
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          href="https://solace.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={solaceDevLogo}
            alt="Solace Developers Logo"
            width="250px"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="mr-auto">
            <Nav.Link
              href="https://solace.com/try-it-now/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Getting Started
            </Nav.Link>
            <Nav.Link href="/" className="active">
              Tutorials
            </Nav.Link>
            <Nav.Link
              href="https://community.solace.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Community
            </Nav.Link>
            <Nav.Link
              href="https://docs.solace.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </Nav.Link>
            <Nav.Link
              href="https://solace.com/downloads/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Downloads
            </Nav.Link>
            <Nav.Link
              href="https://solace.com/learn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn
            </Nav.Link>
          </Nav>
          <a
            href="https://console.solace.cloud/login"
            target="_blank"
            rel="noopener noreferrer"
            className="btnSmall"
          >
            Log In
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
