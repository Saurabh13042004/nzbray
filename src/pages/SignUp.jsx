import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
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
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [apikey, setApikey] = useState('');
  const [password, setpassword] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkAccessCodeValidity = async (id) => {
    try {
      const accessCodesCollection = collection(db, 'accessCodes');
      const accessSnapshot = await getDocs(accessCodesCollection);
      const accessCodeData = accessSnapshot.docs.find((doc) => {
        const accessCodeData = doc.data();
        return accessCodeData.code === id;
      });
  
      return accessCodeData ? { docId: accessCodeData.id, data: accessCodeData.data() } : null;
    } catch (error) {
      console.error('Error checking access code validity:', error);
      toast.error('Error checking access code validity:', error);
      return null;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const accessCodeData = await checkAccessCodeValidity(inviteCode);
      if( accessCodeData){
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const uid = user.uid;
      
         // add user detials to database
  
        const addNweUser = async () => {
          try {
            const userCollection = collection(db, 'users');
            const payload = {
              email: email,
              inviteCode: inviteCode,
              host: host,
              port: port,
              apikey: apikey,
              createdAt: serverTimestamp(),
              uid: uid,
            };
            const docRef = await addDoc(userCollection, payload);
            console.log('Document written with ID: ', docRef.id);
          } catch (error) {
            console.error('Error adding document: ', error);
  
          }
        };
        addNweUser();
        // Set cookie to remember user
        Cookies.set('user', inviteCode);
        // Redirect user to home page
  
  
          navigate('/home');
          setLoading(false);
        } else{
          toast.error('Invalid access code. Please try again.');
        }
      } catch (error) {
        console.error('Error creating user:', error);
        toast.error('Error creating user:', error);
        setLoading(false);
      }
    setLoading(false);
  };
  
    




  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-md shadow-md bg-base-200">
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
              value = {inviteCode}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-base-300 placeholder-base-500 text-base-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Invite Code"
            />
            {/* </div>
           Details of SABDnzb */}
          </div>
          <div>

            <label htmlFor="host" className="sr-only">
              SABnzbd Host
            </label>
            <input
              id="host"
              name="host"
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              autoComplete="off"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-base-300 placeholder-base-500 text-base-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="SABnzbd Host"
            />



          </div>

          <div>

            <label htmlFor="port" className="sr-only">
              SABnzbd Port
            </label>
            <input
              id="port"
              name="Port"
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              autoComplete="off"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-base-300 placeholder-base-500 text-base-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="SABnzbd Port"
            />



          </div>

          <div>

            <label htmlFor="apikey" className="sr-only">
              SABnzbd Api Key
            </label>
            <input
              id="apikey"
              name="Apikey"
              type="text"
              value={apikey}
              onChange={(e) => setApikey(e.target.value)}
              autoComplete="off"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-base-300 placeholder-base-500 text-base-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="SABnzbd API Key"
            />



          </div>

          <div>
            
          <label htmlFor="password" className="sr-only">
             Password
            </label>
            <input
              id="password"
              name="password"
              type="text"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              autoComplete="off"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-base-300 placeholder-base-500 text-base-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
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
               Register
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
