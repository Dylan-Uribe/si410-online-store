import api from './api';

export const getClientsTypes = async () => {
    try {
        const response = await api.get('/client-types');
        return response.data;
    } catch (error) {
        console.error('Error fetching client types:', error);
        throw error;
    }
}

export const getClientTypeById = async (id) => {
    try {
        const response = await api.get(`/client-types/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching client type by ID:', error);
        throw error;
    }
}

export const createClientType = async (clientTypeData) => {
    try {
        const response = await api.post('/client-types', clientTypeData);
        return response.data;
    } catch (error) {
        console.error('Error creating client type:', error);
        throw error;
    }
}

export const updateClientType = async (id, clientTypeData) => {
    try {
        const response = await api.put(`/client-types/${id}`, clientTypeData);
        return response.data;
    } catch (error) {
        console.error('Error updating client type:', error);
        throw error;
    }
}

export const deleteClientType = async (id) => {
    try {
        const response = await api.delete(`/client-types/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting client type:', error);
        throw error;
    }
}