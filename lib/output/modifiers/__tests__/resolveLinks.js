var path = require('path');
var cheerio = require('cheerio');
var resolveLinks = require('../resolveLinks');
var resolveFileToURL = require('../../helper/resolveFileToURL');
var Promise = require('../../../utils/promise');

describe('resolveLinks', function() {
    function resolveFileBasic(href) {
        return href;
    }

    function resolveFileCustom(href) {
        if (path.extname(href) == '.md') {
            return href.slice(0, -3) + '.html';
        }

        return href;
    }

    describe('Absolute path', function() {
        var TEST = '<p>This is a <a href="/test/cool.md"></a></p>';

        it('should resolve path starting by "/" in root directory', function() {
            var $ = cheerio.load(TEST);

            return resolveLinks('does-not-matter.md', resolveFileBasic, $)
            .then(function() {
                var link = $('a');
                expect(link.attr('href')).toBe('/test/cool.md');
            });
        });

        it('should resolve path starting by "/" in child directory', function() {
            var $ = cheerio.load(TEST);

            return resolveLinks('does/not-matter-for-absolute-links.md', resolveFileBasic, $)
            .then(function() {
                var link = $('a');
                expect(link.attr('href')).toBe('/test/cool.md');
            });
        });
    });

    describe('Anchor', function() {
        it('should prevent anchors in resolution', function() {
            var TEST = '<p>This is a <a href="test/cool.md#an-anchor"></a></p>';
            var $ = cheerio.load(TEST);

            return resolveLinks('hello.md', resolveFileCustom, $)
            .then(function() {
                var link = $('a');
                expect(link.attr('href')).toBe('test/cool.html#an-anchor');
            });
        });

        it('should ignore pure anchor links', function() {
            var TEST = '<p>This is a <a href="#an-anchor"></a></p>';
            var $ = cheerio.load(TEST);

            return resolveLinks('hello.md', resolveFileCustom, $)
            .then(function() {
                var link = $('a');
                expect(link.attr('href')).toBe('#an-anchor');
            });
        });
    });

    describe('Custom Resolver', function() {
        var TEST = '<p>This is a <a href="test/cool.md"></a> <a href="afile.png"></a></p>';

        it('should resolve path correctly for relative path', function() {
            var $ = cheerio.load(TEST);

            return resolveLinks('hello.md', resolveFileCustom, $)
            .then(function() {
                var link = $('a').first();
                expect(link.attr('href')).toBe('test/cool.html');
            });
        });

        it('should resolve path correctly for relative path (2)', function() {
            var TEST = '<p>This is a <a href="../test/cool.md"></a> <a href="afile.png"></a></p>';
            var $ = cheerio.load(TEST);

            return resolveLinks('a/fodler/hello.md', resolveFileCustom, $)
            .then(function() {
                var link = $('a').first();
                expect(link.attr('href')).toBe('../test/cool.html');
            });
        });
    });

    describe('External link', function() {
        var TEST = '<p>This is a <a href="http://www.github.com">external link</a></p>';

        it('should have target="_blank" attribute', function() {
            var $ = cheerio.load(TEST);

            return resolveLinks('hello.md', resolveFileBasic, $)
            .then(function() {
                var link = $('a');
                expect(link.attr('target')).toBe('_blank');
            });
        });
    });

    describe('Different link pattern with real resolve implementation', function() {

        function resolveFile(href) {
            return resolveFileToURL({
                getPage: function(href) {
                    if (href.indexOf('README.md') !== -1) {
                        return true;
                    }
                },
                getOptions: function() {
                    return {
                        get: function() {
                            return true;
                        }
                    };
                },
                getBook: function() {
                    return {
                        getReadme: function() {
                            return {
                                getFile: function() {
                                    return {
                                        exists: function() {
                                            return true;
                                        },
                                        getPath: function(filepath)  {
                                            return href;
                                        }
                                    };
                                }
                            };
                        }
                    };
                }
            }, href);
        }

        it('should handle leading and trailing slash', function() {
            var cases = [
                ['/foo/bax', '/foo/bax'],
                ['/foo/qax/', '/foo/qax/'],
                ['/foo/bar.html', '/foo/bar.html'],
                ['../out/of/scope', '../out/of/scope'],
                ['../out/of/scope/', '../out/of/scope/'],
                ['../out/of/scope.html', '../out/of/scope.html'],
                ['syntax', 'syntax'],
                ['syntax/', 'syntax/'],
                ['plugins', 'plugins'],
                ['plugins/', 'plugins/'],
                ['plugins/README.md', 'plugins/']
            ];
            var promises = cases.map(function(item) {
                var input = item[0];
                var expectedOutput = item[1];

                var markup = '<p><a id="test-link" href="' + input + '">link</a></p>';
                var $ = cheerio.load(markup);
                return resolveLinks('README.md', resolveFile, $).then(function() {
                    var link = $('#test-link');
                    expect(link.attr('href')).toBe(expectedOutput);
                });
            });
            return Promise.all(promises);
        });
    });
});
