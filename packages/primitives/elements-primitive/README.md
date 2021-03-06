<h1 align="center">@real-system/elements-primitive</h1>
<p align="center">Element primitives with built-in style props for real system.</p>
<p align="center">
<a href="https://www.npmjs.com/package/@real-system/elements-primitive"><img src="https://badgen.net/npm/v/@real-system/elements-primitive?label=&icon=npm&color=blue" alt="npm version" height="18"/></a>
</p>

## Installation

```bash
# install peer dependencies

# npm
$ npm install react react-dom @real-system/styled-library
# yarn
$ yarn add react react-dom @real-system/styled-library

# install elements-primitive

# npm
$ npm install @real-system/elements-primitive
# yarn
$ yarn add @real-system/elements-primitive
```

### Code Example

```typescript
import { real, RealElementPrimitiveProps } from '@real-system/elements-primitive';

const H1 = ({ children, ...restProps }: RealElementPrimitiveProps) => {
  return (
    <real.h1
      fontSize={4}
      fontWeight={3}
      lineHeight={4}
      margin={0}
      {...restProps}>
      {children}
    </real.h1>
  )
}

```
