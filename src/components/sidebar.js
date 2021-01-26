import React from "react"
import { Col, Button } from "react-bootstrap"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faComments } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Sidebar = (props) => {
  let features = props.features
  let tutorials = props.tutorials
  let feedback_link = props.feedback_link
  let section_title = props.section_title
  let pageContext = props.pageContext
  return (
    <div id="sidebar">
      {tutorials.length !== 0 && (
        <div className="heading">{section_title || "Fundamentals"}</div>
      )}
      <Col>
        {tutorials.map(({ node }) => (
          <div key={node.id} className="pt2 pb2 border-bottom">
            <a
              className={
                pageContext.slug === node.fields.slug ? "c-grey" : "c-grey6"
              }
              href={node.fields.slug}
            >
              {node.frontmatter.title}
            </a>
          </div>
        ))}
      </Col>
      {features.length !== 0 && <div className="heading">Features</div>}
      <Col>
        {features.map(({ node }) => (
          <div key={node.id} className="pt2 pb2 border-bottom">
            <a
              className={
                pageContext.slug === node.fields.slug ? "c-grey" : "c-grey6"
              }
              href={node.fields.slug}
            >
              {node.frontmatter.title}
            </a>
          </div>
        ))}
      </Col>
      <Col>
        <Button
          className="mt3 mb2 w-100"
          href={feedback_link}
          target="_blank"
          rel="noreferrer"
          variant="primary"
          size="sm"
        >
          <FontAwesomeIcon icon={faGithub} size="1x" /> Improve this page{" "}
        </Button>{" "}
        <Button
          className="mt1 mb3 w-100"
          href="https://solace.community/"
          target="_blank"
          rel="noreferrer"
          variant="primary"
          size="sm"
        >
          <FontAwesomeIcon icon={faComments} size="1x" /> Discuss in Community{" "}
        </Button>{" "}
      </Col>
    </div>
  )
}

export default Sidebar
