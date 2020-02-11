import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Intro from "../components/Intro"
import { Container, Card } from "react-bootstrap"

const SamplesIndex = ({ data }) => {
  const samples = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Intro />
      <Container>
        {samples.map(({ node }) => (
          <div key={node.id} className="flex-wrap w-25">
            <Card className="mt4">
              <a href={node.fields.slug}>
                <Card.Body>
                  <Card.Title className="fw4">
                    {node.frontmatter.title}
                  </Card.Title>
                  <Card.Text className="fw1">
                    {node.frontmatter.summary}
                  </Card.Text>
                  <div className="card-footer fw3">Start tutorial</div>
                </Card.Body>
              </a>
            </Card>
          </div>
        ))}
      </Container>
    </Layout>
  )
}

export default SamplesIndex

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            summary
            icon
          }
          fields {
            slug
          }
          id
        }
      }
    }
  }
`
