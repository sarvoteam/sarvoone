import React from 'react';

export default function ErrorLogConsole({ logs }) {
  return (
    <div style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', borderRadius: '12px', padding: '20px', fontFamily: 'Consolas, monospace', fontSize: '12px', overflowX: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid #333' }}>
      
      {logs.map(log => (
        <div key={log.id} style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: log.severity === 'FATAL' ? '#f48771' : '#cca700', fontWeight: 'bold' }}>
              [{log.severity}] {log.timestamp}
            </span>
            <span style={{ color: '#858585' }}>Hits: {log.hits}</span>
          </div>
          <div style={{ color: '#f14c4c', fontWeight: 'bold', fontSize: '13px' }}>{log.message}</div>
          <div style={{ color: '#4fc1ff', marginTop: '2px' }}>File: {log.file}:{log.line}</div>
        </div>
      ))}

    </div>
  );
}
