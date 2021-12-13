import { DataTypes, Model, } from "sequelize";
import db from "../config/database.config";
import { UserInstance } from "./user.model";

interface PasswordResetAttributes {
    id: string;
    user_email: string;
    token: string;
}

export class PasswordResetInstance extends Model<PasswordResetAttributes> { }

PasswordResetInstance.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING, 
            allowNull: false,
            references: {
                model: UserInstance,
                key: "email"
            }
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
    sequelize: db, tableName: 'passwordresets',

}
)

