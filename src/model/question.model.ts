import { DataTypes, Model, } from "sequelize";
import db from "../config/database.config";
import { AnswerInstance } from "./answer.model";
import { UserInstance } from './user.model';

interface QuestionAttributes {
    id: string;
    user_id: string;
    title: string;
    desc: string;
}

export class QuestionInstance extends Model<QuestionAttributes> { }

QuestionInstance.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: UserInstance,
                key: "id"
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
    sequelize: db, tableName: 'questions',

}
)


QuestionInstance.hasMany(AnswerInstance, {
    foreignKey: {
        name: 'question_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
AnswerInstance.belongsTo(QuestionInstance)

