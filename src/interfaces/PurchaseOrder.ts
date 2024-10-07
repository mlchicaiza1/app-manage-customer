import { Client } from './Client';
import { Article } from './Article';

export interface PurchaseOrder {
  id?: number;
  code: string;
  date: Date;
  client: Client;
  articles: Article[];
}