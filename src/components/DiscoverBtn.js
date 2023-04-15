import React from 'react';
import ReactDOM from 'react-dom';

const modalBackgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(2px)',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1000,
};

const discoverBtnStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#6B7280',
  color: 'white',
  cursor: 'pointer',
  transition: '0.3s',
};

const DiscoverBtn = () => {
  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = '#4B5563';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = '#6B7280';
  };

  return ReactDOM.createPortal(
    <div style={modalBackgroundStyle}>
      <button
        style={discoverBtnStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Let's see who you can follow
      </button>
    </div>,
    document.body
  );
};

export default DiscoverBtn;
