import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Intro from "../components/intro"
import TutorialCard from "../components/cards/tutorialCard"
import HowTo from "../components/cards/howtoCard"
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
  console.log(tutorials)
  const features = data.allMarkdownRemark.edges.filter(
    (edge) => edge.node.frontmatter.layout === "features"
  )
  const howtos = data.allHowtosYaml.edges

  return (
    <Layout hideResources="true">
      <SEO title={meta[0].node.title} />
      {/* TODO - Move Breadcrumbs into it's own component */}
      {/* Breadcrumbs Start */}
      <section id="breadcrumbs">
        <Container>
          <Breadcrumb crumbs={crumbs} crumbSeparator=" 👉 " />
        </Container>
      </section>
      {/* Breadcrumbs Ends */}
      {/* Intro Component Starts */}
      {meta.map(({ node }) => (
        <Intro
          key={node.id}
          title={node.title}
          summary={node.summary}
          github={node.buttons.github}
          doclink={node.buttons.doclink}
        ></Intro>
      ))}
      {/* Intro Component Ends */}
      {/* TutorialCard Component Starts */}
      <Container className="mt4 pb4">
        <h2>Tutorials</h2>
        <TutorialCard
          content={tutorials}
          catName={meta[0].node.section1 || "Key Message Exchange Patterns"}
        ></TutorialCard>
        <TutorialCard
          content={features}
          catName={meta[0].node.section2 || "API & Broker Features"}
        ></TutorialCard>
      </Container>
      {/* TutorialCard Component Ends */}
      {/* HowTos Component Starts */}
      <HowTo howtos={howtos}></HowTo>
      {/* HowTos Component Ends */}
    </Layout>
  )
}

// Query to get all markdowns that are not assets
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
          timeToRead
          id
          fileAbsolutePath
        }
      }
    }
    allHowtosYaml(filter: { fields: { slugRoot: { eq: $slugRoot } } }) {
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
