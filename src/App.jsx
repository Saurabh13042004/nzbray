
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
function App() {

  return (
    <div style={{ paddingTop: '60px' }}>
    <Router>
     <Navbar/>

     <Routes>

      <Route path='/' element={<SignUp/>}/>
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
     </Routes>
    </Router>
    </div>
  )
}

export default App
