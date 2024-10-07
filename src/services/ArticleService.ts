import { Article } from '../interfaces/Article';
import axios from 'axios';

const API_URL = 'http://localhost:8080/v1/api/article';

export const getArticles = async (): Promise<Article[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getArticleById = async (id: number): Promise<Article> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  };

export const createArticle = async (article: Article): Promise<Article> => {
  const response = await axios.post(API_URL, article);
  return response.data;
};

export const updateArticle = async (id: number, article: Article): Promise<Article> => {
  const response = await axios.put(`${API_URL}/${id}`, article);
  return response.data;
};

export const deleteArticle = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
