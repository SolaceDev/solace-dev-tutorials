import React from "react"
import { Container } from "react-bootstrap"

const LightningBanner = (props) => {
  return (
    <div class="lightning_banner">
      <Container>
        <p>
          Join the 3rd Edition Solace Community Lighting Talks ⚡️ on January 15
          <a
            href="https://solace.com/event/community-lightning-talks-jan-2025/"
            target="_blank"
          >
            Learn More
          </a>
        </p>
      </Container>
    </div>
  )
}

export default LightningBanner
