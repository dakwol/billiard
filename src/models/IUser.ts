export interface IUser {
    email: string;
    lastname?: string;
    firstname?: string;
    patronymic?: string;
    password: string;
}
export interface IUserReg {
    contact_person_fio: string;
    inn: string;
    legal_address: string;
    name: string;
    phone_number: string;
}