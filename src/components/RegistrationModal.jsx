import React from 'react';

const RegistrationModal = ({ onClose }) => {
  return (
    <dialog className="modal" id="registrationModal">
      <div className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>
        <h3 className="font-bold text-lg">Registration</h3>
        {/* Your registration form goes here */}
      </div>
    </dialog>
  );
};

export default RegistrationModal;
