let ui = new UI();
let home_chart = document.getElementById("myChart").getContext("2d");
const home_table = document.getElementById("home-table");
const home_chart_div = document.getElementById("home-chart-div");
const optional = document.getElementById("optional");

const width = window.screen.width;
const return_home = document.getElementById("return-home");
return_home.addEventListener("click", load_page);

const home_button = document.getElementById("home-button");
const total_cases_button = document.getElementById("total-cases-button");
const total_deaths_button = document.getElementById("total-deaths-button");
const total_recovered_button = document.getElementById("total-recovered-button");

const historical_data = new Data("https://corona.lmao.ninja/v2/historical/turkey");

const data = new Data("https://corona.lmao.ninja/v2/countries/turkey");

document.addEventListener("DOMContentLoaded", load_page);
home_button.addEventListener("click", load_page)
total_cases_button.addEventListener("click", load_cases);
total_deaths_button.addEventListener("click", load_deaths);
total_recovered_button.addEventListener("click", load_recovered);

function data_parser(res, type, daily=false){
    let data = res.timeline[type];
    let dates_array = [];
    let content_array = [];

    if (daily){
        let temp = 0;
        for (date in data) {
            const shredded = date.split("/");
            if ((Number(shredded[0]) == 3 && Number(shredded[1]) >= 9) || shredded[0] >= 4) {
                content_array.push(Math.abs(data[date] - temp));
                const rebuilt = `${shredded[1]}/${shredded[0]}/20${shredded[2]}`
                dates_array.push(rebuilt);
                temp = data[date];
            }
        }
    }
    else {
        for (date in data) {
            const shredded = date.split("/");
            if ((Number(shredded[0]) == 3 && Number(shredded[1]) >= 9) || shredded[0] >= 4) {
                const rebuilt = `${shredded[1]}/${shredded[0]}/20${shredded[2]}`
                dates_array.push(rebuilt);
                content_array.push(data[date]);
            }
        }
    }
    return [dates_array, content_array];
}


function load_recovered(){
    remove_home();
    total();
    const options = ui.create_options("İyileşen");

    options[0].addEventListener("click", daily);
    options[1].addEventListener("click", total);

    function total(){
        historical_data.get()
            .then(res => {
                remove_home();
                const parsed_data = data_parser(res, "recovered");
                ui.create_chart(home_chart, "line", parsed_data[0], {
                    label: "Toplam iyileşen sayısı",
                    data: parsed_data[1],
                    borderColor: "rgb(19,240,161)",
                    hoverBorderColor: "rgb(137,247,208)",
                    borderWidth: 5,
                    hoverBorderWidth: 20
                })
                optional.appendChild(options[0]);
                optional.appendChild(options[1]);
                if (width <= 1280) {
                    return_home.style = "display: block";
                }
            })
            .catch(err => console.error(err));
    }

    function daily() {
        historical_data.get()
            .then(res => {
                remove_home();
                const parsed_data = data_parser(res, "recovered", true);
                ui.create_chart(home_chart, "bar", parsed_data[0], {
                    label: "Günlük iyileşen sayısı",
                    data: parsed_data[1],
                    borderColor: "rgb(175,182,180)",
                    hoverBorderColor: "rgb(235,237,236)",
                    borderWidth: 5,
                    hoverBorderWidth: 25
                })
                optional.appendChild(options[0]);
                optional.appendChild(options[1]);
                if (width <= 1280) {
                    return_home.style = "display: block";
                }
            })
    }
}

function load_deaths(){
    remove_home();
    total();
    const options = ui.create_options("Ölüm");

    options[0].addEventListener("click", daily);
    options[1].addEventListener("click", total);

    function total(){
        historical_data.get()
            .then(res => {
                remove_home();
                const parsed_data = data_parser(res, "deaths");
                ui.create_chart(home_chart, "line", parsed_data[0], {
                    label: "Toplam ölüm sayısı",
                    data: parsed_data[1],
                    borderColor: "darkred",
                    hoverBorderColor: "red",
                    borderWidth: 5,
                    hoverBorderWidth: 20
                })
                optional.appendChild(options[0]);
                optional.appendChild(options[1]);
                if (width <= 1280) {
                    return_home.style = "display: block";
                }
            });
    }

    function daily() {
        historical_data.get()
            .then(res => {
                remove_home();
                const parsed_data = data_parser(res, "deaths", true);
                ui.create_chart(home_chart, "bar", parsed_data[0], {
                    label: "Günlük ölüm sayısı",
                    data: parsed_data[1],
                    borderColor: "rgb(175,182,180)",
                    hoverBorderColor: "rgb(235,237,236)",
                    borderWidth: 5,
                    hoverBorderWidth: 25
                })
                optional.appendChild(options[0]);
                optional.appendChild(options[1]);
                if (width <= 1280) {
                    return_home.style = "display: block";
                }
            })
    }
}

function load_cases(){
    remove_home();
    total();
    const options = ui.create_options("Vaka");

    options[0].addEventListener("click", daily);
    options[1].addEventListener("click", total);

    function total() {
        historical_data.get()
            .then(res => {
                remove_home();
                const parsed_data = data_parser(res, "cases");
                ui.create_chart(home_chart, "line", parsed_data[0], {
                    label: "Toplam vaka sayısı",
                    data: parsed_data[1],
                    borderColor: "rgb(229,57,53)",
                    hoverBorderColor: "rgb(235,107,104)",
                    borderWidth: 5,
                    hoverBorderWidth: 20
                })
                optional.appendChild(options[0]);
                optional.appendChild(options[1]);
                if (width <= 1280) {
                    return_home.style = "display: block";
                }
            })
    }

    function daily() {
        historical_data.get()
            .then(res => {
                remove_home();
                const parsed_data = data_parser(res, "cases",  true);
                ui.create_chart(home_chart, "bar", parsed_data[0], {
                    label: "Günlük yeni vaka sayısı",
                    data: parsed_data[1],
                    borderColor: "rgb(175,182,180)",
                    hoverBorderColor: "rgb(235,237,236)",
                    borderWidth: 5,
                    hoverBorderWidth: 25
                })
                optional.appendChild(options[0]);
                optional.appendChild(options[1]);
                if (width <= 1280) {
                    return_home.style = "display: block";
                }
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
    return_home.style = "display: none";
}

function load_page() {
    remove_home();
    data.get()
        .then(res => {
            ui.create_home(res);
            ui.create_footer();
            const home_cases_button = document.getElementById("home-cases-button");
            const home_deaths_button = document.getElementById("home-deaths-button");
            const home_recovered_button = document.getElementById("home-recovered-button");

            home_cases_button.addEventListener("click", load_cases);
            home_deaths_button.addEventListener("click", load_deaths);
            home_recovered_button.addEventListener("click", load_recovered);
        })
        .catch(err => console.error(err));
}
