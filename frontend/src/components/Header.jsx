import React from 'react';
import { Github, Activity } from 'lucide-react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        <Github size={30} />
        <h1 style={styles.title}>
          DevStream <span style={styles.badge}>v2.0</span>
        </h1>
      </div>
      <div style={styles.status}>
        <Activity size={16} className="pulse-icon" />
        <span>Real-time Polling Active</span>
      </div>
    </header>
  );
};

const styles = {
  header: { 
    borderBottom: '1px solid #30363d', 
    padding: '1.2rem 15%', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    background: '#0d1117' 
  },
  brand: { display: 'flex', alignItems: 'center', gap: '12px' },
  title: { fontSize: '1.25rem', fontWeight: 600, margin: 0 },
  badge: { 
    fontSize: '0.7rem', 
    background: '#238636', 
    padding: '2px 6px', 
    borderRadius: '10px', 
    verticalAlign: 'middle' 
  },
  status: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    color: '#7d8590', 
    fontSize: '0.85rem' 
  },
};

export default Header;