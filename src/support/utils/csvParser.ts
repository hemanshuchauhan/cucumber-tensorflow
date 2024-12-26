import fs from 'fs';
import csv from 'csv-parser';

interface TrainingData {
  date: string;
  input: number[];
  output: number[];
}

export async function parseCSV(filePath: string): Promise<TrainingData[]> {
  return new Promise((resolve, reject) => {
    const results: TrainingData[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Assuming the CSV headers are "Date", "Open", "High", "Low", "Close", "Adj Close", "Volume"
        const date = data.Date.trim(); // e.g., "Nov 25 2024"
        console.log(`Parsed date: ${date}`); // Debug output
        const input = [
          parseFloat(data.Open),
          parseFloat(data.High),
          parseFloat(data.Low),
        ]; // Inputs: Open, High, Low
        const output = [parseFloat(data.Close)]; // Output: Close

        results.push({ date, input, output });
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}