import axios from "axios";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import LikeModel from "../Models/like-model";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

class VacationsService {

    // Get all vacations
    public async getAllVacations(): Promise<VacationModel[]> {

        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {

            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

            vacations = response.data;
            
            vacationsStore.dispatch({
                type: VacationsActionType.FetchVacations,
                payload: vacations
            });
            
        }
        vacations.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

        return vacations;
    }

    // Get one vacation
    public async getOneVacation(id: number): Promise<VacationModel> {

        let vacations = vacationsStore.getState().vacations;

        let vacation = vacations.find((v) => v.vacationId === id);

        if (!vacation) {
            // Get vacation from db 

            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
            vacation = response.data;
        }

        return vacation;

    }

    // Add vacation
    public async addVacation(vacation: VacationModel): Promise<void> {

        // Create header for sending image inside the body
        const headers = { "Content-Type": "multipart/form-data" };

        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, { headers });

        const addedVacation = response.data;

        vacationsStore.dispatch({
            type: VacationsActionType.AddVacation,
            payload: addedVacation
        });
    }

    // Edit vacation
    public async editVacation(vacation: VacationModel): Promise<void> {

        // Create header for sending image inside the body
        const headers = { "Content-Type": "multipart/form-data" }

        // Send vacation
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, { headers });

        // Get the updated vacation
        const updatedVacation = response.data;
        
        vacationsStore.dispatch({
            type: VacationsActionType.UpdateVacation,
            payload: updatedVacation
        });
    }

    // Delete vacation
    public async deleteVacation(id: number): Promise<void> {

        // Delete vacation on server:
        await axios.delete(appConfig.vacationsUrl + id);

        vacationsStore.dispatch({
            type: VacationsActionType.DeleteVacation,
            payload: id
        });
    }

    // Get users likes
    public async getLikesByUser(id: number): Promise<LikeModel[]> {

        // Get likes by specific user
        const response = await axios.get<LikeModel[]>(appConfig.likesByUserUrl + id);

        const likes = response.data;

        return likes;
    }

    public async unlike(userId: number ,vacation: VacationModel): Promise<void> {

        // Delete like from server:
        await axios.delete(appConfig.likesUrl + vacation.vacationId, { data: { userId } });

    }

    // Add like
    public async AddLike(userId: number, vacationId: number): Promise<void> {

        // Post like:
        await axios.post(appConfig.likesUrl + vacationId, { data: { userId } });

    }

}

const vacationsService = new VacationsService();

export default vacationsService;
