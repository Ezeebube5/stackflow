import { DataTypes, Model, } from "sequelize";
import db from "../config/database.config";
import { UserInstance } from './user.model';
import { AnswerInstance } from './answer.model';

interface VoteAttributes {
    id: string;
    question_id: string;
    user_id: string;
    vote: number;
}

export class VoteInstance extends Model<VoteAttributes> {}

VoteInstance.init(
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
                model: AnswerInstance,
                key: "id"
            }
        },
        vote: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: false,
        },
    },{sequelize: db, tableName: 'votes', 
 
}
)

