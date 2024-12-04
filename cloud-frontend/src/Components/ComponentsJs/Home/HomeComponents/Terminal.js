import React, { useState, useRef } from "react";
import "../../../ComponentsCss/Terminal.css";

const Terminal = () => {
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const inputRef = useRef(null);

  // Function to handle submitting the command
  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (currentCommand.trim() !== "") {
      setCommands([...commands, `> ${currentCommand}`, simulateCommandOutput(currentCommand)]);
      setCurrentCommand("");
    }
  };

  // Simulate command output
  const simulateCommandOutput = (command) => {
    switch (command.toLowerCase()) {
      case "hello":
        return "Hello, User!";
      case "clear":
        setCommands([]);
        return "";
      default:
        return `Command not found: ${command}`;
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {commands.map((command, index) => (
          <div key={index}>{command}</div>
        ))}
      </div>
      <form onSubmit={handleCommandSubmit} className="terminal-input">
        <span></span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          placeholder="Type a command..."
        />
      </form>
    </div>
  );
};

export default Terminal;
