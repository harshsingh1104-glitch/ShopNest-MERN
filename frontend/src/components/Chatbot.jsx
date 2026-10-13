import React, { useEffect, useRef, useState } from 'react';
import './chatbot.css';

const suggestions = [
  'Help me find something',
  'What is in stock?'
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi there! I’m your ShopNest shopping assistant. What are you looking for today?'
    }
  ]);
  const nextMessageId = useRef(0);
  const messageListRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isOpen, isSending]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text = input) => {
    const content = text.trim();
    if (!content || isSending) return;

    const userMessage = { id: `message-${nextMessageId.current++}`, role: 'user', content };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversation
            .filter((message) => message.role === 'user' || message.role === 'assistant')
            .slice(-10)
            .map(({ role, content: messageContent }) => ({ role, content: messageContent }))
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'The shopping assistant is temporarily unavailable.');
      }

      setMessages((current) => [
        ...current,
        { id: `message-${nextMessageId.current++}`, role: 'assistant', content: data.reply }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `message-${nextMessageId.current++}`,
          role: 'assistant',
          content: error.name === 'Error'
            ? error.message
            : 'I couldn’t connect just now. Please try again in a moment.'
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="shopnest-chatbot">
      {isOpen && (
        <section className="chat-panel" aria-label="ShopNest shopping assistant">
          <header className="chat-header">
            <div className="chat-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9-1.9 5.7-1.9-5.7-5.6-1.9L10.1 9 12 3.5Z" fill="currentColor" />
                <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" fill="currentColor" />
              </svg>
            </div>
            <div className="chat-heading">
              <strong>ShopNest assistant</strong>
              <span><i /> Here to help you shop</span>
            </div>
            <button
              className="chat-close"
              type="button"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div className="chat-messages" ref={messageListRef} aria-live="polite">
            <p className="chat-day-label">YOUR SHOPPING ASSISTANT</p>
            {messages.map((message) => (
              <div className={`chat-message-row chat-message-row--${message.role}`} key={message.id}>
                {message.role === 'assistant' && (
                  <span className="chat-message-mark" aria-hidden="true">✦</span>
                )}
                <p className="chat-message">{message.content}</p>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="chat-suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    disabled={isSending}
                  >
                    {suggestion}
                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            )}
            {isSending && (
              <div className="chat-message-row chat-message-row--assistant" role="status" aria-label="Assistant is typing">
                <span className="chat-message-mark" aria-hidden="true">✦</span>
                <p className="chat-message chat-typing"><i /><i /><i /></p>
              </div>
            )}
          </div>

          <form className="chat-composer" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="shopnest-chat-input">Message the ShopNest assistant</label>
            <input
              id="shopnest-chat-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me anything..."
              maxLength={1200}
              disabled={isSending}
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim() || isSending}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 3 10.7 13.3M21 3l-6.5 18-3.8-7.7L3 9.5 21 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
          <p className="chat-footer-note">Powered by AI · ShopNest</p>
        </section>
      )}

      <button
        className={`chat-launcher${isOpen ? ' chat-launcher--open' : ''}`}
        type="button"
        aria-label={isOpen ? 'Close shopping assistant' : 'Open shopping assistant'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.5-.7L4 20l1.4-3.5A7.2 7.2 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 2.9 8 7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M9 12h.01M12 12h.01M15 12h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span>Chat with us</span>
          </>
        )}
      </button>
    </div>
  );
}

export default Chatbot;
