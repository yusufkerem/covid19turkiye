// https://github.com/novelcovid/api
// https://covid19api.com/
// https://www.worldometers.info/coronavirus/country/turkey/

let ui = new UI();
const total_cases_chart = document.getElementById("myChart").getContext("2d");
const daily_cases_chart = document.getElementById("myChart3").getContext("2d");
const total_deaths_chart = document.getElementById("myChart4").getContext("2d");
const total_recovered_chart = document.getElementById("myChart2").getContext("2d");

const home_button = document.getElementById("home-button");
const total_cases_button = document.getElementById("total-cases-button");
const daily_cases_button = document.getElementById("daily-cases-button");
const total_deaths_button = document.getElementById("total-deaths-button");
const total_recovered_button = document.getElementById("total-recovered-button");
const charts_division = document.getElementById("charts-division");

const historical_data = new Data("https://corona.lmao.ninja/v2/historical/turkey");
let historical_cases;
let historical_deaths;

const historical_recovered_data = new Data("https://api.covid19api.com/live/country/turkey/status/recovered");

const data = new Data("https://corona.lmao.ninja/countries/792");
const today_info_row = document.getElementById("today-info");

document.addEventListener("DOMContentLoaded", load_page);
home_button.addEventListener("click", load_home)

function load_home(){
    charts_division.style.visibility = "hidden";
}

function load_page() {
    historical_data.get()
        .then(res => {
            historical_cases = res.timeline.cases;
            historical_deaths = res.timeline.deaths;
            let dates_array = [];
            let cases_array = [];
            let deaths_array = [];
            let daily_cases_array = [];

            let temp = 0;
            for (date in historical_cases) {
                daily_cases_array.push(Math.abs(historical_cases[date] - temp));
                const shredded = date.split("/");
                const rebuilt = `${shredded[1]}/${shredded[0]}/20${shredded[2]}`
                dates_array.push(rebuilt);
                cases_array.push(historical_cases[date]);
                deaths_array.push(historical_deaths[date]); // same dates with cases
                temp = historical_cases[date];
            }

            ui.load_chart(total_cases_chart, "line", dates_array, {
                label: "Toplam vaka sayısı",
                data: cases_array,
                borderColor: "rgb(229,57,53)",
                hoverBorderColor: "rgb(235,107,104)",
                borderWidth: 5,
                hoverBorderWidth: 20
            })
            ui.load_chart(total_deaths_chart, "line", dates_array, {
                label: "Toplam ölüm sayısı",
                data: deaths_array,
                borderColor: "darkred",
                hoverBorderColor: "red",
                borderWidth: 5,
                hoverBorderWidth: 20
            })
            ui.load_chart(daily_cases_chart, "bar", dates_array, {
                label: "Günlük yeni vaka sayısı",
                data: daily_cases_array,
                borderColor: "rgb(175,182,180)",
                hoverBorderColor: "rgb(235,237,236)",
                borderWidth: 5,
                hoverBorderWidth: 25
            })
        })
        .catch(err => console.error(err));

    historical_recovered_data.get()
        .then(res => {
            let dates_array = []
            let recovered_array = []
            let temp;
            res.forEach(object => {
                const shredded = ((object.Date).split("T")[0]).split("-");
                if (temp !== shredded[2]) {
                    const rebuilt = `${shredded[2]}/${shredded[1].split("0")[1]}/${shredded[0]}`;
                    dates_array.push(rebuilt);
                    recovered_array.push(object.Cases);
                }
                temp = shredded[2];
            })
            ui.load_chart(total_recovered_chart, "line", dates_array, {
                label: "Toplam iyileşen sayısı",
                data: recovered_array,
                borderColor: "rgb(19,240,161)",
                hoverBorderColor: "rgb(137,247,208)",
                borderWidth: 5,
                hoverBorderWidth: 20
            })
        })
        .catch(err => console.error(err));

    data.get()
        .then(res => {
            today_info_row.innerHTML = `
                        <th scope="row"></th>
                        <td>${res.cases}</td>
                        <td>${res.todayCases}</td>
                        <td>${res.deaths}</td>
                        <td>${res.todayDeaths}</td>
                        <td>${res.recovered}</td>
                        <td>${res.active}</td>
                        <td>${res.critical}</td>
        `
        })
        .catch(err => console.error(err));
}