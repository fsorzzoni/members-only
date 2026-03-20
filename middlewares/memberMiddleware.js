import { validationResult, matchedData } from "express-validator";
import { editUserMembership, isAdminCode, isMemberCode } from "../services/membershipServices.js";

async function joinCodeHandler(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).render("enterCodeForm", {
            errors: errors.array()
        });
    }

    const { code } = matchedData(req);

    const isAdmin = isAdminCode(code) || req.user.is_admin;
    const isMember = isMemberCode(code) || isAdmin || req.user.is_member;
    if(!isAdmin && !isMember) {
        return res.status(422).render("enterCodeForm", {
            errors: [{ msg: "Incorrect code."}]
        });
    }

    try {
        // req.user.id garantizado por ensureAuthenticated
        await editUserMembership(req.user.id, isAdmin, isMember);
    } catch(error) {
        return next(error);
    }

    return res.redirect("/");
}

export { joinCodeHandler };