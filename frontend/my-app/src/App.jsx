import { useState } from 'react';
import ClientList from './components/clients/ClientList';
import ClientTypeList from './components/clients/ClientTypeList'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <h1 className="fs-4">Client Management System</h1>
      </header>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            Clients
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'clientTypes' ? 'active' : ''}`}
            onClick={() => setActiveTab('clientTypes')}
          >
            Client Types
          </button>
        </li>
      </ul>

      {activeTab === 'clients' ? <ClientList /> : <ClientTypeList />}
    </div>
  );
}

export default App;