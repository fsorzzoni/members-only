import { ensureAuthenticated } from "../middlewares/authMiddleware.js";

const mainPageGet = [
    ensureAuthenticated,
    (req, res) => {
        return res.render("mainPage");
    }
];

export { mainPageGet };