import React from 'react';
import styles from 'app.module.scss';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<div className={styles.app}>App</div>} />
    </Routes>
  </Router>
);
