jest.mock(`fs`, () => {
  return {
    existsSync: jest.fn(),
    readFileSync: jest.fn()
  }
});

const Remark = require(`remark`);
const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkHtml = require('remark-html');
const fs = require(`fs`);
const plugin = require('../index');
const remark = new Remark();

describe('gatsby-remark-embed-markdown', () => {

  beforeEach(() => {
    fs.existsSync.mockReset();
    fs.existsSync.mockReturnValue(true);

    fs.readFileSync.mockReset();
    fs.readFileSync.mockReturnValue(`const foo = "bar";`);
  });

  it('should embed markdown', () => {
    fs.existsSync.mockImplementation(path => path !== `examples/hello-world.md`);
    const markdownAST = remark.parse(`markdown:hello-world.md`);

    expect(() => plugin({ markdownAST })).toThrow(
      `Required option "directory" not specified`
    )
  });

  it(`should error if the specified directory does not exist`, () => {
    fs.existsSync.mockReturnValue(false);

    const markdownAST = remark.parse(`\`markdown:hello-world.js\``);

    expect(() => plugin({ markdownAST }, { directory: `invalid` })).toThrow(
      `Invalid directory specified "invalid"`
    )
  });

  it(`should error if an invalid file path is specified`, () => {
    fs.existsSync.mockImplementation(path => path !== `examples/hello-world.md`);

    const markdownAST = remark.parse(`\`markdown:hello-world.md\``);

    expect(() => plugin({ markdownAST }, { directory: `examples` })).toThrow(
      `Invalid fragment specified; no such file "examples/hello-world.md"`
    )
  });

  it(`should convert embedded link to fragment to markdown`, () => {
    fs.readFileSync.mockReturnValue('# Hello World');
    const markdownAST = remark.parse(`\`markdown:hello-world.md\``);
    const transformed = plugin({ markdownAST }, { directory: `examples` });

    // Verify correct nesting of Parent containing Root of the embedded document (with all children)
    expect(transformed.children[0].children[0].type)
      .toBe(`parent`);
    expect(transformed.children[0].children[0].children[0].type)
      .toBe(`root`);
    expect(transformed.children[0].children[0].children[0].children[0].type)
      .toBe(`heading`);
    expect(transformed.children[0].children[0].children[0].children[0].children[0].type)
      .toBe(`text`);
    expect(transformed.children[0].children[0].children[0].children[0].children[0].value)
      .toBe(`Hello World`);
  });

  it(`should render correct HTML from MarkdownAST`, () => {
    fs.readFileSync.mockReturnValue('# Hello World');
    const markdownAST = remark.parse(`\`markdown:hello-world.md\``);
    const transformed = plugin({ markdownAST }, { directory: `examples` });

    const htmlOutput = unified().use(remarkParse).use(remarkHtml).stringify(transformed);

    expect(htmlOutput)
      .toEqual(expect.stringContaining(`<h1>Hello World</h1>`));
  });

});

