interface IResponsePedalsDTO {
  id: string;
  name: string,
   start_date: Date,
   start_date_registration: Date,
   start_place: Date,
   end_date_registration: Date,
   additional_information: string | null,
   participants_limit: number | null,
   userId: string ,
   createdAt: Date
   user?: {
    id: string
    name: string,
    email: string,
    password: string,
  }
}

export {IResponsePedalsDTO}