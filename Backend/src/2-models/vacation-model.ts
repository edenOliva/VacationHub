import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image: UploadedFile;
    public imageUrl: string;
    public imageName: string;
    public likes: number;

    public constructor (vacation: VacationModel){

        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
        this.likes = vacation.likes;
    }

    private static postValidationSchema = Joi.object({

        vacationId: Joi.number().forbidden().positive().integer(),
        destination: Joi.string().required().min(3).max(25),
        description: Joi.string().required().min(10).max(500),
        startDate: Joi.date().required().greater(new Date()).messages({
            'date.greater': 'Start date must be greater than today',
        }),
        endDate: Joi.date().required().greater(Joi.ref('startDate')).messages({
            'date.greater': 'End date must be greater than start date',
        }),
        price: Joi.number().required().positive().max(10000),
        imageUrl: Joi.string().forbidden(),
        image: Joi.required(),
        likes: Joi.number().forbidden()
        
    });

    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(3).max(25),
        description: Joi.string().required().min(10).max(500),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().greater(Joi.ref('startDate')).messages({
            'date.greater': 'End date must be greater than start date',
        }),
        price: Joi.number().required().positive().max(10000),
        imageUrl: Joi.string().optional(),
        image: Joi.optional(),
        likes: Joi.number().optional()
     });

    public validatePost(): void {
        const result = VacationModel.postValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
     }

    public validatePut(): void {
        const result = VacationModel.putValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
     }

}

export default VacationModel;