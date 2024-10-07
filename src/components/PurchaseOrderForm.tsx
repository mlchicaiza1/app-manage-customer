import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PurchaseOrder } from '../interfaces/PurchaseOrder';
import { Client } from '../interfaces/Client';
import { Article } from '../interfaces/Article';
import { getClients } from '../services/ClientService';
import { getArticles } from '../services/ArticleService';
import { getPurchaseOrderById, createPurchaseOrder, updatePurchaseOrder } from '../services/PurchaseOrderService';

interface PurchaseOrderProps {
    validate?: PurchaseOrder;
    onSave: () => void;
}

export const PurchaseOrderForm = ({ validate, onSave }:PurchaseOrderProps) => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<PurchaseOrder>(
        validate || { code: '', date: new Date(), client: { id: undefined, name: '', lastName: '' }, articles: [] }
    );
    const [clients, setClients] = useState<Client[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        loadClients();
        loadArticles();
        if (id) {
            loadOrder(Number(id));
        }
    }, [id]);

    const loadClients = async () => {
        const data = await getClients();
        setClients(data);
    };

    const loadArticles = async () => {
        const data = await getArticles();
        setArticles(data);
    };

    const loadOrder = async (orderId: number) => {
        const data = await getPurchaseOrderById(orderId);
        setOrder({
            ...data,
            date: new Date(data.date),
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'date') {
            setOrder({ ...order, date: new Date(value) });
        } else {
            setOrder({ ...order, [name]: value });
        }
    };

    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const clientId = Number(e.target.value);
        const selectedClient = clients.find(client => client.id === clientId);
        if (selectedClient) {
            setOrder({ ...order, client: selectedClient });
        }
    };

    const handleArticlesChange = (selectedArticles: Article[]) => {
        setOrder({ ...order, articles: selectedArticles });
    };

    const handleSubmit = async () => {
        if (order.id) {
            await updatePurchaseOrder(order.id, order);
        } else {
            await createPurchaseOrder(order);
        }
        onSave();
    };

    return (
        <div className="container mt-4">
            <h2>{id ? 'Edit Purchase Order' : 'Create Purchase Order'}</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="code">Código</label>
                    <input
                        type="text"
                        className="form-control"
                        id="code"
                        name="code"
                        value={order.code}
                        onChange={handleChange}
                        placeholder="Ingrese Codigo"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Fecha Orden</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={order.date.toISOString().split('T')[0]}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="client">Selecione Cliente</label>
                    <select id="client" className="form-control" onChange={handleClientChange} value={order.client.id}>
                        <option value="">Selecione un Cliente</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.name} {client.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="articles">Selecione Articulos</label>
                    <select multiple id="articles" className="form-control" onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions);
                        const selectedArticles = selectedOptions.map(option => {
                            const articleId = Number(option.value);
                            return articles.find(article => article.id === articleId);
                        }).filter(Boolean) as Article[];
                        handleArticlesChange(selectedArticles);
                    }}>
                        {articles.map(article => (
                            <option key={article.id} value={article.id}>
                                {article.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>
                    Guardar
                </button>
            </form>
        </div>
    );
};

