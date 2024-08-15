// App.jsx
import SigninForm from './components/SigninForm/SigninForm'
// src/App.jsx
// src/App.jsx

import HootDetails from './components/HootDetails/HootDetails';
import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm'
import HootForm from './components/HootForm/HootForm';
import HootList from './components/HootList/HootList';

//Services
import * as authService from '../src/services/authService'; 
import * as hootService from './services/hootService';

const App = () => {
  
const [hoots, setHoots] = useState([]);
const [user, setUser] = useState(authService.getUser());






const handleAddHoot = async (hootFormData) => {
  const newHoot = await hootService.create(hootFormData);
  setHoots([newHoot, ...hoots]);
  navigate('/hoots');
};

const navigate = useNavigate();


useEffect(() => {
  const fetchAllHoots = async () => {
  const hootsData = await hootService.index();

    
  setHoots(hootsData);
};
  if (user) fetchAllHoots();
}, [user]);

const handleSignout = () => {
 authService.signout()
 setUser(null)
}

  return (
    <>
       <NavBar user={user} handleSignout={handleSignout} /> 
      

<Routes>
  {user ? (
    // Protected Routes:
    <>
      <Route path="/" element={<Dashboard user={user} />} />
      <Route path="/hoots" element={<HootList  hoots={hoots}/>} />
      <Route path="/hoots/:hootId" element={<HootDetails />} />
      <Route path="/hoots/new" element={<HootForm handleAddHoot={handleAddHoot} />} />

    </>
  ) : (
    // Public Route:
    <Route path="/" element={<Landing />} />
  )}
  <Route path="/signup" element={<SignupForm setUser={setUser} />} />
  <Route path="/signin" element={<SigninForm setUser={setUser} />} />
</Routes>
    </>
  )
};

export default App;