import React, { useEffect, useState } from 'react';
import { Client } from '../interfaces/Client';
import { getClientById, createClient, updateClient } from '../services/ClientService';
import { useParams } from 'react-router-dom';

interface ClientProps {
  validate?: Client;
  onSave: () => void;
}

export const ClientForm = ({ validate, onSave }:ClientProps) => {
    const { id } = useParams<{ id: string }>();
    const [client, setClient] = useState<Client>(
        validate || { id: undefined, name: '', lastName: '' }
    );

    useEffect(() => {
        if (id) {
            loadClient(Number(id));
        }
    }, [id]);

    const loadClient = async (clientId: number) => {
        const data = await getClientById(clientId);
        setClient(data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleSubmit = async () => {
        if (client.id) {
            await updateClient(client.id, client);
        } else {
            await createClient(client);
        }
        onSave();
    };

    return (
        <div className="container mt-4">
            <h2>{id ? 'Edit Client' : 'Create Client'}</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={client.name}
                        onChange={handleChange}
                        placeholder="Ingrese Nombre"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={client.lastName}
                        onChange={handleChange}
                        placeholder="Ingrese Apellido"
                    />
                </div>
                <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>
                    Guardar
                </button>
            </form>
        </div>
    );
};
