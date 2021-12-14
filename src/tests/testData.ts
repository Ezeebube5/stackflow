
import faker from 'faker';
import AuthUtils from '../utils/authentication';

export const defaultUserName = faker.internet.userName()
export const defaultUserEmail = faker.internet.email()
export const defaultUserId = faker.datatype.uuid();
export const defaultQuestionId_1 = faker.datatype.uuid();
export const defaultQuestionId_2 = faker.datatype.uuid();
export const defaultQuestionId_3 = faker.datatype.uuid();
export const defaultAnswerId_1 = faker.datatype.uuid();
export const defaultAnswerId_2 = faker.datatype.uuid();
export const defaultAnswerId_3 = faker.datatype.uuid();
export const defaultAnswerId_4 = faker.datatype.uuid();
export const defaultSubscriptionId = faker.datatype.uuid();
export const defaultPasswordResetId = faker.datatype.uuid();
export const defaultEmailVerificationId = faker.datatype.uuid();
export const user = {
    id: defaultUserId,
    first_name: 'Charles',
    last_name: 'Dickens',
    email: defaultUserEmail,
    password: 'testing',
    username: defaultUserName
}

export const verifyToken = AuthUtils.createToken(user);

export const invalidUser = {
    first_name: 'Charles',
    email: 'charles',
    password: 'testing',
    username: defaultUserName
}

export const passwordReset = {
    id: defaultPasswordResetId,
    user_email: defaultUserEmail,
    token: verifyToken,
}

export const emailVerification = {
    id: defaultEmailVerificationId,
    user_email: defaultUserEmail,
    token: verifyToken,

}
export const newPassword = {
    password: 'testing222',
}

export const questions = [
    {
        "user_id": defaultUserId,
        "id": defaultQuestionId_1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "desc": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "user_id": defaultUserId,
        "id": defaultQuestionId_2,
        "title": "qui est esse",
        "desc": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "user_id": defaultUserId,
        "id": defaultQuestionId_3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "desc": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }];

export const answers = [
    {
        "user_id": defaultUserId,
        "id": defaultAnswerId_1,
        "question_id": defaultQuestionId_1,
        "response": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "user_id": defaultUserId,
        "id": defaultAnswerId_2,
        "question_id": defaultQuestionId_2,
        "response": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "user_id": defaultUserId,
        "id": defaultAnswerId_3,
        "question_id": defaultQuestionId_3,
        "response": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }];
export const subscription = {
    "id": defaultSubscriptionId,
    "user_email": defaultUserEmail,
    "question_id": defaultQuestionId_1,
};

export const answerById =
{
    "user_id": defaultUserId,
    "question_id": defaultQuestionId_1,
    "response": "question answered facere repellat provident occaecati excepturi optio reprehenderit",
};

export const answerUpdate =
{
    "response": "answer finetuned repellat provident occaecati excepturi optio reprehenderit",
};

export const questionById =
{
    "user_id": defaultUserId,
    "id": defaultAnswerId_4,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "desc": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
};

export const questionUpdate =
{
    "title": "updated facere repellat provident occaecati excepturi optio reprehenderit",
    "desc": "updatedsuscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
};

