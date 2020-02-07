import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Intro from "../components/Intro"

const SamplesIndex = ({ data }) => {
  const samples = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Intro />
      {samples.map(({ node }) => (
        <div key={node.id} className="col-4">
          <div className="card">
            <a href={node.fields.slug}>
              <div className="card-header">
                <img src="" alt=" " />
                <h3 className="card-title">{node.frontmatter.title}</h3>
              </div>
              <div className="card-body">
                <div className="tutorial-description">
                  {node.frontmatter.summary}
                </div>
              </div>
              <div className="card-footer">Start tutorial</div>
            </a>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default SamplesIndex

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            summary
            icon
          }
          fields {
            slug
          }
          id
        }
      }
    }
  }
`
