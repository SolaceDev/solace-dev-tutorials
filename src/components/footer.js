import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDev,
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"
import { Container, Row, Col } from "react-bootstrap"
import solaceLogo from "../images/solace-logo-white.png"

const Footer = () => (
  <footer>
    <Container>
      <Row className="pt5 pb4">
        <Col xs={6} sm={6} md={6} lg={4} xl={4}>
          <ul className="menu">
            <li>
              <a
                href="https://solace.com/products/"
                target="_blank"
                rel="noopener noreferrer"
                className="mb6"
              >
                Products
              </a>
              <ul className="sub-menu">
                <li>
                  <a
                    href="https://solace.com/products/platform/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubSub+ Platform
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/products/event-broker/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubSub+ Event Broker
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/products/event-broker/software/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubSub+ Event Broker: Software
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/products/event-broker/appliance/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubSub+ Event Broker: Appliance
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/products/event-broker/cloud/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubSub+ Event Broker: Cloud
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/products/portal/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PubSub+ Event Portal
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </Col>
        <Col xs={6} sm={6} md={6} lg={3} xl={3}>
          <ul className="menu">
            <li>
              <a
                href="https://solace.com/company/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Company
              </a>
              <ul className="sub-menu">
                <li>
                  <a
                    href="https://solace.com/careers/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/company/team/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Leadership
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/company/customers/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Customers
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/company/partners/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/events/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/legal/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Legal
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </Col>
        <Col xs={6} sm={6} md={6} lg={3} xl={3}>
          <ul className="menu">
            <li>
              <a href="https://solace.dev">Developers</a>
              <ul className="sub-menu">
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.solace.com/"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/blog/category/developers/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.community"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/support/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="https://solace.com/contact/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://console.solace.cloud/login"
                  >
                    Log In
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </Col>
        <Col xs={6} sm={6} md={6} lg={2} xl={2}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://solace.com"
          >
            <img src={solaceLogo} alt="Solace Logo" className="mb2" />
          </a>
          <a
            href="https://dev.to/solacedevs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dev.to"
          >
            <FontAwesomeIcon icon={faDev} size="1x" className="ma2" />
          </a>
          <a
            href="https://github.com/solacedev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} size="1x" className="ma2" />
          </a>
          <a
            href="https://www.linkedin.com/company/solacedotcom/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} size="1x" className="ma2" />
          </a>
          <a
            href="https://twitter.com/SolaceDevs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} size="1x" className="ma2" />
          </a>
          <a
            href="https://www.youtube.com/SolaceSystems"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} size="1x" className="ma2" />
          </a>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row className="footer-bottom">
        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="tl pt3 pb3">
          <a
            href="https://solace.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy; {new Date().getFullYear()} Solace Corporation
          </a>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="tr pt2 pb2">
          <a
            href="https://solace.com/legal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Legal
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
)

export default Footer
