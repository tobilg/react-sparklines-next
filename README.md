# Beautiful and expressive sparklines component for React

## Install

```
npm install react-sparklines-next --save
```

## TypeScript Support

This library is written in TypeScript and includes type definitions out of the box. No need to install additional `@types` packages.

```typescript
import {
  Sparklines,
  SparklinesLine,
  SparklinesSteppedLine,
  SparklinesSteppedArea,
  SparklinesReferenceLine
} from 'react-sparklines-next';
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

**SparklinesLine Props:**
- `color` (string) - Line and fill color (e.g., "blue", "#1c8cdc")
- `style` - Style object supporting:
  - `stroke` - Line stroke color
  - `strokeWidth` - Line thickness (default: "1")
  - `strokeLinejoin` - Line join style (default: "round")
  - `strokeLinecap` - Line cap style (default: "round")
  - `fill` - Fill area color
  - `fillOpacity` - Fill area opacity (default: ".1")
  - `fillInvert` - Boolean to invert fill direction (fills from top instead of bottom)

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

**SparklinesBars Props:**
- `style` - Style object supporting:
  - `fill` - Bar fill color (default: "slategray")
  - `stroke` - Bar stroke/border color
  - `strokeWidth` - Bar border width
  - `fillOpacity` - Bar opacity
- `barWidth` (number) - Fixed width for each bar (optional, calculated automatically if not provided)
- `margin` (number) - Spacing between bars

#### Horizontal Bar

The `SparklinesHorizontalBar` component displays a single horizontal progress bar without needing time-series data:

```jsx
import React from 'react';
import { SparklinesHorizontalBar } from 'react-sparklines-next';

function MyComponent() {
  return (
    <SparklinesHorizontalBar
      value={49}
      totalValue={100}
      style={{ fill: "#1c8cdc", backgroundColor: "#e0f0ff" }}
      showValue
    />
  );
}
```

**Props:**
- `value` (number, required) - The current value to display
- `totalValue` (number, required) - The maximum value (denominator)
- `style` - Style object supporting:
  - `fill` - Bar color
  - `backgroundColor` - Background color
  - `fontSize` - Font size for value text (e.g., "16px")
  - `fontFamily` - Font family for value text (e.g., "monospace", "serif")
  - `textColor` - Color of the value text
  - `textPadding` - Padding from right edge for value text (number)
- `showValue` (boolean) - Whether to display the value text on the right side
- `width`, `height`, `margin` - Standard dimension props

**Example with all styling options:**

```jsx
<SparklinesHorizontalBar
  value={90}
  totalValue={100}
  width={240}
  height={60}
  style={{
    fill: "#fa7e17",
    backgroundColor: "#fff4e6",
    fontSize: "18px",
    fontFamily: "serif",
    textColor: "#fa7e17",
    textPadding: 8
  }}
  showValue
/>
```

#### Stepped Line

The `SparklinesSteppedLine` component renders a stepped line chart, ideal for visualizing discrete data changes:

```jsx
import React from 'react';
import { Sparklines, SparklinesSteppedLine } from 'react-sparklines-next';

function MyComponent() {
  return (
    <Sparklines data={[5, 10, 5, 20, 8, 15]}>
      <SparklinesSteppedLine step="before" color="#1c8cdc" />
    </Sparklines>
  );
}
```

**Props:**
- `step` (string | boolean) - Step interpolation mode:
  - `"before"` (default) - Horizontal line first, then vertical step (staircase going right)
  - `"after"` - Vertical step first, then horizontal line (staircase going left)
  - `"middle"` - Steps at midpoint between data points (centered steps)
  - `true` - Same as "before"
- `color` (string) - Line color (e.g., "blue", "#1c8cdc")
- `style` - Style object supporting:
  - `stroke` - Line stroke color
  - `strokeWidth` - Line thickness (default: "1")
  - `strokeLinejoin` - Line join style (default: "round")
  - `strokeLinecap` - Line cap style (default: "round")
  - `fill` - Fill color (typically set to "none" for stepped lines)
- `onMouseMove` (function) - Optional callback for hover interactions

**Example with different step modes:**

```jsx
// Before mode (default) - steps occur before the data point
<Sparklines data={[5, 10, 5, 20]}>
  <SparklinesSteppedLine step="before" color="#1c8cdc" />
</Sparklines>

// After mode - steps occur after the data point
<Sparklines data={[5, 10, 5, 20]}>
  <SparklinesSteppedLine step="after" color="#fa7e17" />
</Sparklines>

// Middle mode - steps occur at the midpoint
<Sparklines data={[5, 10, 5, 20]}>
  <SparklinesSteppedLine step="middle" color="#56b45d" />
</Sparklines>
```

#### Stepped Area

The `SparklinesSteppedArea` component renders a stepped area chart with gradient support, perfect for showing cumulative or state-based data:

```jsx
import React from 'react';
import { Sparklines, SparklinesSteppedArea } from 'react-sparklines-next';

function MyComponent() {
  return (
    <Sparklines data={[5, 10, 5, 20, 8, 15]}>
      <SparklinesSteppedArea step="before" color="#1c8cdc" />
    </Sparklines>
  );
}
```

**Props:**
- `step` (string | boolean) - Step interpolation mode (same as SparklinesSteppedLine):
  - `"before"` (default)
  - `"after"`
  - `"middle"`
- `color` (string) - Base color for fill and stroke
- `style` - Style object supporting:
  - `fill` - Fill color
  - `fillOpacity` - Fill opacity (default: 0.3)
  - `stroke` - Outline stroke color
  - `strokeWidth` - Outline thickness (default: "1")
- `gradient` (object) - Optional gradient configuration:
  - `topColor` - Gradient top color
  - `bottomColor` - Gradient bottom color
  - `topOpacity` - Top opacity (default: 0.8)
  - `bottomOpacity` - Bottom opacity (default: 0.5)
- `showBaseline` (boolean) - Show horizontal baseline at bottom (default: true)
- `showOutline` (boolean) - Show stepped outline (default: true)
- `onMouseMove` (function) - Optional callback for hover interactions

**Example with gradient:**

```jsx
<Sparklines data={[5, 10, 5, 20, 8, 15]}>
  <SparklinesSteppedArea
    step="before"
    color="#c89ed4"
    gradient={{
      topColor: "#c89ed4",
      bottomColor: "#c89ed4",
      topOpacity: 0.8,
      bottomOpacity: 0.5
    }}
    showBaseline={true}
  />
</Sparklines>
```

**Example without baseline:**

```jsx
<Sparklines data={[5, 10, 5, 20, 8, 15]}>
  <SparklinesSteppedArea
    step="after"
    color="#8e44af"
    showBaseline={false}
    style={{ fillOpacity: 0.5 }}
  />
</Sparklines>
```

**Example without outline (area only):**

```jsx
<Sparklines data={[5, 10, 5, 20, 8, 15]}>
  <SparklinesSteppedArea
    step="middle"
    color="#ea485c"
    showOutline={false}
    style={{ fillOpacity: 0.6 }}
  />
</Sparklines>
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

**SparklinesSpots Props:**
- `size` (number) - Radius of the spot circles (default: 2)
- `style` - Style object for the spots (fill, stroke, strokeWidth, etc.)
- `spotColors` (object) - Custom colors for specific spots:
  - `first` - Color for the first spot
  - `last` - Color for the last spot
  - `high` - Color for the highest value spot
  - `low` - Color for the lowest value spot

**Example with custom spot colors:**
```jsx
<SparklinesSpots
  size={4}
  spotColors={{
    first: 'green',
    last: 'blue',
    high: 'red',
    low: 'orange'
  }}
/>
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

**SparklinesReferenceLine Props:**
- `type` (string) - Type of reference line to display:
  - `"max"` - Maximum value in the dataset
  - `"min"` - Minimum value in the dataset
  - `"mean"` or `"avg"` - Average value (default: "mean")
  - `"median"` - Median value
  - `"custom"` - Use with the `value` prop for a custom value
- `value` (number) - Custom value for the reference line (only used when type="custom")
- `style` - Style object for the line (default: `{ stroke: 'red', strokeOpacity: .75, strokeDasharray: '2, 2' }`)

**Example with custom value:**
```jsx
<SparklinesReferenceLine
  type="custom"
  value={15}
  style={{ stroke: 'blue', strokeDasharray: '5, 5' }}
/>
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

**SparklinesNormalBand Props:**
- `style` - Style object for the band (default: `{ fill: 'red', fillOpacity: .1 }`)

The normal band visualizes one standard deviation above and below the mean of the dataset.

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

**SparklinesInteractiveLayer Props:**
- `onMouseMove` (function) - Callback fired when mouse moves over a data point
  - Parameters: `(dataValue, point, index, event)`
  - `dataValue` - The actual data value at this point
  - `point` - The Point object with x, y coordinates
  - `index` - The index of the data point in the dataset
  - `event` - The React mouse event
- `onMouseLeave` (function) - Callback fired when mouse leaves the chart area
  - Parameters: `(event)`
- `onClick` (function) - Callback fired when a data point is clicked
  - Parameters: `(dataValue, point, index, event)`

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
