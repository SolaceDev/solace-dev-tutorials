# Solace Tutorials

This repo will manage the Solace Tutorials, which helps developers get up to speed sending and receiving messages with Solace technology.

[![Netlify Status](https://api.netlify.com/api/v1/badges/c87209db-e4d8-4b44-847a-d19294b01869/deploy-status)](https://app.netlify.com/sites/solace-dev-tutorials/deploys)
![Broken Links Checker](https://github.com/SolaceDev/solace-dev-tutorials/workflows/Broken%20Links%20Checker/badge.svg?branch=master&event=push)


## Quick Start
1. Clone repo
1. Instal dependencies `npm i`
1. Run server `npm run develop`

## Naming Conventions For Solace Samples

### Tutorials 
- Found on github.com/SolaceDev/solace-dev-tutorials
- Text based step by step tutorial on how to use the API/Protocol with references to Sample Code
- Categories: 
  1. Key MEP    
  2. API Features     
  Note: To be revised 

### Sample code
- Found on github.com/SolaceSamples/solace-samples-{API-name}

### Snippets in tutorial
- Code snippets referenced in tutorials

## Development
### Referring to code snippets lines from github

1. Define the git repo in the `gatsby-config.js` file as follows 
```
{
  resolve: `gatsby-source-git`,
  options: {
    name: `{Lang}-Samples`,
    remote: `{git_repo_url},
    commit: '{commit_number}'
  }
}
```

2. In your tutorial markdown file (under `src/pages/tutorials/{api}/{tutorial}.md), refer to your code snippet as follows
```
`embed:{Lang}-Samples/{path/to/file}#L{start_line}-{end_line}`
```
For example `embed:JCSMP-Samples/src/main/java/com/solace/samples/jcsmp/patterns/DirectProcessor.java#L131-153`