const { Booking } = require("../models/index");
const { Room } = require("../models/index");

class bookingController {
  static async orderRoom(req, res, next) {
    try {
      const { user_id } = req.loginData;
      const { room_id } = req.params;
      const { check_in_date, check_out_date } = req.body;
      const checkInDate = new Date(check_in_date);
      const checkOutDate = new Date(check_out_date);
      if (checkInDate >= checkOutDate) {
        throw {
          status: 400,
          message: "check_in_date must be before check_out_date",
        };
      }
      const room = await Room.findByPk(room_id);
      if (!room) throw { name: "NOT_FOUND" };
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
      console.error(error);
      next(error);
    }
  }
}

module.exports = bookingController;
