import { useState } from "react";

const RentalLogs = () => {
    // eslint-disable-next-line no-unused-vars
    const [logs, setLogs] = useState([]); // Fetch from API
  
    return (
      <div className="pt-44">
        <h2>Rental Logs</h2>
        <ul>
          {logs.map(log => (
            <li key={log.id}>
              {log.user} rented {log.vehicleName} from {log.startDate} to {log.endDate}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RentalLogs;
  