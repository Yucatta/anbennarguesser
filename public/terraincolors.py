import json,csv

continents = ["Cannor","Serpentspine","Haless","Sarhal","Aelantir"]

with open("regions.json",mode="r") as f:
    regions = json.load(f)

Halann = []
for i,continent in enumerate(regions[0:5]):
    bbox = False
    continentids = []
    for l,region in enumerate(continent):
        temp = []
        for j,id in enumerate(region[2]):
            if id<802:
                if not bbox:
                    bbox =[region[1][0],region[1][1],region[1][2]+region[1][0],region[1][3]+region[1][1]]
                    continue
                for k,edge in enumerate(region[1]):
                    if (k < 2) :
                        if (edge < bbox[k]): 
                            bbox[k] = edge 
                    else:
                        if edge + region[1][k-2] > bbox[k]:
                            bbox[k] = edge + region[1][k-2]
            if not id in temp:
                temp.append(id)
                if not id in continentids:
                    continentids.append(id)
        temp.sort(key=lambda id:id)
        regions[i][l][2] = temp
    continentids.sort(key=lambda id:id)
    print([bbox[0],bbox[1],bbox[2]-bbox[0],bbox[3]-bbox[1]],continents[i])

bbox = False
continentids = []
for l,region in enumerate(Halann[0:4]):
    temp = []
    for j,id in enumerate(region[2]):
        if id<802:
            if not bbox:                
                bbox =[region[1][0],region[1][1],region[1][2]+region[1][0],region[1][3]+region[1][1]]
                continue
            for k,edge in enumerate(region[1]):
                if (k < 2) :
                    if (edge < bbox[k]): 
                        bbox[k] = edge 
                else:
                    if edge + region[1][k-2] > bbox[k]:
                        bbox[k] = edge + region[1][k-2]
        if not id in temp:
            temp.append(id)
            if not id in continentids:
                continentids.append(id)
    temp.sort(key=lambda id:id)
    regions[i][l][2] = temp
continentids.sort(key=lambda id:id)
print([bbox[0],bbox[1],bbox[2]-bbox[0],bbox[3]-bbox[1]],"Halan")


continentids = []
for i in range(0,827):
    continentids.append(i)
Halann.append(["Halann",[0,0,5632,2048],continentids])
regions.append(Halann)

# with open("regions.json",mode="w") as f:
#     json.dump(regions,f,indent=2)
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