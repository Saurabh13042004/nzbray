import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { IoEnterSharp } from 'react-icons/io5';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function SignIn() {
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate the access code
      const isValidAccessCode = await validateAccessCode();

      if (isValidAccessCode) {
        // Get email from cookies
        const email = Cookies.get('email');
        const authInstance = getAuth();

        // Sign in with email and access code as password
        await signInWithEmailAndPassword(authInstance, email, accessCode);

        setLoading(false);
        toast.success('Welcome back to IndexArr!');
        navigate('/home');
      } else {
        setLoading(false);
        toast.error('Invalid access code or email');
      }
    } catch (error) {
      const errorMessage = error.message;
      console.error(errorMessage);
      setLoading(false);
      toast.error(errorMessage);
    }
  };

  const validateAccessCode = async () => {
    try {
      // Query the 'users' collection for the provided access code and email
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('accessCode', '==', accessCode));

      const querySnapshot = await getDocs(q);

      // Check if the user with the provided access code exists and is associated with the email
      return !querySnapshot.empty;
    } catch (error) {
      throw new Error('Error validating access code');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-md shadow-md bg-base">
        <IoEnterSharp className="mx-auto h-10 w-auto" />

        <h2 className="mt-6 text-center text-3xl font-extrabold text-base-900">
          Sign In to continue
        </h2>

        {/* Sign-in form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="access-code" className="sr-only">
              Access Code
            </label>
            <input
              id="access-code"
              name="accessCode"
              type="text"
              onChange={(e) => setAccessCode(e.target.value)}
              autoComplete="off"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-base-300 placeholder-base-500 text-base-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Access Code"
            />
          </div>

          <div className="flex items-center justify-center">
            {loading ? (
              <div className="loading loading-ring loading-lg"></div>
            ) : (
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            )}
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Don't have an account? {' '}
            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
