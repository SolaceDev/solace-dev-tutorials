import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"

const SubFooter = props => {
  return (
    <section id="subfooter" className="pt5 pb5">
      <Container>
        <Row>
          <Col>
            <h2>Have Questions?</h2>
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
            <Button
              className="ml2"
              href={props.download}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the Community
            </Button>
            <Button
              className="ml2"
              href={props.download}
              target="_blank"
              rel="noopener noreferrer"
            >
              Try PubSub+ Cloud
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SubFooter
