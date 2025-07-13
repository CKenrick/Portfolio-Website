import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Resume from './Resume.jsx';
import Connect from './Connect.jsx';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Resume' element={<Resume />} />
      <Route path='/Connect' element={<Connect />} />
    </Routes>
  )
}

export default Main;