import React from "react"
import { Col } from "react-bootstrap"

const HowTo = (props) => {
  let howtos = props.howtos
  return (
    <>
      <div id="howto" className="mt5">
        {howtos.length !== 0 && (
          <React.Fragment>
            <div className="heading">How Do I?</div>
            <Col>
              {howtos.map(({ node }) => (
                <div className="pt2 pb2 border-bottom">
                  <a
                    href={node.link}
                    className="c-grey c-grey6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {node.title}
                  </a>
                </div>
              ))}
            </Col>
          </React.Fragment>
        )}
      </div>
    </>
  )
}
export default HowTo
