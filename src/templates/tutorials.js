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
  // Clone the crumbs object
  const crumbs_clone = crumbs.slice()
  crumbs_clone.unshift(solaceDevCrumb)
  const meta = data.allTutorialsYaml.edges

  const intros = data.allMarkdownRemark.edges.filter(
    (edge) =>
      edge.node.frontmatter.layout === "intros" &&
      edge.node.frontmatter.visible !== false
  )
  const tutorials = data.allMarkdownRemark.edges.filter(
    (edge) =>
      edge.node.frontmatter.layout === "tutorials" &&
      edge.node.frontmatter.visible !== false
  )
  const features = data.allMarkdownRemark.edges.filter(
    (edge) =>
      edge.node.frontmatter.layout === "features" &&
      edge.node.frontmatter.visible !== false
  )
  const howtos = data.allHowtosYaml.edges

  return (
    <Layout hideResources="true">
      <SEO title={meta[0].node.title} />
      {/* TODO - Move Breadcrumbs into it's own component */}
      {/* Breadcrumbs Start */}
      <section id="breadcrumbs">
        <Container>
          <Breadcrumb crumbs={crumbs_clone} crumbSeparator=" 👉 " />
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
      {(tutorials.length !== 0 || features.length !== 0) && (
        <Container className="mt4 pb4">
          <h2>Tutorials</h2>
          <TutorialCard
            content={intros}
            catName={meta[0].node.section0 || "Introduction"}
          ></TutorialCard>
          <TutorialCard
            content={tutorials}
            catName={meta[0].node.section1 || "Key Message Exchange Patterns"}
          ></TutorialCard>
          <TutorialCard
            content={features}
            catName={meta[0].node.section2 || "API & Broker Features"}
          ></TutorialCard>
        </Container>
      )}
      {/* TutorialCard Component Ends */}
      {/* HowTos Component Starts */}
      {howtos.length !== 0 && <HowTo howtos={howtos}></HowTo>}
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
            visible
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
