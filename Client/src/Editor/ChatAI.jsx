import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { useAuth } from "../router/AuthProvider";

const ChatAI = () => {
    const auth = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");

    try {
        const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/suggestion/generate-doc`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ codeSnippet: message }),
        }
    );
    console.log(response);

    if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error:", response.status, errorData);
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract and format the documentation content
    const formattedContent = data.data && data.data.documentation
        ? data.data.documentation
        : "I could not process that request.";

    // Add AI response to chat
    setChatHistory((prev) => [
        ...prev,
        {
            role: "assistant",
            content: formattedContent,
        },
    ]);
    } catch (error) {
        console.error("Detailed Error:", error);
        setChatHistory((prev) => [
        ...prev,
        {
            role: "assistant",
            content: "Sorry, I encountered an error processing your request.",
        },
        ]);
    }
    };

    return (
    <>
      {/* Chat Toggle Button */}
        <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
        <MessageSquare size={24} />
        </button>

      {/* Chat Window */}
        <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] bg-gray-800 shadow-lg transition-transform duration-300 transform ${
            isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        >
        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Generate Doc</h3>
            <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
            >
            <X size={20} />
            </button>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((msg, index) => (
            <div
                key={index}
                className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
                <div
                className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
                >
                {msg.content}
                </div>
            </div>
            ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                <Send size={20} />
            </button>
            </div>
        </form>
        </div>
    </>
    );
};

export default ChatAI;
