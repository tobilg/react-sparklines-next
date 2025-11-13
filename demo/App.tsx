import React, { useState, useEffect } from 'react';
import {
    Sparklines,
    SparklinesBars,
    SparklinesLine,
    SparklinesCurve,
    SparklinesNormalBand,
    SparklinesReferenceLine,
    SparklinesSpots,
    SparklinesHorizontalBar,
    SparklinesSteppedLine,
    SparklinesSteppedArea
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
    <Sparklines data={sampleData} svgWidth={300} svgHeight={50}>
        <SparklinesLine style={{ stroke: "white", fill: "none" }} />
        <SparklinesReferenceLine style={{ stroke: 'white', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
    </Sparklines>

const Simple = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine />
    </Sparklines>

const SimpleCurve = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesCurve />
    </Sparklines>

const SteppedLineBefore = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesSteppedLine step="before" color="#1c8cdc" />
    </Sparklines>

const SteppedLineAfter = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesSteppedLine step="after" color="#fa7e17" />
    </Sparklines>

const SteppedLineMiddle = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesSteppedLine step="middle" color="#56b45d" />
    </Sparklines>

const SteppedAreaBefore = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesSteppedArea step="before" color="#1c8cdc" />
    </Sparklines>

const SteppedAreaAfter = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesSteppedArea step="after" color="#fa7e17" />
    </Sparklines>

const SteppedAreaMiddle = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesSteppedArea step="middle" color="#56b45d" />
    </Sparklines>

const SteppedAreaGradient = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
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

const SteppedAreaNoBaseline = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesSteppedArea
            step="after"
            color="#8e44af"
            showBaseline={false}
            style={{ fillOpacity: 0.5 }}
        />
    </Sparklines>

const SteppedAreaNoOutline = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesSteppedArea
            step="middle"
            color="#ea485c"
            showOutline={false}
            style={{ fillOpacity: 0.6 }}
        />
    </Sparklines>

const Customizable1 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine color="#1c8cdc" />
    </Sparklines>

const Customizable2 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine color="#fa7e17" />
    </Sparklines>

const Customizable3 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine color="#ea485c" />
    </Sparklines>

const Customizable4 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine color="#56b45d" />
    </Sparklines>

const Customizable5 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine color="#8e44af" />
    </Sparklines>

const Customizable6 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine color="#253e56" />
    </Sparklines>

const Bounds1 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60} max={0.5}>
        <SparklinesLine />
    </Sparklines>

const Spots1 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine style={{ fill: "none" }} />
        <SparklinesSpots />
    </Sparklines>

const Spots2 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine color="#56b45d" />
        <SparklinesSpots style={{ fill: "#56b45d" }} />
    </Sparklines>

const Spots3 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60} margin={6}>
        <SparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
        <SparklinesSpots size={4} style={{ stroke: "#336aff", strokeWidth: 3, fill: "white" }} />
    </Sparklines>

const Bars1 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesBars style={{ fill: "#41c3f9" }} />
    </Sparklines>

const Bars2 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
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
        <Sparklines data={data} svgWidth={240} svgHeight={60} limit={20}>
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
        <Sparklines data={data} svgWidth={240} svgHeight={60} limit={20}>
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
        <Sparklines data={data} svgWidth={240} svgHeight={60} limit={20}>
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
        <Sparklines data={data} svgWidth={240} svgHeight={60} limit={10}>
            <SparklinesBars style={{ fill: "#0a83d8" }} />
        </Sparklines>
    );
}

const ReferenceLine1 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine />
        <SparklinesReferenceLine type="max" />
    </Sparklines>

const ReferenceLine2 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine />
        <SparklinesReferenceLine type="min" />
    </Sparklines>

const ReferenceLine3 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine />
        <SparklinesReferenceLine type="mean" />
    </Sparklines>

const ReferenceLine4 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine />
        <SparklinesReferenceLine type="avg" />
    </Sparklines>

const ReferenceLine5 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine />
        <SparklinesReferenceLine type="median" />
    </Sparklines>

const ReferenceLine6 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesBars style={{ fill: 'slategray', fillOpacity: ".5" }} />
        <SparklinesReferenceLine />
    </Sparklines>

const NormalBand1 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine style={{ fill: "none" }} />
        <SparklinesNormalBand />
    </Sparklines>

const NormalBand2 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine style={{ fill: "none" }}/>
        <SparklinesNormalBand />
        <SparklinesReferenceLine type="mean" />
    </Sparklines>

const RealWorld1 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
    </Sparklines>

const RealWorld2 = () =>
    <Sparklines data={sampleData100} svgWidth={240} svgHeight={60}>
        <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
        <SparklinesSpots />
        <SparklinesNormalBand style={{ fill: "#2991c8", fillOpacity: .1 }} />
    </Sparklines>

const RealWorld3 = () =>
    <Sparklines data={sampleData100} svgWidth={240} svgHeight={60}>
        <SparklinesLine style={{ stroke: "black", fill: "none" }} />
        <SparklinesSpots style={{ fill: "orange" }} />
    </Sparklines>

const RealWorld4 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesBars style={{ stroke: "white", strokeWidth: "1", fill: "#40c0f5" }} />
    </Sparklines>

const RealWorld5 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine style={{ stroke: "#8ed53f", strokeWidth: "1", fill: "none" }} />
    </Sparklines>

const RealWorld6 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine style={{ stroke: "#d1192e", strokeWidth: "1", fill: "none" }} />
    </Sparklines>

const RealWorld7 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
        <SparklinesLine style={{ stroke: "#559500", fill: "#8fc638", fillOpacity: "1" }} />
    </Sparklines>

const RealWorld8 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60} style={{background: "#272727"}} margin={10}>
        <SparklinesLine style={{ stroke: "none", fill: "#d2673a", fillOpacity: ".5" }} />
    </Sparklines>

const RealWorld9 = () =>
    <Sparklines data={sampleData} svgWidth={240} svgHeight={60} style={{background: "#00bdcc"}} margin={10}>
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
    <SparklinesHorizontalBar value={57} totalValue={100} style={{ fill: "#fa7e17", backgroundColor: "#fff4e6", fontSize: "18px", textPadding: 8, textColor: "#fa7e17", fontFamily: "serif" }} showValue />

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

// Section component for consistent styling
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-indigo-200">{title}</h2>
        {children}
    </section>
);

// Example row component
const ExampleRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="grid md:grid-cols-2 gap-8 items-center mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
        {children}
    </div>
);

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100">
                                React Sparklines Next
                            </h1>
                            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-2xl">
                                Beautiful and expressive sparklines component for React
                            </p>
                            <a
                                className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                                href="https://github.com/tobilg/react-sparklines-next"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                View on GitHub
                            </a>
                        </div>
                        <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <Header />
                        </div>
                    </div>
                </div>
            </header>

            {/* Installation Section */}
            <div className="bg-gray-900 text-white shadow-inner">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400 font-medium">Install via npm:</span>
                            <code className="text-lg font-mono text-emerald-400 bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-700">
                                npm install react-sparklines-next
                            </code>
                        </div>
                        <span className="text-sm text-gray-500">or use yarn / pnpm</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <Section title="Simple">
                    <ExampleRow>
                        <div className="flex justify-center"><Simple /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Simple Curve">
                    <ExampleRow>
                        <div className="flex justify-center"><SimpleCurve /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesCurve />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Stepped Line">
                    <ExampleRow>
                        <div className="flex justify-center"><SteppedLineBefore /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesSteppedLine step="before" color="#1c8cdc" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><SteppedLineAfter /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesSteppedLine step="after" color="#fa7e17" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><SteppedLineMiddle /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesSteppedLine step="middle" color="#56b45d" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Stepped Area">
                    <ExampleRow>
                        <div className="flex justify-center"><SteppedAreaBefore /></div>
                        <CodeExample>{`<Sparklines data={sampleData} width={240} height={60}>
    <SparklinesSteppedArea step="before" color="#1c8cdc" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><SteppedAreaAfter /></div>
                        <CodeExample>{`<Sparklines data={sampleData} width={240} height={60}>
    <SparklinesSteppedArea step="after" color="#fa7e17" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><SteppedAreaMiddle /></div>
                        <CodeExample>{`<Sparklines data={sampleData} width={240} height={60}>
    <SparklinesSteppedArea step="middle" color="#56b45d" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><SteppedAreaGradient /></div>
                        <CodeExample>{`<Sparklines data={sampleData} width={240} height={60}>
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
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><SteppedAreaNoBaseline /></div>
                        <CodeExample>{`<Sparklines data={sampleData} width={240} height={60}>
    <SparklinesSteppedArea
        step="after"
        color="#8e44af"
        showBaseline={false}
        style={{ fillOpacity: 0.5 }}
    />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><SteppedAreaNoOutline /></div>
                        <CodeExample>{`<Sparklines data={sampleData} width={240} height={60}>
    <SparklinesSteppedArea
        step="middle"
        color="#ea485c"
        showOutline={false}
        style={{ fillOpacity: 0.6 }}
    />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Customizable Colors">
                    <ExampleRow>
                        <div className="flex justify-center"><Customizable1 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
    <SparklinesLine color="#1c8cdc" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Customizable2 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
    <SparklinesLine color="#fa7e17" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Customizable3 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
    <SparklinesLine color="#ea485c" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Customizable4 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
    <SparklinesLine color="#56b45d" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Customizable5 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
    <SparklinesLine color="#8e44af" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Customizable6 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} svgWidth={240} svgHeight={60}>
    <SparklinesLine color="#253e56" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Spots">
                    <ExampleRow>
                        <div className="flex justify-center"><Spots1 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine style={{ fill: "none" }} />
    <SparklinesSpots />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Spots2 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine color="#56b45d" />
    <SparklinesSpots style={{ fill: "#56b45d" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Spots3 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} margin={6}>
    <SparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
    <SparklinesSpots size={4}
        style={{ stroke: "#336aff", strokeWidth: 3, fill: "white" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Bounds">
                    <ExampleRow>
                        <div className="flex justify-center"><Bounds1 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} max={0.5}>
    <SparklinesLine />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Bars">
                    <ExampleRow>
                        <div className="flex justify-center"><Bars1 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesBars style={{ fill: "#41c3f9" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Bars2 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesBars style={{ stroke: "white", fill: "#41c3f9", fillOpacity: ".25" }} />
    <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Horizontal Bars">
                    <ExampleRow>
                        <div className="flex justify-center"><HorizontalBar1 /></div>
                        <CodeExample>{`<SparklinesHorizontalBar
    value={49}
    totalValue={100}
    style={{ backgroundColor: "#e8e8e8" }} />`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><HorizontalBar2 /></div>
                        <CodeExample>{`<SparklinesHorizontalBar
    value={49}
    totalValue={100}
    style={{ fill: "#1c8cdc", backgroundColor: "#e0f0ff" }}
    showValue />`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><HorizontalBar3 /></div>
                        <CodeExample>{`<SparklinesHorizontalBar
    value={75}
    totalValue={100}
    style={{ fill: "#56b45d", backgroundColor: "#e8f5e9", fontSize: "16px", textColor: "#56b45d" }}
    showValue />`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><HorizontalBar4 /></div>
                        <CodeExample>{`<SparklinesHorizontalBar
    value={30}
    totalValue={100}
    style={{ fill: "#ea485c", backgroundColor: "#ffe8eb", fontSize: "12px", textPadding: 10, fontFamily: "monospace" }}
    showValue />`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><HorizontalBar5 /></div>
                        <CodeExample>{`<SparklinesHorizontalBar
    value={57}
    totalValue={100}
    style={{ fill: "#fa7e17", backgroundColor: "#fff4e6", fontSize: "18px", textPadding: 8, textColor: "#fa7e17", fontFamily: "serif" }}
    showValue />`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><HorizontalBar6 /></div>
                        <CodeExample>{`<SparklinesHorizontalBar
    value={12}
    totalValue={100}
    style={{ fill: "#8e44af", backgroundColor: "#f3e8f5" }}
    showValue />`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Dynamic Updates">
                    <ExampleRow>
                        <div className="flex justify-center"><Dynamic1 /></div>
                        <CodeExample>{`<Sparklines data={data} limit={20}>
    <SparklinesLine color="#1c8cdc" />
    <SparklinesSpots />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Dynamic2 /></div>
                        <CodeExample>{`<Sparklines data={data} limit={20}>
    <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
    <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Dynamic3 /></div>
                        <CodeExample>{`<Sparklines data={data} limit={20}>
    <SparklinesLine style={{ stroke: "none", fill: "#8e44af", fillOpacity: "1" }}/>
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><Dynamic4 /></div>
                        <CodeExample>{`<Sparklines data={data} limit={10}>
    <SparklinesBars style={{ fill: "#0a83d8" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Reference Lines">
                    <ExampleRow>
                        <div className="flex justify-center"><ReferenceLine1 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="max" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><ReferenceLine2 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="min" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><ReferenceLine3 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="mean" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><ReferenceLine4 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="avg" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><ReferenceLine5 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="median" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><ReferenceLine6 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesBars style={{ fill: 'slategray', fillOpacity: ".5" }} />
    <SparklinesReferenceLine />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Normal Band">
                    <ExampleRow>
                        <div className="flex justify-center"><NormalBand1 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine style={{ fill: "none" }}/>
    <SparklinesNormalBand />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><NormalBand2 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine style={{ fill: "none" }}/>
    <SparklinesNormalBand />
    <SparklinesReferenceLine type="mean" />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>

                <Section title="Real World Examples">
                    <ExampleRow>
                        <div className="flex justify-center"><RealWorld1 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><RealWorld2 /></div>
                        <CodeExample>{`<Sparklines data={sampleData100} svgWidth={240} svgHeight={60}>
    <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
    <SparklinesSpots />
    <SparklinesNormalBand style={{ fill: "#2991c8", fillOpacity: .1 }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><RealWorld3 /></div>
                        <CodeExample>{`<Sparklines data={sampleData100}>
    <SparklinesLine style={{ stroke: "black", fill: "none" }} />
    <SparklinesSpots style={{ fill: "orange" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><RealWorld4 /></div>
                        <CodeExample>{`<Sparklines data={sampleData}>
    <SparklinesBars style={{ stroke: "white", strokeWidth: "1", fill: "#40c0f5" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><RealWorld5 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} svgHeight={80}>
    <SparklinesLine style={{ stroke: "#8ed53f", strokeWidth: "1", fill: "none" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><RealWorld6 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} svgHeight={80}>
    <SparklinesLine style={{ stroke: "#d1192e", strokeWidth: "1", fill: "none" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><RealWorld7 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} svgHeight={40}>
    <SparklinesLine style={{ stroke: "#559500", fill: "#8fc638", fillOpacity: "1" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><RealWorld8 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} style={{background: "#272727"}} margin={10} svgHeight={40}>
    <SparklinesLine style={{ stroke: "none", fill: "#d2673a", fillOpacity: ".5" }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>

                    <ExampleRow>
                        <div className="flex justify-center"><RealWorld9 /></div>
                        <CodeExample>{`<Sparklines data={sampleData} style={{background: "#00bdcc"}} margin={10} svgHeight={40}>
    <SparklinesLine style={{ stroke: "white", fill: "none" }} />
    <SparklinesReferenceLine
        style={{ stroke: 'white', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
</Sparklines>`}</CodeExample>
                    </ExampleRow>
                </Section>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <p className="text-gray-400 mb-4">
                            Built with React and TypeScript
                        </p>
                        <a
                            href="https://github.com/tobilg/react-sparklines-next"
                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contribute on GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
