import pandas as pd
import requests as rq
from matplotlib import pyplot as plt

def readWebData():
    url ="https://www.worldometers.info/coronavirus/"
    responseObj = rq.get(url)
    htmlText = responseObj.text
    return htmlText



htmlText = readWebData()
table = pd.read_html(htmlText)

table = table[0]

TurkeyRow = table.iloc[13,:]
TurkeyTotalCases = TurkeyRow[1]
TurkeyNewCases = TurkeyRow[2]
TurkeyTotalDeaths = TurkeyRow[3]
TurkeyActiveCases = TurkeyRow[6]
TurkeyTotalRecovered = TurkeyRow[5]
TurkeyCriticalCases = TurkeyRow[7]
TurkeyNewDeaths = TurkeyRow[4]

day = "27"
month = "3"

date = day +"/" + month + "/" + "2020"

yCases = [1,1,1,5,6,18,47,98,191,359,670,947,1236,1529,1872,2433,3629]
xDates = ["10 Mart","11 Mart","12 Mart","13 Mart","14 Mart","15 Mart","16 Mart","17 Mart",
          "18 Mart","19 Mart","20 Mart","21 Mart","22 Mart","23 Mart","24 Mart","25 Mart",
          "26 Mart"]

plt.plot(xDates,yCases)
plt.title("Türkiye Korona Virüsü Toplam Vaka Sayısı Grafiği")
plt.xlabel("Tarih")
plt.ylabel("Toplam Vaka")

plt.show


