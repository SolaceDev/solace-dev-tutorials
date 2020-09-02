import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import sollyAvatar from "../images/solace-community-solly-transp.png"

const SubFooter = (props) => {
  return (
    <section id="subfooter" className="pa5">
      <Container>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={{ span: 8, offset: 2 }}
            xl={{ span: 8, offset: 2 }}
          >
            <img src={sollyAvatar} alt="Solly" width="100px" />
            <h2>Have Questions?</h2>
            <p className="fw1 f4">
              If you have any issues or questions check the Solace Community for
              answers and discussions.
            </p>
            <Button
              className="ma4"
              href={props.download}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the Community
            </Button>
            <Button
              className="ma4"
              href={props.download}
              target="_blank"
              rel="noopener noreferrer"
            >
              Try PubSub+ Cloud
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SubFooter
