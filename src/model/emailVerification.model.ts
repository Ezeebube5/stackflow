import { DataTypes, Model, } from "sequelize";
import db from "../config/database.config";
import { UserInstance } from "./user.model";

interface EmailVerificationAttributes {
    id: string;
    user_email: string; 
    token: string;
}

export class EmailVerificationInstance extends Model<EmailVerificationAttributes> {}

EmailVerificationInstance.init(
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
    },{sequelize: db, tableName: 'emailverifications', 
 
}
)

