export const calculateTotalEarnings = (orders: any[]) => {
    return orders.reduce((total, order) => {
      const shopOrderTotal = order.ShopOrders.reduce(
        (sum: any, shopOrder: { subTotal: any }) => {
          return sum + shopOrder.subTotal;
        },
        0
      );
      console.log(shopOrderTotal);
      return total + shopOrderTotal;
    }, 0);
  };
  

export const calculateProductsSold = (orders: any[]) => {
  return orders.reduce((total, order) => {
    const productsSold = order.ShopOrders.reduce(
      (sum: any, shopOrder: { OrderDetails: any[] }) => {
        return (
          sum +
          shopOrder.OrderDetails.reduce(
            (sum: any, orderDetail: { quantity: any }) => {
              return sum + orderDetail.quantity;
            },
            0
          )
        );
      },
      0
    );
    return total + productsSold;
  }, 0);
};

export const findTopSellers = (orders: any[]) => {
    const productCounts: { [productName: string]: number } = orders.reduce((acc, order) => {
      order.ShopOrders.forEach((shopOrder: { OrderDetails: any[]; }) => {
        shopOrder.OrderDetails.forEach((orderDetail: { Product: { name: any; }; quantity: any; }) => {
          const productName = orderDetail.Product.name;
          const quantity = orderDetail.quantity;
          if (acc[productName]) {
            acc[productName] += quantity;
          } else {
            acc[productName] = quantity;
          }
        });
      });
      return acc;
    }, {});
  
    // Convert the object to an array of [productName, quantity] and sort by quantity in descending order
    const sortedProducts = Object.entries(productCounts).sort((a, b) => b[1] - a[1]);
  
    // Select the top 5 products
    const topProducts = sortedProducts.slice(0, 5).map(product => ({
      name: product[0],
      quantity: product[1]
    }));
  
    return topProducts;
  };  

const getMonthYearKey = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return `${date.toLocaleString("default", {
    month: "short",
  })}-${date.getFullYear()}`;
};

export const calculateMonthlyOrders = (orders: any[]) => {
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

  return monthlyOrdersArray;
};

export const findBuyers = (orders: any[]) => {
    const buyersMap = new Map();
  
    orders.forEach((order) => {
      const email = order.Buyer.user.email; 
  
      // If the buyer already exists in the map, add to their total spendings
      if (buyersMap.has(email)) {
        const existingBuyer = buyersMap.get(email);
        existingBuyer.totalSpendings += order.ShopOrders.reduce((sum: number, shopOrder: { subTotal: number }) => {
          return sum + shopOrder.subTotal;
        }, 0);
        buyersMap.set(email, existingBuyer);
      } else {
        const totalSpendings = order.ShopOrders.reduce((sum: number, shopOrder: { subTotal: number }) => {
          return sum + shopOrder.subTotal;
        }, 0);
  
        buyersMap.set(email, {
          name: order.Buyer.firstName + " " + order.Buyer.lastName,
          email: email,
          totalSpendings: totalSpendings
        });
      }
    });
  
    // Convert the map values to an array
    return Array.from(buyersMap.values());
  };
  
  
