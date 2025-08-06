import { ticketService } from "./ticketService.js";
import { productService } from "./productService.js";

const getDateRange = (period) => {
    const now = new Date();
    let startDate;

    switch (period) {
        case "daily":
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case "weekly":
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
            break;
        case "monthly":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case "yearly":
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        default:
            startDate = null;
    }
    return startDate;
};

class StatsService {
    async getStats(period) {
        const startDate = getDateRange(period);

        const allTickets = await ticketService.getAllTickets();

        // ✅ Filtro por fecha
        const filteredTickets = startDate
            ? allTickets.filter(t => new Date(t.purchase_datetime) >= startDate)
            : allTickets;

        const totalSales = filteredTickets.reduce((acc, t) => acc + t.amount, 0);

        // 📦 Productos vendidos
        const productMap = {};

        for (const ticket of filteredTickets) {
            console.log(ticket);

            const cart = ticket.products || [];
            for (const item of cart) {
                const { product, quantity } = item;
                const productId = typeof product === "object" ? product._id.toString() : product.toString();
                if (!productMap[productId]) {
                    productMap[productId] = 0;
                }
                productMap[productId] += quantity;
            }
        }

        const topProducts = await Promise.all(
            Object.entries(productMap)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(async ([pid, sold]) => {
                    const product = await productService.getProductById(pid);
                    return { name: product.title || "Producto", sold };
                })
        );

        return {
            period,
            totalSales,
            ticketsGenerated: filteredTickets.length,
            topProducts,
        };
    }
}

export const statsService = new StatsService();
