import React, { useReducer, createContext, useContext, useEffect } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ErrorPage from './components/error';
import { initialState, reducer } from "./reducer/UseReducer";



// create a contextAPI 
export const UserContext = createContext();


const Routing = () => {
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate();
  
useEffect(()=>{
 if(!state){
    if(window.location.pathname.startsWith('/signup')){
      navigate('/signup')
    }else{
          navigate('/login')
    }
  }else{
    if (window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/signup')) {
      navigate('/')
    }
  }
},[])
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}
function App() {

  //* use useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state)
 
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <NavBar />
      <Routing />
    </UserContext.Provider>

  )
}

export default App;
