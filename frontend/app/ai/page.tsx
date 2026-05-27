"use client"

import {

  useEffect,

  useRef,

  useState,

} from "react"

import API from "@/services/api"

import ReactMarkdown from "react-markdown"

import {

  Send,

  Sparkles,

  User,

} from "lucide-react"

export default function AIPage() {

  const [inputMessage, setInputMessage] = useState("")

  const [messages, setMessages] = useState<any[]>([])

  const [loading, setLoading] = useState(false)

  const [chatId, setChatId] = useState("")

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // AUTO SCROLL

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({

      behavior: "smooth",

    })

  }, [messages, loading])

  // INITIALIZE CHAT

  useEffect(() => {

    const initializeChat = async () => {

      try {

        const user = JSON.parse(

          localStorage.getItem("user") || "{}"

        )

        // FETCH USER CHATS

        const res = await API.get(

          `/chat/${user._id}`

        )

        // IF CHAT EXISTS

        if (res.data.length > 0) {

          const latestChat = res.data[0]

          setChatId(latestChat._id)

          setMessages(latestChat.messages)

        }

        // CREATE NEW CHAT

        else {

          const newChat = await API.post(

            "/chat/create",

            {

              userId: user._id,

              firstMessage: "New Chat",

            }

          )

          setChatId(newChat.data._id)

        }

      } catch (error) {

        console.log(error)

      }

    }

    initializeChat()

  }, [])

  // SEND MESSAGE

  const handleSendMessage = async () => {

    if (!inputMessage.trim()) return

    const userMessage = {

      role: "user",

      content: inputMessage,

    }

    // ADD USER MESSAGE

    setMessages((prev) => [

      ...prev,

      userMessage,

    ])

    try {

      setLoading(true)

      // SAVE USER MESSAGE

      await API.post("/chat/message", {

        chatId,

        role: "user",

        content: inputMessage,

      })

      // AI RESPONSE

      const res = await API.post("/ai/chat", {

        message: inputMessage,

      })

      const aiMessage = {

        role: "assistant",

        content: res.data.response,

      }

      // ADD AI MESSAGE

      setMessages((prev) => [

        ...prev,

        aiMessage,

      ])

      // SAVE AI MESSAGE

      await API.post("/chat/message", {

        chatId,

        role: "assistant",

        content: res.data.response,

      })

    } catch (error) {

      console.log(error)

      alert("AI Request Failed ❌")

    } finally {

      setLoading(false)

    }

    setInputMessage("")

  }

  // ENTER TO SEND

  const handleKeyDown = (

    e: React.KeyboardEvent<HTMLTextAreaElement>

  ) => {

    if (

      e.key === "Enter" &&

      !e.shiftKey

    ) {

      e.preventDefault()

      handleSendMessage()

    }

  }

  return (

    <div className="h-screen bg-black text-white flex flex-col">

      {/* HEADER */}

      <div className="border-b border-zinc-800 px-8 py-6 bg-black/70 backdrop-blur-xl">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">

            <Sparkles className="w-7 h-7 text-white" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-cyan-400">

              Zentrix AI Assistant

            </h1>

            <p className="text-zinc-400 mt-1">

              Ask coding, DSA, roadmap, interview or placement doubts.

            </p>

          </div>

        </div>

      </div>

      {/* CHAT AREA */}

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">

        {messages.length === 0 && (

          <div className="flex flex-col items-center justify-center h-full text-center">

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-8">

              <Sparkles className="w-12 h-12 text-cyan-400" />

            </div>

            <h2 className="text-5xl font-bold text-cyan-400 mb-4">

              Welcome to Zentrix AI 🚀

            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl">

              Ask anything about coding, DSA, development,

              placements, interview preparation or AI roadmaps.

            </p>

          </div>

        )}

        {messages.map((msg, index) => (

          <div

            key={index}

            className={`flex gap-4 ${

              msg.role === "user"

                ? "justify-end"

                : "justify-start"

            }`}

          >

            {/* AI AVATAR */}

            {msg.role === "assistant" && (

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">

                <Sparkles className="w-6 h-6 text-white" />

              </div>

            )}

            {/* MESSAGE */}

            <div

              className={`max-w-[80%] rounded-3xl px-6 py-5 shadow-lg whitespace-pre-wrap ${

                msg.role === "user"

                  ? "bg-cyan-500 text-black"

                  : "bg-zinc-900 border border-purple-500/20"

              }`}

            >

              {msg.role === "assistant" ? (

                <div className="prose prose-invert max-w-none prose-headings:text-cyan-400 prose-strong:text-white prose-code:text-cyan-300 prose-pre:bg-black prose-pre:border prose-pre:border-zinc-700 prose-li:text-zinc-200">

                  <ReactMarkdown>

                    {msg.content}

                  </ReactMarkdown>

                </div>

              ) : (

                <p className="font-medium">

                  {msg.content}

                </p>

              )}

            </div>

            {/* USER AVATAR */}

            {msg.role === "user" && (

              <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">

                <User className="w-6 h-6 text-zinc-300" />

              </div>

            )}

          </div>

        ))}

        {/* LOADING */}

        {loading && (

          <div className="flex gap-4">

            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">

              <Sparkles className="w-6 h-6 text-white" />

            </div>

            <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl px-6 py-5">

              <div className="flex gap-2">

                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" />

                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-100" />

                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-200" />

              </div>

            </div>

          </div>

        )}

        <div ref={messagesEndRef} />

      </div>

      {/* INPUT AREA */}

      <div className="border-t border-zinc-800 bg-black/70 backdrop-blur-xl p-6">

        <div className="flex items-end gap-4 max-w-6xl mx-auto">

          <textarea

            value={inputMessage}

            onChange={(e) =>

              setInputMessage(e.target.value)

            }

            onKeyDown={handleKeyDown}

            placeholder="Ask anything about coding, DSA, placements, projects..."

            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-3xl px-6 py-4 outline-none resize-none min-h-[70px] max-h-[200px] text-white placeholder:text-zinc-500 focus:border-cyan-500 transition-all"

          />

          <button

            onClick={handleSendMessage}

            disabled={loading}

            className="w-16 h-16 rounded-2xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 flex items-center justify-center transition-all shadow-lg shadow-cyan-500/20"

          >

            <Send className="w-6 h-6 text-black" />

          </button>

        </div>

        <p className="text-center text-zinc-500 text-sm mt-4">

          Zentrix AI can make mistakes. Verify important information.

        </p>

      </div>

    </div>

  )

}