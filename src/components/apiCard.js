import React from "react"
import { Col } from "react-bootstrap"

const ApiCard = (props) => {
  let node = props.node
  return (
    <Col key={node.id} xs={12} sm={12} md={6} lg={4} xl={4} className="mt3 mb3">
      <a href={node.fields.slug}>
        <div key={node.id} className="custom-card">
          <div className="icon">
            <img
              src={require(`../images/icons/lang/${node.icon}`)}
              alt={node.title}
              width="100px"
            />
          </div>
          <div className="title">{node.title}</div>
          <div className="link">Go To Tutorials >></div>
        </div>
      </a>
    </Col>
  )
}
export default ApiCard
