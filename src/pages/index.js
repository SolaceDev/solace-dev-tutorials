import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

const SamplesIndex = ({ data }) => {
  const crumbs = [
    { pathname: "https://solace.dev/", crumbLabel: " 👈 Developer Hub" },
  ]
  const solaceAPI = data.allTutorialsYaml.edges.filter(
    (edge) => edge.node.type === "solace"
  )
  const openAPI = data.allTutorialsYaml.edges.filter(
    (edge) => edge.node.type === "open"
  )
  const mgmtAPI = data.allTutorialsYaml.edges.filter(
    (edge) => edge.node.type === "management"
  )

  return (
    <Layout>
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
        <h2 className="mt4">Solace API</h2>
        <Row className="mt3">
          {solaceAPI.map(({ node }) => (
            <Col
              key={node.id}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              className="mt3 mb3"
            >
              <a href={node.fields.slug}>
                <div key={node.id} className="custom-card">
                  <div className="icon">
                    <img
                      src={require(`../images/icons/lang/${node.icon}`)}
                      alt={node.title}
                      width="100px"
                    />
                  </div>
                  <div className="title">{node.title}</div>
                  <div className="link">Go To Tutorials >></div>
                </div>
              </a>
            </Col>
          ))}
        </Row>

        {/* OPEN APIS */}
        <h2 className="mt4">Open API</h2>
        <Row className="mt3">
          {openAPI.map(({ node }) => (
            <Col
              key={node.id}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              className="mt3 mb3"
            >
              <a href={node.fields.slug}>
                <div key={node.id} className="custom-card">
                  <div className="icon">
                    <img
                      src={require(`../images/icons/lang/${node.icon}`)}
                      alt={node.title}
                      width="100px"
                    />
                  </div>
                  <div className="title">{node.title}</div>
                  <div className="link">Go To Tutorials >></div>
                </div>
              </a>
            </Col>
          ))}
        </Row>

        {/* Management APIS */}
        <h2 className="mt4">Management API</h2>
        <Row className="mt3">
          {mgmtAPI.map(({ node }) => (
            <Col
              key={node.id}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              className="mt3 mb3"
            >
              <a href={node.fields.slug}>
                <div key={node.id} className="custom-card">
                  <div className="icon">
                    <img
                      src={require(`../images/icons/lang/${node.icon}`)}
                      alt={node.title}
                      width="100px"
                    />
                  </div>
                  <div className="title">{node.title}</div>
                  <div className="link">Go To Tutorials >></div>
                </div>
              </a>
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
    allTutorialsYaml(
      sort: {
        order: [ASC]
        fields: [title]
        }
      ) {
      edges {
        node {
          id
          title
          icon
          type
          fields {
            slug
          }
        }
      }
    }
  }
`
