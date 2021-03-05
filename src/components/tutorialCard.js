import React from "react"
import { Col, Row } from "react-bootstrap"

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
                  <div key={node.id} className="custom-card">
                    <div className="category">{catName}</div>
                    <div className="title">{node.frontmatter.title}</div>
                    <div className="desc">{node.frontmatter.summary}</div>
                    <div className="link">Learn More >></div>
                  </div>
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
