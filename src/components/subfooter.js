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
            md={12}
            lg={{ span: 8, offset: 2 }}
            xl={{ span: 8, offset: 2 }}
          >
            <img src={sollyAvatar} alt="Solly" width="80px" />
            <h2>Solly is here to help</h2>
            <p className="fw1 f4">
              Head over to the Solace Community for answers and discussions.
              <br />
              Or jump right in and try PubSub+ Cloud for free.
            </p>
            <Button
              className="ma4"
              href="https://solace.community/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the Community
            </Button>
            <Button
              className="ma4"
              href="https://solace.com/try-it-now/"
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
