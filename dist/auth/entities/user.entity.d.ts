export declare class User {
    _id?: string;
    number: string;
    name: string;
    lastname: string;
    birth: string;
    gender: string;
    phone: string;
    password?: string;
    roles: string;
    especialidad: string;
    cedula: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: string;
}>>;
