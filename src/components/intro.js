import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"

const Intro = props => {
  return (
    <Container className="tc">
      <Row>
        <Col>
          <h1 className="mt4 mb4">{props.title}</h1>
          <p className="mb4">{props.summary}</p>
          <Button
            className="mr3"
            href={props.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Button>
          <Button
            className="mr3"
            href={props.download}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Source
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Intro
