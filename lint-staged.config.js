function hasChangedFileInFolder(changedFiles, folder) {
    return !!changedFiles.find((fileName) => fileName.includes('/' + folder + '/'));
}

module.exports = {
    '*.{js,ts,tsx}': ['eslint --fix'],
    '*.{json,css,html}': ['prettier --write'],
    '*.md': ['prettier --write --tab-width 2'],
    '*.{ts,tsx}': [
        (changedFiles) => {
            var linters = [];
            var typescriptChecks = ['frontend', 'backend'];

            var haveTypesChanged = hasChangedFileInFolder(changedFiles, 'types');

            typescriptChecks.forEach((folder) => {
                if (haveTypesChanged || hasChangedFileInFolder(changedFiles, folder)) {
                    linters.push('tsc --noEmit --project ./' + folder + '/tsconfig.json');
                }
            });

            return linters;
        },
    ],
};
