import { createEndpoint } from "@/commons";
import { prisma } from "@/database";

import { createValidator, idValidator, updateValidator } from "./category.validator";

export const getCategories = createEndpoint({}, async (req, res) => {
  const { userId } = req;

  const categories = await prisma.category.findMany({
    where: {
      Shop: {
        userId,
      },
    },
    select: {
      id: true,
      name: true,
    }
  });

  res.json({
    result: categories,
  });
});

export const getCategory = createEndpoint(idValidator, async (req, res) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  res.json({
    result: category,
  });
});

export const postCategory = createEndpoint(createValidator, async (req, res) => {
  const { userId } = req;
  const { name } = req.body;

  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });
  if (!shop) {
    throw new Error("Shop not found");
  }

  const cat = await prisma.category.findUnique({
    where: {
      categoryIdentifier: {
        shopId: shop.id,
        name,
      },
    },
  });
  if (cat) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: {
      name,
      Shop: {
        connect: {
          userId,
        },
      },
    },
  });

  res.json({
    result: category,
  });
});

export const putCategory = createEndpoint(updateValidator, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await prisma.category.update({
    where: {
      id,
      Shop: {
        userId: req.userId,
      },
    },
    data: {
      name,
    },
  });

  res.json({
    result: category,
  });
});

export const deleteCategory = createEndpoint(idValidator, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const category = await prisma.category.delete({
    where: {
      id,
    },
  });

  res.json({
    result: category,
  });
});

export const deleteCategories = createEndpoint({}, async (req, res) => {
  const { userId } = req;

  const categories = await prisma.category.deleteMany({
    where: {
      Shop: {
        userId,
      },
    },
  });

  res.json({
    result: categories,
  });
});
export default getCategories;
