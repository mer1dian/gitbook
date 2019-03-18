var path = require('path');
var resolve = require('resolve');

var DEFAULT_PLUGINS = require('../constants/defaultPlugins');

/**
 * Resolve the root folder containing for node_modules
 * since gitbook can be used as a library and dependency can be flattened.
 *
 * @return {String} folderPath
 */
function locateRootFolder() {
    var firstDefaultPlugin = DEFAULT_PLUGINS.first();
    var pluginPath = resolve.sync(firstDefaultPlugin.getNpmID() + '/package.json', {
        basedir: __dirname
    });
    var relativePathToRoot = path.join('..', '..', '..');
    if (pluginPath.indexOf('/node_modules/@') != -1) {
        relativePathToRoot = path.join(relativePathToRoot, '..');
    }
    var nodeModules = path.resolve(pluginPath, relativePathToRoot);

    return nodeModules;
}

module.exports = locateRootFolder;
