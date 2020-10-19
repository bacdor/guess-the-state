interface IQuestions {
    name: string;
    quest: string;
    [key: string]: string;
}

const questions: IQuestions[] = [
    {name: "Is landlocked?",
        quest: "isLandlocked"},
    {name: "Is bordering Canada?",
        quest: "isBorderedByCanada"},
    {name: "Is the coast on the east side of U.S. (if landlocked choose \"NO\") ?",
        quest: "isEastCoast"},
    {name: "Is it the largest one among all of the states ?",
        quest: "isTheLargest"},
    {name: "Does have a two-part name?",
        quest: "isTwoPartName"},
    {name: "Does the highest point reach over 5,000 feet?",
        quest: "is5000High"},
    {name: "Is the number of population higher than 10 millions?",
        quest: "is10Millions"},
    {name: "Is the largest city also the capitol city?",
        quest: "isCapitol"},
    {name: "Is there any NFL team in the Big Ten Conference?",
        quest: "isBigTen"},
    {name: "Does have any islands?",
        quest: "isIslands"},
    {name: "Is the number of population in your state higher than 10 millions?",
        quest: "is10Millions"},
    {name: "Is bordering Tennessee?",
        quest: "isTennesseeBordering"},
    {name: "Does touch at least one of the Great Lakes?",
        quest: "isOnGreatLakes"}
];

export default questions;
