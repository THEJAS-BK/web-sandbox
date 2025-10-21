import { useEffect, useState } from "react";
import "./SeatHub.css";
import LivingIcon from "@mui/icons-material/Living";
import { genObject } from "../helper";
import socket from "../socket.js";
export default function SeatHub() {
  let [curSeat, setCurSeat] = useState(genObject(90));
  let handleClick = (idx) => {
    curSeat.map((seats) =>
      seats.seatIdx === idx
        ? seats.isBooked
          ? console.log("Seat already booked")
          : socket.emit("seat-idx", idx)
        : null
    );
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connection successfull");
    });
    socket.on("booked-seats", (bookedSeats) => {
      setCurSeat((seats) =>
        seats.map((seat) =>
          bookedSeats.includes(seat.seatIdx)
            ? { ...seat, isBooked: true }
            : seat
        )
      );
    });
    return () => {
      socket.off("connect");
      socket.off("booked-seat");
    };
  }, []);

  return (
    <div className="Seats-area">
      {curSeat &&
        curSeat.map((idx) => (
          <LivingIcon
            style={idx.isBooked ? { color: "red" } : null}
            key={idx.seatIdx}
            className="seat"
            onClick={() => handleClick(idx.seatIdx)}
          />
        ))}
    </div>
  );
}
