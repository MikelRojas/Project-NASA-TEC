import React from 'react';
import './PopupStyles.css';

interface PopupMessageProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const PopupMessage: React.FC<PopupMessageProps> = ({ title, message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-message">
        <div className="popup-header">
          <h5>{title}</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div className="popup-body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};
