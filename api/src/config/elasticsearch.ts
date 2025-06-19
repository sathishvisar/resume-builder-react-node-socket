// src/config/elasticsearch.ts
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200', // Your Elasticsearch instance URL (Change if needed)
});

export default client;
