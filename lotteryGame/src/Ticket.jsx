import TicketNum from "./TicketNum";
export default function Ticket({ tickets }) {
  return (
    <div>
      {tickets.map((val, idx) => (
        <TicketNum num={val} key={idx} />
      ))}
    </div>
  );
}
