const historical_recovered_data = new Data("https://api.covid19api.com/live/country/turkey/status/recovered");

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
            if (width <= 1280) {
                return_home.style = "display: block";
            }
        })
        .catch(err => console.error(err));
}
