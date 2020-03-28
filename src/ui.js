class UI{
    constructor(){
    }

    load_chart(element, type = "line", dates = null, datasets = null) {
        let CasesChart = new Chart(element, {
            type: type,
            data: {
                labels: dates,
                datasets: [datasets]
            },
            options: {}
        });
    }

}