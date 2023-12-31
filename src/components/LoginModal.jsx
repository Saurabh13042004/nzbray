import React from 'react';

const LoginModal = ({ onClose }) => {
  return (
    <dialog className="modal" id="loginModal">
      <div className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>
        <h3 className="font-bold text-lg">Login</h3>
        {/* Your login form goes here */}
      </div>
    </dialog>
  );
};

export default LoginModal;
