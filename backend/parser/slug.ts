const Slugify = (text: unknown): string =>
    // Make sure text is a string
    String(text)
        // Replace accented characters for regular ones
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

        // Lowercase the string
        .toLowerCase()

        // Replace anything that is not an alphanumeric character
        .replace(/[^0-9a-z]/g, '-')

        // Remove double dashes
        .replace(/--+/g, '-');

export default Slugify;
