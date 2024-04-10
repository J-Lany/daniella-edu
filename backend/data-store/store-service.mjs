import fs from "fs";

export class StoreService {
  getData(filePath) {
    const dataString = fs.readFileSync(`${filePath}`);
    return JSON.parse(dataString);
  }
  setData(filePath, newData) {
    console.log(filePath, newData);
    const existingData = this.getData(filePath);
    const updatedData = [...existingData, ...newData];
    const updatedDataString = JSON.stringify(updatedData);
    fs.writeFileSync(`${filePath}`, updatedDataString);
  }
}
