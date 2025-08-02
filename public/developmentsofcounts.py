import json ,csv
countries = []
with open("countryprovinces.json",mode="r") as f:
    countries = json.load(f)
with open("provincesdevelopments.json" ,mode="r") as f:
    provinces = json.load(f)

for i in range(0,802):
    dev  = 0
    for id in countries[i][3]:
        if id>7038:
            break
        dev+= provinces[id-1]
    countries[i].append(dev)

with open("countrieswithdev.json",mode="w") as f:
    json.dump(countries,f,indent=2)
