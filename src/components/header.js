import PropTypes from "prop-types"
import React from "react"
import NavBar from "./nav-main"
// import EDABanner from "./header/eda-banner"
// import LightningBanner from "./header/lightning-banner"

const Header = ({ siteTitle }) => (
  <>
    {/* <EDABanner /> */}
    {/* <LightningBanner /> */}
    <NavBar />
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
