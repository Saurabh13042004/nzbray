
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
     </Routes>
    </Router>
    </div>
  )
}

export default App
