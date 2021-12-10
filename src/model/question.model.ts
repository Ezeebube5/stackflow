import { DataTypes, Model, } from "sequelize";
import db from "../config/database.config";

interface QuestionAttributes {
    id: string;
    user_id: string; //TODO: REMOVE NULL ONCE USER IS BEING PASSED
    title: string;
    desc: string;
}

export class QuestionInstance extends Model <QuestionAttributes> {}

QuestionInstance.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
         user_id: {
            type: DataTypes.UUID, //TODO: relate this to user table
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
         title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
         desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{sequelize: db, tableName: 'questions', 
    // hooks:{
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     beforeCreate:(question: any, options)=> {
    //         question.id = uuidv4();
    // }
}
)