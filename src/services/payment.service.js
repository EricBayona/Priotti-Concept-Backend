import pkg from 'mercadopago';
const { MercadoPagoConfig, Preference } = pkg;

// Instancia configurada con tu token
const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});

// Instancia del módulo de preferencias
const preference = new Preference(client); // ✅ acá estaba el error que habías eliminado

export const paymentService = {
    async createPreference(cart) {
        const items = cart.products.map((item) => ({
            title: item.product.title,
            unit_price: item.product.price,
            quantity: item.quantity,
            currency_id: "ARS",
        }));

        const preferenceData = {
            items,
            back_urls: {
                success: "https://bayonabikestore.netlify.app/",
                failure: "https://bayonabikestore.netlify.app/",
                pending: "https://bayonabikestore.netlify.app/",
            },
            auto_return: "approved",
        };

        console.log(preferenceData); // Debug

        // ✅ Usamos la instancia preference correctamente
        const result = await preference.create({ body: preferenceData });
        return result;
    }
};
