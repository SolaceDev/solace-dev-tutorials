import React from "react"
import { Row, Col } from "react-bootstrap"
import {
  faCode,
  faExternalLinkSquareAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const HowTo = (props) => {
  let howtos = props.howtos
  return (
    <>
      <div>
        {howtos.length !== 0 && (
          <React.Fragment>
            <h3 className="mt3 mb4">How Do I?</h3>

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
                  <a href={node.link} target="_blank" rel="noopener noreferrer">
                    <div key={node.id} className="howto-card">
                      <div className="title">{node.title}</div>
                      <FontAwesomeIcon
                        icon={faExternalLinkSquareAlt}
                        size="1x"
                      />
                      <FontAwesomeIcon icon={faCode} size="1x" />
                    </div>
                  </a>
                </Col>
              ))}
            </Row>
          </React.Fragment>
        )}
      </div>
    </>
  )
}
export default HowTo
