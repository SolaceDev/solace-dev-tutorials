import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Intro from "../components/intro"
import TutorialCard from "../components/tutorialCard"
import { Container, Row } from "react-bootstrap"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import SEO from "../components/seo"

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
      <SEO title={meta[0].node.title} />
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
            <TutorialCard node={node} catName="Fundamentals"></TutorialCard>
          ))}
        </Row>
        {features.length !== 0 && (
          <h2 className="mt4">
            {meta[0].node.section2 || "API & Broker Features"}
          </h2>
        )}
        <Row>
          {features.map(({ node }) => (
            <TutorialCard
              node={node}
              catName="API & Broker Features"
            ></TutorialCard>
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
