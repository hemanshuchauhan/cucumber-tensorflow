import * as tf from '@tensorflow/tfjs-node'; // Use tfjs-node for Node.js file system support

// Simple TensorFlow Model
export async function createSimpleModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  // Training data: y = 2x - 1
  const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
  const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

  // Train the model
  await model.fit(xs, ys, { epochs: 1000 });

  // Save the model
  await model.save('file://./src/support/model/pretrained-model');

  return model;
}

// Load a pre-trained model
export async function loadTrainedModel() {
  return await tf.loadLayersModel(
    'file://./src/support/model/pretrained-model/model.json',
  );
}

// Predict a value using the trained model
export async function predictValue(model: tf.LayersModel, input: number) {
  const prediction = model.predict(tf.tensor2d([input], [1, 1])) as tf.Tensor;
  return prediction.dataSync()[0];
}
