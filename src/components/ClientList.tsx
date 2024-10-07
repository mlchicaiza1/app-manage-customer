import  { useState, useEffect } from 'react';
import { getClients } from '../services/ClientService';
import { Client } from '../interfaces/Client';

export const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const data = await getClients();
    setClients(data);
  };

  return (
    <div className="container mt-4">
      <h2>Clientes</h2>
      <table className="table table-striped table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
