import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Intro from "../components/Intro"
import { Container, Row, Col, Card } from "react-bootstrap"

const SamplesIndex = ({ data }) => {
  const samples = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Intro />
      <Container>
        <Row>
          {samples.map(({ node }) => (
            <Col xs={12} sm={12} md={6} lg={4} xl={4}>
              <Card key={node.id} className="mt4">
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
            </Col>
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
