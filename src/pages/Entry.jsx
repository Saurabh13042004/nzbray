import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Replace with your actual Firebase configuration import
import { useNavigate } from 'react-router-dom';


 // Empty dependency array to ensure this effect runs only once on component mount
function Entry() {
  
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
    console.log(enab)
    
    if (enab) {
      navigate('/maintenance');
    }
    else {
      navigate('/');
    }
    
    
   
  } catch (error) {
    console.error('Error fetching construction page:', error);
  }
};
  const navigate = useNavigate();
  useEffect(() => {
    checkConstructionPage();
  }, []);
  return (
    <div>
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://imgs.search.brave.com/Nra-UusUgviVuPyGOSquILj48CH2xF0DSzfpb2fLgJI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9iMjM2/NDM0MS5zbXVzaGNk/bi5jb20vMjM2NDM0/MS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8wMS93ZWItcGFn/ZS11bmRlci1jb25z/dHJ1Y3Rpb24uanBl/Zz9sb3NzeT0xJnN0/cmlwPTEmd2VicD0x)'}}>
       <div className="hero-overlay bg-opacity-60"></div>
       <div className="hero-content text-center text-neutral-content">
         <div className="max-w-md ">
           <FaTools className="text-8xl mx-auto text-yellow-500 mb-5" /> {/* Tool icon */}
           <h1 className="mb-5 text-6xl font-bold">
             Under Construction
           </h1>
           <p className="text-xl mb-5">
            
             Sorry for the inconvenience, we are currently working on this page. Please check back later.
           </p>
         </div>
       </div>
     </div>
    </div>
  );
}

export default Entry;
