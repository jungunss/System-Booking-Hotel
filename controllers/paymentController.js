const { Room, Booking, User } = require("../models/index");
const ULID = require("ulid");
const midtransClient = require("midtrans-client");
const axios = require("axios");

class paymentController {
  static async orders(req, res, next) {
    try {
      const orders = await Booking.findAll({
        include: [{ model: User }, { model: Room }],
        where: {
          user_id: req.loginData.user_id,
        },
      });

      if (!orders) throw { name: "NOT_FOUND" };

      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //   static async midtransToken(req, res, next) {
  //     try {
  //       const { RoomId } = req.params;
  //       const { user_id } = req.loginData;
  //       const room = await Room.findByPk(RoomId);
  //       // Create Snap API instance
  //       const roomPrice = room.price;
  //       let snap = new midtransClient.Snap({
  //         // Set to true if you want Production Environment (accept real transaction).
  //         isProduction: false,
  //         serverKey: "SB-Mid-server-kVatzLn6V6GC1tp4iNjiYFfT",
  //       });

  //       const order_id = ULID.ulid();

  //       await Booking.create({
  //         order_id,
  //         user_id,
  //         RoomId,
  //         total_price: roomPrice,
  //       });

  //       let parameter = {
  //         transaction_details: {
  //           order_id: order_id,
  //           gross_amount: roomPrice,
  //         },
  //         credit_card: {
  //           secure: true,
  //         },
  //         customer_details: {
  //           email: req.loginData.email,
  //         },
  //       };

  //       const { token } = await snap.createTransaction(parameter);
  //       res.status(200).json({
  //         transaction_token: token,
  //         order_id,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       next(error);
  //     }
  //   }

  //   static async updateOrderStatus(req, res, next) {
  //     try {
  //       const { order_id } = req.body;
  //       // cari order bedasarkan order id
  //       const order = await Booking.findOne({
  //         where: {
  //           order_id,
  //         },
  //       });

  //       if (!order) throw { name: "NotFound" };

  //       // abis itu check midtrans status ordernya
  //       const base64Key = Buffer.from(
  //         "SB-Mid-server-kVatzLn6V6GC1tp4iNjiYFfT"
  //       ).toString("base64");
  //       const { data } = await axios.get(
  //         `https://api.sandbox.midtrans.com/v2/${order_id}/status`,
  //         {
  //           headers: {
  //             Authorization: `Basic ${base64Key}`,
  //           },
  //         }
  //       );

  //       if (+data.status_code !== 200) {
  //         throw { name: "BAD_REQUEST" };
  //       }

  //       if (data.transaction_status !== "capture") {
  //         throw { name: "BAD_REQUEST" };
  //       }
  //       // update order statusnya jadi paid
  //       await order.update({
  //         statusPayment: "Paid",
  //         paymentDate: new Date(),
  //       });

  //       res.status(200).json({
  //         message: "Payment success!",
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       next(error);
  //     }
  //   }
}

module.exports = paymentController;
