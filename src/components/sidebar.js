import React from "react"
import { Col } from "react-bootstrap"

const Sidebar = (props) => {
  console.log(props)
  let features = props.features
  let tutorials = props.tutorials
  let feedback_link = props.feedback_link
  let section_title = props.section_title
  let pageContext = props.pageContext
  return (
    <div className="flex-column">
      <div id="sidebar" className="pl5 mt6 min-w-30">
        {tutorials.length !== 0 && (
          <div className="f4 fw4">{section_title || "Fundamentals"}</div>
        )}
        <Col className="f5">
          {tutorials.map(({ node }) => (
            <div key={node.id} className="pl0">
              <a
                className={
                  pageContext.slug === node.fields.slug
                    ? "c-grey"
                    : "c-grey4 o-90"
                }
                href={node.fields.slug}
              >
                {node.frontmatter.title}
              </a>
            </div>
          ))}
        </Col>
        {features.length !== 0 && (
          <div className="mt3 f4 fw4">Features</div>
        )}
        <Col className="f5">
          {features.map(({ node }) => (
            <div key={node.id}>
              <a
                className={
                  pageContext.slug === node.fields.slug
                    ? "c-grey6"
                    : "c-grey4 o-70"
                }
                href={node.fields.slug}
              >
                {node.frontmatter.title}
              </a>
            </div>
          ))}
        </Col>
        <div className="f5">
        <div className="mt3 f4 fw4"><a href = {feedback_link} target="_blank" rel="noreferrer" > Improve this page </a></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar