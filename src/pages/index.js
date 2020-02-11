import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Intro from "../components/Intro"
import { Container, Card, Row } from "react-bootstrap"

const SamplesIndex = ({ data }) => {
  const samples = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Intro />
      <Container>
        <Row>
          {samples.map(({ node }) => (
            <Card key={node.id} className="mt4 w-25">
              <a href={node.fields.slug}>
                <Card.Body>
                  <Card.Title className="pa3 fw4">
                    {node.frontmatter.title}
                  </Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    {node.frontmatter.summary}
                  </Card.Text>
                  <Card.Text className="card-footer fw3">
                    Start Tutorial
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          ))}
        </Row>
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
