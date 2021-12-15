import { DataTypes, Model, } from "sequelize";
import db from "../config/database.config";
import { UserInstance } from './user.model';
import { QuestionInstance } from './question.model';

interface SubscriptionAttributes {
    id: string;
    question_id: string;
    user_email: string;
}

export class SubscriptionInstance extends Model<SubscriptionAttributes> { }

SubscriptionInstance.init(
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
        question_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: QuestionInstance,
                key: "id"
            }
        },
    }, {
        sequelize: db, tableName: 'subscriptions',

}
)

