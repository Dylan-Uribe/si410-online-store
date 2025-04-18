import { useState, useEffect } from 'react';
import { getClientsTypes, createClientType, updateClientType, deleteClientType } from '../../services/clientTypeService';

const ClientTypeList = () => {
  const [clientTypes, setClientTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newClientType, setNewClientType] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    loadClientTypes();
  }, []);

  const loadClientTypes = () => {
    getClientsTypes()
      .then((data) => {
        setClientTypes(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error loading client types');
        setLoading(false);
        console.error(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClientType({
      ...newClientType,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      updateClientType(newClientType.id, newClientType)
        .then(() => {
          loadClientTypes();
          resetForm();
          alert('Client type updated successfully');
        })
        .catch(error => {
          console.error("Error updating:", error);
          alert('Error updating client type');
        });
    } else {
      createClientType(newClientType)
        .then(() => {
          loadClientTypes();
          resetForm();
          alert('Client type created successfully');
        })
        .catch(error => {
          console.error("Error creating:", error);
          alert('Error creating client type');
        });
    }
  };

  const handleUpdate = (clientType) => {
    setIsEditing(true);
    setNewClientType(clientType);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client type?')) {
      deleteClientType(id)
        .then(() => {
          setClientTypes(clientTypes.filter(type => type.id !== id));
          alert('Client type deleted successfully');
        })
        .catch(error => {
          console.error("Error deleting:", error);
          alert('Error deleting client type');
        });
    }
  };

  const resetForm = () => {
    setNewClientType({ name: '', description: '' });
    setShowForm(false);
    setIsEditing(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Client Types</h2>
      
      <button 
        className="btn btn-primary mb-4" 
        onClick={() => {
          if (showForm && isEditing) {
            resetForm();
          } else {
            setShowForm(!showForm);
          }
        }}>
        {showForm ? 'Cancel' : 'Add Client Type'}
      </button>
      
      {showForm && (
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">{isEditing ? 'Update Client Type' : 'Create New Client Type'}</h4>
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
                  value={newClientType.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  id="description"
                  name="description"
                  value={newClientType.description || ''}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <button type="submit" className="btn btn-success">
                {isEditing ? 'Update Client Type' : 'Save Client Type'}
              </button>
            </form>
          </div>
        </div>
      )}
      
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {clientTypes.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No client types found</td>
            </tr>
          ) : (
            clientTypes.map(type => (
              <tr key={type.id}>
                <td>{type.id}</td>
                <td>{type.name}</td>
                <td>{type.description || ''}</td>
                <td>
                  <button 
                    className="btn btn-info me-2" 
                    onClick={() => handleUpdate(type)}>
                    Update
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(type.id)}>
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

export default ClientTypeList;