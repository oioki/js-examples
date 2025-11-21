import { useState } from "react";
import * as Sentry from "@sentry/remix";

export default function Index() {
  const [logs, setLogs] = useState<string[]>(["Ready to test Sentry integration..."]);

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${message}`, ...prev]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    
    addLog("📤 Sending AJAX request...");
    
    // Add breadcrumb for form submission
    Sentry.addBreadcrumb({
      category: "form",
      message: "User submitted form",
      data: { username },
      level: "info",
    });
    
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookiez": "test=test"
        },
        body: JSON.stringify({ username }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      addLog("✅ Request successful: " + JSON.stringify(data));
      
    } catch (error) {
      // Capture the network error in Sentry
      Sentry.captureException(error, {
        tags: {
          endpoint: "/api/submit",
          method: "POST",
        },
        contexts: {
          request: {
            username,
            url: "/api/submit",
          },
        },
      });
      
      addLog("❌ Request failed: " + (error as Error).message);
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <style>{`
        body {
          background: #f5f5f5;
          margin: 0;
        }
        .container {
          max-width: 600px;
          margin: 50px auto;
        }
        .demo-section {
          background: white;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        input[type="text"] {
          padding: 10px;
          margin: 5px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 300px;
          font-size: 14px;
        }
        button {
          background: #6c5ce7;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }
        button:hover {
          background: #5f4dd1;
        }
        .output {
          background: #f8f9fa;
          padding: 15px;
          margin-top: 20px;
          border-radius: 5px;
          font-family: monospace;
          font-size: 12px;
          color: #2d3436;
          white-space: pre-wrap;
        }
      `}</style>
      
      <div className="container">
        <h1>🔍 Sentry Demo (Remix)</h1>
        
        <div className="demo-section">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter your name"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        
        <div className="output">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}


