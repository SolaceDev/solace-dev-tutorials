import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Intro from "../components/Intro"
import { Container, Row, Col, Card } from "react-bootstrap"


// GHAITH TODO

const tutorialTemplate = ({ data }) => {
  // const samples = data.allMarkdownRemark.edges

  return (
    <Layout>
      this is my tutorial content
    </Layout>
  )
}

// // query to get all markdowns that are not assets
// export const query = graphql`
//   {
//     allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/^(?!.*assets).*$/"}}) {
//       edges {
//         node {
//           frontmatter {
//             title
//             summary
//             icon
//           }
//           fields {
//             slug
//           }
//           id
//           fileAbsolutePath
//         }
//       }
//     }
//   }
// `

export default tutorialTemplate
