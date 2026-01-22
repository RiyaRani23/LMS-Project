import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/login.jsx'
import HeroSection from './pages/student/HeroSection'

function App() {

  return (
    <main>
      <Navbar/>
      <HeroSection/>
      <Login/>
    </main>
  )
}

export default App
