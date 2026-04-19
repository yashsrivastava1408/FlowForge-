import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './views/Dashboard';
import { DesignerView } from './views/DesignerView';
import { useWorkflowSelectors } from './hooks/useWorkflowStore';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactFlowProvider } from '@xyflow/react';

export default function App() {
  const { currentView } = useWorkflowSelectors();

  return (
    <ReactFlowProvider>
      <AppShell>
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'linear' }}
              className="h-full w-full"
            >
              <Dashboard />
            </motion.div>
          ) : (
            <motion.div
              key="designer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'linear' }}
              className="h-full w-full overflow-hidden"
            >
              <DesignerView />
            </motion.div>
          )}
        </AnimatePresence>
      </AppShell>
    </ReactFlowProvider>
  );
}

