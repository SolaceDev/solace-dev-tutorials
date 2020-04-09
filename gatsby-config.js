module.exports = {
  siteMetadata: {
    title: `Solace Samples`,
    siteUrl: "http://localhost:8000", // TODO change to prod URL
    description: `These tutorials get you up to speed sending and receiving messages with Solace technology.`,
    author: `@solacedotcom`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-KDMNNWW",

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/samples/`,
      },
    },
    `gatsby-transformer-yaml`, // Transformer Plugin - Convert YAML --> Nodes
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // This configuration assumes images are all stored in the "images" directory
    // in your project root. Configure gatsby-source-filesystem multiple times if
    // you have images in many places.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            variants: [`300`, `400`, `600`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`, // Transformer Plugin - Convert Markdown --> HTML
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`, // Pulls in images within Markdown
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `custom-class`,
              maintainCase: true,
              removeAccents: true,
              isIconAfterHeader: true,
            },
          },
          {
            resolve: "gatsby-remark-embed-markdown",
            options: {
              // Example code links are relative to this dir.
              // eg examples/path/to/file.js
              directory: `${__dirname}/src/pages/samples/common-assets`,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
          },
        ],
      },
    }, // end of gatsby-transformer-remark
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        // useAutoGen: required 'true' to use autogen
        useAutoGen: true,
        // autoGenHomeLabel: optional 'Home' is default
        autoGenHomeLabel: `Solace Samples`,
        // exlude: optional, include to overwrite these default excluded pages
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
        ],
        // crumbLabelUpdates: optional, update specific crumbLabels in the path
        // unfortunately we have to update the crumb labels manually whenever we add a new sample
        crumbLabelUpdates: [
          {
            pathname: "/solace-samples-spring",
            crumbLabel: "Spring",
          },
          {
            pathname: "/solace-samples-rest-messaging",
            crumbLabel: "REST",
          },
          {
            pathname: "/solace-samples-semp",
            crumbLabel: "SEMP",
          },
          {
            pathname: "/solace-samples-nodejs",
            crumbLabel: "Node.js",
          },
          {
            pathname: "/solace-samples-openmama",
            crumbLabel: "OpenMAMA",
          },
          {
            pathname: "/solace-samples-javascript",
            crumbLabel: "JavaScript",
          },
          {
            pathname: "/solace-samples-jms",
            crumbLabel: "JMS",
          },
          {
            pathname: "/solace-samples-mqtt",
            crumbLabel: "MQTT",
          },
          {
            pathname: "/solace-samples-javarto",
            crumbLabel: "JavaRTO",
          },
          {
            pathname: "/solace-samples-dotnet",
            crumbLabel: "C#/.NET",
          },
          {
            pathname: "/solace-samples-java",
            crumbLabel: "Java",
          },
          {
            pathname: "/solace-samples-cloudfoundry-java",
            crumbLabel: "CloudFoundry Java",
          },
          {
            pathname: "/solace-samples-c",
            crumbLabel: "C",
          },
          {
            pathname: "/solace-samples-amqp-qpid-jms1",
            crumbLabel: "Apache Qpid JMS 1.1 AMQP",
          },
          {
            pathname: "/solace-samples-amqp-nodejs",
            crumbLabel: "AMQP Node.js",
          },
          {
            pathname: "/solace-samples-amqp-qpid-jms2",
            crumbLabel: "Apache Qpid JMS 2.0 AMQP",
          },
        ],
        // optional: switch to className styling (styling is under breadcrumb.css)
        useClassNames: true,
      },
    },
  ],
}
