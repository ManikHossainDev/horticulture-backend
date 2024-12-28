import { Order } from '../orders/orders.model';
import { Payment } from '../payment/payment.model';
import Product from '../product/product.model';
import { User } from '../user/user.model';
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const getDashboardData = async () => {
  const totalUsers = await User.countDocuments({ role: 'user' });
  const totalBusinessman = await User.countDocuments({ role: 'businessman' });
  const totalProducts = await Product.countDocuments();
  const totalCompletedOrders = await Order.countDocuments({
    orderStatus: 'delivered',
  });

  // Calculate total earnings by summing the totalAmount from completed and paid orders
  const totalEarnings = await Payment.aggregate([
    { $match: { paymentStatus: 'succeeded' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);

  const earnings = totalEarnings.length > 0 ? totalEarnings[0].total : 0; // Default to 0 if no earnings are found

  return {
    totalUsers,
    totalBusinessman,
    totalProducts,
    totalCompletedOrders,
    totalEarnings: earnings,
  };
};

const earningsGraphChart = async (year: number) => {
  const payments = await Payment.aggregate([
    {
      $match: {
        paymentStatus: 'succeeded',
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: '$createdAt' } },
        totalEarnings: { $sum: '$totalAmount' },
      },
    },
    { $sort: { '_id.month': 1 } },
  ]);

  const monthlyIncomeRatio = monthNames.map((month, index) => ({
    month,
    totalEarnings: 0,
  }));

  payments.forEach(payment => {
    monthlyIncomeRatio[payment._id.month - 1].totalEarnings =
      payment.totalEarnings;
  });

  return { monthlyIncomeRatio };
};

export const AdminServices = {
  getDashboardData,
  earningsGraphChart
};
