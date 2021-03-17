import React from "react"
import PropTypes from "prop-types"
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css"
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false /* eslint-disable import/first */
import "../css/layout.css"
import Resources from "./resources"
import Header from "./header"
import Footer from "./footer"
import ReactTooltip from "react-tooltip"

const Layout = (props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      {props.hideResources !== "true" && <Resources />}
      <Footer />
      <ReactTooltip
        id="registerTip"
        place="top"
        effect="float"
        backgroundColor="black"
      >
        Spraint is the proper name for otter dung
      </ReactTooltip>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
