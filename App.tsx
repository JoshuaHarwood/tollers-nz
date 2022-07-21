import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './accounts/Login';
import Register from './accounts/Register';
import Reset from './accounts/Reset';
import AddToller from './dashboard/AddToller';
import Dashboard from './dashboard/Dashboard';
import ViewTollerTree from './dashboard/ViewTollerTree';
import './style.css';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/add-toller" element={<AddToller />} />
          <Route exact path="/view-toller-tree" element={<ViewTollerTree />} />
        </Routes>
      </Router>
    </div>
  );
}
