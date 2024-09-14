
import Link from 'next/link';
import './customScrollbar.css'

const ticketsData = [
  {
    id: 1,
    name: "Rashmi Sharma",
    description: "My Payment Done Appointment Cancelled by Doctor",
    date: "11:25AM, June 28, 2024",
    message: "I booked a Session with Doctor Sushmita Singh but she cancelled it just before the session timing starts.",
    avatar: "/assets/avatar.jpg",
  },
  {
    id: 2,
    name: "Rashmi Sharma",
    description: "My Payment Done Appointment Cancelled by Doctor",
    date: "11:25AM, June 28, 2024",
    message: "I booked a Session with Doctor Sushmita Singh but she cancelled it just before the session timing starts.",
    avatar: "/assets/avatar.jpg",
  },
  {
    id: 3,
    name: "Rashmi Sharma",
    description: "My Payment Done Appointment Cancelled by Doctor",
    date: "11:25AM, June 28, 2024",
    message: "I booked a Session with Doctor Sushmita Singh but she cancelled it just before the session timing starts.",
    avatar: "/assets/avatar.jpg",
  },
  {
    id: 4,
    name: "Rashmi Sharma",
    description: "My Payment Done Appointment Cancelled by Doctor",
    date: "11:25AM, June 28, 2024",
    message: "I booked a Session with Doctor Sushmita Singh but she cancelled it just before the session timing starts.",
    avatar: "/assets/avatar.jpg",
  },
  // Add more ticket objects here
];

export default function RecentTickets() {

  return (
    <div style={{ width: "100%", height: "350px", backgroundColor: "white", borderRadius: "20px", padding: "18px 20px", overflow: "hidden", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "600" }}>Recent <span style={{ color: "#FFA05D" }}>Tickets</span></h2>
        <Link href="/creator/recentTickets" style={{textDecoration: "none"}}>
          <button
         className='see-all'
          >
            See All
            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "5px" }} width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M8 2.875H2.75C2.28587 2.875 1.84075 3.07254 1.51256 3.42417C1.18437 3.77581 1 4.25272 1 4.75V14.125C1 14.6223 1.18437 15.0992 1.51256 15.4508C1.84075 15.8025 2.28587 16 2.75 16H11.5C11.9641 16 12.4092 15.8025 12.7374 15.4508C13.0656 15.0992 13.25 14.6223 13.25 14.125V8.5" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 12.6504L12.875 4.21289" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.625 1H15V5.6875" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Link>
      </div>
      <div style={{ maxHeight: "calc(100% - 10px)", overflowY: "auto", paddingRight: "16px" }}>
        {ticketsData.slice(0, 3).map(
          (ticket) => (
            <div key={ticket.id} style={{ display: "flex", alignItems: "start", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid #ffecd4" }}>
              <img
                src={ticket.avatar}
                alt={ticket.name}
                style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "8px" }}
              />
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "-2px" }}>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: "500", margin: "0" }}>{ticket.name}</h3>
                  <span style={{ margin: "0 4px" }}>~</span>
                  <p style={{ fontSize: "0.75rem", color: "#FFA05D", margin: "0" }}>{ticket.description}</p>
                </div>
                <p style={{ color: "#6b7280", fontSize: "0.75rem", margin: "0" }}>{ticket.date}</p>
                <p style={{ fontSize: "0.875rem", margin: "0" }}>{ticket.message}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
