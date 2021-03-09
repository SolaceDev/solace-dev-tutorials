import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const HowTo = (props) => {
  let howtos = props.howtos
  return (
    <>
      <section id="howto" className="pb4">
        <Container>
          <Row>
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
                          <Card.Header>How To</Card.Header>
                          <Card.Body>
                            <Card.Text>{node.title}</Card.Text>
                          </Card.Body>
                          <Card.Footer className="card-footer">
                            View on GitHub{" "}
                            <FontAwesomeIcon icon={faGithub} size="1x" />
                          </Card.Footer>
                        </Card>
                      </a>
                    </Col>
                  ))}
                </Row>
              </React.Fragment>
            )}
          </Row>
        </Container>
      </section>
    </>
  )
}
export default HowTo
