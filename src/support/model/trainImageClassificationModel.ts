import * as tf from '@tensorflow/tfjs-node';
import * as path from 'path';

async function trainAndSaveImageClassificationModel() {
  // Create a sequential model with a basic convolutional structure
  const model = tf.sequential();
  model.add(
    tf.layers.conv2d({
      inputShape: [100, 100, 3], // Assuming input images are resized to 100x100
      kernelSize: 3,
      filters: 8,
      activation: 'relu',
    }),
  );
  model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 2, activation: 'softmax' })); // Two classes: cat and dog

  // Compile the model
  model.compile({
    optimizer: 'adam',
    loss: 'sparseCategoricalCrossentropy',
    metrics: ['accuracy'],
  });

  // Example training data (use real image tensors in practice)
  const xs = tf.randomNormal([10, 100, 100, 3]); // Example images
  const ys = tf
    .tensor1d([0, 1, 0, 1, 0, 1, 0, 1, 0, 1], 'int32')
    .cast('float32'); // Convert labels to float32

  // Train the model
  await model.fit(xs, ys, {
    epochs: 10,
  });

  // Save the model to the filesystem
  const modelPath = path.resolve(
    __dirname,
    '../model/image-classification-model',
  );
  await model.save(`file://${modelPath}`);

  console.log(`Model saved to ${modelPath}`);
}

trainAndSaveImageClassificationModel()
  .then(() => {
    console.log('Pre-trained model has been successfully saved.');
  })
  .catch((err) => {
    console.error('Error during training and saving the model:', err);
  });
