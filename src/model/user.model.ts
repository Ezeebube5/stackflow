import { DataTypes, Model, } from "sequelize";
import db from "../config/database.config";
import AuthUtils from '../utils/authentication'
import { EmailVerificationInstance } from "./emailVerification.model";
import { PasswordResetInstance } from "./passwordReset.model";
import { QuestionInstance } from "./question.model";
import { VoteInstance } from "./vote.model";


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
    // hooks: {
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     beforeCreate: async (UserInstance: any, options) => {
    //         if (UserInstance.changed("password")) {
    //             const hashedPassword = await AuthUtils.hashPassword(UserInstance.getDataValue('password'))
    //             UserInstance.setDataValue('password', hashedPassword);
    //         }
    //     }, beforeUpdate: async (UserInstance: any, options) => {
    //         if (UserInstance.changed("password")) {
    //             const hashedPassword = await AuthUtils.hashPassword(UserInstance.getDataValue('password'))
    //             UserInstance.setDataValue('password', hashedPassword);
    //         }
    //     },
    // }
}
)
// async function encryptPasswordIfChanged(UserInstance: any, options: any) {
//     try {
//         if (UserInstance.changed("password")) {
//             const hashedPassword = await AuthUtils.hashPassword(UserInstance.getDataValue('password'))
//             UserInstance.setDataValue('password', hashedPassword);
//         }
//     } catch (err) {
//         console.log('beforeCreate Hook Error', err)
//     }
// }
// UserInstance.beforeCreate(encryptPasswordIfChanged);
// UserInstance.beforeUpdate(encryptPasswordIfChanged);



// UserInstance.hasMany(QuestionInstance, {
//  foreignKey: {
//         name: 'user_id',
//         allowNull: false,
//     },
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',

// })
// QuestionInstance.belongsTo(UserInstance);

UserInstance.hasMany(EmailVerificationInstance, {
    foreignKey: {
        name: 'user_email',
        allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',

})
EmailVerificationInstance.belongsTo(UserInstance);


UserInstance.hasMany(PasswordResetInstance, {
    foreignKey: {
        name: 'user_email',
        allowNull: false,
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',

})
PasswordResetInstance.belongsTo(UserInstance);

UserInstance.hasMany(VoteInstance, {
    foreignKey: {
        name: 'user_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
VoteInstance.belongsTo(UserInstance)



