import fs from "fs";

export class StoreService {
  getData(filePath) {
    const dataString = fs.readFileSync(`${filePath}`);
    return JSON.parse(dataString);
  }
  setData(filePath, newData) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const existingData = this.getData(filePath);
    const updatedData = [...existingData, ...newData];
    const updatedDataString = JSON.stringify(updatedData);
    fs.writeFileSync(`${filePath}`, updatedDataString);
  }
}
