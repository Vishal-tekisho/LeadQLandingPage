import React from 'react';

interface StardustButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const StardustButton: React.FC<StardustButtonProps> = ({
  children = "Discover Excellence",
  onClick,
  className = "",
  ...props
}) => {
  const buttonStyle: React.CSSProperties = {
    outline: 'none',
    cursor: 'pointer',
    border: 0,
    position: 'relative',
    borderRadius: '100px',
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transition: 'all 0.3s ease',
    boxShadow: `
      0 0 20px rgba(217, 119, 6, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.1),
      0 4px 30px rgba(0, 0, 0, 0.3)
    `,
  };

  const wrapStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.95)',
    padding: '20px 36px',
    borderRadius: 'inherit',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(0, 0, 0, 0.1) 100%)',
    border: '1px solid rgba(217, 119, 6, 0.3)',
  };

  const pStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: 0,
    transition: 'all 0.2s ease',
  };

  const glassStyles = `
    .stardust-button::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(217, 119, 6, 0.1) 100%
      );
      pointer-events: none;
    }
    
    .stardust-button .wrap::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      border-radius: inherit;
      pointer-events: none;
    }
    
    .stardust-button:hover {
      transform: scale(1.05);
      box-shadow:
        0 0 35px rgba(217, 119, 6, 0.5),
        inset 0 1px 1px rgba(255, 255, 255, 0.15),
        0 8px 40px rgba(0, 0, 0, 0.4);
    }
    
    .stardust-button:hover .wrap {
      border-color: rgba(217, 119, 6, 0.5);
      background: linear-gradient(135deg, rgba(217, 119, 6, 0.25) 0%, rgba(0, 0, 0, 0.15) 100%);
    }
    
    .stardust-button:hover .wrap p {
      transform: translateX(4px);
    }
    
    .stardust-button:active {
      transform: scale(1.02) translateY(2px);
      box-shadow:
        0 0 25px rgba(217, 119, 6, 0.4),
        inset 0 1px 1px rgba(255, 255, 255, 0.1),
        0 4px 20px rgba(0, 0, 0, 0.3);
    }
  `;

  return (
    <>
      <style>{glassStyles}</style>
      <button
        className={`stardust-button ${className}`}
        style={buttonStyle}
        onClick={onClick}
        {...props}
      >
        <div className="wrap" style={wrapStyle}>
          <p style={pStyle}>
            <span style={{ color: 'rgba(245, 158, 11, 0.9)' }}>✧</span>
            {children}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: '4px', transition: 'transform 0.2s ease' }}
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </p>
        </div>
      </button>
    </>
  );
};

export default StardustButton;
