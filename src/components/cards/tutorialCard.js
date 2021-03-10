import React from "react"
import { Col, Row, Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faClock } from "@fortawesome/free-solid-svg-icons"

const TutorialCard = (props) => {
  let content = props.content
  let catName = props.catName
  return (
    <>
      {content.length !== 0 && (
        <React.Fragment>
          {/* Header */}
          <h2>{catName}</h2>

          {/* Cards */}
          <Row>
            {content.map(({ node }) => (
              <Col
                key={node.id}
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={4}
                className="mb4"
              >
                <a href={node.fields.slug}>
                  <Card key={node.id}>
                    <Card.Header>
                      <div>{catName}</div>
                      <div>
                        <FontAwesomeIcon
                          icon={faClock}
                          size="1x"
                          className="link-arrow"
                        />
                        {node.timeToRead} Min
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{node.frontmatter.title}</Card.Title>
                      <Card.Text>{node.frontmatter.summary}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      View The Tutorial{" "}
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
    </>
  )
}
export default TutorialCard
