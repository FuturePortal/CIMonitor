import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';

console.log('[Frontend] init dashboard.');

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('cimonitor')
);
