
import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import createError from "http-errors";
import { findSize } from "./buyer.service";

// GET SIZE MEASUREMENTS
export const getSizeMeasurements = createEndpoint({}, async (req, res) => {
  const { userId } = req;

  const measures = await prisma.buyer.findFirst({
    where: {
      userId: userId,
    },
    select: {
      measures: true,
    },
  });
  console.log(measures);
  res.json({
    result: measures,
  });
});

// GET SIZE RECOMMENDATION
export const getSizeRecommendation = createEndpoint({}, async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  const buyerMeasures = await prisma.buyer.findUnique({
    where: {
      userId: userId,
    },
    select: {
      measures: true,
    },
  });

  if (!buyerMeasures) {
    return;
  }

  const product = await prisma.product.findUnique({
    where: {
        id: parseInt(id),
    }, select: {
        sizeChart: true,
        selectedSizes: true,
        measures: true,
    }
  });

  if (!product) {
    throw createError(404, "Product not found");
  }

  const prod = {
    sizeChart: product.sizeChart,
    measures: product.measures,
    sizes: product.selectedSizes,
  }

  const size =  await findSize(buyerMeasures.measures!, prod);

  res.json({
    result: size,
  });
});

// SAVE MEASUREMENTS
export const SaveMeasurements = createEndpoint({}, async (req, res) => {
  const userId = req.userId;
  const { measures } = req.body;

  console.log(measures, userId);

  const buyer = await prisma.buyer.update({
    where: {
      userId: userId,
    },
    data: {
      measures: measures,
    },
  });
  console.log(buyer);
  if (!buyer) {
    throw createError(400, "Failed to save measurements");
  }
  console.log(buyer);
  res.json({
    result: measures,
  });
});
