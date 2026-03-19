import { validationResult, matchedData } from "express-validator";
import { validateJoinCode } from "../validations/membershipValidations.js";
import { editUserMembership, isAdminCode, isMemberCode } from "../services/membershipServices.js";

function joinClubGet(req, res) {
    return res.render("enterCodeForm");
}

const joinClubPost = [
    validateJoinCode,
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("enterCodeForm", {
                errors: errors.array()
            });
        }

        const { code } = matchedData(req);

        const isAdmin = isAdminCode(code);
        const isMember = isMemberCode(code);
        if(!isAdmin && !isMember) {
            return res.status(422).render("enterCodeForm", {
                errors: [{ msg: "Incorrect code."}]
            });
        }

        try {
            await editUserMembership(id, isAdmin, isMember);
        } catch(error) {
            return next(error);
        }

        return res.redirect("/");
    }
];

export { joinClubGet, joinClubPost };