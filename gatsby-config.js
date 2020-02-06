module.exports = {
  siteMetadata: {
    title: `Solace Samples`,
    description: `These tutorials get you up to speed sending and receiving messages with Solace technology.`,
    author: `@solacedotcom`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`, // Source Plugin -
      options: {
        path: `${__dirname}/src/pages/samples/`,
        name: `samples`,
      },
    },
    // TODO - ADD GOOGLE TAG MANAGER (https://www.gatsbyjs.org/packages/gatsby-plugin-google-tagmanager/)
    `gatsby-transformer-remark`, // Transformer Plugin - Convert Markdown --> HTML
    `gatsby-transformer-yaml`, // Transformer Plugin - Convert YAML --> Nodes
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/samples/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
