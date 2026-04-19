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

enableMocking()
  .catch((err) => console.error('MSW failed to start:', err))
  .finally(() => {
    // We don't strictly need to wait for MSW to render the landing page,
    // but doing it in .finally ensures we don't block the UI if the worker fails.
    console.log('App initialization complete.');
  });

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
