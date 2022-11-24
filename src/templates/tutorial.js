import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import RelatedTopics from "../components/relatedTopics"
import OnThisPage from "../components/otp"
import { Container, Row, Col } from "react-bootstrap"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import SEO from "../components/seo"

const Tutorial = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
  const solaceDevCrumb = {
    pathname: "https://solace.dev/",
    crumbLabel: "Developer Hub",
  }
  // Clone the crumbs object
  const crumbs_clone = crumbs.slice()
  crumbs_clone.unshift(solaceDevCrumb)

  const node = data.tutorialBody.edges[0].node
  const headings = node.headings.filter((heading) => heading.depth === 2)
  const headersWithNullIds = headings.filter((elm) => elm.id === null)

  // This is to sure there are IDs for every h2 to be used in hrefs of On This Page
  let modified_html = node.html
  headersWithNullIds.map((heading) => {
    modified_html = modified_html.replace(
      `<h2>${heading.value}</h2>`,
      `<h2 id="${heading.value.split(" ").join("-")}">${heading.value}</h2>`
    )
  })
  const tutorials = data.onThisPage.edges.filter(
    (edge) =>
      edge.node.frontmatter.layout === "tutorials" &&
      edge.node.frontmatter.visible !== false
  )
  const features = data.onThisPage.edges.filter(
    (edge) =>
      edge.node.frontmatter.layout === "features" &&
      edge.node.frontmatter.visible !== false
  )
  const feedback = node.frontmatter.links.filter(
    (link) => link.label === "feedback"
  )
  const feedback_link = feedback[0].link || ""
  const section_title = data.allTutorialsYaml.edges[0].node.section1
  const page_title = node.frontmatter.title
  const slug = node.fields.slug
  const slugRoot = node.fields.slugRoot

  return (
    <Layout hideResources="true">
      <SEO title={node.frontmatter.title} />
      <section id="breadcrumbs">
        <Container>
          <Breadcrumb
            crumbs={crumbs_clone}
            crumbLabel={node.frontmatter.title}
            crumbSeparator=" 👉 "
          />
        </Container>
      </section>
      <section id="tutorial-content">
        <Container className="mt4 pb4">
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={3}
              xl={3}
              className="d-none d-lg-block"
            >
              <RelatedTopics
                features={features}
                tutorials={tutorials}
                pageContext={pageContext}
                feedback_link={feedback_link}
                section_title={section_title}
                page_title={page_title}
                slug={slug}
                slugRoot={slugRoot}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              <h1>{node.frontmatter.title}</h1>
              <h5 id="minutes" className="mb3 pt2">
                {node.timeToRead} Minute Read
              </h5>
              <div dangerouslySetInnerHTML={{ __html: modified_html }} />
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={3}
              xl={3}
              className="d-none d-lg-block"
            >
              <OnThisPage
                features={features}
                headings={headings}
                pageContext={pageContext}
                feedback_link={feedback_link}
                section_title={section_title}
                page_title={page_title}
                slug={slug}
                slugRoot={slugRoot}
              ></OnThisPage>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query myTutorialQuery($slug: String, $slugRoot: String) {
    tutorialBody: allMarkdownRemark(
      filter: { fields: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          html
          timeToRead
          headings {
            value
            depth
            id
          }
          fields {
            slug
            slugRoot
          }
          frontmatter {
            title
            summary
            layout
            visible
            links {
              label
              link
            }
          }
        }
      }
    }
    allTutorialsYaml(filter: { fields: { slugRoot: { eq: $slugRoot } } }) {
      edges {
        node {
          section1
        }
      }
    }
    onThisPage: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/^(?!.*assets).*$/" }
        fields: { slugRoot: { eq: $slugRoot } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            layout
          }
          fields {
            slug
            slugRoot
          }
          id
          fileAbsolutePath
        }
      }
    }
  }
`

export default Tutorial
