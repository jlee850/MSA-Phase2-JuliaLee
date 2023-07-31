import React, { useEffect, useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState<any[] | undefined>(undefined);

  useEffect(() => {
    // Send a GET request
    fetch("https://localhost:7206/api/Recipe/4")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {/* Render the data fetched from the API */}
      {data && (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyComponent;
