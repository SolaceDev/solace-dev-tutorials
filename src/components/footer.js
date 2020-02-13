import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Footer = () => (
  <footer className="mt5">
    <Container>
      <Row className="pa2">
        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
          Column 1 Nav Products Links
        </Col>
        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
          Column 2 Nav Company Links
        </Col>
        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
          Column 3 Nav Developers Links
        </Col>
        <Col xs={12} sm={12} md={6} lg={3} xl={3}>
          Solace Logo and Social Icons
        </Col>
      </Row>
      <Row className="pa2">
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          © {new Date().getFullYear()} Solace Corporation
        </Col>
      </Row>
    </Container>
  </footer>
)

export default Footer
