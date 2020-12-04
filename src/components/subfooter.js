import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"

const SubFooter = (props) => {
  return (
    <section id="subfooter" className="pa5">
      <Container>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={{ span: 8, offset: 2 }}
            xl={{ span: 8, offset: 2 }}
          >
            <h2>Resources</h2>
            <p>Cards will go below, similar to what we have on Solace.dev</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SubFooter
