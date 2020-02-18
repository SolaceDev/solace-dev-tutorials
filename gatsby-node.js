const path = require(`path`)
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
    })

    createNodeField({
      node,
      value: slug,
      name: "slug",
    })

    createNodeField({
      node,
      value: slug.split("/")[1],
      name: "slugRoot",
    })
  }

  if (node.internal.type === "TutorialsYaml") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
    })

    createNodeField({
      node,
      value: slug,
      name: "slug",
    })

    createNodeField({
      node,
      value: slug.split("/")[1],
      name: "slugRoot",
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Create pages for each sample's tutorial
  const resultTutorial = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/^(?!.*assets).*$/" } }
      ) {
        edges {
          node {
            fields {
              slug
              slugRoot
            }
          }
        }
      }
    }
  `)
  resultTutorial.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/tutorial-template.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        slugRoot: node.fields.slugRoot,
      },
    })
  })

  // Create a 'samples' page for each supported language
  // Each one of those samples pages will have child tutorials
  const resultSamples = await graphql(`
    {
      allTutorialsYaml {
        edges {
          node {
            fields {
              slug
              slugRoot
            }
          }
        }
      }
    }
  `)
  resultSamples.data.allTutorialsYaml.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/samples-template.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        slugRoot: node.fields.slugRoot,
      },
    })
  })
}
