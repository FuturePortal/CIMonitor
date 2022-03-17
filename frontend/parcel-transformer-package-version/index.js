const plugin = require('@parcel/plugin');
const path = require('path');

module.exports = new plugin.Transformer({
    // async canReuseAST() {
    //     return false;
    // },
    // async parse({ asset }) {
    //     return {
    //         type: 'my-compiler',
    //         version: '1.0.0',
    //         program: await asset.getCode(),
    //     };
    // },
    async transform({ asset }) {
        let source = await asset.getCode();

        const package = require(path.resolve(process.cwd(), 'package.json'));

        asset.setCode(source.replace('PACKAGE_VERSION', package.version));

        return [asset];
    },
    // async generate({ ast }) {
    //     return ast.program;
    // },
});
