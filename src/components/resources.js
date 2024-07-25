import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Resources = (props) => {
  return (
    <section id="resources" className="pa4">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <h2>Resources</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://www.solace.dev/">
              <div className="custom-card">
                <div className="title">Developer Hub</div>
                <div className="desc">
                  One-stop shop for all things Solace Developers!
                </div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://solace.community/">
              <div className="custom-card">
                <div className="title">Developer Community</div>
                <div className="desc">Technical community for PubSub+.</div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://solace.com/engage-developer-advocate/">
              <div className="custom-card">
                <div className="title">Engage with an Advocate</div>
                <div className="desc">
                  Chat with a developer advocate on your schedule! We want to
                  meet you and hear about your Solace experience.
                </div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://github.com/SolaceSamples">
              <div className="custom-card">
                <div className="title">GitHub Samples</div>
                <div className="desc">
                  Check out our Solace samples for Spring, JMS, MQTT, AMQP,
                  JavaScript, and more.
                </div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://docs.solace.com/PubSub-ConceptMaps/Component-Maps.htm">
              <div className="custom-card">
                <div className="title">Best Practice Articles</div>
                <div className="desc">
                  Articles that provide guidance, examples, or recommendations
                  for how best to use Solace products.
                </div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://codelabs.solace.dev/">
              <div className="custom-card">
                <div className="title">Codelabs &amp; Workshops</div>
                <div className="desc">
                  Get guided, hands on coding experience with PubSub+ Codelabs.
                </div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://solace.com/cloud-learning/">
              <div className="custom-card">
                <div className="title">Cloud Learning Center</div>
                <div className="desc">
                  Get up to speed on our managed messaging service.
                </div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://www.udemy.com/user/leah-robert/">
              <div className="custom-card">
                <div className="title">Free Courses</div>
                <div className="desc">
                  Learn the fundamentals of PubSub+ at your own pace.
                </div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://solace.com/integration-hub/">
              <div className="custom-card">
                <div className="title">Integration Hub</div>
                <div className="desc">
                  Your one-stop shop for enabling event-driven integration.
                </div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://docs.solace.com/SDKPerf/SDKPerf.htm">
              <div className="custom-card">
                <div className="title">SDKPerf</div>
                <div className="desc">
                  {" "}
                  SDKPerf is a command line tool for validating performance,
                  checking configuration, and exploring features associated with
                  your PubSub+ message broker.
                </div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className="mt4 mb3">
            <a href="https://solace.com/blog/jmstoolbox-and-solace/">
              <div className="custom-card">
                <div className="title">Queue Browser</div>
                <div className="desc">
                  Get all the information you need to use JMS ToolBox with
                  PubSub+.
                </div>
                <div className="link">Learn More</div>
              </div>
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Resources
