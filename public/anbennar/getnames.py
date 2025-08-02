import json,re
import unicodedata
pattern = r'"([^"/]+)\"'
def normalize_to_ascii(text):
    return unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')

tags = {}
with open("names.txt", encoding="utf-8") as f:
    for line in f:
        splittedline = line.strip()
        if not "_" in splittedline and splittedline:
            if len(splittedline) != 2 :
                tag = splittedline[0:3]
                match = re.search(pattern,splittedline)
                print(tag,match)
                tags[tag] = normalize_to_ascii(match.group(1))
with open("names.json",mode="w") as f:
    json.dump(tags,f)
    