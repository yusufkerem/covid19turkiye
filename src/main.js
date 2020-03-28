let ui = new UI();
let total_cases_chart = document.getElementById("myChart").getContext("2d");
let daily_cases_chart = document.getElementById("myChart3").getContext("2d");
let total_deaths_chart = document.getElementById("myChart4").getContext("2d");
let total_recovered_chart = document.getElementById("myChart2").getContext("2d");

const historical_data = new Data("https://corona.lmao.ninja/v2/historical/turkey");
let historical_cases;
let historical_deaths;

const historical_recovered_data = new Data("https://api.covid19api.com/live/country/turkey/status/recovered");

const data = new Data("https://corona.lmao.ninja/countries/792");
let cases;
let today_cases;
let deaths;
let today_deaths;
let recovered;
let active;
let critical;

document.addEventListener("DOMContentLoaded", load_page);

function load_page(){
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
                dates_array.push(date);
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
            console.log(res[100]);
            console.log(res[100].Date);
            console.log(res[100].Cases)
            let dates_array = []
            let recovered_array = []
            res.forEach(object => {
                dates_array.push(object.Date);
                recovered_array.push(object.Cases);
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
}

// data.get()
// .then(res => {
//     console.log(res);
//     cases = res.cases
//     today_cases = res.todayCases;
//     deaths = res.deaths;
//     today_deaths = res.todayDeaths;
//     recovered = res.recovered;
//     active = res.active;
//     critical = res.critical;
//     console.log(`cases: ${cases}, today_cases: ${today_cases}, deaths: ${deaths}, today_deaths: ${today_deaths}, recovered: ${recovered}, active: ${active}, critical: ${critical}`);
// })
// .catch(err => console.error(err));


