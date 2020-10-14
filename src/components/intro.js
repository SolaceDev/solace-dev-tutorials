import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"

const Intro = (props) => {
  return (
    <section id="intro">
      <Container className="tc pt3 pb5">
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={{ span: 8, offset: 2 }}
            xl={{ span: 8, offset: 2 }}
          >
            <h1 className="mt4 mb4">{props.title}</h1>
            <p className="mb4">{props.summary}</p>
            <Button
              className="mr2"
              href={props.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Improve this page
            </Button>
            <Button
              className="ml2"
              href={props.download}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Source Code
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Intro
