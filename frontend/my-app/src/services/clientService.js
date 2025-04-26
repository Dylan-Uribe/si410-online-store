import api from './api';

export const getClients = async () =>{
    try {
        const response = await api.get('/clients');
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
}

export const getClientById = async (id) => {
    try {
        const response = await api.get(`/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching client by ID:', error);
        throw error;
    }
}

export const createClient = async (clientData) => {
    try {
        const response = await api.post('/clients', clientData);
        return response.data;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
}

export const updateClient = async (id, clientData) => {
    try {
        const response = await api.put(`/clients/${id}`, clientData);
        return response.data;
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
}

export const deleteClient = async (id) => {
    try {
        const response = await api.delete(`/clients/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
    }
}
