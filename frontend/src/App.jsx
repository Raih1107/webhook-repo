import React from 'react';
import Header from './components/Header';
import EventCard from './components/EventCard';
import { useWebhooks } from './hooks/useWebhooks';
import { AnimatePresence, motion } from 'framer-motion';

// 2. Define Container Variants for Staggering
const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1, // Delays each child by 0.1s
    }
  }
};

const App = () => {
  const { data: events, isLoading, isError } = useWebhooks();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#010409', color: '#e6edf3' }}>
      <Header />
      <main style={{ maxWidth: '750px', margin: '2rem auto', padding: '0 1rem' }}>
        
        {/* Fix: Use isLoading to show a clean state */}
        {isLoading && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            style={{ textAlign: 'center', color: '#7d8590' }}
          >
            Synchronizing with MongoDB...
          </motion.p>
        )}

        {isError && <p style={{ color: '#f85149' }}>Error connecting to API.</p>}

        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {events?.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
            {events?.length === 0 && (
              <p style={{ textAlign: 'center', color: '#7d8590', marginTop: '3rem' }}>
                No repository activity detected yet. Try pushing to your action-repo!
              </p>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default App;