import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import solaceLogo from "../images/solace-logo-white.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDev,
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"

const Footer = () => (
  <footer>
    <Container>
      <Row className="pt5 pb5">
        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
          1
        </Col>
        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
          2
        </Col>
        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
          3
        </Col>
        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://solace.com"
          >
            <img src={solaceLogo} alt="Solace Logo" />
          </a>
          <FontAwesomeIcon icon={faDev} />
          <FontAwesomeIcon icon={faGithub} />
          <FontAwesomeIcon icon={faLinkedin} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faYoutube} />
        </Col>
      </Row>
    </Container>
    <Container>
      <Row className="footer-bottom">
        <Col className="footer-bottom-content">
          &copy; {new Date().getFullYear()} Solace |
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
