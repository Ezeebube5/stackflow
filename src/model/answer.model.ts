import { DataTypes, Model, } from "sequelize";
import db from "../config/database.config";
import { UserInstance } from './user.model';
import { QuestionInstance } from './question.model';

interface AnswerAttributes {
    id: string;
    question_id: string;
    user_id: string;
    response: string;
}

export class AnswerInstance extends Model<AnswerAttributes> {}

AnswerInstance.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
         user_id: {
            type: DataTypes.UUID, 
            allowNull: false,
             references: {
                 model: UserInstance,
                 key: "id"
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
        response: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },{sequelize: db, tableName: 'answers', 
 
}
)

