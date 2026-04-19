import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  // Always enable mocking for this prototype to ensure live sites work
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
});
