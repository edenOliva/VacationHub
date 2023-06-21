import express, { Request, Response, NextFunction } from "express";
import vacationsService from "../5-services/vacations-service";
import imageHandler from "../4-utils/image-handler";
import VacationModel from "../2-models/vacation-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router();

// GET http://localhost:4000/api/vacations -> All vacations
router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsService.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/vacations/:id -> One vacation
router.get("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationsService.getOneVacation(id);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandler.getImagePath(imageName);
        response.sendFile(imagePath);
    }
    catch (err: any) {
        next(err);
    }
});

// POST (vacation) http://localhost:4000/api/vacations
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {

        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);

        const addedVacation = await vacationsService.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:4000/api/vacations/:id
router.put("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.id;

        // Take image if exist:
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);

        const updatedVacation = await vacationsService.updateVacation(vacation);

        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE (vacation) http://localhost:4000/api/vacations/:id
router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await vacationsService.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE (like)  http://localhost:4000/api/vacations/likes/:id
router.delete("/vacations/likes/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {
        const vacationId = +request.params.id;
        const userId = +request.body.userId;

        await vacationsService.unlike(userId, vacationId);
        response.sendStatus(201);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:4000/api/vacations/likes/:id
router.post("/vacations/likes/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const vacationId = +request.params.id;
        const userId = request.body.data.userId;

        await vacationsService.addLike(userId, vacationId);
        response.sendStatus(201);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:4000/api/vacations/likes-by-user/:id
router.get("/vacations/likes-by-user/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const userId = +request.params.id;

        const likes = await vacationsService.getLikesByUser(userId);
        response.json(likes);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
