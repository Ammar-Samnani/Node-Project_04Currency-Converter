import inquirer from "inquirer";
let api_link = "https://v6.exchangerate-api.com/v6/09ffa269db7e4c254fd22198/latest/USD";
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(api_link);
const currency_selection = await inquirer.prompt([
    {
        name: "currency_convert_from",
        type: "list",
        message: "Select the Currency from which you want to Convert from: ",
        choices: ["USD", "AUD", "PKR", "CHF", "KYD", "CAD", "KWD", "JPY"]
    },
    {
        name: "amount",
        type: "number",
        message: "Enter the amount: "
    },
    {
        name: "currency_convert_to",
        type: "list",
        message: "Select the Currency to which you want to Convert to: ",
        choices: ["USD", "AUD", "PKR", "CHF", "KYD", "CAD", "KWD", "JPY"]
    }
]);
let currency_conversion = `https://v6.exchangerate-api.com/v6/09ffa269db7e4c254fd22198/pair/` + currency_selection.currency_convert_from + "/" + currency_selection.currency_convert_to;
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let cnv_rates = await cnvData(currency_conversion);
let final_amount = currency_selection.amount * cnv_rates;
console.log(final_amount + " " + currency_selection.currency_convert_to);
