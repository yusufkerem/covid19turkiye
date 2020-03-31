let ui = new UI();
let home_chart = document.getElementById("myChart").getContext("2d");
const home_table = document.getElementById("home-table");
const home_chart_div = document.getElementById("home-chart-div");
const optional = document.getElementById("optional");

const home_button = document.getElementById("home-button");
const total_cases_button = document.getElementById("total-cases-button");
const total_deaths_button = document.getElementById("total-deaths-button");
const total_recovered_button = document.getElementById("total-recovered-button");

const historical_data = new Data("https://corona.lmao.ninja/v2/historical/turkey");
let historical_cases;
let historical_deaths;

const historical_recovered_data = new Data("https://api.covid19api.com/live/country/turkey/status/recovered");

const data = new Data("https://corona.lmao.ninja/countries/792");

document.addEventListener("DOMContentLoaded", load_page);
home_button.addEventListener("click", load_page)
total_cases_button.addEventListener("click", load_cases);
total_deaths_button.addEventListener("click", load_deaths);
total_recovered_button.addEventListener("click", load_recovered);

function load_recovered(){
    remove_home();
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
            ui.create_chart(home_chart, "line", dates_array, {
                label: "Toplam iyileşen sayısı",
                data: recovered_array,
                borderColor: "rgb(19,240,161)",
                hoverBorderColor: "rgb(137,247,208)",
                borderWidth: 5,
                hoverBorderWidth: 20
            })
        })
        .catch(err => console.error(err));
}

function load_deaths(){
    remove_home();
    historical_data.get()
        .then(res => {
            historical_deaths = res.timeline.deaths;
            let dates_array = [];
            let deaths_array = [];

            for (date in historical_deaths) {
                const shredded = date.split("/");
                if ((Number(shredded[0]) == 3 && Number(shredded[1]) >= 9) || shredded[0] >= 4) {
                    const rebuilt = `${shredded[1]}/${shredded[0]}/20${shredded[2]}`
                    dates_array.push(rebuilt);
                    deaths_array.push(historical_deaths[date]);
                }
            }
            ui.create_chart(home_chart, "line", dates_array, {
                label: "Toplam ölüm sayısı",
                data: deaths_array,
                borderColor: "darkred",
                hoverBorderColor: "red",
                borderWidth: 5,
                hoverBorderWidth: 20
            })
        });
}

function load_cases(){
    remove_home();
    total();
    const daily_button = document.createElement("button");
    daily_button.id = "daily-button";
    daily_button.textContent = "Günlük Vaka";
    daily_button.className = "btn btn-dark";

    const total_button = document.createElement("button");
    total_button.id = "total-button";
    total_button.textContent = "Toplam Vaka";
    total_button.className = "btn btn-dark";
    total_button.style = "margin-left: 2px;";

    daily_button.addEventListener("click", daily);
    total_button.addEventListener("click", total);

    function daily() {
        historical_data.get()
            .then(res => {
                remove_home();
                historical_cases = res.timeline.cases;
                historical_deaths = res.timeline.deaths;
                let dates_array = [];
                let daily_cases_array = [];

                let temp = 0;
                for (date in historical_cases) {
                    const shredded = date.split("/");
                    if ((Number(shredded[0]) == 3 && Number(shredded[1]) >= 9) || shredded[0] >= 4) {
                        daily_cases_array.push(Math.abs(historical_cases[date] - temp));
                        const rebuilt = `${shredded[1]}/${shredded[0]}/20${shredded[2]}`
                        dates_array.push(rebuilt);
                        temp = historical_cases[date];
                    }
                }
                ui.create_chart(home_chart, "bar", dates_array, {
                    label: "Günlük yeni vaka sayısı",
                    data: daily_cases_array,
                    borderColor: "rgb(175,182,180)",
                    hoverBorderColor: "rgb(235,237,236)",
                    borderWidth: 5,
                    hoverBorderWidth: 25
                })
                optional.appendChild(daily_button);
                optional.appendChild(total_button);
            })
    }

    function total() {
        historical_data.get()
            .then(res => {
                remove_home();
                historical_cases = res.timeline.cases;
                historical_deaths = res.timeline.deaths;
                let dates_array = [];
                let cases_array = [];

                for (date in historical_cases) {
                    const shredded = date.split("/");
                    if ((Number(shredded[0]) == 3 && Number(shredded[1]) >= 9) || shredded[0] >= 4){
                        const rebuilt = `${shredded[1]}/${shredded[0]}/20${shredded[2]}`
                        dates_array.push(rebuilt);
                        cases_array.push(historical_cases[date]);
                    }
                }
                ui.create_chart(home_chart, "line", dates_array, {
                    label: "Toplam vaka sayısı",
                    data: cases_array,
                    borderColor: "rgb(229,57,53)",
                    hoverBorderColor: "rgb(235,107,104)",
                    borderWidth: 5,
                    hoverBorderWidth: 20
                })
                optional.appendChild(daily_button);
                optional.appendChild(total_button);
            })
    }
}

function remove_home() {
    optional.innerHTML = "";
    home_table.innerHTML = "";
    home_chart_div.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.id = "myChart";
    home_chart_div.appendChild(canvas);
    home_chart = document.getElementById("myChart").getContext("2d");
    document.getElementById("footer").innerHTML = "";
}

function load_page() {
    remove_home();
    data.get()
        .then(res => {
            home_table.innerHTML = `
                <h2 style="margin-left: 24rem;"><b>COVID-19 Türkiye İstatistikleri</b></h1>
                <br>
                <div class="row" style="margin-left: 13rem; margin-top: 5rem;">
                    <div class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 class="card-title" style="color: rgb(229,57,53);"><b>Vakalar</b></h5>
                                <p class="card-text text-muted display-4">${res.cases}</p>
                                <a href="#" id="home-cases-button" class="btn btn-danger">Grafik</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 class="card-title" style="color: rgb(229,57,53);"><b>Ölümler</b></h5>
                                <p class="card-text text-muted display-4">${res.deaths}</p>
                                <a href="#" id="home-deaths-button" class="btn btn-danger">Grafik</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 class="card-title" style="color: rgb(229,57,53);"><b>İyileşenler</b></h5>
                                <p class="card-text text-muted display-4">${res.recovered}</p>
                                <a href="#" id="home-recovered-button" class="btn btn-danger">Grafik</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" style="margin-top: 2rem; margin-left: 13rem; margin-bottom: 0;">
                    <div class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 class="card-title" style="color: rgb(229,57,53);"><b>Bugünkü Vakalar</b></h5>
                                <p class="card-text text-muted display-4">${res.todayCases}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 class="card-title" style="color: rgb(229,57,53);"><b>Bugünkü Ölümler</b></h5>
                                <p class="card-text text-muted display-4">${res.todayDeaths}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 class="card-title" style="color: rgb(229,57,53);"><b>Kritik</b></h5>
                                <p class="card-text text-muted display-4">${res.critical}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById("footer").innerHTML = `
            <p class="blockquote-footer text-center text-muted">Developed by Efe Furkan KARAKAYA and Yusuf Kerem ÇALIKOĞLU | © 2020</p>
            `;
            const home_cases_button = document.getElementById("home-cases-button");
            const home_deaths_button = document.getElementById("home-deaths-button");
            const home_recovered_button = document.getElementById("home-recovered-button");

            home_cases_button.addEventListener("click", load_cases);
            home_deaths_button.addEventListener("click", load_deaths);
            home_recovered_button.addEventListener("click", load_recovered);
        })
        .catch(err => console.error(err));
}