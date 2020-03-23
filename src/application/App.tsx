import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../common/header/Header';
import List from '../pages/list/List';
import Subscribe from '../pages/subscribe/Subscibe';
import UnSubscribe from '../pages/unsubscribe/UnSubscribe';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main className={styles.appWrapper}>
          <Route path="/" exact component={Subscribe} />
          <Route path="/List" exact component={List} />
          <Route path="/unsubscribe/:id" component={UnSubscribe} exact />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
