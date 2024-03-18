import fs from "fs";

export function configService() {
  const rawData = fs.readFileSync("./resources/config.json");
  return function () {
    return JSON.parse(rawData);
  };
}
