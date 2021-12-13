import faker from "faker";

const defaultUserId = '435cbcaf-731c-47b5-925f-c486f28f1277'
export const questions = [
    {
        "user_id": defaultUserId,
        "id": '1b1c6e6b-811b-49b9-b517-bbe31fabe572',
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "desc": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "user_id": defaultUserId,
        "id": 'f6be68fc-cf33-4706-91b9-b23de56f55f8',
        "title": "qui est esse",
        "desc": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "user_id": defaultUserId,
        "id": '272a4da3-50af-4784-b195-74eb9e8b4c75',
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "desc": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }];

export const answers = [
    {
        "user_id": defaultUserId,
        "id": '1b1c3467-811b-49b9-b517-bbe31fabe572',
        "question_id": questions[0].id,
        "response": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "user_id": defaultUserId,
        "id": 'f6be1097-cf33-4706-91b9-b23de56f55f8',
        "question_id": questions[1].id,
        "response": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "user_id": defaultUserId,
        "id": '272a1003-50af-4784-b195-74eb9e8b4c75',
        "question_id": questions[2].id,
        "response": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }];

export const questionById =
{
    "user_id": defaultUserId,
    "id": 'a3bbce15 - 66d0- 47d3 - 9bef - 3d8a44b20658',
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "desc": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"


};

export const questionUpdate =
{
    "title": "updated facere repellat provident occaecati excepturi optio reprehenderit",
    "desc": "updatedsuscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"


};

export const user = {
    id: defaultUserId,
    first_name: 'Charles',
    last_name: 'Dickens',
    email: 'charles@gmail.com',
    password: 'testing',
    username: 'charles01'
}

export const invalidUser = {
    first_name: 'Charles',
    email: 'charles',
    password: 'testing',
    username: 'charles01'
}

export const passwordReset = {
    id: '5b505c7c-62d4-4667-8399-13fde8e6fb46',
    user_email: 'charles@gmail.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNTA1YzdjLTYyZDQtNDY2Ny04Mzk5LTEzZmRlOGU2ZmI0NiIsImVtYWlsIjoiY2hhcmxlc0BnbWFpbC5jb20iLCJpYXQiOjE2Mzk0MDA5ODUsImV4cCI6MTY0MTk5Mjk4NX0.LChZeEw2ljNElI0NSVTYnccjD1MAWQPnaYbqV0ulq_w',

}

export const emailVerification = {
    id: '5b505c7c-62d4-4667-8399-13fde8e6fb46',
    user_email: 'charles@gmail.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNTA1YzdjLTYyZDQtNDY2Ny04Mzk5LTEzZmRlOGU2ZmI0NiIsImVtYWlsIjoiY2hhcmxlc0BnbWFpbC5jb20iLCJpYXQiOjE2Mzk0MDA5ODQsImV4cCI6MTY0MTk5Mjk4NH0.UIn9wvpFDRFU8Bat6Bb9eUVq7JDvq1f1JIbfZhE3kVQ',

}
export const newPassword = {
    password: 'testing222',
}