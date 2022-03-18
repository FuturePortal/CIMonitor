# Parcel v2 transformer: package version

If you need to use the package version of your package.json in your project, you can add this transformer to your
project. `PACKAGE_VERSION` will be replaced with the version in your `package.json`.

## Setup

In your `.pracelrc`, add the `@cimonitor/parcel-transformer-package-version` transformer for the files you want use the
package version in. In the example below we would like to use the package version in a `.tsx` file:

```pracelrc
{
    "extends": "@parcel/config-default",
    "transformers": {
        "*.{ts,tsx}": ["@cimonitor/parcel-transformer-package-version", "@parcel/transformer-typescript-tsc"],
    }
}
```

Add the `@cimonitor/parcel-transformer-package-version` package to your package.json with either yarn or npm.

Now, `PACKAGE_VERSION` will be replaced in the compiled code for the given file transformers.

## Example

`About.tsx`:

```tsx
import { ReactElement } from 'react';

const About = (): ReactElement => <h1>About PACKAGE_VERSION</h1>;

export default About;
```

`package.json`:

```json
{
    "version": "1.2.3"
}
```

Will output:

```html
About 1.2.3
```
