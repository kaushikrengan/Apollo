import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface ApolloChatProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'Manager' | 'Associate';
}

const MANAGER_PROMPTS = [
  "How can I help team members with 'Behind' skills progress?",
  "What is the average competency score across our plant divisions?",
  "Recommend a learning pathway to close Cycle Time optimization gaps",
  "How can space strategy affect new production competencies?"
];

const ASSOCIATE_PROMPTS = [
  "How can I get my production metrics back on track?",
  "Explain Cycle Time and Takt Time models simply",
  "Recommend a study schedule for Advanced Robotics implementation",
  "What active courses and quizzes are currently assigned to me?"
];

export default function ApolloChat({ isOpen, onClose, role }: ApolloChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: role === 'Manager' 
        ? "Hello, Manager! I am **Apollo AI**, your strategic team competency advisor.\n\nAsk me about division progress metrics, closing competency gaps, or defining customized pathways."
        : "Hello, Adore! I am **Apollo AI**, your personal learning and development chatbot advisor.\n\nAsk me how to pass your assigned quizzes, study Cycle Time optimization models, or get 'Behind' skills on track!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Re-initialize welcome message and clear chat thread when role changes state
  useEffect(() => {
    if (isOpen) {
      const welcomeContent = role === 'Manager'
        ? "Hello, Manager! I am **Apollo AI**, your strategic team competency advisor.\n\nAsk me about team progress metrics, closing competency gaps, or defining customized pathways."
        : "Hello, Adore! I am **Apollo AI**, your personal learning and development chatbot advisor.\n\nAsk me how to pass your assigned quizzes, study RAG overlapping models, or get 'Behind' skills on track!";
      
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          content: welcomeContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [role, isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Handle send message
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setError(null);
    const userMsgId = 'msg-' + Date.now();
    const newUserMsg: Message = {
      id: userMsgId,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for the context without system messages
      const historyContext = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          content: m.content
        }))
        .slice(-6); // Limit history for performance

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: historyContext,
          role: role
        })
      });

      if (!response.ok) {
        throw new Error('Could not get a response from Apollo AI.');
      }

      const data = await response.json();
      
      const modelMsg: Message = {
        id: 'msg-' + (Date.now() + 1),
        role: 'model',
        content: data.text || "I was unable to formulate a response at this time.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  // Convert markdown-ish text to simple formatted content
  const formatText = (text: string) => {
    return text.split('\n').map((paragraph, idx) => {
      // Simple bold matching **text**
      let parts = [paragraph];
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;
      const elements: React.ReactNode[] = [];
      let lastIndex = 0;

      while ((match = boldRegex.exec(paragraph)) !== null) {
        if (match.index > lastIndex) {
          elements.push(paragraph.substring(lastIndex, match.index));
        }
        elements.push(<strong key={match.index} className="font-semibold text-slate-900">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < paragraph.length) {
        elements.push(paragraph.substring(lastIndex));
      }

      const processedLine = elements.length > 0 ? elements : paragraph;

      // Unordered list matching * item or - item
      if (paragraph.trim().startsWith('* ') || paragraph.trim().startsWith('- ')) {
        const itemText = paragraph.replace(/^[\s*-]+/, '').trim();
        return (
          <li key={idx} className="list-disc ml-4 pl-1 text-[13px] text-slate-750 mb-1 leading-relaxed">
            {itemText}
          </li>
        );
      }

      return (
        <p key={idx} className="text-[13px] text-slate-750 mb-2 leading-relaxed">
          {processedLine}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="apollo-chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950 z-40"
          />

          {/* Drawer Sidebar */}
          <motion.div
            id="apollo-chat-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white border-l border-zinc-250/75 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-150 flex items-center justify-between bg-[#FAF9F6]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 tracking-tight">Ask Apollo AI</h3>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 block uppercase tracking-wider">Operational Advisor</span>
                </div>
              </div>
              <button
                id="close-apollo-chat"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-zinc-100 active:scale-90 hover:scale-115 hover:rotate-90 rounded-xl transition-all duration-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#FAF9F6]/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div
                    className={`p-4 rounded-[1.75rem] shadow-xs text-sm ${
                      msg.role === 'user'
                        ? 'bg-slate-900 text-white rounded-tr-none'
                        : 'bg-white border border-zinc-200 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    {msg.role === 'model' ? (
                      <div className="space-y-1">{formatText(msg.content)}</div>
                    ) : (
                      <p className="leading-relaxed text-[13px]">{msg.content}</p>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="p-4 bg-white border border-zinc-200 rounded-[1.75rem] rounded-tl-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3 text-rose-900">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed">{error}</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (Suggestion Prompts) */}
            {messages.length === 1 && !isLoading && (
              <div className="px-6 py-4 border-t border-zinc-150/70 bg-[#FAF9F6]/50">
                <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block mb-3">Suggested Topics</span>
                <div className="flex flex-wrap gap-2">
                  {(role === 'Manager' ? MANAGER_PROMPTS : ASSOCIATE_PROMPTS).map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="group text-xs py-2.5 px-4 bg-white hover:bg-slate-50 border border-zinc-200 hover:border-slate-950 hover:scale-[1.01] active:scale-99 rounded-xl text-slate-750 text-left transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer w-full shadow-xs"
                    >
                      <span className="font-medium group-hover:text-slate-950 transition-colors">{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 group-hover:translate-x-1.5 transition-all duration-200 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-6 border-t border-zinc-150 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask Apollo about skills, pathways..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1 p-3.5 px-4 border border-zinc-200 hover:border-zinc-300 rounded-2xl text-xs bg-[#FAF9F6] outline-none focus:border-slate-400 focus:bg-white transition-all disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-45 text-white rounded-2xl transition-all cursor-pointer flex items-center justify-center shrink-0 min-w-[48px]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-slate-400 text-center mt-3 font-mono">
                Apollo AI uses Gemini 3.5 to custom-track your capability journey.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
