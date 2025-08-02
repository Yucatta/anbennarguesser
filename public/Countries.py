import json
# with open("countryprovinces.json",mode="r") as f:
#     countries = json.load(f)

# with open("countrieswithdev.json",mode="r") as f:
#     countries2 = json.load(f)
# # countries2.sort(key=lambda item:item[4])
# # countries2.reverse()
# # with open("countrieswithdev.json",mode="w") as f:
# #     json.dump(countries2,f)

# newindexoldindex = []
# for i,country in enumerate(countries2):         
#     for j,anothercountry in enumerate(countries):
#         if(country[0] == anothercountry[0]):
#             newindexoldindex.append(j)

# with open("newindexoldindex.json",mode="w") as f:
#     json.dump(newindexoldindex,f)
with open("newindexoldindex.json") as f:
    newindexoldindex = json.load(f)
outlines = []
with open("countryoutlines.json",mode="r") as f:
    outlines = json.load(f)

for i in range(0,802):
    outlines[i][0] = newindexoldindex[i]
outlines.sort(key=lambda item:item[0])



with open("newoutlines.json",mode="w") as f:
    json.dump(outlines,f,indent=2)


