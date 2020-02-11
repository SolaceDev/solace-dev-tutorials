import React from "react"
import { Container } from "react-bootstrap"

const Footer = () => (
  <footer>
    <Container>© {new Date().getFullYear()} Solace</Container>
  </footer>
)

export default Footer
