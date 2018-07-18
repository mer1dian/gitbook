GitBook
=======

This is a fork of latest opensource GitBook.
Bugfix is added into this fork, since origin repo wasn't maintained and not accept PR any more.

## Install

Original gitbook uses `gitbook-cli` to install and manage versions. But `gitbook-cli` only works with official gitbook release. This fork is published in another scope so it's unable to be managed by `gitbook-cli`. It needs to be explicitly installed inside a book.

Before you start, make sure [Node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com) is on your system.

Put a file `package.json` into the book folder (an existing book or where you're going to create a book):

```json
{
  "scripts": {
    "postinstall": "gitbook install"
  },
  "dependencies": {
    "@aleung/gitbook": "^3.2.4"
  }
}
```

Run `yarn install` to install this gitbook fork into book folder.

After that, you could run any gitbook CLI command inside book folder, with `yarn` in front of the command. For example:

```sh
$ yarn gitbook help
$ yarn gitbook build
$ yarn gitbook serve --port 8080
```



# Original README

GitBook is a command line tool (and Node.js library) for building beautiful books using GitHub/Git and Markdown (or AsciiDoc). Here is an example: [Learn Javascript](https://legacy.gitbook.com/book/GitBookIO/javascript).

You can publish and host books easily online using [gitbook.com](https://legacy.gitbook.com). A desktop editor is [also available](https://legacy.gitbook.com/editor).

Check out the [GitBook Community Slack Channel](https://slack.gitbook.com), Stay updated by following [@GitBookIO](https://twitter.com/GitBookIO) on Twitter or [GitBook](https://www.facebook.com/gitbookcom) on Facebook.

Complete documentation is available at [toolchain.gitbook.com](http://toolchain.gitbook.com/).

![Image](https://raw.github.com/GitbookIO/gitbook/master/preview.png)

## Getting started

GitBook can be used either on your computer for building local books or on legacy.gitbook.com for hosting them. To get started, check out [the installation instructions in the documentation](docs/setup.md).

## Usage examples

GitBook can be used to create book, public documentation, enterprise manual, thesis, research papers, etc.

You can find a [list of real-world examples](docs/examples.md) in the documentation.

## Help and Support

We're always happy to help out with your books or any other questions you might have. You can ask a question on the following contact form at [gitbook.com/contact](https://legacy.gitbook.com/contact) or signal an issue on [GitHub](https://github.com/GitbookIO/gitbook).

## Features

* Write using [Markdown](http://toolchain.gitbook.com/syntax/markdown.html) or [AsciiDoc](http://toolchain.gitbook.com/syntax/asciidoc.html)
* Output as a website or [ebook (pdf, epub, mobi)](http://toolchain.gitbook.com/ebook.html)
* [Multi-Languages](http://toolchain.gitbook.com/languages.html)
* [Lexicon / Glossary](http://toolchain.gitbook.com/lexicon.html)
* [Cover](http://toolchain.gitbook.com/ebook.html)
* [Variables and Templating](http://toolchain.gitbook.com/templating/)
* [Content References](http://toolchain.gitbook.com/templating/conrefs.html)
* [Plugins](http://toolchain.gitbook.com/plugins/)
* [Beautiful default theme](https://github.com/GitbookIO/theme-default)

## Publish your book

The platform [legacy.gitbook.com](https://legacy.gitbook.com/) is like an "Heroku for books": you can create a book on it (public, or private) and update it using **git push**.

## Licensing

GitBook is licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for the full license text.
