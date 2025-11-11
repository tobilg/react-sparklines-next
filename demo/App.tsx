import React, { useState, useEffect } from 'react';
import {
    Sparklines,
    SparklinesBars,
    SparklinesLine,
    SparklinesCurve,
    SparklinesNormalBand,
    SparklinesReferenceLine,
    SparklinesSpots,
    SparklinesHorizontalBar
} from '../src/index';

function boxMullerRandom(): () => number {
    let phase = false;
    let x1: number, x2: number, w: number;

    return function() {
        if (phase = !phase) {
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            return x1 * w;
        } else {
            return x2 * w;
        }
    };
}

function randomData(n: number = 30): number[] {
    const generator = boxMullerRandom();
    return Array.from({ length: n }, () => generator());
}

const sampleData = randomData(30);
const sampleData100 = randomData(100);

const Header = () =>
    <Sparklines data={sampleData} width={300} height={50}>
        <SparklinesLine style={{ stroke: "white", fill: "none" }} />
        <SparklinesReferenceLine style={{ stroke: 'white', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
    </Sparklines>

const Simple = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine />
    </Sparklines>

const SimpleCurve = () =>
    <Sparklines data={sampleData}>
        <SparklinesCurve />
    </Sparklines>

const Customizable1 = () =>
    <Sparklines data={sampleData} svgWidth={240}>
        <SparklinesLine color="#1c8cdc" />
    </Sparklines>

const Customizable2 = () =>
    <Sparklines data={sampleData} svgWidth={240}>
        <SparklinesLine color="#fa7e17" />
    </Sparklines>

const Customizable3 = () =>
    <Sparklines data={sampleData} svgWidth={240}>
        <SparklinesLine color="#ea485c" />
    </Sparklines>

const Customizable4 = () =>
    <Sparklines data={sampleData} svgWidth={240}>
        <SparklinesLine color="#56b45d" />
    </Sparklines>

const Customizable5 = () =>
    <Sparklines data={sampleData} svgWidth={240}>
        <SparklinesLine color="#8e44af" />
    </Sparklines>

const Customizable6 = () =>
    <Sparklines data={sampleData} svgWidth={240}>
        <SparklinesLine color="#253e56" />
    </Sparklines>

const Bounds1 = () =>
    <Sparklines data={sampleData} max={0.5}>
        <SparklinesLine />
    </Sparklines>

const Spots1 = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine style={{ fill: "none" }} />
        <SparklinesSpots />
    </Sparklines>

const Spots2 = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine color="#56b45d" />
        <SparklinesSpots style={{ fill: "#56b45d" }} />
    </Sparklines>

const Spots3 = () =>
    <Sparklines data={sampleData} margin={6}>
        <SparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
        <SparklinesSpots size={4} style={{ stroke: "#336aff", strokeWidth: 3, fill: "white" }} />
    </Sparklines>

const Bars1 = () =>
    <Sparklines data={sampleData}>
        <SparklinesBars style={{ fill: "#41c3f9" }} />
    </Sparklines>

const Bars2 = () =>
    <Sparklines data={sampleData}>
        <SparklinesBars style={{ stroke: "white", fill: "#41c3f9", fillOpacity: ".25" }} />
        <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
    </Sparklines>

const Dynamic1: React.FC = () => {
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        const generator = boxMullerRandom();
        const interval = setInterval(() => {
            setData(prev => [...prev, generator()].slice(-20));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <Sparklines data={data} limit={20}>
            <SparklinesLine color="#1c8cdc" />
            <SparklinesSpots />
        </Sparklines>
    );
}

const Dynamic2: React.FC = () => {
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        const generator = boxMullerRandom();
        const interval = setInterval(() => {
            setData(prev => [...prev, generator()].slice(-20));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <Sparklines data={data} limit={20}>
            <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
            <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
        </Sparklines>
    );
}

const Dynamic3: React.FC = () => {
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        const generator = boxMullerRandom();
        const interval = setInterval(() => {
            setData(prev => [...prev, generator()].slice(-20));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <Sparklines data={data} limit={20}>
            <SparklinesLine style={{ stroke: "none", fill: "#8e44af", fillOpacity: "1" }} />
        </Sparklines>
    );
}

const Dynamic4: React.FC = () => {
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        const generator = boxMullerRandom();
        const interval = setInterval(() => {
            setData(prev => [...prev, generator()].slice(-10));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <Sparklines data={data} limit={10}>
            <SparklinesBars style={{ fill: "#0a83d8" }} />
        </Sparklines>
    );
}

const ReferenceLine1 = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine />
        <SparklinesReferenceLine type="max" />
    </Sparklines>

const ReferenceLine2 = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine />
        <SparklinesReferenceLine type="min" />
    </Sparklines>

const ReferenceLine3 = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine />
        <SparklinesReferenceLine type="mean" />
    </Sparklines>

const ReferenceLine4 = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine />
        <SparklinesReferenceLine type="avg" />
    </Sparklines>

const ReferenceLine5 = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine />
        <SparklinesReferenceLine type="median" />
    </Sparklines>

const ReferenceLine6 = () =>
    <Sparklines data={sampleData}>
        <SparklinesBars style={{ fill: 'slategray', fillOpacity: ".5" }} />
        <SparklinesReferenceLine />
    </Sparklines>

const NormalBand1 = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine style={{ fill: "none" }} />
        <SparklinesNormalBand />
    </Sparklines>

const NormalBand2 = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine style={{ fill: "none" }}/>
        <SparklinesNormalBand />
        <SparklinesReferenceLine type="mean" />
    </Sparklines>

const RealWorld1 = () =>
    <Sparklines data={sampleData}>
        <SparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
    </Sparklines>

const RealWorld2 = () =>
    <Sparklines data={sampleData100} svgWidth={200}>
        <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
        <SparklinesSpots />
        <SparklinesNormalBand style={{ fill: "#2991c8", fillOpacity: .1 }} />
    </Sparklines>

const RealWorld3 = () =>
    <Sparklines data={sampleData100}>
        <SparklinesLine style={{ stroke: "black", fill: "none" }} />
        <SparklinesSpots style={{ fill: "orange" }} />
    </Sparklines>

const RealWorld4 = () =>
    <Sparklines data={sampleData}>
        <SparklinesBars style={{ stroke: "white", strokeWidth: "1", fill: "#40c0f5" }} />
    </Sparklines>

const RealWorld5 = () =>
    <Sparklines data={sampleData} height={80}>
        <SparklinesLine style={{ stroke: "#8ed53f", strokeWidth: "1", fill: "none" }} />
    </Sparklines>

const RealWorld6 = () =>
    <Sparklines data={sampleData} height={80}>
        <SparklinesLine style={{ stroke: "#d1192e", strokeWidth: "1", fill: "none" }} />
    </Sparklines>

const RealWorld7 = () =>
    <Sparklines data={sampleData} height={40}>
        <SparklinesLine style={{ stroke: "#559500", fill: "#8fc638", fillOpacity: "1" }} />
    </Sparklines>

const RealWorld8 = () =>
    <Sparklines data={sampleData} style={{background: "#272727"}} margin={10} height={40}>
        <SparklinesLine style={{ stroke: "none", fill: "#d2673a", fillOpacity: ".5" }} />
    </Sparklines>

const RealWorld9 = () =>
    <Sparklines data={sampleData} style={{background: "#00bdcc"}} margin={10} height={40}>
        <SparklinesLine style={{ stroke: "white", fill: "none" }} />
        <SparklinesReferenceLine style={{ stroke: 'white', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
    </Sparklines>

const HorizontalBar1 = () =>
    <SparklinesHorizontalBar value={49} totalValue={100} style={{ backgroundColor: "#e8e8e8" }} />

const HorizontalBar2 = () =>
    <SparklinesHorizontalBar value={49} totalValue={100} style={{ fill: "#1c8cdc", backgroundColor: "#e0f0ff" }} showValue />

const HorizontalBar3 = () =>
    <SparklinesHorizontalBar value={75} totalValue={100} style={{ fill: "#56b45d", backgroundColor: "#e8f5e9", fontSize: "16px", textColor: "#56b45d" }} showValue />

const HorizontalBar4 = () =>
    <SparklinesHorizontalBar value={30} totalValue={100} style={{ fill: "#ea485c", backgroundColor: "#ffe8eb", fontSize: "12px", textPadding: 10, fontFamily: "monospace" }} showValue />

const HorizontalBar5 = () =>
    <SparklinesHorizontalBar value={90} totalValue={100} style={{ fill: "#fa7e17", backgroundColor: "#fff4e6", fontSize: "18px", textPadding: 8, textColor: "#fa7e17", fontFamily: "serif" }} showValue />

const HorizontalBar6 = () =>
    <SparklinesHorizontalBar value={12} totalValue={100} style={{ fill: "#8e44af", backgroundColor: "#f3e8f5" }} showValue />

// Code example component
const CodeExample: React.FC<{ children: string }> = ({ children }) => {
    useEffect(() => {
        // Re-run prettify after component mounts
        if (typeof window !== 'undefined' && (window as any).prettyPrint) {
            (window as any).prettyPrint();
        }
    }, []);
    
    return (
        <pre className="prettyprint">
            <code dangerouslySetInnerHTML={{ __html: children.replace(/</g, '&lt;').replace(/>/g, '&gt;') }} />
        </pre>
    );
};

const App: React.FC = () => {
    return (
        <>
            <header>
                <div className="content">
                    <h1>React Sparklines Next</h1>
                    <div id="headersparklines">
                        <Header />
                    </div>
                </div>
            </header>
            <div className="c2">
                <h3 className="content">
                    Beautiful and expressive sparklines component for React
                    <a className="button" href="https://github.com/tobilg/react-sparklines-next">View on GitHub</a>
                </h3>
            </div>
            <div className="c3">
                <h3 className="content">
                    npm install react-sparklines-next
                </h3>
            </div>
            <div className="content">
                <h2>Simple</h2>
                <div className="row">
                    <div><Simple /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
</Sparklines>`}</CodeExample>
                </div>

                <h2>Simple Curve</h2>
                <div className="row">
                    <div><SimpleCurve /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesCurve />
</Sparklines>`}</CodeExample>
                </div>

                <h2>Customizable</h2>
                <div className="row">
                    <div>
                        <Customizable1 />
                        <Customizable2 />
                        <Customizable3 />
                        <Customizable4 />
                        <Customizable5 />
                        <Customizable6 />
                    </div>
                    <CodeExample>{`<Sparklines data={sampleData} svgWidth={240}>
    <SparklinesLine color="#253e56" />
</Sparklines>`}</CodeExample>
                </div>

                <h2>Spots</h2>
                <div className="row">
                    <div><Spots1 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine style={{ fill: "none" }} />
    <SparklinesSpots />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><Spots2 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine color="#56b45d" />
    <SparklinesSpots style={{ fill: "#56b45d" }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><Spots3 /></div>
                    <CodeExample>{`<Sparklines data={sampleData} margin={6}>
    <SparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
    <SparklinesSpots size={4}
        style={{ stroke: "#336aff", strokeWidth: 3, fill: "white" }} />
</Sparklines>`}</CodeExample>
                </div>

                <h2>Bounds</h2>
                <div className="row">
                    <div><Bounds1 /></div>
                    <CodeExample>{`<Sparklines data={sampleData} max={0.5}>
    <SparklinesLine />
</Sparklines>`}</CodeExample>
                </div>

                <h2>Bars</h2>
                <div className="row">
                    <div><Bars1 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesBars style={{ fill: "#41c3f9" }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><Bars2 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesBars style={{ stroke: "white", fill: "#41c3f9", fillOpacity: ".25" }} />
    <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
</Sparklines>`}</CodeExample>
                </div>

                <h2>Horizontal Bars</h2>
                <div className="row">
                    <div><HorizontalBar1 /></div>
                    <CodeExample>{`<SparklinesHorizontalBar
    value={49}
    totalValue={100}
    style={{ backgroundColor: "#e8e8e8" }} />`}</CodeExample>
                </div>

                <div className="row">
                    <div><HorizontalBar2 /></div>
                    <CodeExample>{`<SparklinesHorizontalBar
    value={49}
    totalValue={100}
    style={{ fill: "#1c8cdc", backgroundColor: "#e0f0ff" }}
    showValue />`}</CodeExample>
                </div>

                <div className="row">
                    <div>
                        <HorizontalBar3 />
                        <HorizontalBar4 />
                        <HorizontalBar5 />
                        <HorizontalBar6 />
                    </div>
                    <CodeExample>{`<SparklinesHorizontalBar value={75} totalValue={100}
    style={{ fill: "#56b45d", backgroundColor: "#e8f5e9", fontSize: "16px", textColor: "#56b45d" }}
    showValue />
<SparklinesHorizontalBar value={30} totalValue={100}
    style={{ fill: "#ea485c", backgroundColor: "#ffe8eb", fontSize: "12px", textPadding: 10,
             fontFamily: "monospace" }}
    showValue />
<SparklinesHorizontalBar value={90} totalValue={100}
    style={{ fill: "#fa7e17", backgroundColor: "#fff4e6", fontSize: "18px", textPadding: 8,
             textColor: "#fa7e17", fontFamily: "serif" }}
    showValue />
<SparklinesHorizontalBar value={12} totalValue={100}
    style={{ fill: "#8e44af", backgroundColor: "#f3e8f5" }} showValue />`}</CodeExample>
                </div>

                <h2>Dynamic</h2>
                <div className="row">
                    <div><Dynamic1 /></div>
                    <CodeExample>{`<Sparklines data={data} limit={20}>
    <SparklinesLine color="#1c8cdc" />
    <SparklinesSpots />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><Dynamic2 /></div>
                    <CodeExample>{`<Sparklines data={data} limit={20}>
    <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
    <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><Dynamic3 /></div>
                    <CodeExample>{`<Sparklines data={data} limit={20}>
    <SparklinesLine style={{ stroke: "none", fill: "#8e44af", fillOpacity: "1" }}/>
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><Dynamic4 /></div>
                    <CodeExample>{`<Sparklines data={data} limit={10}>
    <SparklinesBars style={{ fill: "#0a83d8" }} />
</Sparklines>`}</CodeExample>
                </div>

                <h2>Reference Line</h2>
                <div className="row">
                    <div><ReferenceLine1 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="max" />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><ReferenceLine2 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="min" />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><ReferenceLine3 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="mean" />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><ReferenceLine4 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="avg" />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><ReferenceLine5 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="median" />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><ReferenceLine6 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesBars style={{ fill: 'slategray', fillOpacity: ".5" }} />
    <SparklinesReferenceLine />
</Sparklines>`}</CodeExample>
                </div>

                <h2>Normal Band</h2>
                <div className="row">
                    <div><NormalBand1 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine style={{ fill: "none" }}/>
    <SparklinesNormalBand />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><NormalBand2 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine style={{ fill: "none" }}/>
    <SparklinesNormalBand />
    <SparklinesReferenceLine type="mean" />
</Sparklines>`}</CodeExample>
                </div>

                <h2>Real world examples</h2>
                <div className="row">
                    <div><RealWorld1 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><RealWorld2 /></div>
                    <CodeExample>{`<Sparklines data={sampleData100} svgWidth={200}>
    <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
    <SparklinesSpots />
    <SparklinesNormalBand style={{ fill: "#2991c8", fillOpacity: .1 }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><RealWorld3 /></div>
                    <CodeExample>{`<Sparklines data={sampleData100}>
    <SparklinesLine style={{ stroke: "black", fill: "none" }} />
    <SparklinesSpots style={{ fill: "orange" }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><RealWorld4 /></div>
                    <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesBars style={{ stroke: "white", strokeWidth: "1", fill: "#40c0f5" }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><RealWorld5 /></div>
                    <CodeExample>{`<Sparklines data={sampleData} height={80}>
    <SparklinesLine style={{ stroke: "#8ed53f", strokeWidth: "1", fill: "none" }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><RealWorld6 /></div>
                    <CodeExample>{`<Sparklines data={sampleData} height={80}>
    <SparklinesLine style={{ stroke: "#d1192e", strokeWidth: "1", fill: "none" }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><RealWorld7 /></div>
                    <CodeExample>{`<Sparklines data={sampleData} height={40}>
    <SparklinesLine style={{ stroke: "#559500", fill: "#8fc638", fillOpacity: "1" }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><RealWorld8 /></div>
                    <CodeExample>{`<Sparklines data={sampleData} style={{background: "#272727"}} margin={10} height={40}>
    <SparklinesLine style={{ stroke: "none", fill: "#d2673a", fillOpacity: ".5" }} />
</Sparklines>`}</CodeExample>
                </div>

                <div className="row">
                    <div><RealWorld9 /></div>
                    <CodeExample>{`<Sparklines data={sampleData} style={{background: "#00bdcc"}} margin={10} height={40}>
    <SparklinesLine style={{ stroke: "white", fill: "none" }} />
    <SparklinesReferenceLine
        style={{ stroke: 'white', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
</Sparklines>`}</CodeExample>
                </div>
            </div>
        </>
    );
};

export default App;

