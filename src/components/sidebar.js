import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default function Sidebar() {
  return (
    <StaticQuery
      query={
        graphql`
          query sidebarQuery {
            sidebar: allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    links {
                      link
                    }
                  }
                }
              }
            }
          }
        `
      }
      render={data => (
        <div className="mt4">
          <div className="f4 fw4"> <a href = {data.sidebar.edges[0].node.frontmatter.links.filter( (link) => link.label === "feedback" )}> Improve this page</a>
          </div>
        </div>
      )}
    />
  )
}