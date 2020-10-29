import React, {Component} from "react"

const Sidebar = () => {
  node = this.props.node
  features = this.props.features
  tutorials = this.props.tutorials
  feedback = this.props.feedback
  return (
    <div className="flex-column">
      <div id="sidebar" className="pl5 mt6 min-w-30">
        {tutorials.length !== 0 && (
          <div className="f4 fw4">MESSAGING PATTERNS</div>
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
          <div className="mt3 f4 fw4">API FEATURES</div>
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
          <div className="mt3 f4 fw4"><a href = {feedback[0].link} target="_blank" > Improve this page </a></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar