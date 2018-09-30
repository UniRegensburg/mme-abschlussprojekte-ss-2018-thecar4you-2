# -*- coding: utf-8 -*-

#r = request.get('https://de.wikipedia.org/wiki/BMW_F20')
#print(r.status_code)

#https://github.com/hardikvasa/wikipedia-crawler/blob/master/wiki-crawler.py

#Wikipedia Crawler v3 (inserting results into MySQL)
# @author: Hardik Vasa

#Import Libraries
import time     #For Delay
import urllib.request    #Extracting web pages
import re
import numpy as np
import csv
#import json

#def pages array
linkArray = np.load("links.npy")




carArray = [[0 for x in range(10)] for y in range(len(linkArray))] 
"""
array aufbau: id(link), marke, modell, beginn bau, ende bau, klasse, karosserie, benzin min leistung, max, diesel min leistung, max, verbrauch avg benzin, diesel, preis min, max
verbrauch von https://www.spritmonitor.de/
preise von https://www.mobile.de/
"""

def download_page(url):
    try:
        headers = {}
        headers['User-Agent'] = "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.27 Safari/537.17"
        req = urllib.request.Request(url, headers = headers)
        resp = urllib.request.urlopen(req)
        respData = str(resp.read())
        #print("###################################")
        #print(respData)
        return respData
    except Exception as e:
        print(str(e))
        
def extract_box(page):
    #print(page)
    #print("box_")
    start_box = page.find("infobox wikitable")
    stop_box = page.find("</table>")
    box = page[start_box : stop_box]
    return(box)
    
def extract_marke(url):
    marke_wip = url.replace("https://de.wikipedia.org/wiki/", "")
    marke_wip = marke_wip.split("_")
    marke = marke_wip[0]
    return(marke)
    
def extract_model(url):
    model_wip = url.replace("https://de.wikipedia.org/wiki/", "")
    model_wip = model_wip.split("_")
    model = ""
    for i in range(len(model_wip)):
        if i > 0 and len(model_wip) > 1:
            model = model + model_wip[i] + " "
    return(model)
    
def extract_zeit(box): #nicht jeder hat bezeichnung
    #print("zeit_")
    start_zeit = box.find("produktionszeitraum")
    stop_zeit = box.find("fahr")
    zeit_wip = box[start_zeit + 33 : stop_zeit - 39]
    #zeit = str(zeit_wip)
    #if "\\xe2\\x80\\x93" in zeit_wip:
    zeit = zeit_wip.split("\\xe2\\x80\\x93")
    #if "\\xe2\\x88\\x92" in zeit_wip:
    #if "\\xe2\\x80\\x93" not in zeit_wip:
        #print("80")
        #zeit = zeit_wip.split("\\xe2\\x88\\x92")
    #zeit = zeit.replace("\\xe2", "")
    #zeit = zeit.replace("\\x80", "")
    #zeit = zeit.replace("\\x93", "-")
    #print(len(zeit[1]))
    if(len(zeit)>1):
        """
        if "/" in zeit[0]:
            m = re.match(".{7}", zeit[0])
            z = m.group()
            z = z.split("/")
            zeit[0] = z[1]
        if "/" in zeit[1]:
            m = re.match(".{7}", zeit[1])
            z = m.group()
            z = z.split("/")
            zeit[1] = z[1]
        el
        """
        if(len(zeit[1])) > 4:
            #print(zeit[1])
            m = re.match(".{4}", zeit[1])
            zeit[1] = m.group(0)
    else:
        zeit.append("pro")
    return(zeit)
    
def extract_klasse(box):
    #print("klasse_")
    start_klasse = box.find("klasse")
    stop_klasse = box.find("karo")
    klasse_wip = box[start_klasse + 105 : stop_klasse - 47]
    #print(klasse_wip)
    klasse = re.split("<.*>", klasse_wip)
    #print(klasse)
    if len(klasse) == 1:
        #print("len klasse = 1") #theortischer fix: if twagen = sportwagen
        if "twagen" in klasse[0]:
            klasse[0] = "sportwagen"
        elif "utility" in klasse[0]:
            klasse[0] = "suv"
        elif "nwagen" in klasse[0]:
            klasse[0] = "kleinwagen"
        #elif "ttelklasseobere mittelklasse" == klasse[0]:
            #klasse[0] = "obere mittelklasse"
        elif "van" in klasse[0]:
            klasse[0] = "van"
        elif "klasse" == klasse[0]:
            klasse[0] = "oberklasse"
        else:
            klasse[0] = klasse[0].replace("\\'", "")  #\'">
            klasse[0] = klasse[0].replace('"', "")  #\'">
            klasse[0] = klasse[0].replace(">", "")  #\'">        
    return(klasse)
    
def extract_karo(box):
    #print("karo_")
    start_karo = box.find("uform")
    stop_karo = box.find("motor")
    karo_wip = box[start_karo + 86 : stop_karo - 27]
    #print(karo_wip)
    karo = []
    for i in range(len(karo_wip)):
        s = ""
        if karo_wip[i] == '"' and karo_wip[i+1] == '>':
            j = i
            while karo_wip[j] != '<':
                s = s+karo_wip[j]
                j=j+1
            s = s.replace('">', '')
            s = s.replace("\\xc3\\xa9", "e")
            karo.append(s)            
    return(karo)
            
def extract_motor(box):
    start_motor = box.find("motoren")
    stop_motor = box.find("nge")
    motor = box[start_motor + 36 : stop_motor - 33]
    motor = motor.replace("\\xe2\\x80\\x93", "-")
    motor = motor.replace("\\xe2\\x88\\x92", "-")
    #motor = motor.replace(",", ".")
    motor = motor.replace("\\n", "")
    motor = motor.replace("<\\", "")
    motor = motor.replace("td", "")
    motor = motor.replace("a", "")
    motor = motor.replace(">", "")
    motor = motor.replace("<br /", "")
    motor = motor.replace("</", "")
    motor = motor.replace("<", "")
    motor = motor.replace("&#160", "") #m3
    motor = motor + ")" #für diesel zum ende finden
    return(motor)
    
def extract_benzin(motor):
    if "otto" in motor:
        #benzin = []
        start_benzin_wip = motor.find("otto")
        stop_benzin = motor.find(")")
        benzin_wip = motor[start_benzin_wip : stop_benzin]
        #print(benzin_wip)
        start_benzin = benzin_wip.find("(")
        benzin = benzin_wip[start_benzin + 1 : stop_benzin - 3]
        benzin = benzin.split("-")
        #print(benzin)
        for i in range(len(benzin)):
            benzin[i] = round(int(benzin[i])*1.35962)
        return(benzin)
    else:
        return[0, 0]

def extract_diesel(motor):
    if "diesel" in motor:
        #diesel = []
        start_diesel_wip = motor.find("diesel")
        stop_diesel = motor.find("))")
        diesel_wip = motor[start_diesel_wip : stop_diesel - 3]
        #print(diesel_wip)
        start_diesel = diesel_wip.find("(")
        diesel = diesel_wip[start_diesel + 1 : stop_diesel]
        diesel = diesel.split("-")
        for i in range(len(diesel)):
            diesel[i] = round(int(diesel[i])*1.35962)
        return(diesel)
    else:
        return[0, 0]

"""
gewicht, länge etc mit rein? kurz zb besser für stadt, gewicht besser für spaß (a wenn wir den glaub i ignorieren)
"""
    
t0 = time.time()
out = []

def web_crawl():
    for i in range(len(linkArray)):
        urll = linkArray[i]
        #time.sleep(3)
        #print(urll)
        
        raw_html = download_page(urll)
        carArray[i][0] = urll
        
        box_upper = str(extract_box(raw_html))
        box = box_upper.lower()
        #print(box)
        
        marke = extract_marke(urll)
        carArray[i][1] = marke
        
        model = extract_model(urll)
        carArray[i][2] = model
        
        zeit = extract_zeit(box)
        carArray[i][3] = zeit
        #print(zeit)
        #print(carArray)
        
        klasse = extract_klasse(box)
        carArray[i][4] = klasse
        #print(klasse)
        #print(carArray)
        
        karo = extract_karo(box)
        carArray[i][5] = karo
        #print(karo)
        #print(carArray)
        
        motor = extract_motor(box)
        #print(motor)
        
        benzin = extract_benzin(motor)
        #print(benzin)
        carArray[i][6] = benzin
        
        diesel = extract_diesel(motor)
        #print(diesel)
        carArray[i][7] = diesel
        #print(carArray[i])
        out.append(carArray[i])
        
        
        #Writing the output data into a text file
        #file = open('database.txt', 'a')        #Open the text file called database.txt
        #file.write(box + ": " + "\n")         #Write the title of the page
        #file.close()                            #Close the file
        
        #np.save('db', tb)

        #parsedArray = np.load('parsedIngArray.npy')
        
        #print(i)
    return ""

        
print (web_crawl())


#with open('outArray.csv', 'w') as output:
 #   writer = csv.writer(output, lineterminator='\n')
  #  writer.writerows(out)
    
with open('outArray.csv', 'r') as f:
    reader = csv.reader(f)
    csvfile = list(reader)

t1 = time.time()
total_time = t1-t0
print(total_time)