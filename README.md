# Beautiful and expressive sparklines component for React

## Install

```
npm install react-sparklines-next --save
```

## TypeScript Support

This library is written in TypeScript and includes type definitions out of the box. No need to install additional `@types` packages.

```typescript
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines-next';
```

All components are fully typed with proper prop interfaces and IntelliSense support.

## Run demo

```bash
npm install
npm run demo:dev
# Visit http://localhost:5173 (or the port shown in terminal)
```


## Use

Import the Sparklines components that you need; for example to generate a simple chart:

```jsx
import React from 'react';
import { Sparklines } from 'react-sparklines-next';

function MyComponent() {
  return (
    <Sparklines data={[5, 10, 5, 20, 8, 15]} limit={5} width={100} height={20} margin={5}>
    </Sparklines>
  );
}
```

Sparklines component is a container with the following properties:

**data** - the data set used to build the sparkline. Invalid values (null, NaN, Infinity, undefined) are supported and will create gaps in the visualization.

**limit** - optional, how many data points to display at once

**width, height** - dimensions of the generated sparkline in the SVG viewbox.  This will be automatically scaled (i.e. responsive) inside the parent container by default.

**svgWidth, svgHeight** - If you want absolute dimensions instead of a responsive component set these attributes.

**[preserveAspectRatio](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio)** - default: 'none', set this to modify how the sparkline should scale

**margin** - optional, offset the chart

**min, max** - optional, bound the chart


#### Basic Sparkline

```jsx
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines-next';

function MyComponent() {
  return (
    <Sparklines data={[5, 10, 5, 20]}>
      <SparklinesLine color="blue" />
    </Sparklines>
  );
}
```

#### Bars

```jsx
import React from 'react';
import { Sparklines, SparklinesBars } from 'react-sparklines-next';

function MyComponent() {
  return (
    <Sparklines data={[5, 10, 5, 20]}>
      <SparklinesBars />
    </Sparklines>
  );
}
```

#### Spots

```jsx
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines-next';

function MyComponent() {
  const sampleData = [5, 10, 5, 20, 8, 15];
  return (
    <Sparklines data={sampleData}>
      <SparklinesLine style={{ fill: "none" }} />
      <SparklinesSpots />
    </Sparklines>
  );
}
```

#### Reference Line

```jsx
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines-next';

function MyComponent() {
  const sampleData = [5, 10, 5, 20, 8, 15];
  return (
    <Sparklines data={sampleData}>
      <SparklinesLine />
      <SparklinesReferenceLine type="mean" />
    </Sparklines>
  );
}
```

#### Normal Band

```jsx
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesNormalBand } from 'react-sparklines-next';

function MyComponent() {
  const sampleData = [5, 10, 5, 20, 8, 15];
  return (
    <Sparklines data={sampleData}>
      <SparklinesLine style={{ fill: "none" }}/>
      <SparklinesNormalBand />
    </Sparklines>
  );
}
```

#### Inverted Fill

You can invert the fill direction for line charts using the `fillInvert` style option:

```jsx
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines-next';

function MyComponent() {
  return (
    <Sparklines data={[5, 10, 5, 20, 8, 15]}>
      <SparklinesLine style={{ fillInvert: true }} color="blue" />
    </Sparklines>
  );
}
```

#### Handling Gaps in Data

Invalid values (null, NaN, Infinity, undefined) in your data will automatically create visual gaps in the sparkline:

```jsx
import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines-next';

function MyComponent() {
  // Data with gaps
  const dataWithGaps = [5, 10, null, 20, NaN, 15, 8];

  return (
    <Sparklines data={dataWithGaps}>
      <SparklinesLine color="blue" />
    </Sparklines>
  );
}
```

This works with `SparklinesLine`, `SparklinesCurve`, and `SparklinesBars` components.

#### Interactive Layer

Add interactive hover and click functionality to your sparklines:

```jsx
import React, { useState } from 'react';
import { Sparklines, SparklinesLine, SparklinesInteractiveLayer } from 'react-sparklines-next';

function MyComponent() {
  const [activePoint, setActivePoint] = useState(null);
  const data = [5, 10, 5, 20, 8, 15];

  const handleMouseMove = (dataValue, point, index, event) => {
    setActivePoint({ value: dataValue, index });
  };

  const handleMouseLeave = () => {
    setActivePoint(null);
  };

  const handleClick = (dataValue, point, index, event) => {
    console.log('Clicked point:', dataValue, 'at index:', index);
  };

  return (
    <div>
      <Sparklines data={data}>
        <SparklinesLine color="blue" />
        <SparklinesInteractiveLayer
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        />
      </Sparklines>
      {activePoint && (
        <div>Value: {activePoint.value}, Index: {activePoint.index}</div>
      )}
    </div>
  );
}
```

The interactive layer shows a red circle and dashed line at the active point position.

## Development

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

### Running Demo Locally

```bash
npm run demo:dev
# Visit http://localhost:5173 (or the port shown in terminal)
```

## Publishing

This project uses automated publishing via GitHub Actions. When a version tag (e.g., `v1.7.1`) is pushed to the main branch, the package is automatically tested and published to npm.

To release a new version:
```bash
npm version patch  # or minor, or major
git push origin main --follow-tags
```

## License

MIT
