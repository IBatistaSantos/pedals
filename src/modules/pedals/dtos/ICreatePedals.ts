import { Pedals } from "src/shared/schema/entities/Pedals";

type IRequest = Omit<Pedals, "id" |  'createdAt' | "user">;


interface ICreatePedalsDTO {
    id: string,
    name: string,
    start_date: Date,
    start_date_registration : Date,
    start_place : Date,
    end_date_registration: Date,
    additional_information?: string,
    participants_limit?: number,
    userId: string,
}
export {ICreatePedalsDTO, IRequest}