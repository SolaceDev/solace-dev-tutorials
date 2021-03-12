import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Page Not Found" />
    <Container className="mt5 mb5">
      <Row>
        <Col>
          <h1>Page Not Found</h1>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default NotFoundPage
