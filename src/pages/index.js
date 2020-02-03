import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div className="card">
              <div className="card-header">
                <img src="" alt="" />
                <h3 className="card-title">{node.frontmatter.title}</h3>
              </div>
              <div className="card-body">
                <div className="tutorial-description">
                  {node.frontmatter.summary}
                </div>
              </div>
              <div className="card-footer">
                <a href={node.fields.slug}>Start tutorial</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </Layout>
)

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
        }
      }
    }
  }
`
