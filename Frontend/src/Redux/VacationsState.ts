import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. Vacations State 
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Vacations Action Type
export enum VacationsActionType {
    FetchVacations,
    AddVacation,
    UpdateVacation,
    DeleteVacation
}

// 3. Vacations Action 
export interface VacationsAction {
    type: VacationsActionType;
    payload: any; 
}

// 4. Vacations Reducer
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    // Duplicate current state into a new state
    const newState = { ...currentState };

    // Perform the needed action on the newState
    switch (action.type) {

        case VacationsActionType.FetchVacations: // Here, the payload is all vacations for saving
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: // Here, the payload is a vacation object for adding
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: // Here, the payload is a vacation object for updating
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation: // Here, the payload is the vacation id for deleting
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload)
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;
    }

    // Return the newState
    return newState;
}

// 5. Vacations Store 
export const vacationsStore = createStore(vacationsReducer);