import json

colors = []

with open("guessregions2.json",mode="r") as f:
    colors = json.load(f)
# with open("newindexoldindex.json") as f:
#     newindexoldindex = json.load(f)
# for i,region in enumerate(colors):
#     for j,id in enumerate(region):
#         if(id<802):
#             colors[i][j] = newindexoldindex.index(id)
    
#     colors[i].sort(key=lambda item:item)
        
ids = []
with open("regionconsole.txt",mode="r") as f:
    for i,row in enumerate(f):
        if(i):
            a = row.strip()
            b = a.split()
            if not b[1] in ids: 
                ids.append(int(b[1]))
    
ids.sort(key=lambda id:id)
colors.append(ids)

with open("guessregions.json",mode="w") as f:
    json.dump(colors,f,indent=2)
