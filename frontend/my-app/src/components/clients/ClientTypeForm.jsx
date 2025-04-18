import { useState, useEffect } from 'react';

const ClientTypeForm = ({ clientType, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (clientType) {
      setFormData({
        id: clientType.id,
        name: clientType.name || '',
        description: clientType.description || ''
      });
    }
  }, [clientType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditing = Boolean(clientType && clientType.id);

  return (
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
              value={formData.name}
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
              value={formData.description || ''}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-success me-2">
              {isEditing ? 'Update' : 'Save'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientTypeForm;