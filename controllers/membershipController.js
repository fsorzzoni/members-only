import { validationResult, matchedData } from "express-validator";
import { validateJoinCode } from "../validations/membershipValidations";

function joinClubGet(req, res) {

}

const joinClubPost = [
    validateJoinCode,
    async (req, res, next) => {

    }
];