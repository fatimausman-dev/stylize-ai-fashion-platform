import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import createError from "http-errors";

interface ProductSpecifications {
  [key: string]: string | undefined;
}

export const submitQuiz = createEndpoint({}, async (req, res) => {
  const { answers } = req.body;

  // Validate that answers were provided in the request
  if (!answers) {
    throw createError(400, "Answers not provided");
  }

  // Attempt to fetch all products from the database
  const products = await prisma.product.findMany();

  // Ensure that products were retrieved successfully
  if (!products || products.length === 0) {
    throw createError(404, "No products found");
  }
console.log('products:', products);
const matchedProducts = products.filter((product) => {
    
    // Ensure that the product has specifications
    if (!product.specifications) {
        return false;
    }

    const productSpecs = product.specifications as Record<string, string>; 
    
    return Object.entries(answers).every(([question, answer]) => {
        return productSpecs[question] === answer;
    });
});

console.log('answers:', answers);
console.log('matchedProducts:', matchedProducts);
// Return the matched products
res.json({ result: matchedProducts });
});
