import React from "react"
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faHome } from "@fortawesome/free-solid-svg-icons"
import sollyImg from "../images/goodbye_otter.gif"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Page Not Found" />
    <section id="error404">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <img
              src={sollyImg}
              alt="Solly waving - Hello from the otter side"
              width="100%"
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <Card className="mt6">
              <h1>Hi there, I’m Solly</h1>
              <p>
                This isn’t what you hoped for (it’s better, I know), but without
                me you’d be up{" "}
                <span data-tip data-for="registerTip" className="spraint">
                  spraint
                </span>{" "}
                creek without a paddle.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
    <section id="error404under">
      <Container>
        <Row className="mt4 mb4">
          <Col xs={12} sm={12} md={12} lg={4} xl={4} className="text-center">
            <h3>
              Here are a few resources your species seems to find valuable
            </h3>
            <Button className="mt1 mb3" href="/" size="sm">
              <FontAwesomeIcon icon={faHome} size="1x" /> Take me home{" "}
            </Button>{" "}
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8}>
            <ListGroup>
              <ListGroup.Item>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="1x"
                  className="mr2"
                />{" "}
                <a
                  href="http://solace.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  solace.dev
                </a>{" "}
                is the homebase where developers start building all of the
                things
              </ListGroup.Item>
              <ListGroup.Item>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="1x"
                  className="mr2"
                />{" "}
                <a
                  href="https://docs.solace.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  docs.solace.com
                </a>{" "}
                houses all PubSub+ Event Broker technical documentation
              </ListGroup.Item>
              <ListGroup.Item>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="1x"
                  className="mr2"
                />{" "}
                Explore success stories within your{" "}
                <a
                  href="https://solace.com/use-cases/industries/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Industry
                </a>{" "}
                or the{" "}
                <a
                  href="https://solace.com/use-cases/environments/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Environment
                </a>{" "}
                you’re interested in
              </ListGroup.Item>
              <ListGroup.Item>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="1x"
                  className="mr2"
                />{" "}
                Check out our{" "}
                <a
                  href="https://solace.com/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>{" "}
                for company and product updates
              </ListGroup.Item>
              <ListGroup.Item>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="1x"
                  className="mr2"
                />{" "}
                In need of{" "}
                <a
                  href="https://solace.com/support/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support
                </a>{" "}
                help?
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  </Layout>
)

export default NotFoundPage
