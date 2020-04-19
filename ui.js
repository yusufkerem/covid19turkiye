class UI{
    create_chart(element, type = "line", dates, datasets) {
        let CasesChart = new Chart(element, {
            type: type,
            data: {
                labels: dates,
                datasets: [datasets]
            },
            options: {}
        });
    }

    create_options(struct_name){
        const daily_button = document.createElement("button");
        daily_button.id = "daily-button";
        daily_button.textContent = `Günlük ${struct_name}`;
        daily_button.className = "btn btn-dark";

        const total_button = document.createElement("button");
        total_button.id = "total-button";
        total_button.textContent = `Toplam ${struct_name}`;
        total_button.className = "btn btn-dark";
        total_button.style = "margin-left: 2px;";

        return [daily_button, total_button];
    }

    create_home(res){
        home_table.innerHTML = `
                <style>
                    #home-first-row{
                        margin-left: 13rem; 
                        margin-top: 2rem;
                    }

                    #home-second-row{
                        margin-top: 2rem;
                        margin-left: 13rem;
                        margin-bottom: 0;
                    }

                    #home-top-row{
                        margin-left: 13rem;
                    }

                    #card-title{
                        color: rgb(229,57,53);
                    }
                    @media screen and (max-width: 1280px){
                        #home-top-row{
                            margin-left: -1rem !important;
                            text-align: center;
                        }
                        #home-first-row{
                            margin-left: -1rem !important;
                            margin-top: 0;
                        }
                        #card-area{
                        }
                        #home-second-row{
                            margin-left: -1rem !important;
                            margin-top: 0;
                        }
                    }
                </style>
                <div id="home-top-row" class="row" align="center">
                    <div id="card-area" class="col-sm-9">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 id="card-title" class="card-title"><b>Toplam Test Sayısı</b></h5>
                                <p class="card-text text-muted display-4">${res.tests}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="home-first-row" class="row" align="center">
                    <div id="card-area" class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 id="card-title" class="card-title"><b>Bugünkü Vakalar</b></h5>
                                <p class="card-text text-muted display-4">${res.todayCases}</p>
                            </div>
                        </div>
                    </div>
                    <div id="card-area" class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 id="card-title" class="card-title"><b>Bugünkü Ölümler</b></h5>
                                <p class="card-text text-muted display-4">${res.todayDeaths}</p>
                            </div>
                        </div>
                    </div>
                    <div id="card-area" class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 id="card-title" class="card-title"><b>Kritik</b></h5>
                                <p class="card-text text-muted display-4">${res.critical}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="home-second-row" class="row" align="center">
                    <div id="card-area" class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 id="card-title" class="card-title"><b>Vakalar</b></h5>
                                <p class="card-text text-muted display-4">${res.cases}</p>
                                <a href="#" id="home-cases-button" class="btn btn-danger">Grafik</a>
                            </div>
                        </div>
                    </div>
                    <div id="card-area" class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 id="card-title" class="card-title"><b>Ölümler</b></h5>
                                <p class="card-text text-muted display-4">${res.deaths}</p>
                                <a href="#" id="home-deaths-button" class="btn btn-danger">Grafik</a>
                            </div>
                        </div>
                    </div>
                    <div id="card-area" class="col-sm-3">
                        <div class="card bg-dark">
                            <div class="card-body">
                                <h5 id="card-title" class="card-title"><b>İyileşenler</b></h5>
                                <p class="card-text text-muted display-4">${res.recovered}</p>
                                <a href="#" id="home-recovered-button" class="btn btn-danger">Grafik</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }

    create_footer(){
        document.getElementById("footer").innerHTML = `
            <style>
                /* Popup container - can be anything you want */
                .popup {
                position: relative;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                }

                /* The actual popup */
                .popup .popuptext {
                visibility: hidden;
                width: 160px;
                background-color: #555;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 8px 0;
                position: absolute;
                z-index: 1;
                bottom: 125%;
                left: 50%;
                margin-left: -80px;
                }

                /* Popup arrow */
                .popup .popuptext::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
                }

                /* Toggle this class - hide and show the popup */
                .popup .show {
                visibility: visible;
                -webkit-animation: fadeIn 1s;
                animation: fadeIn 1s;
                }

                /* Add animation (fade in the popup) */
                @-webkit-keyframes fadeIn {
                from {opacity: 0;} 
                to {opacity: 1;}
                }

                @keyframes fadeIn {
                from {opacity: 0;}
                to {opacity:1 ;}
                }
            </style>
            <p class="blockquote-footer text-center text-muted">Efe Furkan KARAKAYA ve Yusuf Kerem ÇALIKOĞLU tarafından geliştirilmiştir. | Veriler <a href="https://github.com/novelcovid/api" style="color: #FFFF99;">novelcovidapi</a>'dan sağlanmaktadır. | © 2020<br>
            Resmi verilere aynı zamanda T.C. Sağlık Bakanlığı'nın <a href="https://covid19.saglik.gov.tr/">sitesinden</a> de ulaşabilirsiniz.</p>
            
            <div class="popup" align="center">
                <span class="popuptext text-center" id="private-policy-popup" style="color: gray;">Kullanıcı verileri, kullanıcı deneyimini artırmak ve sitede anlık kullanıcı sayısını, günlük erişim istatistiklerini ve kullanıcıların ne kadar süre durduklarını öğrenmek amacıyla kullanılmaktadır.</span>
            </div>
            <p class="popup text-center" onclick="ui.pop_up()"><small><a style="color: gray;">Gizlilik Politikamız</a></small></p>
            `;
    }

    pop_up() {
        var popup = document.getElementById("private-policy-popup");
        popup.classList.toggle("show");
    }

}