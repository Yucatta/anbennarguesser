import json

with open("names.json" ) as f:
    names = json.load(f)

with open("countryprovinces.json") as f:
    countprov = json.load(f)
with open("saved.json") as f:
    saved = json.load(f)


for i,country in enumerate(countprov[0:802]):
    countprov[i][1] =saved[i][1]
    if i <802:
        countprov[i][2] = names[country[0]]

with open("countryprovinces.json",mode="w") as f:
    json.dump(countprov,f)