import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

function StockUpdates() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = mqtt.connect('ws://your-ec2-ip-address:1883'); // Use `ws` for WebSocket

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('stock/updates');
    });

    client.on('message', (topic, message) => {
      console.log(`Received message on ${topic}: ${message.toString()}`);
      setMessages((prevMessages) => [...prevMessages, message.toString()]);
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h3>Stock Updates</h3>
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}

export default StockUpdates;
