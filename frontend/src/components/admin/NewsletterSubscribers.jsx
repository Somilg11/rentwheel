import { useState } from "react";

const NewsletterSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]); // Fetch from API
  
    const handleRemoveSubscriber = (id) => {
      // Remove subscriber logic (DELETE from API)
    };
  
    return (
      <div>
        <h2>Newsletter Subscribers</h2>
        <ul>
          {subscribers.map(subscriber => (
            <li key={subscriber.id}>
              {subscriber.email}
              <button onClick={() => handleRemoveSubscriber(subscriber.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default NewsletterSubscribers;
  