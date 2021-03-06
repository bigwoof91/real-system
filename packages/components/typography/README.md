<h1 align="center">@real-system/typography</h1>
<p align="center">Real System's Typography components.</p>
<p align="center">
<a href="https://www.npmjs.com/package/@real-system/typography"><img src="https://badgen.net/npm/v/@real-system/typography?label=&icon=npm&color=blue" alt="npm version" height="18"/></a>
</p>

## Installation

```bash
# install peer dependencies

# npm
$ npm install @real-system/styled-library @real-system/elements-primitive @real-system/utils-library react react-dom
# yarn
$ yarn add @real-system/styled-library @real-system/elements-primitive @real-system/utils-library react react-dom

# install typography

# npm
$ npm install @real-system/typography
# yarn
$ yarn add @real-system/typography
```

### Code Example

```jsx
import { ThemeProvider } from '@real-system/styled-library';
import { Typography } from '@real-system/typography';

/** can also import Heading separately like this
 * import { Heading } from '@real-system/typography';
 */
const MyComponent = () => {
  return (
    <ThemeProvider>
      <Text.Heading as="h1">Heading 1</Typography>
      <Typography>Body text...</Typography>
    </ThemeProvider>
  )
}

```
