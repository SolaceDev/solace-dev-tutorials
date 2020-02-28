import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const SubFooter = props => {
  return (
    <Container className="mt5 mb5">
      <Row>
        <Col>
          <h2>Questions</h2>
          <p>
            If you have any issues or questions check the{" "}
            <a
              href="https://www.solace.community"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solace Community
            </a>{" "}
            for answers and discussions.
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default SubFooter
