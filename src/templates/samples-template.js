import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Intro from "../components/Intro"
import { Container, Row, Col, Card } from "react-bootstrap"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

const samplesTemplate = ({ data, pageContext }) => {
  const { breadcrumb: { crumbs } } = pageContext
  const meta = data.allTutorialsYaml.edges
  const tutorials = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.layout === "tutorials")
  const features = data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.layout === "features")

  return (
    <Layout>
      <Container className="mt1 mb3">
        <Breadcrumb
          crumbs={crumbs}
          crumbSeparator=" > "
        />
      </Container>
      {meta.map(({ node }) => (
        <Intro key={node.id}
          title={node.title}
          summary={node.summary}
          github={node.buttons.github}
          download={node.buttons.download}
        ></Intro>
      ))}
      <Container>
        {tutorials.length !== 0 && <h2 className="mt5">Key Message Exchange Patterns</h2>}
        <Row>
          {tutorials.map(({ node }) => (
            <Col key={node.id} xs={12} sm={12} md={6} lg={4} xl={4}>
              <Card key={node.id} className="mt4">
                <a href={node.fields.slug}>
                  <Card.Body>
                    <Card.Img
                      src={node.frontmatter.icon}
                      alt={node.frontmatter.title}
                    />
                    <Card.Title className="pa3 fw4">
                      {node.frontmatter.title}
                    </Card.Title>
                    <Card.Text className="pl3 pr3 fw1">
                      {node.frontmatter.summary}
                    </Card.Text>
                    <Card.Footer className="fw4">Start Tutorial</Card.Footer>
                  </Card.Body>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container>
        {features.length !== 0 && <h2 className="mt5">API Features Introductions</h2>}
        <Row>
          {features.map(({ node }) => (
            <Col key={node.id} xs={12} sm={12} md={6} lg={4} xl={4}>
              <Card key={node.id} className="mt4">
                <a href={node.fields.slug}>
                  <Card.Body>
                    <Card.Img
                      src={node.frontmatter.icon}
                      alt={node.frontmatter.title}
                    />
                    <Card.Title className="pa3 fw4">
                      {node.frontmatter.title}
                    </Card.Title>
                    <Card.Text className="pl3 pr3 fw1">
                      {node.frontmatter.summary}
                    </Card.Text>
                    <Card.Footer className="fw4">Start Tutorial</Card.Footer>
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

// query to get all markdowns that are not assets
export const query = graphql`
  query mySamplesQuery($slugRoot: String) {
    allTutorialsYaml(filter: {fields: {slugRoot: {eq: $slugRoot}}}) {
      edges {
        node {
          fields {
            slug
            slugRoot
          }
          summary
          title
          buttons {
            download
            github
          }
        }
      }
    }
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/^(?!.*assets).*$/"}, fields: {slugRoot: {eq: $slugRoot}}}) {
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

export default samplesTemplate
