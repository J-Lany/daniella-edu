import fs from "fs";

export class StoreService {
  getData(filePath) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}));
    }
    const dataString = fs.readFileSync(`${filePath}`);
    return JSON.parse(dataString);
  }
  setData(filePath, newData) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({}));
    }

    const updatedDataString = JSON.stringify(newData);
    fs.writeFileSync(`${filePath}`, updatedDataString);
  }
}
