import { DataTypes, Model, } from "sequelize";
import db from "../config/database.config";

interface UserAttributes {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    email_verified: boolean;
}

export class UserInstance extends Model<UserAttributes> { }

UserInstance.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,

        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
    sequelize: db, tableName: 'users',
    // hooks:{
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     beforeCreate:(User: any, options)=> {
    //         question.id = uuidv4();
    // }
}
)