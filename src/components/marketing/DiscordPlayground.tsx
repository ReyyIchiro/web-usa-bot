"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Command, Music, ShieldAlert, Send } from "lucide-react";
import Image from "next/image";

type Message = {
  id: string;
  type: "user" | "bot";
  command?: string;
  embed?: React.ReactNode;
};

const COMMANDS = [
  { id: "rtm", name: "/rtm status", icon: <ShieldAlert size={16} className="text-orange-400" /> },
  { id: "boombox", name: "/boombox play", icon: <Music size={16} className="text-blue-400" /> },
];

export function DiscordPlayground() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      type: "bot",
      embed: (
        <div className="bg-[#2b2d31] border-l-4 border-indigo-500 rounded-md p-4 mt-1">
          <h3 className="text-white font-bold text-sm mb-1">USA Core Siap Digunakan! 🚀</h3>
          <p className="text-[#dbdee1] text-sm">
            Selamat datang di simulasi interaktif. Silakan pilih salah satu perintah di bawah untuk melihat bagaimana saya merespon secara real-time.
          </p>
        </div>
      ),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleCommand = (cmdId: string) => {
    if (isTyping) return;

    const cmd = COMMANDS.find((c) => c.id === cmdId);
    if (!cmd) return;

    // Add user command
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: "user", command: cmd.name },
    ]);

    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      setIsTyping(false);
      
      let embed: React.ReactNode;
      if (cmdId === "rtm") {
        embed = (
          <div className="bg-[#2b2d31] border-l-4 border-orange-500 rounded-md p-4 mt-1">
            <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <ShieldAlert size={16} className="text-orange-500" /> RTM Marketplace Status
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="bg-[#1e1f22] p-2 rounded">
                <span className="text-[#b5bac1] block mb-1">Transaksi Aktif</span>
                <span className="text-white font-bold">142 Rekber</span>
              </div>
              <div className="bg-[#1e1f22] p-2 rounded">
                <span className="text-[#b5bac1] block mb-1">Keamanan Status</span>
                <span className="text-green-400 font-bold">Aman (Scanned)</span>
              </div>
            </div>
            <p className="text-[#dbdee1] text-xs">Semua transaksi dilindungi oleh sistem Escrow otomatis. Identitas disembunyikan kecuali terjadi sengketa.</p>
          </div>
        );
      } else if (cmdId === "boombox") {
        embed = (
          <div className="bg-[#2b2d31] border-l-4 border-blue-500 rounded-md p-4 mt-1">
            <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <Music size={16} className="text-blue-500" /> Boombox Audio Converter
            </h3>
            <p className="text-[#dbdee1] text-xs mb-2">Memproses link YouTube menjadi audio stream ringan untuk in-game SA-MP...</p>
            <div className="w-full bg-[#1e1f22] rounded-full h-1.5 mb-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "100%" }} 
                transition={{ duration: 1.5, ease: "linear" }}
                className="bg-blue-500 h-1.5 rounded-full"
              />
            </div>
            <p className="text-green-400 text-xs font-bold">✓ Audio stream siap dimainkan!</p>
          </div>
        );
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), type: "bot", embed },
      ]);
    }, 1200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col bg-[#313338] font-sans" style={{ height: "450px" }}>
      {/* Discord Header */}
      <div className="h-12 bg-[#2b2d31] flex items-center px-4 border-b border-[#1e1f22] shrink-0">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <span className="text-[#80848e] text-lg font-light leading-none">#</span> 
          terminal-interaktif
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="shrink-0 mt-0.5">
                {msg.type === "bot" ? (
                  <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center overflow-hidden">
                    <Image src="/logo-v9.png" alt="Bot" width={40} height={40} className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-white font-bold">U</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-white font-medium text-[15px]">
                    {msg.type === "bot" ? "USA Core" : "User"}
                  </span>
                  {msg.type === "bot" && (
                    <span className="bg-[#5865F2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      ✓ BOT
                    </span>
                  )}
                  <span className="text-[#80848e] text-xs">Hari ini pukul 12:00</span>
                </div>
                {msg.command && (
                  <p className="text-[#dbdee1] text-[15px] leading-relaxed">
                    <span className="bg-[#3b4252] text-[#81a1c1] px-1.5 py-0.5 rounded text-sm font-mono mr-1">{msg.command}</span>
                  </p>
                )}
                {msg.embed}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-4"
            >
              <div className="shrink-0 mt-0.5">
                <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center overflow-hidden">
                  <Image src="/logo-v9.png" alt="Bot" width={40} height={40} className="object-cover" />
                </div>
              </div>
              <div className="flex-1 min-w-0 flex items-center">
                <div className="flex gap-1.5 items-center px-3 py-2 bg-[#2b2d31] rounded-full">
                  <motion.div className="w-2 h-2 bg-[#80848e] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                  <motion.div className="w-2 h-2 bg-[#80848e] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                  <motion.div className="w-2 h-2 bg-[#80848e] rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#313338] shrink-0">
        <div className="bg-[#383a40] rounded-lg p-2 mb-2 flex gap-2">
          {COMMANDS.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => handleCommand(cmd.id)}
              disabled={isTyping}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#2b2d31] hover:bg-[#404249] transition-colors rounded text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cmd.icon}
              {cmd.name}
            </button>
          ))}
        </div>
        <div className="bg-[#383a40] rounded-lg flex items-center px-4 py-2.5">
          <Command size={18} className="text-[#80848e] mr-3" />
          <span className="text-[#80848e] text-[15px] flex-1">Pilih command di atas untuk mencoba...</span>
          <Send size={18} className="text-[#80848e]" />
        </div>
      </div>
    </div>
  );
}
