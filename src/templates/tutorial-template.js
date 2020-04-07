import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Container, Col } from "react-bootstrap"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

const tutorialTemplate = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
  const node = data.tutorialBody.edges[0].node
  const tutorials = data.tableOfContent.edges.filter(
    edge => edge.node.frontmatter.layout === "tutorials"
  )
  const features = data.tableOfContent.edges.filter(
    edge => edge.node.frontmatter.layout === "features"
  )
  return (
    <Layout>
      <section id="breadcrumbs">
        <Container className="pt3">
          <Breadcrumb
            crumbs={crumbs}
            crumbLabel={node.frontmatter.title}
            crumbSeparator=" > "
          />
        </Container>
      </section>
      <Container className="flex-row">
        <div className="max-w-70">
          <h1 className="mt5">{node.frontmatter.title}</h1>
          <h5 className="mb4">(Length: {node.timeToRead} minutes)</h5>
          <div dangerouslySetInnerHTML={{ __html: node.html }} />
        </div>
        {/* sidebar */}
        <div id="sidebar" className="pl5 mt5 f4 min-w-30">
          {tutorials.length !== 0 && <div>MESSAGING PATTERNS</div>}
          <Col className="f5">
            {tutorials.map(({ node }) => (
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
          {features.length !== 0 && <div className="mt3">API FEATURES</div>}
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
        </div>
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

export default tutorialTemplate
