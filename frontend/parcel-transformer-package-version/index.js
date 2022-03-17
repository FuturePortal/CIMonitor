const plugin = require('@parcel/plugin');
const path = require('path');

module.exports = new plugin.Transformer({
    async transform({ asset, config, options }) {
        let source = await asset.getCode();

        const package = require(path.resolve('./package.json'));

        asset.setCode(source.replace('PACKAGE_VERSION', package.version));

        return [asset];
    },
});
