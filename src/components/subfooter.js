import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"

const SubFooter = (props) => {
  return (
    <section id="subfooter" className="pa5">
      <Container>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={{ span: 8, offset: 2 }}
            xl={{ span: 8, offset: 2 }}
          >
            <h2>Resources</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://docs.solace.com/Developer-Tutorials/Developer-Tutorials.htm">
                <Card.Body>
                  <Card.Title className="pa3 fw4">Tutorials</Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    Get up-to-speed in sending and receiving messages over open
                    APIs and protocols, Solace Messaging APIs, and Pivotal
                    Platform.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://docs.solace.com/PubSub-ConceptMaps/Event-Stream-Maps.htm">
                <Card.Body>
                  <Card.Title className="pa3 fw4">
                    Event Stream Concept Maps
                  </Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    A high level introduction to how PubSub+ processes events.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://solace.community/">
                <Card.Body>
                  <Card.Title className="pa3 fw4">
                    Developer Community
                  </Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    Technical community for PubSub+.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://docs.solace.com/PubSub-ConceptMaps/Component-Maps.htm">
                <Card.Body>
                  <Card.Title className="pa3 fw4">
                    Component Concept Maps
                  </Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    A high level introduction on how your app interacts with
                    PubSub+ messaging components whether you're using SMF, JMS,
                    MQTT, or Rest.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://codelabs.solace.dev/">
                <Card.Body>
                  <Card.Title className="pa3 fw4">
                    Codelabs & Workshops
                  </Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    Get guided, hands on coding experience with PubSub+
                    Codelabs.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://docs.solace.com/Developer-Tools/QuickStarts-Connectors/Quickstarts-Connectors.htm">
                <Card.Body>
                  <Card.Title className="pa3 fw4">Quick Starts</Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    Access Quick Start deployment tempaltes and Connectors
                    available as open source projects on GitHub.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://solace.com/cloud-learning/">
                <Card.Body>
                  <Card.Title className="pa3 fw4">
                    Cloud Learning Center
                  </Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    Get up to speed on our managed messaging service.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://www.udemy.com/user/leah-robert/">
                <Card.Body>
                  <Card.Title className="pa3 fw4">Free Courses</Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    Learning the fundamentals of PubSub+ at your own pace.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://docs.solace.com/Developer-Tools/Integration-Guides/Integration-Guides.htm">
                <Card.Body>
                  <Card.Title className="pa3 fw4">
                    Integration Guides
                  </Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    Get a jump start on plugging PubSub+ into AWS, Kafka, Spark,
                    IBM Websphere, and much more.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://docs.solace.com/SDKPerf/SDKPerf.htm">
                <Card.Body>
                  <Card.Title className="pa3 fw4">SDKPerf</Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    SDK is a command line tool for validating performance,
                    checking configuration, and exploring features associated
                    with your PubSub+ message broker.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <Card className="mt2 mb3">
              <a href="https://solace.com/blog/jmstoolbox-and-solace/">
                <Card.Body>
                  <Card.Title className="pa3 fw4">Queue Browser</Card.Title>
                  <Card.Text className="pl3 pr3 fw1">
                    Get all the information you need to use JMS Toolbox with
                    PubSub+.
                  </Card.Text>
                </Card.Body>
              </a>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SubFooter
