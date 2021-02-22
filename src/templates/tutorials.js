import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Intro from "../components/intro"
import TutorialCard from "../components/tutorialCard"
import HowtoTable from "../components/howtoTable"
import { Container } from "react-bootstrap"
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
  const howtos = data.allHowtosYaml.edges
  
  return (
    <Layout hideResources="true">
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

        {/* Fundamentals */}
        <TutorialCard content={tutorials} catName={meta[0].node.section1 || "Fundamentals"}></TutorialCard>

        {/* API & Broker Features */}
        <TutorialCard content={features} catName={meta[0].node.section2 || "API & Broker Features"}></TutorialCard>

        {/* How Tos */}
        <HowtoTable howtos={howtos}></HowtoTable>

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
    allHowtosYaml(filter: {fields: {slugRoot: {eq: $slugRoot}}}) {
      edges {
        node {
          id
          title
          link
          description
        }
      }
    }
  }
`

export default tutorials
