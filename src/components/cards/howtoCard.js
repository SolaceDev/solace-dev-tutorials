import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

const HowTo = (props) => {
  let howtos = props.howtos
  return (
    <>
      <section id="howto" className="pb4">
        <Container>
          {howtos.length !== 0 && (
            <React.Fragment>
              <h2 className="mt3 mb4">How Tos</h2>
              <Row>
                {howtos.map(({ node }) => (
                  <Col
                    key={node.id}
                    xs={12}
                    sm={12}
                    md={6}
                    lg={3}
                    xl={3}
                    className="mb4"
                  >
                    <a
                      href={node.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Card key={node.id}>
                        <FontAwesomeIcon
                          icon={faGithub}
                          size="2x"
                          className="github-icon"
                        />
                        <Card.Header>How To</Card.Header>
                        <Card.Body>
                          <Card.Text>{node.title}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          View on GitHub{" "}
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            size="1x"
                            className="link-arrow"
                          />
                        </Card.Footer>
                      </Card>
                    </a>
                  </Col>
                ))}
              </Row>
            </React.Fragment>
          )}
        </Container>
      </section>
    </>
  )
}
export default HowTo
