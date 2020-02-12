import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Container, Row, Col, Button } from "react-bootstrap"

export default () => (
  <StaticQuery
    query={graphql`
      {
        allSolaceSamplesJavascriptYaml {
          edges {
            node {
              id
              summary
              download
              github
              title
            }
          }
        }
      }
    `}
    render={data =>
      data.allSolaceSamplesJavascriptYaml.edges.map(({ node }) => (
        <Container key={node.id} className="tc">
          <Row>
            <Col>
              <h2 className="mt4">{node.title}</h2>
              <p className="mb3">{node.summary}</p>
              <Button
                className="mr3"
                href={node.github}
                variant="outline-primary"
              >
                View on GitHub
              </Button>
              <Button
                className="mr3"
                href={node.download}
                variant="outline-primary"
              >
                Download Source
              </Button>
            </Col>
          </Row>
        </Container>
      ))
    }
  />
)
