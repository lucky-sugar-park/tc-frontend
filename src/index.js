import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const rootElement = ReactDOM.createRoot(document.getElementById('root'));

rootElement.render(
    // React.StrictMode가 있으면 일부 기능이 오동작 할 수도 있음 (예, 비디오 플레이어의 onProgress 함수)
    <React.StrictMode>
        <App /> 
    </React.StrictMode>
);
