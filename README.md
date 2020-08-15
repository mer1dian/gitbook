> ## ⚠️ Deprecation warning:
> As the efforts of the GitBook team are focused on the [GitBook.com](https://www.gitbook.com) platform, the CLI is no longer under active development.  
> All content supported by the CLI are mostly supported by our [GitBook.com / GitHub integration](https://docs.gitbook.com/integrations/github).  
> Content hosted on the [legacy.gitbook.com](https://legacy.gitbook.com) will continue working until further notice. For differences with the new vesion, check out our [documentation](https://docs.gitbook.com/v2-changes/important-differences).


GitBook
=======

This is a fork of [GitBook](https://github.com/GitbookIO/gitbook).

You can compare all changes between [this fork and the original version](https://github.com/GitbookIO/gitbook/compare/master...timaschew:do-not-rewrite-urls)

The changes are:

- allow to run this npm module as a CLI (without installing `gitbook-cli`)
- fix trailing slash for directories
- provide package-lock.json
- fix critical vulnerabilities
- allow to use gitbook plugins which uses npm namespaces/scopes
  - by using `--scope your-namesapce` option for the `build` subcommand
- **BREAKING CHANGE:** don't rewrite URLs starting with `/` or `..`

Some examples:

| link (md)         | output (HTML)   | target needs to exist in the gitbook  |
| -------------     | -------------   | ------ |
| /foo/bar          | /foo/bar        | no     |
| /foo/bar/         | /foo/bar/       | no     |
| /foo/bar.html     | /foo/bar.html   | no     |
| ../foo            | ../foo          | no     |
| ../foo/           | ../foo/         | no     |
| ../foo/bar.html   | ../foo/bar.html | no     |
| plugins           | plugins         | no     |
| plugins/          | plugins/        | no     |
| plugins/README.md | plugins/        | yes    |

See [the tests for more details](https://github.com/timaschew/gitbook/blob/b9664ceeeca6f841a8f11fda122ca2802b93ee4f/lib/output/modifiers/__tests__/resolveLinks.js#L145-L156)

## Motivation

The original project is not maintained anymore. Even no security fixes are merged.  
The main reason for this fork is the handling of links. If you use GitBook to build pages distributed
accross multiple teams and repositories but still want to host all of them
under one domain you cannot use crosslinks because the original version of GitBooks rewrites 
URLs which are starting with `/` or pointing to directories outside of the **book.json** via `../`.

## Install

Original gitbook uses `gitbook-cli` to install and manage versions. But `gitbook-cli` only works with official gitbook release. This fork is published in another scope (timaschew/gitbook) so it's unable to be managed by `gitbook-cli`. It needs to be explicitly installed inside a book.

Before you start, make sure [Node.js](https://nodejs.org/) and npm is on your system.

You can either install the module globally or locally in an existing project with an package.json file.
```sh
npm install gitbk -g
```

If you don't use global installation, use `./node_modules/.bin/gitbk` or `npx gitbk` to invoke the CLI

```sh
mkdir my-new-book
cd my-new-book
gitbk init
gitbk build
```

---

# Original README

GitBook is a command line tool (and Node.js library) for building beautiful books using GitHub/Git and Markdown (or AsciiDoc). Here is an example: [Learn Javascript](https://legacy.gitbook.com/book/GitBookIO/javascript).

You can publish and host books easily online using [gitbook.com](https://legacy.gitbook.com). A desktop editor is [also available](https://legacy.gitbook.com/editor).

Stay updated by following [@GitBookIO](https://twitter.com/GitBookIO) on Twitter or [GitBook](https://www.facebook.com/gitbookcom) on Facebook.

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
