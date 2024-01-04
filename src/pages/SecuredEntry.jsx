import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, getDocs} from 'firebase/firestore';
import { db } from '../firebase'; // Replace with your actual Firebase configuration import\
import { toast, ToastContainer } from 'react-toastify';
import { FaExclamationTriangle, FaTools } from 'react-icons/fa';


function SecuredEntry() {
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const construction = false;

  const checkConstructionPage = async () => {
    try {
      const constructionCollection = collection(db, 'constructionPage');
      const constructionSnapshot = await getDocs(constructionCollection);
      const constructionList = constructionSnapshot.docs.map((doc) => {
        const constructionData = doc.data();
        return {
          enabled: constructionData.enabled,
        };
      });
      const enab = constructionList[0].enabled;
      
      if (enab) {
        navigate('/maintenance');
      }
      
      
     
    } catch (error) {
      console.error('Error fetching construction page:', error);
    }
  };
  useEffect(() => {

    checkConstructionPage();
       

    // Check if the access code is stored in the browser's cookie
    const storedAccessCode = Cookies.get('user');
    if(construction){
      navigate('/maintenance');
    }
    else{
      if(storedAccessCode){
        navigate('/home');
      }
    }
    console.log(construction)
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

  const closeModal = () => {
    setShowModal(false);
  };
  const checkAccessCodeValidity = async (id) => {
    try {
      const accessCodesCollection = collection(db, 'accessCodes');
      const accessSnapshot = await getDocs(accessCodesCollection);
      const accessCodesList = accessSnapshot.docs.map((doc) => {
        const accessCodeData = doc.data();
        return {
          accessCode: accessCodeData.code,
        };
      });
      const accessCodes = accessCodesList.map((accessCode) => accessCode.accessCode);

      return accessCodes.includes(id);
    } catch (error) {
      console.error('Error checking access code validity:', error);
      toast.error('Error checking access code validity:', error);
      return false;
    }
  };

  const handleAccessCodeSubmit = async () => {
    setLoading(true);
    const accessCodeValid = await checkAccessCodeValidity(accessCode);
    setLoading(false);
    if (accessCodeValid ) {
      // Set cookie to remember user
      Cookies.set('user', accessCode);
      // Redirect user to home page
      if(construction){
        navigate('/');
      }
      else{
        navigate('/home');
      }
 
      toast.success('Login Successful');
    } else {
      toast.error('Invalid access code. Please try again.');
    }
  };



  return (
    <div>
     
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="w-[70%] h-[70%] object-cover mx-auto"
          src="https://raw.githubusercontent.com/Saurabh13042004/usenet/main/frontend/src/assets/adad.gif?token=GHSAT0AAAAAACMKHO4PZLUCXBUJXVYMYBKUZMWI6HQ"
          onClick={() => document.getElementById('modal').showModal()}
        />
      </div>

      <dialog id="modal" className="modal">
        <div className="modal-box p-6 flex flex-col items-center">
          <form method="dialog" className="mb-4">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4 text-center">Secured Login</h3>
          <p className="text-center mb-4">Please enter your access code to continue</p>
          <input
            type="text"
            placeholder="Enter Your Access Code Here"
            className="input input-bordered w-full max-w-xs text-center mb-4"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />
          <button
            className="btn w-full max-w-xs text-center mb-4"
            onClick={handleAccessCodeSubmit}
            disabled={loading}
          >
            Login
          </button>
        </div>
      </dialog>
      <ToastContainer />
    </div>
   
  
  );
}

export default SecuredEntry;