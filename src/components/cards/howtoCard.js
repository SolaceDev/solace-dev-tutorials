import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  faArrowRight,
  faExternalLinkSquareAlt,
} from "@fortawesome/free-solid-svg-icons"

const HowTo = (props) => {
  let howtos = props.howtos
  return (
    <>
      <section id="howto" className="pb4">
        <Container>
          {howtos.length !== 0 && (
            <React.Fragment>
              <h2 className="mt4 mb3">How Tos</h2>
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
                        <Card.Header>How to</Card.Header>
                        <Card.Body>
                          <Card.Text>{node.title}</Card.Text>
                        </Card.Body>
                        {node.link.includes("github") ? (
                          <>
                            <FontAwesomeIcon
                              icon={faGithub}
                              size="1x"
                              className="github-icon"
                            />
                            <Card.Footer>
                              View on Github{" "}
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                size="1x"
                                className="link-arrow"
                              />
                            </Card.Footer>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon
                              icon={faExternalLinkSquareAlt}
                              size="1x"
                              className="github-icon"
                            />
                            <Card.Footer>
                              Open External Link{" "}
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                size="1x"
                                className="link-arrow"
                              />
                            </Card.Footer>
                          </>
                        )}
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
