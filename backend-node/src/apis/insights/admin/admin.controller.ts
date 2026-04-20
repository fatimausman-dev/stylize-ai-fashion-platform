import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import createError from "http-errors";

export const calculatePlatformEarnings = createEndpoint({}, async (req, res) => {
  const total = await prisma.order.count();
  if (!total) {
    throw createError(404, "Earnings not found");
  }
  
  const earningFee = total * 100;

  res.json({ result: earningFee });
  console.log(earningFee);
});

export const getActiveUsersCount = createEndpoint({}, async (req, res) => {
    const buyersCount = await prisma.user.count({
      where: {
        role: 'BUYER',
      },
    });

    // Count the number of retailers
    const retailersCount = await prisma.user.count({
      where: {
        role: 'RETAILER',
      },
    });
    
   // Throw error if no users found
   if (buyersCount === 0 && retailersCount === 0) {
    throw createError(404, "No users found");
  }
    // Send the response
    res.json({
      result: {
        buyersCount,
        retailersCount,
      }
    });
 
});
export const getClients = createEndpoint({}, async (req, res) => {
    // Fetch all users with their roles
    const users = await prisma.user.findMany({
      where: {
        role: {
            not: 'ADMIN' // Exclude users with role 'ADMIN'
        }
    },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        Shop: {
          select: {
              name: true
          }
         } // Include shop for retailers
      },
    })

    // Map users to clients based on their roles
    const clients = users.map((user) => {
      const role = user.role === 'RETAILER' ? 'Retailer' : 'Buyer'; // Determine role
      const shopName = user.role === 'RETAILER' ? user.Shop?.name : "-"; // Determine shop name
      return {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          Restrict: false, // Placeholder for restricted status
          role: role, // Include role
          shop: shopName // Include shop name
      };
  });

    // Send the response
    res.json({ result: clients });
});

export const updateClientRestriction = createEndpoint({}, async (req, res) => {
  const { clientId } = req.body; 
  
  const client = await prisma.user.findUnique({
    where: { id: clientId },
    select: {isRestricted: true}
  })
   if(!client){
      throw createError(404, "no client found");
    }
    const updatedClients = await prisma.user.update({
      where: { id: clientId },
      data: {
        isRestricted: client.isRestricted == true ? false : true,
      }
    });
    
    res.json({ result: updatedClients });
 });

 export const getMonthlyOrders = createEndpoint({}, async (req, res) => {
    // Fetch all orders from the database
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        date: true,
      },
    });

    // Calculate monthly orders
    const monthlyOrders = calculateMonthlyOrders(orders);
    // Send the response
    res.json({ result: monthlyOrders });
});

// Helper function to calculate monthly orders
const calculateMonthlyOrders = (orders: any[]) => {
  const monthlyOrders = orders.reduce((acc, order) => {
    const monthYearKey = getMonthYearKey(order.date);
    if (!acc[monthYearKey]) {
      acc[monthYearKey] = 0;
    }
    acc[monthYearKey]++;
    return acc;
  }, {});

  const monthlyOrdersArray = Object.keys(monthlyOrders).map((monthYear) => ({
    monthYear: monthYear,
    count: monthlyOrders[monthYear],
  }));
console.log("123",monthlyOrders);
  return monthlyOrdersArray;
};

// Helper function to generate month-year key
const getMonthYearKey = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return `${date.toLocaleString("default", {
    month: "short",
  })}-${date.getFullYear()}`;
};

export default {calculatePlatformEarnings, getActiveUsersCount, getClients, updateClientRestriction, getMonthlyOrders}