import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Starfield from '../components/Three/Starfield';
import { Mic, MicOff } from 'lucide-react';

const SpaceChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello young explorer! Ask me anything about the Solar System, stars, or space!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const handleListen = () => {
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    // Toggle off if already listening
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // Store the input value when we start listening to append properly
    const initialInput = input;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput((initialInput ? initialInput + ' ' : '') + transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input }; // Note: OpenAI expects 'content' instead of 'text'
    // Map existing messages to OpenAI format
    const formattedMessages = messages.map(m => ({
      role: m.role,
      content: m.text
    })).concat(userMessage);

    // Update UI immediately
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: formattedMessages })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Network response was not ok');
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: data.message?.content || 'Sorry, I lost connection to space!'
      }]);
    } catch (error) {
      console.error('Error fetching chat response:', error);

      let errorMsg = 'Sorry! The communication with my space ship is currently broken. Make sure the backend server is running and the API key is set.';
      if (error.message && error.message !== 'Failed to fetch') {
        errorMsg = error.message;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: errorMsg
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <color attach="background" args={['#020208']} />
          <Starfield />
        </Canvas>
      </div>

      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%', maxWidth: '600px',
        height: '70vh',
        display: 'flex', flexDirection: 'column',
        borderRadius: '24px',
        overflow: 'hidden'
      }} className="glass-panel">

        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', textAlign: 'center' }} className="text-glow">CosmoGuide AI</h2>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              background: m.role === 'user' ? 'rgba(100, 150, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
              padding: '12px 16px',
              borderRadius: '16px',
              maxWidth: '80%',
              color: '#fff',
              lineHeight: '1.4'
            }}>
              {m.text}
            </div>
          ))}
          {isLoading && (
            <div style={{ color: 'rgba(255,255,255,0.6)', alignSelf: 'flex-start' }}>CosmoGuide AI is thinking...</div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={handleListen}
            style={{
              padding: '12px', borderRadius: '50%', border: 'none',
              background: isListening ? 'rgba(255, 50, 50, 0.8)' : 'rgba(255,255,255,0.1)',
              color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isListening ? '0 0 10px rgba(255, 50, 50, 0.8)' : 'none',
              transition: 'all 0.3s ease'
            }}
            title={isListening ? "Listening..." : "Click to speak"}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            style={{
              flex: 1, padding: '12px 20px', borderRadius: '30px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)', color: '#fff',
              outline: 'none', fontSize: '1rem'
            }}
          />
          <button type="submit" style={{
            padding: '12px 24px', borderRadius: '30px', border: 'none',
            background: 'linear-gradient(45deg, #4b70dd, #2b82c9)',
            color: '#fff', fontWeight: 'bold', cursor: 'pointer'
          }}>
            Send
          </button>
        </form>

      </div>
    </div>
  );
};

export default SpaceChat;
