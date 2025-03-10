import express from 'express';
import dotenv from 'dotenv';
import { handleShopifyAuth, handleShopifyCallback } from './shopifyAuth.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Rutas
app.get('/auth', handleShopifyAuth);
app.get('/auth/callback', handleShopifyCallback);

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
