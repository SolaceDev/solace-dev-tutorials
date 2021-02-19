import React from "react"
import { Col } from "react-bootstrap"

const HowtosCard = (props) => {
  let node = props.node
  let catName = props.catName
  return (
    <Col key={node.id} xs={12} sm={12} md={6} lg={4} xl={4} className="mt3 mb2">
      <a href={node.link} target="_blank" rel="noopener noreferrer">
        <div key={node.id} className="custom-card">
          <div className="category">{catName}</div>
          <div className="title">{node.title}</div>
          <div className="desc">{node.description}</div>
          <div className="link">Learn More >></div>
        </div>
      </a>
    </Col>
  )
}
export default HowtosCard
