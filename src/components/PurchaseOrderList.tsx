import React, { useState, useEffect } from 'react';
import { getPurchaseOrders,deletePurchaseOrder } from '../services/PurchaseOrderService';
import { PurchaseOrder } from '../interfaces/PurchaseOrder';
import { Link } from 'react-router-dom';

export const PurchaseOrderList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  useEffect(() => {
    loadPurchaseOrders();
  }, []);

  const loadPurchaseOrders = async () => {
    const data = await getPurchaseOrders();
    setPurchaseOrders(data);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Quieres eliminar la Orden de Compra ?")) {
        await deletePurchaseOrder(id);
        loadPurchaseOrders();
    }
};

return (
    <div className="container mt-4">
        <h2>Purchase Orders</h2>
        <Link to='/orders/new' className="btn btn-primary btn-sm mr-2">
            Crear
        </Link>
        <table className="table table-striped table-bordered mt-3">
            <thead className="thead-dark">
            <tr>
                <th>ID</th>
                <th>Codigo</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Articulos</th>
                <th>Acciones</th>
            </tr>
        </thead>
            <tbody>
                {purchaseOrders.map(order => (
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.code}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.client.name} {order.client.lastName}</td>
                    <td>{order.articles.map(article => article.name).join(', ')}</td>
                    <td>
                        <Link to={`/orders/edit/${order.id}`} className="btn btn-warning btn-sm mr-2">
                            Editar
                        </Link>
                        <button 
                            onClick={() => handleDelete(order.id!)} 
                            className="btn btn-danger btn-sm">
                            Eliminar
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};
