
import './App.css'
import Groups from './components/Groups'
import Navbar from './components/Navbar'
import Search from './components/Search'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Disclaimer from './pages/Disclaimer'
import About from './pages/About'
import SearchResults from './pages/SearchResults'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import GroupResults from './pages/GroupResults'
import Admin from './pages/Admin'
import PostDetails from './pages/PostDetails'
import GroupDetails from './pages/GroupDetails'
import Entry from './pages/Entry'
import Location from './components/Location'
import SecuredEntry from './pages/SecuredEntry'
import Profile from './pages/Profile'
function App() {

  return (
    <div style={{ paddingTop: '60px' }}>
    <Router>
     <Location/>

     <Routes>

      <Route path='/' element={<SecuredEntry/>}/>

      <Route path='/maintenance' element={<Entry/>}/>
      <Route path='/groups' element={<Groups/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/disclaimer' element={<Disclaimer/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/home' element={<Search/>}/>
        <Route path="/group-results" element={<GroupResults />} />
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/post-details/:postId' element={<PostDetails/>}/>
        <Route path='/group/:groupName' element={<GroupDetails/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
     </Routes>
    </Router>
    </div>
  )
}

export default App
