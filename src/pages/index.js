import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import ApiCard from "../components/apiCard"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import SEO from "../components/seo"

const SamplesIndex = ({ data }) => {
  // const samples = data.allTutorialsYaml.edges
  const crumbs = [
    { pathname: "https://solace.dev/", crumbLabel: " 👈 Developer Hub" },
  ]
  const solaceAPI = data.allTutorialsYaml.edges.filter(
    (edge) => (edge.node.type === "solace" && edge.node.visible !== false)
  )
  const openAPI = data.allTutorialsYaml.edges.filter(
    (edge) => edge.node.type === "open"
  )
  const mgmtAPI = data.allTutorialsYaml.edges.filter(
    (edge) => edge.node.type === "management"
  )

  return (
    <Layout>
      <SEO title="Home" />
      <section id="breadcrumbs">
        <Container>
          <Breadcrumb crumbs={crumbs} />
        </Container>
      </section>

      <section id="intro">
        <Container className="pt6 pb5">
          <Row className="tc">
            <Col>
              <h1>Solace API Tutorials</h1>
              <p className="pt3 pb3 f5">
                Below are API tutorials that will get you started with
                <br />
                building event-driven applications
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="pb5">
        {/* SOLACE APIS */}
        <h2 className="mt4">Solace APIs</h2>
        <Row className="mt3">
          {solaceAPI.map(({ node }) => (
            <ApiCard node={node} />
          ))}
        </Row>

        {/* OPEN APIS */}
        <h2 className="mt4">Open APIs</h2>
        <Row className="mt3">
          {openAPI.map(({ node }) => (
            <ApiCard node={node} />
          ))}
        </Row>

        {/* Management APIS */}
        <h2 className="mt4">Management APIs</h2>
        <Row className="mt3">
          {mgmtAPI.map(({ node }) => (
            <ApiCard node={node} />
          ))}
        </Row>
      </Container>
    </Layout>
  )
}

export default SamplesIndex

export const query = graphql`
  {
    allTutorialsYaml(sort: { order: [ASC], fields: [title] }) {
      edges {
        node {
          id
          title
          icon
          type
          visible
          fields {
            slug
          }
        }
      }
    }
  }
`
