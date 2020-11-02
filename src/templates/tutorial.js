import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import Sidebar from "../components/sidebar"
import { Container, Col } from "react-bootstrap"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

const tutorial = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
  const node = data.tutorialBody.edges[0].node
  const tutorials = data.tableOfContent.edges.filter(
    (edge) => edge.node.frontmatter.layout === "tutorials"
  )
  const features = data.tableOfContent.edges.filter(
    (edge) => edge.node.frontmatter.layout === "features"
  )
  const feedback = node.frontmatter.links.filter(
    (link) => link.label === "feedback"
  )
  const feedback_link = feedback[0].link || ""
  const section_title = data.allTutorialsYaml.edges[0].node.section1
  return (
    <Layout>
      <section id="breadcrumbs">
        <Container>
          <Breadcrumb
            crumbs={crumbs}
            crumbLabel={node.frontmatter.title}
            crumbSeparator=" 👉 "
          />
        </Container>
      </section>
      <Container className="flex-row">
        <div className="max-w-70 mt4 mb4">
          <h1>{node.frontmatter.title}</h1>
          <h5 id="minutes" className="mb3 pt2">
            {node.timeToRead} Minute Read
          </h5>
          <div dangerouslySetInnerHTML={{ __html: node.html }} />
        </div>
        {/* sidebar */}
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
        {/* <Sidebar node = {this.node} tutorials = {this.tutorials} features = {this.features} feedback = {this.feedback} /> */}
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query myTutorialQuery($slug: String, $slugRoot: String) {
    tutorialBody: allMarkdownRemark(
      filter: { fields: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          html
          timeToRead
          fields {
            slug
            slugRoot
          }
          frontmatter {
            title
            summary
            layout
            links {
              label
              link
            }
          }
        }
      }
    }
    allTutorialsYaml(filter: { fields: { slugRoot: { eq: $slugRoot } } }) {
      edges {
        node {
          section1
        }
      }
    }
    tableOfContent: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/^(?!.*assets).*$/" }
        fields: { slugRoot: { eq: $slugRoot } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            layout
          }
          fields {
            slug
            slugRoot
          }
          id
          fileAbsolutePath
        }
      }
    }
  }
`

export default tutorial
