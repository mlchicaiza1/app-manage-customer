
import  { useState, useEffect } from 'react';
import { getArticles } from '../services/ArticleService';
import { Article } from '../interfaces/Article';

export const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const data = await getArticles();
    setArticles(data);
  };

  return (
    <div className="container mt-4">
      <h2>Articles</h2>
      <table className="table table-striped table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              <td>{article.code}</td>
              <td>{article.name}</td>
              <td>${article.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
