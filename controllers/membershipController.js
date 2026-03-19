import { validationResult, matchedData } from "express-validator";
import { validateJoinCode } from "../validations/membershipValidations.js";
import { editUserMembership, isAdminCode, isMemberCode } from "../services/membershipServices.js";

function joinClubGet(req, res) {
    return res.render("enterCodeForm");
}

const joinClubPost = [
    validateJoinCode,
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).render("enterCodeForm", {
                code: req.body.code,
                errors: errors.array()
            });
        }

        const { code } = matchedData(req);

        const isAdmin = isAdminCode(code);
        const isMember = isMemberCode(code);

        try {
            editUserMembership(id, isAdmin, isMember);

            return res.redirect("/");
        } catch(error) {
            return next(error);
        }
    }
];