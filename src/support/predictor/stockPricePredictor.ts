// StockPricePredictor.ts
import * as tf from '@tensorflow/tfjs';
import moment from 'moment';

interface TrainingData {
  date: string; // Adding date property
  input: number[];
  output: number[];
}

function normalizeData(data: number[]): number[] {
  const max = Math.max(...data);
  const min = Math.min(...data);
  return data.map(value => (value - min) / (max - min));
}

export class StockPricePredictor {
  private model: tf.Sequential;
  private trainingData: TrainingData[];

  constructor() {
    this.model = tf.sequential();
    this.trainingData = [];

    // Add layers to the model
    this.model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [3] })); // Increase units to make the model more complex
    this.model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 1 }));

    // Compile the model with a learning rate adjustment
    this.model.compile({ optimizer: tf.train.sgd(0.01), loss: 'meanSquaredError' });
  }

  async train(data: TrainingData[]): Promise<void> {
    this.trainingData = data;

    // Normalize the input data
    const inputs = data.map(d => normalizeData(d.input));
    const outputs = data.map(d => d.output);

    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(outputs);

    // Train the model with more epochs
    await this.model.fit(xs, ys, {
      epochs: 500, // Increased number of training iterations
    });
  }

  predict(input: number[]): number {
    const normalizedInput = normalizeData(input);
    const inputTensor = tf.tensor2d([normalizedInput]);
    const outputTensor = this.model.predict(inputTensor) as tf.Tensor;
    const output = outputTensor.dataSync();
    return output[0]; // Assuming output is a single value for the close price
  }

  getLastTrainingData(): TrainingData {
    if (this.trainingData.length === 0) {
      throw new Error('No training data available');
    }
    return this.trainingData[this.trainingData.length - 1];
  }

  getInputForDate(date: string): number[] {
    // Convert date to match the format in CSV if needed
    const formattedDate = moment(date, 'MMM DD YYYY').isValid()
      ? moment(date, 'MMM DD YYYY').format('MMM DD YYYY')
      : null;
  
    if (!formattedDate) {
      throw new Error(`Invalid date provided: ${date}`);
    }
  
    // For historical dates, find the corresponding record
    const record = this.trainingData.find(data => data.date === formattedDate);
    if (record) {
      return record.input;
    }
  
    // If the date is in the future, use the most recent available data
    const latestData = this.trainingData[this.trainingData.length - 1];
    if (!latestData) {
      throw new Error('No data available for prediction.');
    }
  
    console.log(`Using latest available data from ${latestData.date} for future prediction.`);
    return latestData.input;
  }
}