import React, { useState } from "react"
import { MessageCircle, X, Send, UserCheck, Sparkles } from "lucide-react"
import { SOCIAL_LINKS } from "../utils/socialConfig"
import { useLanguage } from "../context/LanguageContext"

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(t.whatsapp.presetMsg)
    const waUrl = `https://wa.me/${SOCIAL_LINKS.whatsapp}?text=${message}`
    window.open(waUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Pop-up Chat Card */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 sm:w-88 glass rounded-3xl border border-emerald-500/30 p-5 shadow-2xl z-50 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold border border-white/20 shadow-md">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-dark rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Azhar Sunusi</h4>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.whatsapp.status}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full glass hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Message Bubble */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-gray-200 leading-relaxed mb-4">
            <p className="font-semibold text-emerald-300 mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Quick Message
            </p>
            "{t.whatsapp.presetMsg}"
          </div>

          {/* Action Button */}
          <button
            onClick={handleOpenWhatsApp}
            className="group relative w-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-70 blur-md group-hover:opacity-100 transition-opacity" />
            <div className="relative py-3 px-4 rounded-xl bg-dark border border-white/15 flex items-center justify-center gap-2 text-xs font-bold text-white">
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400 group-hover:scale-110 transition-transform" />
              <span>{t.whatsapp.sendBtn}</span>
              <Send className="w-3.5 h-3.5 text-emerald-300 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat WhatsApp"
        className="group relative p-3.5 rounded-2xl glass border border-emerald-500/30 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-md opacity-40 group-hover:opacity-80 transition-opacity" />

        {/* Pinging green dot */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-dark" />
        </span>

        <MessageCircle className="relative z-10 w-5 h-5 text-emerald-400 fill-emerald-400 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  )
}

export default WhatsAppWidget
