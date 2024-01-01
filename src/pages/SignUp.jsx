import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, updateDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiArchiveRegister } from 'react-icons/gi';
import { db } from '../firebase';
import Cookies from 'js-cookie';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If the user is logged in, navigate to the home page
        navigate('/home');
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  // Function to check the validity of the access code
  const checkAccessCodeValidity = async (id, userEmail) => {
    try {
      const accessCodesCollection = collection(db, 'accessCodes');
      const accessSnapshot  = await getDocs(accessCodesCollection);
      const accessCodesList = accessSnapshot.docs.map((doc) => {
        const accessCodeData = doc.data();
        console.log(accessCodeData.code);
        return {
          accessCode: accessCodeData.code,
        };
      });
      const accessCodes = accessCodesList.map((accessCode) => accessCode.accessCode);
      
      return accessCodes.includes(id) && (userEmail ? userEmail === `${id}@example.com` : true);
    } catch (error) {
      console.error('Error checking access code validity:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const user = auth.currentUser;

      if (user) {
        // If the user is already logged in, proceed as login and check the access code
        const accessCodeValid = await checkAccessCodeValidity(inviteCode, user.email);

        if (!accessCodeValid) {
          // Display error message and return
          setLoading(false);
          toast.error('Invalid access code');
          return;
        }

        // Save access code to cookies
        Cookies.set('accessCode', inviteCode, { expires: 7 });
        Cookies.set('email', user.email, { expires: 7 });

        setLoading(false);
        navigate('/home');
        toast.success('Welcome back to IndexArr!');
      } else {
        // If the user is not logged in, proceed as signup

        // Check the validity of the access code
        const accessCodeValid = await checkAccessCodeValidity(inviteCode);

        if (!accessCodeValid) {
          // Display error message and return
          setLoading(false);
          toast.error('Invalid access code');
          return;
        }

        const dummyEmail = `${inviteCode}@example.com`; // Use a dummy domain or any other predefined domain
        const userCredential = await createUserWithEmailAndPassword(auth, email, inviteCode);
        const newUser = userCredential.user;
  
        // Use the invite code entered by the user
        const enteredInviteCode = inviteCode.trim();
  
        const usersCollection = collection(db, 'users');
  
        // Save user details to Firestore
        const userDoc = {
          userId: newUser.uid,
          email: newUser.email,
          signedIn: serverTimestamp(),
          accessCode: enteredInviteCode,
        };
        
        console.log('Adding user data:', userDoc);
        const addUserResult = await addDoc(usersCollection, userDoc);
        console.log('User added with ID:', addUserResult.id);
        // Save access code to cookies
        Cookies.set('accessCode', enteredInviteCode, { expires: 7 });
        Cookies.set('email', newUser.email, { expires: 7 });
  
        setLoading(false);
        navigate('/home');
        toast.success('Welcome to IndexArr!');
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      setLoading(false);
      // Handle errors
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-md shadow-md bg-base">
        <GiArchiveRegister className="mx-auto h-10 w-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-base-900">
          Register to continue
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-base-300 placeholder-base-500 text-base-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="invite-code" className="sr-only">
              Invite Code
            </label>
            <input
              id="invite-code"
              name="inviteCode"
              type="text"
              onChange={(e) => setInviteCode(e.target.value)}
              autoComplete="off"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-base-300 placeholder-base-500 text-base-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Invite Code"
            />
          </div>

          <div className="flex items-center justify-center">
            {loading ? (
              <span className="loading loading-ring loading-lg"></span>
            ) : (
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            )}
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
