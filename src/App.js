import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import Item from './components/Item';
import ItemsToPrint from './components/ItemsToPrint';
import PrintPage from './components/PrintPage';

function App() {
  return (
    <Router>
    <div>
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
