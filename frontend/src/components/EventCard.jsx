import React from 'react';
import { motion } from 'framer-motion';
import { Send, GitMerge, GitPullRequest } from 'lucide-react';
import { getRelativeTime } from '../utils/formatTime';

/**
 * Variants define the 'states' of our animation.
 * Using a spring transition makes the movement feel organic rather than robotic.
 */
const cardVariants = {
  hidden: { 
    opacity: 0, 
    x: -30, 
    filter: "blur(4px)" 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    transition: { duration: 0.2 } 
  }
};

const EventCard = ({ event }) => {
  const isPush = event.action === 'PUSH';
  const isMerge = event.action === 'MERGE';
  const isPR = event.action === 'PULL_REQUEST';

  return (
    <motion.div
      variants={cardVariants}
      layout // Smoothly re-positions cards when one is added/removed
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ 
        scale: 1.01, 
        backgroundColor: '#1c2128', 
        borderColor: '#58a6ff',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      style={styles.card}
    >
      <div style={styles.iconArea(event.action)}>
        {isPush && <Send size={18} />}
        {isMerge && <GitMerge size={18} />}
        {isPR && <GitPullRequest size={18} />}
      </div>
      
      <div style={styles.content}>
        <p style={styles.text}>
            <span style={styles.user}>{event.author}</span>
            {isPush && <> pushed to <code>{event.to_branch}</code></>}
            {isPR && (
                    <> submitted a pull request from <code>{event.from_branch}</code> to <code>{event.to_branch}</code></>
            )}
            {isMerge && (
                    <> merged branch <code>{event.from_branch}</code> to <code>{event.to_branch}</code></>
            )}
        </p>
        <span style={styles.date}>{getRelativeTime(event.timestamp)}</span>
      </div>
    </motion.div>
  );
};

const styles = {
  card: { 
    background: '#161b22', 
    border: '1px solid #30363d', 
    borderRadius: '12px', 
    padding: '1rem', 
    marginBottom: '12px', 
    display: 'flex', 
    gap: '16px', 
    alignItems: 'center',
    transition: 'border-color 0.2s ease',
    cursor: 'pointer'
  },
  iconArea: (action) => ({
    padding: '10px', 
    borderRadius: '8px',
    background: action === 'PUSH' ? '#23863615' : action === 'MERGE' ? '#8957e515' : '#1f6feb15',
    color: action === 'PUSH' ? '#3fb950' : action === 'MERGE' ? '#a371f7' : '#58a6ff'
  }),
  content: { display: 'flex', flexDirection: 'column', gap: '4px' },
  user: { fontWeight: 600, color: '#58a6ff', marginRight: '6px' },
  text: { margin: 0, fontSize: '0.95rem', lineHeight: '1.5' },
  date: { fontSize: '0.8rem', color: '#7d8590' },
};

export default EventCard;