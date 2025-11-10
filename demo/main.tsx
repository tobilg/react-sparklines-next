import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// Initialize code prettify after render
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
    
    // Initialize prettify after React renders
    setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).prettyPrint) {
            (window as any).prettyPrint();
        }
    }, 500);
}

