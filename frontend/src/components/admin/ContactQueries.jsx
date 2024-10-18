import { useState } from "react";

const ContactQueries = () => {
    const [queries, setQueries] = useState([]); // Fetch from API
  
    const handleAnswerQuery = (id, answer) => {
      // Post answer to backend (PUT/PATCH to API)
    };
  
    return (
      <div>
        <h2>Contact Queries</h2>
        <ul>
          {queries.map(query => (
            <li key={query.id}>
              {query.message}
              <textarea placeholder="Write your response here..."></textarea>
              <button onClick={() => handleAnswerQuery(query.id, /* answer */)}>Send Answer</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ContactQueries;
  