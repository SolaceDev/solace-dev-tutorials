import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Intro from "../components/intro"
import { Container, Row, Col } from "react-bootstrap"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

const tutorials = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
  const solaceDevCrumb = {
    pathname: "https://solace.dev/",
    crumbLabel: "Developer Hub",
  }
  crumbs.unshift(solaceDevCrumb)
  const meta = data.allTutorialsYaml.edges
  const tutorials = data.allMarkdownRemark.edges.filter(
    (edge) => edge.node.frontmatter.layout === "tutorials"
  )
  const features = data.allMarkdownRemark.edges.filter(
    (edge) => edge.node.frontmatter.layout === "features"
  )
  return (
    <Layout>
      <section id="breadcrumbs">
        <Container>
          <Breadcrumb crumbs={crumbs} crumbSeparator=" 👉 " />
        </Container>
      </section>
      {meta.map(({ node }) => (
        <Intro
          key={node.id}
          title={node.title}
          summary={node.summary}
          github={node.buttons.github}
          doclink={node.buttons.doclink}
        ></Intro>
      ))}
      <Container className="mb4">
        {tutorials.length !== 0 && (
          <h2 className="mt4">{meta[0].node.section1 || "Fundamentals"}</h2>
        )}
        <Row>
          {tutorials.map(({ node }) => (
            <Col
              key={node.id}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              className="mt3 mb2"
            >
              <a href={node.fields.slug}>
                <div key={node.id} className="custom-card">
                    {node.frontmatter.icon && (
                      <div className="icon">
                        <img
                          src={require(`../images/icons/${node.frontmatter.icon}`)}
                          alt={node.frontmatter.title}
                        />
                      </div>
                    )}
                  <div className="category">Fundamentals</div>
                  <div className="title">{node.frontmatter.title}</div>
                  <div className="desc">{node.frontmatter.summary}</div>
                  <div className="link">Learn More >></div>
                </div>
              </a>
            </Col>
          ))}
        </Row>
        {features.length !== 0 && (
          <h2 className="mt4">
            {meta[0].node.section2 || "API & Broker Features"}
          </h2>
        )}
        <Row>
          {features.map(({ node }) => (
            <Col
              key={node.id}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              className="mt3 mb2"
            >
              <a href={node.fields.slug}>
                <div key={node.id} className="custom-card">
                  <div className="category">API & Broker Features</div>
                  <div className="title">{node.frontmatter.title}</div>
                  <div className="desc">{node.frontmatter.summary}</div>
                  <div className="link">Learn More >></div>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}

// query to get all markdowns that are not assets
export const query = graphql`
  query mySamplesQuery($slugRoot: String) {
    allTutorialsYaml(filter: { fields: { slugRoot: { eq: $slugRoot } } }) {
      edges {
        node {
          fields {
            slug
            slugRoot
          }
          summary
          title
          buttons {
            doclink
            github
          }
          section1
        }
      }
    }
    allMarkdownRemark(
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
            summary
            icon
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

export default tutorials
