import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { commandResponses, commandList } from "../data/commands";
import { typeText } from "../utils/typeText";

interface CommandEntry {
  command: string;
  response: string;
}

const CLEAR_COMMAND = "clear";

export default function Terminal() {
  const [history, setHistory] = useState<CommandEntry[]>([]);
  const [input, setInput] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string>("");
  const [tabIndex, setTabIndex] = useState<number>(-1);
  const [typing, setTyping] = useState<boolean>(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [savedInput, setSavedInput] = useState<string>("");

  const terminalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = (): void => inputRef.current?.focus();

  const resetSuggestions = (): void => {
    setSuggestion("");
    setTabIndex(-1);
  };

  const updateLastCommandResponse = (text: string): void => {
    setHistory((prev) => {
      const updated = [...prev];
      updated[updated.length - 1].response = text;
      return updated;
    });
  };

  const runCommand = async (command: string): Promise<void> => {
    resetSuggestions();

    if (command.trim()) {
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
    }

    if (command === CLEAR_COMMAND) {
      setHistory([]);
      setInput("");
      return;
    }

    const response = commandResponses[command.trim() as keyof typeof commandResponses];
    if (!response) {
      setHistory((prev) => [...prev, { command, response: `Command not found: ${command}` }]);
      setInput("");
      return;
    }

    setTyping(true);
    setHistory((prev) => [...prev, { command, response: "" }]);
    await typeText(response, updateLastCommandResponse, 5);
    setTyping(false);
    setInput("");
  };

  const handleCommandSelection = (): void => {
    if (!input) {
      const nextIndex = (tabIndex + 1) % commandList.length;
      setTabIndex(nextIndex);
      setInput(commandList[nextIndex]);
      resetSuggestions();
    } else {
      const matches = commandList.filter((cmd) => cmd.startsWith(input));
      if (matches.length > 0) {
        setInput(matches[0]);
        resetSuggestions();
      }
    }
  };

  const navigateCommandHistory = (direction: "up" | "down"): void => {
    if (commandHistory.length === 0) return;

    let newIndex: number;
    if (direction === "up") {
      if (historyIndex === -1) setSavedInput(input);
      newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : commandHistory.length - 1;
    } else {
      newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
    }

    setHistoryIndex(newIndex);
    setInput(newIndex === -1 ? savedInput : commandHistory[commandHistory.length - 1 - newIndex]);
    resetSuggestions();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    switch (e.key) {
      case "Enter":
        if (typing) {
          e.preventDefault();
          return;
        }
        if (input.trim()) runCommand(input);
        break;
      case "Tab":
        e.preventDefault();
        handleCommandSelection();
        break;
      case "ArrowUp":
        e.preventDefault();
        navigateCommandHistory("up");
        break;
      case "ArrowDown":
        e.preventDefault();
        navigateCommandHistory("down");
        break;
      default:
        setTabIndex(-1);
        break;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInput(value);
    setHistoryIndex(-1);
    setSuggestion(value ? commandList.find((cmd) => cmd.startsWith(value) && cmd !== value) || "" : "");
  };

  const visibleSuggestion = suggestion.startsWith(input) ? suggestion.slice(input.length) : "";

  useEffect(() => {
    focusInput();
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="p-4 h-screen overflow-y-auto font-mono text-white">
      {history.map((entry, index) => (
        <div key={index} className="mb-2">
          <div>
            <span className="text-green-600">guest@portfolio:</span>~$ {entry.command}
          </div>
          <div
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: entry.response }}
          />
        </div>
      ))}
      {!history.length && (
        <div className="mb-4">
          <p className="text-lg mb-2">
            Welcome to <span className="text-green-400">Mikulas Tros's Terminal Portfolio</span>
          </p>
          <p>
            Type <code className="text-green-400">--help</code> to get started.
          </p>
          <div className="mt-4 space-x-4">
            {["bio", "projects", "experience", "stack", "socials"].map((cmd) => (
              <button
                key={cmd}
                className="underline text-green-400 hover:text-green-300 transition-all"
                onClick={() => runCommand(cmd)}
              >
                {cmd.charAt(0).toUpperCase() + cmd.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex mt-4 relative">
        <span className="text-green-600">guest@portfolio:</span>~$
        <div className="relative ml-2 flex-1">
          <input
            ref={inputRef}
            autoFocus
            className="bg-transparent border-none outline-none w-full absolute z-10"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute whitespace-pre text-gray-500">{input}{visibleSuggestion}</div>
        </div>
      </div>
      {suggestion && !typing && visibleSuggestion === "" && (
        <div className="text-gray-600 ml-4 mt-1 text-sm">
          Did you mean: <span className="text-gray-400">{suggestion}</span>
        </div>
      )}
      <div ref={terminalRef} />
    </div>
  );
}