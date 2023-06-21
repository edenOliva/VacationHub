import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import VacationModel from "../2-models/vacation-model";
import appConfig from "../4-utils/app-config";
import imageHandler from "../4-utils/image-handler";
import { ResourceNotFoundError } from "../2-models/client-errors";
import LikeModel from "../2-models/like-model";

// Get all vacations
async function getAllVacations(): Promise<VacationModel[]> {

    const sql = `SELECT DISTINCT
                    V.* , CONCAT(? , v.imageName) AS imageUrl,
                    COUNT(L.userId) AS likes
                    FROM vacations AS V LEFT JOIN likes as L 
                    ON v.vacationId = L.vacationId
                    GROUP BY vacationId`
    const vacations = await dal.execute(sql, [appConfig.imagesUrl]);

    return vacations;
}

// Get one vacations
async function getOneVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT
                    vacations.vacationId,
                    vacations.destination,
                    vacations.description,
                    vacations.startDate,
                    vacations.endDate,
                    vacations.price,
                    vacations.imageName AS image,
                    CONCAT(? , vacations.imageName) AS imageUrl
                FROM
                    vacations
                WHERE vacations.vacationId = ?;`;

    const vacations = await dal.execute(sql, [appConfig.imagesUrl, id]);

    return vacations;
}

// Add vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    vacation.validatePost();

    let imageName = await imageHandler.saveImage(vacation.image);

    // Set back image url
    vacation.imageUrl = appConfig.imagesUrl + imageName;

    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

    const sentVacation: OkPacket = await dal.execute(sql,
        [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName]);

    vacation.vacationId = sentVacation.insertId;

    // Remove image file from returned vacation
    delete vacation.image;

    return vacation;
}

// Edit vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    vacation.validatePut();

    // Get image name
    let imageName = await getVacationImageName(vacation.vacationId);

    if (vacation.image) {
        // Update image
        imageName = await imageHandler.updateImage(vacation.image, imageName);
    }

    // Set back image url
    vacation.imageUrl = appConfig.imagesUrl + imageName;

    const sql = `UPDATE vacations SET
        destination = ?, description = ?, startDate = ?,
        endDate = ?, price = ?, imageName = ?
        WHERE vacationId = ? `;

    const result: OkPacket = await dal.execute(sql,
        [vacation.destination, vacation.description, vacation.startDate,
        vacation.endDate, vacation.price, imageName, vacation.vacationId])

    // If vacation not found:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Remove image file from returned vacation
    delete vacation.image;

    return vacation;
}

// Get product image name from db
async function getVacationImageName(id: number): Promise<string> {

    const sql = `SELECT imageName FROM vacations WHERE vacationId = ?`;

    const result = await dal.execute(sql, [id]);

    const imageName = result[0]?.imageName;

    return imageName

}

// Delete product
async function deleteVacation(id: number): Promise<void> {

    // Take original image name
    let imageName = await getVacationImageName(id);

    const sql = `DELETE FROM vacations WHERE vacationId = ?`;

    const result: OkPacket = await dal.execute(sql, [id]);

    // If product not found
    if (result.affectedRows === 0) throw new ResourceNotFoundError(id);

    // Delete image 
    await imageHandler.deleteImage(imageName);
}

// Get likes by user
async function getLikesByUser(id: number): Promise<LikeModel> {

    const sql = `SELECT * FROM likes WHERE userId = ?`;

    const likes = await dal.execute(sql, [id]);

    return likes;

}

// Add like to vacation
async function addLike(userId: number, vacationId: number): Promise<void> {

    const sql = `INSERT INTO likes VALUES (?, ?)`;

    await dal.execute(sql, [userId, vacationId]);

}

// Unlike vacation
async function unlike(userId: number, vacationId: number): Promise<void> {

    const sql = `DELETE FROM likes WHERE userId=? AND vacationId=?`;

    await dal.execute(sql, [userId, vacationId]);
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    getLikesByUser,
    addLike,
    unlike
};

