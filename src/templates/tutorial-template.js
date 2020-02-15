import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { Container } from "react-bootstrap"

const tutorialTemplate = ({ data }) => {
  const node = data.allMarkdownRemark.edges[0].node
  return (
    <Layout>
      <Container>
        <h1 className="mt5">{node.frontmatter.title}</h1>
        <h5 className="mb4">(Length: {node.timeToRead} minutes)</h5>
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query myTutorialQuery($slug: String) {
    allMarkdownRemark(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          html
          timeToRead
          fields {
            slug
            slugRoot
          }
          frontmatter {
            icon
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
  }
`

export default tutorialTemplate
