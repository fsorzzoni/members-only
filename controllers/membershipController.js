import { validateJoinCode } from "../validations/membershipValidations.js";
import { joinCodeHandler } from "../middlewares/memberMiddleware.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";

const joinClubGet = [
    ensureAuthenticated,
    (req, res) => {
        return res.render("enterCodeForm");
    }
];

const joinClubPost = [
    ensureAuthenticated,
    validateJoinCode,
    joinCodeHandler
];

export { joinClubGet, joinClubPost };