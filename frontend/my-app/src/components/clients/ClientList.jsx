import { useState, useEffect } from 'react';
import { getClients } from '../../services/clientService';
import api from '../../services/api';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [clientTypes, setClientTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await getClients();
        
        setClients(clientsData || []);

        const typesResponse = await api.get('/client-types');
        const typesMap = {};
        (typesResponse.data || []).forEach(type => {
          typesMap[type.id] = type.name;
        });
        setClientTypes(typesMap);
        setLoading(false);

      } catch (err) {
        setError('Error loading data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Client List</h2>
      
      {clients.length === 0 ? (
        <p>No clients found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phoneNumber}</td>
                <td>{clientTypes[client.clientTypeId] || 'Unknown Type'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientList;