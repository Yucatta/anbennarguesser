import json,csv

with open("anbennarbboxes.json")as f:
    bboxes = json.load(f) 

with open("guessregions.json",mode="r") as f:
    guessregions = json.load(f)
regionnames = []
with open("regions.txt",mode="r") as f:
    for line in f:
        regionnames.append(line.strip())

for i,region in enumerate(guessregions):
    temp  = []
    for j,id in enumerate(region):
        if not id in temp:
            temp.append(id)
    guessregions[i] = temp

regions = []
for i,region in enumerate(guessregions):
    bbox = False
    for j,id in enumerate(region):
        if id>801:
            break
        if not bbox:
            bbox =bboxes[id]
            continue
        for k,edge in enumerate(bboxes[id]):
            if (k < 2) :
                if (edge < bbox[k]): 
                    bbox[k] = edge 
            else:
                if edge > bbox[k]:
                    bbox[k] = edge
            
    print(regionnames[i],[bbox[0],bbox[1],bbox[2]-bbox[0],bbox[3]-bbox[1]],bbox)
    # for j,region in enumerate(continent):
    regions.append([regionnames[i],[bbox[0],bbox[1],bbox[2]-bbox[0],bbox[3]-bbox[1]],guessregions[i]])        

with open("regions.json",mode="w") as f:
    json.dump(regions,f,indent=2)
# print(regions)

# with open("besttimes.json",mode="w") as f:
#     json.dump(regions,f,indent=2)
# regions = []
# with open("regions2.json",mode="r") as f:
#     regions = json.load(f)
# print(regions)
# for i,continent in enumerate(regions):
#     for j,region in enumerate(continent):
#         regions[i][j][1] = f"{regions[i][j][1][0]} {regions[i][j][1][1]} {regions[i][j][1][2]} {regions[i][j][1][3]}"
#         # prinat(regions[i][j])

# # print(regions)
# with open("regions2.json",mode="w") as f:
#     json.dump(regions,f,indent=2)