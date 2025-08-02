import { cache as reactCache } from "react";
import fs from "fs";
import path from "path";

interface AppData {
  countries: string[][];
  countryprovinces: number[][];
  paths: string[][];
  countryoutlines: Array<[number, string[]]>;
  regions: number[][][][];
  regionnames: string[][];
  countryplaces: number[][][][];
  countrydevelopments: number[];
}

function loadAllDataOnce(): AppData {
  try {
    const root = process.cwd() + "/public";

    const pathsJson: [number, string[]][] = JSON.parse(
      fs.readFileSync(path.join(root, "provinces.json"), "utf-8")
    );
    const Countries: Array<[string, string, string, number[], number]> =
      JSON.parse(
        fs.readFileSync(path.join(root, "countryprovinces.json"), "utf-8")
      );
    const countryoutlines: Array<[number, string[]]> = JSON.parse(
      fs.readFileSync(path.join(root, "countryoutlines.json"), "utf-8")
    );

    const Regions: [string, number[], number[]][][] = JSON.parse(
      fs.readFileSync(path.join(root, "regions.json"), "utf-8")
    );
    const countryplace = JSON.parse(
      fs.readFileSync(path.join(root, "countryplace.json"), "utf-8")
    );
    return {
      paths: pathsJson.map((province) => province[1]),
      countries: Countries.map((country) => country.slice(0, 3) as string[]),
      countryprovinces: Countries.map((country) => country[3]),
      countrydevelopments: Countries.map((country) => country[4]),
      countryoutlines: countryoutlines.map((country) => [
        country[0],
        country[1],
      ]),
      regions: Regions.map((continent) =>
        continent.map((region) => [region[1], region[2]])
      ),
      regionnames: Regions.map((continent) =>
        continent.map((region) => region[0])
      ),
      countryplaces: countryplace,
    };
  } catch (error) {
    throw new Error(
      `Failed to load application data: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

const appDataInstance = loadAllDataOnce();

export const loadAppData = reactCache(async (): Promise<AppData> => {
  if (!appDataInstance) {
    throw new Error("Application data not initialized.");
  }
  return appDataInstance;
});
