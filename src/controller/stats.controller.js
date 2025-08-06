import { statsService } from "../services/stats.service.js";
import { logger } from "../utils/logger.js";

const getStats = async (req, res) => {
    const { period = "all" } = req.query; // daily, weekly, monthly, yearly, all
    try {
        const stats = await statsService.getStats(period);
        res.status(200).json({ status: "success", payload: stats });
    } catch (error) {
        logger.error(`GET /stats - ${error.message}`);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

export default {
    getStats,
};
