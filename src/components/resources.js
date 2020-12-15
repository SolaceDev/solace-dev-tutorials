import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Resources = (props) => {
  return (
    <section id="resources" className="pa4">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <h2>Resources</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://docs.solace.com/Developer-Tutorials/Developer-Tutorials.htm">
              <div className="custom-card">
                <div className="title">Tutorials</div>
                <div className="desc">
                  Get up-to-speed in sending and receiving messages over open
                  APIs and protocols, Solace Messaging APIs, and Pivotal
                  Platform.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://docs.solace.com/PubSub-ConceptMaps/Event-Stream-Maps.htm">
              <div className="custom-card">
                <div className="title">Event Stream Concept Maps</div>
                <div className="desc">
                  A high level introduction to how PubSub+ processes events.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://solace.community/">
              <div className="custom-card">
                <div className="title">Developer Community</div>
                <div className="desc">Technical community for PubSub+.</div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://github.com/SolaceSamples">
              <div className="custom-card">
                <div className="title">GitHub Samples</div>
                <div className="desc">
                  Check out our Solace samples for Spring, JMS, MQTT, AMQP,
                  JavaScript, and more.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://docs.solace.com/PubSub-ConceptMaps/Component-Maps.htm">
              <div className="custom-card">
                <div className="title">Component Concept Maps</div>
                <div className="desc">
                  A high level introduction on how your app interacts with
                  PubSub+ messaging components whether you're using SMF, JMS,
                  MQTT, or REST.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://codelabs.solace.dev/">
              <div className="custom-card">
                <div className="title">Codelabs & Workshops</div>
                <div className="desc">
                  Get guided, hands on coding experience with PubSub+ Codelabs.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://docs.solace.com/Developer-Tools/QuickStarts-Connectors/Quickstarts-Connectors.htm">
              <div className="custom-card">
                <div className="title">Quick Starts</div>
                <div className="desc">
                  Access Quick Start deployment templates and Connectors
                  available as open source projects on GitHub.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://solace.com/cloud-learning/">
              <div className="custom-card">
                <div className="title">Cloud Learning Center</div>
                <div className="desc">
                  Get up to speed on our managed messaging service.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://www.udemy.com/user/leah-robert/">
              <div className="custom-card">
                <div className="title">Free Courses</div>
                <div className="desc">
                  Learn the fundamentals of PubSub+ at your own pace.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://docs.solace.com/Developer-Tools/Integration-Guides/Integration-Guides.htm">
              <div className="custom-card">
                <div className="title">Integration Guides</div>
                <div className="desc">
                  Get a jump start plugging PubSub+ into AWS, Kafka, Spark, IBM
                  WebSphere, and much more.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://docs.solace.com/SDKPerf/SDKPerf.htm">
              <div className="custom-card">
                <div className="title">SDKPerf</div>
                <div className="desc">
                  {" "}
                  SDKPerf is a command line tool for validating performance,
                  checking configuration, and exploring features associated with
                  your PubSub+ message broker.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} className="mt4 mb3">
            <a href="https://solace.com/blog/jmstoolbox-and-solace/">
              <div className="custom-card">
                <div className="title">Queue Browser</div>
                <div className="desc">
                  Get all the information you need to use JMS ToolBox with
                  PubSub+.
                </div>
                <div className="link">Learn More >></div>
              </div>
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Resources
