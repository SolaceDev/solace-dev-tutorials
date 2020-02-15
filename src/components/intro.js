import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"

const Intro = (props) => {
  return (
    <Container className="tc">
      <Row>
        <Col>
          <h1 className="mt4">{props.title}</h1>
          <p className="mb3">{props.summary}</p>
          <Button
            className="mr3"
            href={props.github}
            variant="outline-primary">
            View on GitHub
          </Button>
          <Button
            className="mr3"
            href={props.download}
            variant="outline-primary">
            Download Source
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Intro