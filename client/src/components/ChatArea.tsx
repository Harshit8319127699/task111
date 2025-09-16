import { useState } from 'react';
import { X, Send, Bold, Italic, Underline, Minus, Link, Image, Zap } from 'lucide-react';
import { useChatStore } from '@/lib/store';
import { mockMessages } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ChatArea() {
  const { activeContact } = useChatStore();
  const [message, setMessage] = useState('');
  
  if (!activeContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">💬</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
          <p className="text-gray-600 leading-relaxed">Choose a contact from the sidebar to start chatting and manage your conversations</p>
        </div>
      </div>
    );
  }

  const contactMessages = mockMessages.filter(m => m.contactId === activeContact.id);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message via API
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-sm font-semibold text-white">
                {activeContact.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900" data-testid="chat-header-name">
                {activeContact.name}
              </h3>
              <p className="text-sm text-gray-500">{activeContact.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-gray-300 text-gray-700 hover:bg-gray-50"
              data-testid="button-booking-intent"
            >
              <X className="w-3 h-3 mr-1" />
              Booking Intent
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-gray-300 text-gray-700 hover:bg-gray-50"
              data-testid="button-talk-human"
            >
              <X className="w-3 h-3 mr-1" />
              Talk to Human
            </Button>
            <Button
              size="sm"
              className="text-xs bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-sm"
              data-testid="button-resolve"
            >
              Resolve
            </Button>
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gradient-to-b from-gray-50/30 to-white">
        {contactMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isBot ? 'items-start space-x-4' : 'justify-end'} message-fade-in`}
          >
            {msg.isBot ? (
              <>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-md border border-gray-200 max-w-md shadow-sm">
                  <p className="text-sm text-gray-800 leading-relaxed" data-testid={`message-${msg.id}`}>
                    {msg.content.includes('Rates') ? (
                      <>
                        Your <span className="text-blue-600 font-semibold">Rates</span> are ready! 😊 Let me know if you need any adjustments.
                      </>
                    ) : (
                      msg.content
                    )}
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl rounded-tr-md max-w-md shadow-sm">
                <div className="text-sm text-white whitespace-pre-line leading-relaxed" data-testid={`message-${msg.id}`}>
                  {msg.content}
                </div>
                {msg.content.includes('Hotel - Novotel Aerocity') && (
                  <button className="text-blue-100 text-xs mt-2 hover:text-white transition-colors">✏️</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Message Input */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="border border-gray-300 rounded-2xl p-4 bg-gray-50 focus-within:bg-white focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
          <Textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="resize-none border-0 bg-transparent placeholder:text-gray-500 focus:outline-none text-sm min-h-20 text-gray-900"
            data-testid="textarea-message"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:bg-gray-200 rounded-lg transition-colors"
                data-testid="button-bold"
              >
                <Bold className="w-4 h-4 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:bg-gray-200 rounded-lg transition-colors"
                data-testid="button-italic"
              >
                <Italic className="w-4 h-4 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:bg-gray-200 rounded-lg transition-colors"
                data-testid="button-underline"
              >
                <Underline className="w-4 h-4 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:bg-gray-200 rounded-lg transition-colors"
                data-testid="button-strikethrough"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:bg-gray-200 rounded-lg transition-colors"
                data-testid="button-link"
              >
                <Link className="w-4 h-4 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:bg-gray-200 rounded-lg transition-colors"
                data-testid="button-image"
              >
                <Image className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              data-testid="button-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
