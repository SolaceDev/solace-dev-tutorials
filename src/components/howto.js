import React from "react"
import { Row, Col } from "react-bootstrap"

const HowTo = (props) => {
  let howtos = props.howtos
  return (
    <>
      {howtos.length !== 0 && (
        <React.Fragment>
          <Row>
            {/* Header */}
            <h2 className="mt4">
              How Tos
            </h2>
            </Row>
            <Row>
              <Col>

                    {howtos.map(({ node }) => (<a href={node.link} target="_blank" rel="noopener noreferrer">{node.title}</a>
                    ))}
              </Col>
          </Row>
        </React.Fragment>
      )}
    </>
  )
}
export default HowTo
