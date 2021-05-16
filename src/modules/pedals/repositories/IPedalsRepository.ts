import { ICreatePedalsDTO } from "../dtos/ICreatePedals";
import { IResponsePedalsDTO } from "../dtos/IResponsePedals";

interface IPedalsRepository {
  findAll(userId: string): Promise<IResponsePedalsDTO[]> ;
  create({
    id, 
    name, 
    start_date, 
    start_date_registration, 
    end_date_registration, 
    start_place, 
    additional_information, 
    participants_limit, 
    userId }: ICreatePedalsDTO): Promise<IResponsePedalsDTO>;
  
  findByUserId(userId: string): Promise<IResponsePedalsDTO[]>
  findById(id: string): Promise<IResponsePedalsDTO | null>


}

export {IPedalsRepository}