const ClientTypeTable = ({ clientTypes, onUpdate, onDelete }) => {
    return (
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
                    onClick={() => onUpdate(type)}
                  >
                    Update
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => onDelete(type.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  };
  
  export default ClientTypeTable;