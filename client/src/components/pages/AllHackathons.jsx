import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, X } from "lucide-react"; // For icons

const AllHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [search, setSearch] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getAllHackthon")
      .then((response) => {
        setHackathons(response.data);
        setFilteredHackathons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hackathons:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const filtered = hackathons.filter((hackathon) =>
      hackathon.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredHackathons(filtered);
  };

  const handleClick = (id) => {
    navigate(`/getTeams/${id}`);
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    const newChatHistory = [...chatHistory, { question, answer: "Fetching response..." }];
    setChatHistory(newChatHistory);

    try {
      const response = await axios.post("http://localhost:3000/gemini/askAllHackathon", { hackathons, question });

      const answer = response.data?.answer || "No response received.";
      newChatHistory[newChatHistory.length - 1] = { question, answer };
      setChatHistory([...newChatHistory]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      newChatHistory[newChatHistory.length - 1] = { question, answer: "Failed to fetch answer." };
      setChatHistory([...newChatHistory]);
    }

    setLoading(false);
    setQuestion("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="container mx-auto p-6 text-white">
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search hackathons by name"
          className="w-full max-w-md bg-gray-800 text-white border border-gray-700"
        />
      </div>

      {/* Display Hackathons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHackathons.length === 0 ? (
          <p className="text-gray-400">No hackathons found</p>
        ) : (
          filteredHackathons.map((hackathon) => (
            <Card
              key={hackathon._id}
              onClick={() => handleClick(hackathon._id)}
              className="bg-gray-900 text-white border border-gray-800 shadow-lg cursor-pointer hover:bg-gray-800 transition"
            >
              <CardHeader>
                <CardTitle>{hackathon.name}</CardTitle>
                {/* <CardDescription>{hackathon.description}</CardDescription> */}
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Start Date: {new Date(hackathon.startDate).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-all"
      >
        💬 Chatbot
      </button>

      {/* Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-gray-900 border border-gray-700 p-4 rounded-lg shadow-lg transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Hackathon Chatbot</h3>
            <button
              onClick={() => setChatOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat History */}
          <div
            ref={chatContainerRef}
            className="h-48 overflow-y-auto mb-4 p-2 space-y-4 bg-gray-800 rounded-lg border border-gray-700"
          >
            {chatHistory.length === 0 ? (
              <p className="text-gray-400 text-center">Ask me anything about hackathons!</p>
            ) : (
              chatHistory.map((chat, index) => (
                <div key={index} className="flex flex-col">
                  <div className="mb-2">
                    <p className="text-blue-400 font-semibold">You:</p>
                    <p className="bg-gray-700 p-2 rounded-lg">{chat.question}</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold">Bot:</p>
                    <p className="bg-gray-600 p-2 rounded-lg">{chat.answer}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat Input */}
          <div className="flex items-center border-t border-gray-700 pt-2">
            <input
              type="text"
              placeholder="Ask about hackathons..."
              className="flex-1 p-2 bg-gray-700 text-white rounded-l-lg outline-none placeholder-gray-400"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg ${loading ? "cursor-not-allowed" : ""}`}
              onClick={handleAsk}
              disabled={loading}
            >
              {loading ? <span className="animate-pulse">...</span> : <Send size={20} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllHackathons;
