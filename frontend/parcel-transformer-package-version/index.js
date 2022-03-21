const plugin = require('@parcel/plugin');
const path = require('path');

module.exports = new plugin.Transformer({
    async transform({ asset }) {
        let source = await asset.getCode();

        const packageJson = require(path.resolve(process.cwd(), 'package.json'));

        asset.setCode(source.replace(/PACKAGE_VERSION/g, packageJson.version));

        return [asset];
    },
});
