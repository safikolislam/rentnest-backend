export interface RegisterUserPayload {
    name:string;
    email:string;
    password:string;
    role?:"TENANT" | "LANDLORD" ;
}


export interface IloginUser {
    email:string,
    password:string
}