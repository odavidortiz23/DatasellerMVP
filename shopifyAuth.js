import axios from 'axios';

const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_APP_URL } = process.env;

export function handleShopifyAuth(req, res) {
    const { shop } = req.query;

    if (!shop) {
        return res.status(400).send('Falta el parámetro "shop"');
    }

    const redirectUri = `${SHOPIFY_APP_URL}/auth/callback`;
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products,read_orders,read_analytics,read_customers&redirect_uri=${redirectUri}`;

    res.redirect(installUrl);
}

export async function handleShopifyCallback(req, res) {
    const { shop, code } = req.query;

    if (!shop || !code) {
        return res.status(400).send('Faltan parámetros en la callback');
    }

    try {
        const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
            client_id: SHOPIFY_API_KEY,
            client_secret: SHOPIFY_API_SECRET,
            code,
        });

        const accessToken = response.data.access_token;
        console.log(`Access Token recibido: ${accessToken}`);

        res.send('App instalada correctamente. Ya puedes cerrar esta pestaña.');
    } catch (error) {
        console.error('Error al intercambiar código por token:', error);
        res.status(500).send('Error al completar la instalación');
    }
}
