export const calculateTotal = (cartItems: any) => {
    let total = 0;
    let totalQuantity = 0;
    for (const item of cartItems) {
        total += item.subTotal;
        totalQuantity += item.quantity;
    }
    return { total, totalQuantity };
}