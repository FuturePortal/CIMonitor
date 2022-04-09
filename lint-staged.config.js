function hasChangedFileInFolder(changedFiles, folder) {
    return !!changedFiles.find((fileName) => fileName.includes('/' + folder + '/'));
}

module.exports = {
    '*.{ts,tsx}': [
        'eslint --fix',
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
    '*.{json,css,html,js}': ['prettier --write'],
    '*.md': ['prettier --write --tab-width 2'],
};
