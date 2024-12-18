const { Booking, Room, Hotel } = require("../models/index");
const { Op } = require("sequelize");

class bookingController {
  // EndPoint : POST(booking) ============================== >>>
  static async createOrder(req, res, next) {
    try {
      const { user_id } = req.loginData;
      const { room_id } = req.params;
      const { checkIn, checkOut } = req.body;
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      if (checkInDate >= checkOutDate) {
        throw {
          status: 400,
          message: "check_in_date must before check_out_date",
        };
      }
      const room = await Room.findOne({
        where: {
          room_id: room_id,
          availability: true,
        },
      });
      if (!room) throw { name: "NOT_FOUND" };
      const overlappingBookings = await Booking.findOne({
        where: {
          room_id,
          [Op.or]: [
            {
              check_in_date: {
                [Op.lte]: checkOutDate,
              },
              check_out_date: {
                [Op.gte]: checkInDate,
              },
            },
          ],
        },
        include: [
          {
            model: Room,
            where: { availability: false },
          },
        ],
      });
      if (overlappingBookings) throw { name: "ORDER_DENIED" };
      const totalDays = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = room.price * totalDays;
      const order = await Booking.create({
        user_id,
        room_id,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        total_price: totalPrice,
      });

      res.status(201).json({ message: "Booking room successfully", order });
    } catch (error) {
      next(error);
    }
  }

  // EndPoint : PUT(cancel-booking) ============================== >>>
  static async cancelOrder(req, res, next) {
    try {
      const { user_id } = req.loginData;
      const { order_id } = req.params;
      const order = await Booking.findByPk(order_id);
      if (!order) throw { name: "NOT_FOUND" };
      if (user_id !== order.user_id) throw { name: "FORBIDDEN" };
      if (order.booking_status !== "booked") throw { name: "CANCEL_DENIED" };
      await order.update({ booking_status: "cancelled" });

      res.status(200).json({
        message: "Booking cancelled successfully",
        order,
      });
    } catch (error) {
      next(error);
    }
  }

  // EndPoint : PUT(refund) ============================== >>>
  static async refundOrder(req, res, next) {
    try {
      const { user_id } = req.loginData;
      const { order_id } = req.params;
      const order = await Booking.findByPk(order_id);
      if (!order) throw { name: "NOT_FOUND" };
      if (user_id !== order.user_id) throw { name: "FORBIDDEN" };
      if (order.booking_status !== "completed") throw { name: "REFUND_DENIED" };

      const currentDate = new Date();
      const checkInDate = new Date(order.check_in_date);
      if (currentDate >= checkInDate) throw { name: "REFUND_EXPIRED" };
      await order.update({ booking_status: "refunded" });
      res.status(200).json({
        message: "Refund processed successfully",
        order,
      });
    } catch (error) {
      next(error);
    }
  }

  // EndPoint : PUT(refund) ============================== >>>
  static async getAllHotels(req, res, next) {
    try {
      const { SEARCH, SORT, FILTER, PAGE = 1, LIMIT = 10 } = req.query;
      const option = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Room,
            attributes: {
              exclude: ["hotel_id", "createdAt", "updatedAt"],
            },
            where: {},
          },
        ],
        where: {},
        order: [],
        limit: parseInt(LIMIT),
        offset: (PAGE - 1) * LIMIT,
      };
      if (SEARCH) {
        option.where.name = {
          [Op.iLike]: `%${SEARCH}%`,
        };
      }
      if (SORT === "highClass") {
        option.order.push(["star", "DESC"]);
      } else if (SORT === "lowClass") {
        option.order.push(["star", "ASC"]);
      }
      if (FILTER) {
        option.include[0].where.type = {
          [Op.iLike]: `%${FILTER}%`,
        };
      }
      const hotels = await Hotel.findAndCountAll(option);
      if (!hotels || hotels.rows.length === 0) throw { name: "NOT_FOUND" };

      res.status(200).json({
        totalItems: hotels.count,
        totalPages: Math.ceil(hotels.count / LIMIT),
        currentPage: parseInt(PAGE),
        hotels: hotels.rows,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = bookingController;
