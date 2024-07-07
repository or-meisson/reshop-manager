import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import Item from './components/Item';
import ItemsToPrint from './components/ItemsToPrint';
import PrintPage from './components/PrintPage';
import Auth from './components/Auth';
import { auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';


function App() {
  const [user, loadingAuth] = useAuthState(auth);
  


  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Auth />;
  }
  return (
    <Router>
    <div className='relative w-full h-full'>
      <Routes> 
        <Route path="/" exact element={<Home/>} />
        <Route path="/add-item" element={<AddItem />} /> 
        <Route path="/items"  element={<ItemList />} /> 
        <Route path="/choose-items-to-print"  element={<ItemsToPrint />} /> 
        <Route path="/item/:id"  element={<Item />} /> 
        <Route path="/print" element={<PrintPage />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
