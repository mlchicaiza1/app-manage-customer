import React, { useEffect, useState } from 'react';
import { Article } from '../interfaces/Article';
import { getArticleById,createArticle, updateArticle } from '../services/ArticleService';
import { useParams } from 'react-router-dom';

interface ArticleProps {
  validate?: Article;
  onSave: () => void;
}

export const ArticleForm = ({ validate, onSave }:ArticleProps) => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article>(
        validate || { code: '', name: '', price: 0 }
    );

    useEffect(() => {
        if (id) {
          loadArticle(Number(id));
        }
    }, [id]);

    const loadArticle = async (articleId: number) => {
        const data = await getArticleById(articleId);
        setArticle(data);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };

    const handleSubmit = async () => {
        if (article.id) {
        await updateArticle(article.id, article);
        } else {
        await createArticle(article);
        }
        onSave();
    };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Articulo' : 'Crear Articulo'}</h2>
      <form>
        <div className="form-group">
          <label htmlFor="code">Código</label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            value={article.code}
            onChange={handleChange}
            placeholder="Ingrese Codigo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={article.name}
            onChange={handleChange}
            placeholder="Ingrese Nombre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={article.price}
            onChange={handleChange}
            placeholder="Ingrese Previo"
          />
        </div>
        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit}>
          Guardar
        </button>
      </form>
    </div>
  );
};

//export default ArticleForm;
