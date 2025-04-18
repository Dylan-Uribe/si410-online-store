import { useState, useEffect } from 'react';
import { getClientsTypes, createClientType, updateClientType, deleteClientType } from '../../services/clientTypeService';
import ClientTypeForm from './ClientTypeForm';
import ClientTypeTable from './ClientTypeTable';

const ClientTypeList = () => {
  const [clientTypes, setClientTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentClientType, setCurrentClientType] = useState(null);

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

  const handleFormSubmit = (formData) => {
    if (formData.id) {
      // Update existing client type
      updateClientType(formData.id, formData)
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
      // Create new client type
      createClientType(formData)
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
    setCurrentClientType(clientType);
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
    setCurrentClientType(null);
    setShowForm(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Client Types</h2>
      
      <button 
        className="btn btn-primary mb-4" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Add Client Type'}
      </button>
      
      {showForm && (
        <ClientTypeForm 
          clientType={currentClientType}
          onSubmit={handleFormSubmit}
          onCancel={resetForm}
        />
      )}
      
      <ClientTypeTable 
        clientTypes={clientTypes}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ClientTypeList;