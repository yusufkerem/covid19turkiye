//Global Options

//Chart.defaults.global.defaultFontFamily = "Lato";

let myChart = document.getElementById("myChart").getContext("2d");
let CasesChart = new Chart(myChart, {
    type: "line",
    data: {
        labels: ["10 Mart", "11 Mart", "12 Mart", "13 Mart", "14 Mart", "15 Mart", "16 Mart", "17 Mart",
            "18 Mart", "19 Mart", "20 Mart", "21 Mart", "22 Mart", "23 Mart", "24 Mart", "25 Mart",
            "26 Mart", "27 Mart"
        ],
        datasets: [{
            label: "Toplam Vaka Sayısı",
            data: [1, 1, 1, 5, 6, 18, 47, 98, 191, 359, 670, 947,
                1236, 1529, 1872, 2433, 3629, 5698
            ],
            //backgroundColor:"red",

            borderColor: "rgb(229,57,53)",
            hoverBorderColor: "rgb(235,107,104)",
            borderWidth: 5,
            hoverBorderWidth: 20


        }]
    },
    options: {}
});


let myChart2 = document.getElementById("myChart2").getContext("2d");
let ChartRecovered = new Chart(myChart2, {
    type: "line",
    data: {
        labels: ["10 Mart", "11 Mart", "12 Mart", "13 Mart", "14 Mart", "15 Mart", "16 Mart", "17 Mart",
            "18 Mart", "19 Mart", "20 Mart", "21 Mart", "22 Mart", "23 Mart", "24 Mart", "25 Mart",
            "26 Mart", "27 Mart"
        ],
        datasets: [{
            label: "Toplam İyileşen Sayısı",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 26, 26, 42
            ],
            //backgroundColor:"red",

            borderColor: "rgb(19,240,161)",
            hoverBorderColor: "rgb(137,247,208)",
            borderWidth: 5,
            hoverBorderWidth: 20


        }]
    },
    options: {}
});


let myChart3 = document.getElementById("myChart3").getContext("2d");
let dailyNewCases = new Chart(myChart3, {
    type: "bar",
    data: {
        labels: ["10 Mart", "11 Mart", "12 Mart", "13 Mart", "14 Mart", "15 Mart", "16 Mart", "17 Mart",
            "18 Mart", "19 Mart", "20 Mart", "21 Mart", "22 Mart", "23 Mart", "24 Mart", "25 Mart",
            "26 Mart", "27 Mart"
        ],
        datasets: [{
            label: "Yeni Vaka Sayısı",
            data: [0, 0, 0, 0, 0, 0, 29, 51, 93, 168, 311, 277,
                289, 293, 343, 561, 1196, 2069
            ],
            //backgroundColor:"red",

            borderColor: "rgb(175,182,180)",
            hoverBorderColor: "rgb(235,237,236)",
            borderWidth: 5,
            hoverBorderWidth: 25


        }]
    },
    options: {}
});


let myChart4 = document.getElementById("myChart4").getContext("2d");
let totalDeath = new Chart(myChart4, {
    type: "line",
    data: {
        labels: ["10 Mart", "11 Mart", "12 Mart", "13 Mart", "14 Mart", "15 Mart", "16 Mart", "17 Mart",
            "18 Mart", "19 Mart", "20 Mart", "21 Mart", "22 Mart", "23 Mart", "24 Mart", "25 Mart",
            "26 Mart", "27 Mart"
        ],
        datasets: [{
            label: "Toplam Ölüm Sayısı",
            data: [0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 9, 21,
                30, 37, 44, 59, 75, 92
            ],
            //backgroundColor:"red",

            borderColor: "darkred",
            hoverBorderColor: "red",
            borderWidth: 5,
            hoverBorderWidth: 20


        }]
    },
    options: {}
});