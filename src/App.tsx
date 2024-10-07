import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ArticleList} from './components/ArticleList';
import './App.css';
import {ClientList} from './components/ClientList';
import {ClientForm} from './components/ClientForm';
import {PurchaseOrderList} from './components/PurchaseOrderList';
import {PurchaseOrderForm} from './components/PurchaseOrderForm';
import { ArticleForm } from './components/ArticleForm';

  const App: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/new" element={<ArticleForm onSave={() => {}} />} />
          <Route path="/articles/edit/:id" element={<ArticleForm onSave={() => {}} />} />

          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientForm onSave={() => {}} />} />
          <Route path="/clients/edit/:id" element={<ClientForm onSave={() => {}} />} />

          <Route path="/orders" element={<PurchaseOrderList />} />
          <Route path="/orders/new" element={<PurchaseOrderForm onSave={() => {}} />} />
          <Route path="/orders/edit/:id" element={<PurchaseOrderForm onSave={() => {}} />} />
        </Routes>
      </Router>
    );
  };
  
  export default App;