# Word Counter

A small web application that calculates statistics based on the content inputted by the user. These include sentences, words, characters, and word density.

### Motivation

While I'm writing articles, I find it useful to see geeky statistics (particularly the word count) on the content I've created. Although this doesn't directly map to the quality of my articles, it does give me an indication of whether or not I should expand more (given a complex concept) or to reduce the amount waffling.

Word density helps me identify frequently used words that could make the article seem boring. This should be a little more intelligent than naively showing any word since common words (*it*, *the*, *that*, etc) would pollute the top potion of the list.

### Screenshots

![Main Screenshot](https://raw.githubusercontent.com/lewie9021/word-counter/master/img/screenshots/main.png)

![Blacklist Screenshot](https://raw.githubusercontent.com/lewie9021/word-counter/master/img/screenshots/blacklist.png)

### Component Hierarchy

![Component Hierarchy Diagram](https://raw.githubusercontent.com/lewie9021/word-counter/master/img/component-hierarchy.png)

### Dependency Graph (Modules Tree)

- {project dependency graph}

### Technology Stack

**Languages**

- [Babel](https://www.npmjs.com/package/babel) (ES6 + JSX)
- [Sass](https://www.npmjs.com/package/node-sass)

**Libraries**

- [Webpack](https://www.npmjs.com/package/webpack) (and [Configurator](https://www.npmjs.com/package/webpack-configurator))
- [React](https://www.npmjs.com/package/react)
- [Bootstrap](https://www.npmjs.com/package/react-bootstrap) 
- [Commander](https://www.npmjs.com/package/commander)

**Testing**

- [Karma](https://www.npmjs.com/package/karma)
- [Rewire](https://www.npmjs.com/package/babel-plugin-rewire)
- [Mocha](https://www.npmjs.com/package/mocha)
- [Sinon + Chai](https://www.npmjs.com/package/sinon-chai)

### Future Improvements

- Textbox resizes when content overflows.
- Render a word cloud to better visualise word density.
