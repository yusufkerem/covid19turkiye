class UI{
    constructor(){
        //
    }

    create_chart(element, type = "line", dates = null, datasets = null) {
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