import { useState, useEffect } from 'react';
import { getClients, createClient, updateClient, deleteClient } from '../../services/clientService';
import api from '../../services/api';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [clientTypes, setClientTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    clientTypeId: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    Promise.all([
      getClients(),
      api.get('/client-types')
    ])
      .then(([clientsData, typesResponse]) => {
        setClients(clientsData || []);
        
        const typesMap = {};
        (typesResponse.data || []).forEach(type => {
          typesMap[type.id] = type.name;
        });
        setClientTypes(typesMap);
        setLoading(false);
      })
      .catch(err => {
        setError('Error loading data');
        setLoading(false);
        console.error(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({
      ...newClient,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentClient) {
      // Update existing client
      updateClient(currentClient.id, newClient)
        .then(() => {
          loadData();
          resetForm();
          alert('Client updated successfully');
        })
        .catch(error => {
          console.error("Error updating client:", error);
          alert('Error updating client');
        });
    } else {
      // Create new client
      createClient(newClient)
        .then(() => {
          loadData();
          resetForm();
          alert('Client created successfully');
        })
        .catch(error => {
          console.error("Error creating client:", error);
          alert('Error creating client');
        });
    }
  };

  const handleUpdate = (client) => {
    setCurrentClient(client);
    setNewClient({
      name: client.name || '',
      email: client.email || '',
      phoneNumber: client.phoneNumber || '',
      clientTypeId: client.clientTypeId || ''
    });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      deleteClient(id)
        .then(() => {
          setClients(clients.filter(client => client.id !== id));
          alert('Client deleted successfully');
        })
        .catch(error => {
          console.error("Error deleting client:", error);
          alert('Error deleting client');
        });
    }
  };

  const resetForm = () => {
    setCurrentClient(null);
    setNewClient({
      name: '',
      email: '',
      phoneNumber: '',
      clientTypeId: ''
    });
    setShowForm(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Client List</h2>
      
      <button 
        className="btn btn-primary mb-4"
        onClick={() => {
          if (showForm && currentClient) {
            resetForm();
          } else {
            setShowForm(!showForm);
          }
        }}
      >
        {showForm ? 'Cancel' : 'Add Client'}
      </button>
      
      {showForm && (
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">{currentClient ? 'Update Client' : 'Create New Client'}</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name"
                  name="name"
                  value={newClient.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email"
                  name="email"
                  value={newClient.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="phoneNumber"
                  name="phoneNumber"
                  value={newClient.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="clientTypeId" className="form-label">Client Type</label>
                <select
                  className="form-select"
                  id="clientTypeId"
                  name="clientTypeId"
                  value={newClient.clientTypeId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a client type</option>
                  {Object.entries(clientTypes).map(([id, name]) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <button type="submit" className="btn btn-success me-2">
                  {currentClient ? 'Update' : 'Save'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {clients.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No clients found</td>
            </tr>
          ) : (
            clients.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phoneNumber}</td>
                <td>{clientTypes[client.clientTypeId] || 'Unknown Type'}</td>
                <td>
                  <button 
                    className="btn btn-info me-2"
                    onClick={() => handleUpdate(client)}
                  >
                    Update
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;