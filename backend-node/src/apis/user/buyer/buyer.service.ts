// Metrics for the size recommendation
const sumOfAbsoluteDifferences = (arr1: number[], arr2: number[]) => {
  return arr1.reduce((acc, val, i) => acc + Math.abs(val - arr2[i]), 0);
};

// Find the size based on the measurements
export const findSize = async (
  measures: string,
  product: { sizeChart: string; measures: string; sizes: string[] }
): Promise<string> => {
  let buyerMeasurements = JSON.parse(measures);

  buyerMeasurements =
    product.sizeChart === "tops chart"
      ? buyerMeasurements[0]
      : product.sizeChart === "bottoms chart"
      ? buyerMeasurements[1]
      : buyerMeasurements[2];

  let size = "";
  let sumsOfMatchedMeasurements = [];

  const productMeasurementsArray = JSON.parse(product.measures);

  // find the closest size
  for (let i = 0; i < product.sizes.length; i++) {
    let productMeasurements = productMeasurementsArray[i];
    if (productMeasurements === undefined || productMeasurements.length === 0) {
      continue;
    }
    let sum = sumOfAbsoluteDifferences(buyerMeasurements, productMeasurements);
    sumsOfMatchedMeasurements.push(sum);
  }

  let bestMatch = Math.min(...sumsOfMatchedMeasurements);

  for (let j = 0; j < sumsOfMatchedMeasurements.length; j++) {
    if (sumsOfMatchedMeasurements[j] === bestMatch) {
      size = product.sizes[j];
      break;
    }
  }

  return size;
};
