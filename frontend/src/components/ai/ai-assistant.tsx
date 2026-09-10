"use client";
import Image from "next/image";
import {
  ArrowUp,
  Camera,
  CheckCircle2,
  Image as ImageIcon,
  Leaf,
  Loader2,
  Mic,
  Paperclip,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
  time: string;
  image?: string;
};

const suggestedQuestions = [
  {
    label: "My crop",
    text: "How is my current crop doing?",
    icon: Leaf,
  },
  {
    label: "Crop problem",
    text: "My crop leaves are turning yellow. What should I do?",
    icon: Sparkles,
  },
  {
    label: "Market prices",
    text: "What should I check before selling my produce?",
    icon: ArrowUp,
  },
  {
    label: "Government schemes",
    text: "Which government schemes may be useful for my farm?",
    icon: CheckCircle2,
  },
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Namaste! I'm your SAHAYAAK farming assistant. I can help you understand your crops, farming practices, markets, schemes, and other decisions related to your farm.",
      time: "10:24 AM",
    },
    {
      id: 2,
      role: "assistant",
      text: "You can type your question, speak naturally, or show me a photo of your crop or produce.",
      time: "10:24 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [nextMessageId, setNextMessageId] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    event.target.value = "";
  };

  const removeSelectedImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage(null);
  };

  const sendMessage = (messageText?: string) => {
    const text = (messageText ?? input).trim();

    if (!text && !selectedImage) {
      return;
    }

    const userMessageId = nextMessageId;
    const assistantMessageId = nextMessageId + 1;

    const newMessage: Message = {
    id: userMessageId,
    role: "user",
        text: text || "Please analyze this image for me.",
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      image: selectedImage ?? undefined,
    };

    setMessages((current) => [...current, newMessage]);
    setNextMessageId((current) => current + 2);
    setInput("");
    removeSelectedImage();

    setIsThinking(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: assistantMessageId,
          role: "assistant",
          text: "I understand your question. Once the SAHAYAAK AI service is connected, I will use your farm profile, crop information, agricultural knowledge, and relevant data to provide personalized guidance here.",
          time: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ]);

      setIsThinking(false);
    }, 1200);
  };

  const handleSuggestion = (text: string) => {
    sendMessage(text);
  };

  const toggleListening = () => {
    setIsListening((current) => !current);

    if (!isListening) {
      window.setTimeout(() => {
        setIsListening(false);
      }, 2500);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl">
      {/* Page heading */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          AI FARM ASSISTANT
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ask SAHAYAAK
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Your personal agricultural companion for smarter farming
              decisions.
            </p>
          </div>

          {/* Language selector */}
          <button
            type="button"
            className="flex h-10 w-fit items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-surface-muted"
          >
            <span className="text-primary">EN</span>
            <span className="text-muted-foreground">English</span>
            <span className="text-xs text-muted-foreground">⌄</span>
          </button>
        </div>
      </div>

      {/* SPEAK → SHOW → UNDERSTAND → ACT */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-primary/20 bg-primary">
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <div className="p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime">
              <Sparkles className="h-4 w-4" />
              AI CROP & FARM ASSISTANT
            </div>

            <h2 className="max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl">
              Speak naturally. Show the problem. Get practical guidance.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
              Ask questions in your preferred language, upload a crop or
              produce image, and let SAHAYAAK combine what you say, what it
              sees, and what it knows about your farm.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["01 SPEAK", "02 SHOW", "03 UNDERSTAND", "04 ACT"].map(
                (step) => (
                  <span
                    key={step}
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-semibold tracking-[0.12em] text-white/85"
                  >
                    {step}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="flex items-center p-5 sm:p-7">
            <div className="w-full rounded-2xl border border-white/15 bg-black/10 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime text-primary">
                  <Mic className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Ask SAHAYAAK
                  </p>
                  <p className="text-xs text-white/60">
                    Voice + Image + Farm Context
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/85">
                  “What is wrong with my tomato plant?”
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-3/4 rounded-full bg-lime" />
                  </div>

                  <span className="text-[10px] text-white/50">
                    analyzing
                  </span>
                </div>
              </div>

              <p className="mt-3 text-[10px] text-white/45">
                Image analysis + crop context + agricultural knowledge
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main assistant */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Chat */}
        <div className="flex min-h-[680px] flex-col overflow-hidden rounded-2xl border border-border bg-surface">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                <Leaf className="h-5 w-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-foreground">
                    SAHAYAAK AI
                  </h2>

                  <span className="rounded-full bg-lime/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary">
                    Assistant
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Your personal farming companion
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <span className="h-2 w-2 rounded-full bg-lime" />
              Ready to help
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-5 overflow-y-auto bg-background/40 p-4 sm:p-6">
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[88%] gap-3 sm:max-w-[78%] ${
                      isUser ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isUser
                          ? "bg-primary text-white"
                          : "bg-lime/15 text-primary"
                      }`}
                    >
                      {isUser ? (
                        <span className="text-xs font-bold">You</span>
                      ) : (
                        <Leaf className="h-4 w-4" />
                      )}
                    </div>

                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        isUser
                          ? "rounded-tr-md bg-primary text-white"
                          : "rounded-tl-md border border-border bg-surface text-foreground"
                      }`}
                    >
                      {message.image && (
                        <div className="mb-3 overflow-hidden rounded-xl">
                          <div className="relative h-56 w-full">
                            <Image
                                src={message.image}
                                alt="Uploaded crop"
                                fill
                                unoptimized
                                className="object-cover"
                                sizes="(max-width: 640px) 88vw, 500px"
                            />
                            </div>
                        </div>
                      )}

                      <p className="text-sm leading-6">{message.text}</p>

                      <div
                        className={`mt-2 flex items-center justify-between gap-4 text-[10px] ${
                          isUser
                            ? "text-white/60"
                            : "text-muted-foreground"
                        }`}
                      >
                        <span>{message.time}</span>

                        {!isUser && (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 transition hover:text-primary"
                          >
                            <Volume2 className="h-3 w-3" />
                            Listen
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime/15 text-primary">
                    <Leaf className="h-4 w-4" />
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-border bg-surface px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">
                      SAHAYAAK is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Selected image */}
          {selectedImage && (
            <div className="border-t border-border bg-surface-muted px-4 py-3 sm:px-5">
              <div className="relative inline-flex overflow-hidden rounded-xl border border-border">
                <div className="relative h-20 w-20">
                    <Image
                        src={selectedImage}
                        alt="Selected crop"
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="80px"
                    />
                    </div>

                <button
                  type="button"
                  onClick={removeSelectedImage}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                  aria-label="Remove selected image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Composer */}
          <div className="border-t border-border bg-surface p-4 sm:p-5">
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-background p-2 transition focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageSelect}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-surface-muted hover:text-primary"
                aria-label="Upload image"
                title="Upload image"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-surface-muted hover:text-primary sm:flex"
                aria-label="Take photo"
                title="Take photo"
              >
                <Camera className="h-5 w-5" />
              </button>

              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                rows={1}
                placeholder="Ask SAHAYAAK anything about your farm..."
                className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />

              <button
                type="button"
                onClick={toggleListening}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                  isListening
                    ? "bg-lime text-primary"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-primary"
                }`}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
                title={isListening ? "Stop listening" : "Speak"}
              >
                <Mic className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim() && !selectedImage}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 px-1">
              <p className="text-[10px] text-muted-foreground">
                Press Enter to send · Shift + Enter for a new line
              </p>

              {isListening && (
                <span className="flex items-center gap-1.5 text-[10px] font-medium text-primary">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
                  Listening...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <aside className="space-y-5">
          {/* Suggested questions */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                QUICK QUESTIONS
              </p>

              <h3 className="mt-1 font-semibold text-foreground">
                What can I help with?
              </h3>
            </div>

            <div className="space-y-2">
              {suggestedQuestions.map((question) => {
                const Icon = question.icon;

                return (
                  <button
                    key={question.label}
                    type="button"
                    onClick={() => handleSuggestion(question.text)}
                    className="group flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3 text-left transition hover:border-primary/30 hover:bg-surface-muted"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime/15 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-foreground">
                        {question.label}
                      </span>

                      <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                        {question.text}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multimodal panel */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/15 text-primary">
                <ImageIcon className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Show the problem
                </h3>

                <p className="text-[11px] text-muted-foreground">
                  AI-powered image understanding
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-xl border border-dashed border-primary/30 bg-background p-5 text-center transition hover:border-primary/60 hover:bg-surface-muted"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ImageIcon className="h-5 w-5" />
              </div>

              <p className="mt-3 text-xs font-semibold text-foreground">
                Upload a crop or produce photo
              </p>

              <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                SAHAYAAK will use the image together with your question.
              </p>
            </button>
          </div>

          {/* Voice panel */}
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  isListening
                    ? "bg-lime text-primary"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <Mic className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  Speak naturally
                </h3>

                <p className="text-[11px] leading-4 text-muted-foreground">
                  Voice support in your preferred language.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleListening}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition ${
                isListening
                  ? "bg-lime text-primary"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              {isListening ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Listening...
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Start speaking
                </>
              )}
            </button>
          </div>

          {/* Future capabilities */}
          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Your farming context
              </h3>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
              SAHAYAAK will eventually use your farm, crops, activities,
              preferences, weather, market information, and relevant
              agricultural knowledge to personalize its guidance.
            </p>

            <div className="mt-4 space-y-2">
              {["Farm profile", "Current crops", "Agricultural knowledge"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[11px] text-muted-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Trust note */}
      <div className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] text-muted-foreground">
        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
        SAHAYAAK provides decision support using your farming context and
        available agricultural information.
      </div>
    </section>
  );
}