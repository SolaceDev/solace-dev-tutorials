import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faFileAlt} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
              href={props.doclink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFileAlt} size="1x" /> Documentation
            </Button>
            <Button
              className="ml2"
              target="_blank"
              href={props.github}
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="1x" /> Sample Code
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Intro
