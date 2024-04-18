import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'


const links = [
  { text: "Inicio", url: "/" },
];

const buttonNav = [
  {text: "Login", url: "/login"},
]



function App() {

  return (
    <div className='App'>
      <Navbar/>
      <div className='container'>
        <Outlet/>
      </div>
    </div>
  )
}

export default App
