import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import notFound from "../images/illustrations/undraw_page_not_found_su7k.svg"

// TODO fix styling for 404, etc.
const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Page Not Found" />
    <Container className="mt5 mb5">
      <Row>
        <Col>
          <img src={notFound} alt="404: Page Not Found" />
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default NotFoundPage
