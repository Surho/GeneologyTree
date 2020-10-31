export default [
    //////////////-INITIAL ANCESTOR-/////////////
    {
        id: 0,
        anc: null,
        name: "Stew Barner",
        spouse: "Emily Tacker",
        childrenId: [1, 2, 3, 4]
    },
    ///////////////////-1-GEN-///////////////////
    {
        id: 1,
        anc: 0,
        name: "Matthew Barner",
        spouse: "Taisha Facker",
        childrenId: [5, 6]
    },
    {
        id: 2,
        anc: 0,
        name: "Bob Barner",
        spouse: "Alisha Freck",
        childrenId: [7]
    },
    {
        id: 3,
        anc: 0,
        name: "Bob Barner 2",
        spouse: "Alisha Freck",
        childrenId: [8, 9, 10, 11, 12, 13]
    },
    {
        id: 4,
        anc: 0,
        name: "Carnagy Barner",
        spouse: "Asa Freck",
        childrenId: [14, 15, 16]
    },
    ///////////////////-2-GEN-///////////////////
    {
        id: 5,
        anc: 1,
        name: "Garner Barner",
        spouse: "Asaakira Freck",
        childrenId: [666, 777]
    },
    {
        id: 6,
        anc: 1,
        name: "Benny Barner",
        spouse: "Jenny Kurt",
        childrenId: []
    },
    {
        id: 7,
        anc: 2,
        name: "Longjonhson Barner",
        spouse: "Ada Wong",
        childrenId: []
    },
    {
        id: 8,
        anc: 3,
        name: "John Barner",
        spouse: "Yuki Kiro",
        childrenId: []
    },
    {
        id: 9,
        anc: 3,
        name: "Bennet Barner",
        spouse: "Alisa Wonderland",
        childrenId: []
    },
    {
        id: 10,
        anc: 3,
        name: "Nerd Barner",
        spouse: "Laura Idrisova",
        childrenId: []
    },
    {
        id: 11,
        anc: 3,
        name: "Surho Barner",
        spouse: "Layla Sebieva",
        childrenId: []
    },
    {
        id: 12,
        anc: 3,
        name: "Test Barner",
        spouse: "Lita Speedtest",
        childrenId: []
    },
    {
        id: 13,
        anc: 3,
        name: "Jack Barner",
        spouse: "Lolita Karver",
        childrenId: [17, 18]
    },
    {
        id: 14,
        anc: 4,
        name: "Thor Barner",
        spouse: 'Valhala Valkira',
        childrenId: []
    },
    {
        id: 15,
        anc: 4,
        name: "Torsten Barner",
        spouse: "Tori Red",
        childrenId: []
    },
    {
        id: 16,
        anc: 4,
        name: "Gerbert Barner",
        spouse: "Letti Dominic",
        childrenId: []
    },
    ///////////////////-3-GEN-///////////////////
    {
        id: 17,
        anc: 13,
        name: "oh-hui boi",
        spouse: "yokira mattamotto",
        childrenId: []
    },
    {
        id: 18,
        anc: 13,
        name: "Sen-Pai Joshua",
        spouse: "Alister Overeem",
        childrenId: [20]
    },
    {
        id: 20,
        anc: 18,
        name: "Jemy Lannister",
        spouse: "Sersei Lannister",
        childrenId: [322, 876, 877, 1023, 25]
    },
    // ///////////////////-4-GEN-///////////////////
    {
        id: 322,
        anc: 18,
        name: "Yokai",
        spouse: "Maiden",
        childrenId: []
    },
    {
        id: 876,
        anc: 18,
        name: "Jocsh The Saint",
        spouse: "Ave Maria",
        childrenId: []
    },
    {
        id: 877,
        anc: 18,
        name: "Richard Lion Heart",
        spouse: "Lilith Mouse Heart",
        childrenId: []
    },
    {
        id: 1023,
        anc: 18,
        name: "Jack Daniels",
        spouse: "Tila Tequila",
        childrenId: []
    },
    {
        id: 25,
        anc: 18,
        name: "Dart Vaider",
        spouse: "Lia",
        childrenId: []
    },
    {
        id: 666,
        anc: 5,
        name: "Jack Daniels",
        spouse: "Tila Tequila",
        childrenId: []
    },
    {
        id: 777,
        anc: 5,
        name: "Dart Vaider",
        spouse: "Lia",
        childrenId: []
    },
]