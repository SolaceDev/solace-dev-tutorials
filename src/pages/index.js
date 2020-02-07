import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export default ({ data }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id} className="container">
        <div className="row">
          <div className="col-sm">
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
          id
        }
      }
    }
  }
`
