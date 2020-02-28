import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const SubFooter = props => {
  return (
    <div id="subfooter" className="pt5 pb5">
      <Container>
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
    </div>
  )
}

export default SubFooter
