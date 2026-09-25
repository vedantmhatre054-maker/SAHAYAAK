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
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  DEFAULT_LANGUAGE,
  getLanguageCodeByName,
  getLanguageByCode,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
} from "@/lib/i18n/config";

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
  time: string;
  image?: string;
};

type Language = {
  code: LanguageCode;
  name: string;
  nativeName: string;
};


type SpeechRecognitionResultEvent = Event & {
  resultIndex: number;
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

const speechLanguageMap: Record<LanguageCode, string> = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
  te: "te-IN",
  mr: "mr-IN",
  ta: "ta-IN",
  ur: "ur-IN",
  gu: "gu-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  or: "or-IN",
  pa: "pa-IN",
  as: "as-IN",
  ma: "mai-IN",
  sa: "sa-IN",
  kok: "kok-IN",
  ne: "ne-IN",
  doi: "doi-IN",
  mni: "mni-IN",
  brx: "brx-IN",
  ks: "ks-IN",
  sd: "sd-IN",
};

const languages: readonly Language[] = SUPPORTED_LANGUAGES;

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
      id: "initial-assistant-1",
      role: "assistant",
      text: "Namaste! I'm your SAHAYAAK farming assistant. I can help you understand your crops, farming practices, markets, schemes, and other decisions related to your farm.",
      time: "10:24 AM",
    },
    {
      id: "initial-assistant-2",
      role: "assistant",
      text: "You can type your question, speak naturally, or show me a photo of your crop or produce.",
      time: "10:24 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageDataUrl, setSelectedImageDataUrl] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    getLanguageByCode(DEFAULT_LANGUAGE) ?? languages[0],
  );

  useEffect(() => {
    const loadPreferredLanguage = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data: profile } = await supabase
        .from("farmer_profiles")
        .select("preferred_language")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile?.preferred_language) {
        const languageCode = getLanguageCodeByName(
          profile.preferred_language,
        );
        const language = getLanguageByCode(languageCode);

        if (language) {
          setSelectedLanguage(language);
        }
      }
    };

    void loadPreferredLanguage();
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      speechRecognitionRef.current?.stop();
      speechRecognitionRef.current = null;
      window.speechSynthesis?.cancel();
    };
  }, []);
  const cleanTextForSpeech = (text: string) => {
    return text
      .replace(/\*{2,}/g, "")
      .replace(/\*/g, "")
      .replace(/`/g, "")
      .replace(/#{1,6}\s?/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const speakResponse = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const speechText = cleanTextForSpeech(text);

    if (!speechText) {
      return;
    }

    window.speechSynthesis.cancel();

    const targetLanguage =
      speechLanguageMap[selectedLanguage.code] ?? "en-IN";
    const voices = window.speechSynthesis.getVoices();

    const targetBaseLanguage = targetLanguage.split("-")[0].toLowerCase();

    const matchingVoice =
      voices.find(
        (voice) => voice.lang.toLowerCase() === targetLanguage.toLowerCase(),
      ) ??
      voices.find(
        (voice) => voice.lang.toLowerCase().startsWith(`${targetBaseLanguage}-`),
      );

    const utterance = new SpeechSynthesisUtterance(speechText);

    // Only force the requested language when the browser actually
    // has a voice for that language. Otherwise use the browser's
    // default voice instead of throwing a synthesis error.
    if (matchingVoice) {
      utterance.voice = matchingVoice;
      utterance.lang = matchingVoice.lang;
    } else if (voices.length > 0) {
      utterance.voice = voices[0];
      utterance.lang = voices[0].lang;
      console.warn(
        `No speech voice found for ${targetLanguage}. Using ${voices[0].lang} instead.`,
      );
    } else {
      utterance.lang = targetLanguage;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      // "interrupted" / "canceled" is expected when the user presses Stop
      // or when a new response replaces an existing speech request.
      if (event.error === "interrupted" || event.error === "canceled") {
        setIsSpeaking(false);
        return;
      }

      console.error("Speech synthesis error:", {
        name: event.error,
        language: utterance.lang,
        voice: utterance.voice?.name ?? "default",
      });
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

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

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedImageDataUrl(reader.result);
      }
    };

    reader.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      setSelectedImage(null);
      setSelectedImageDataUrl(null);
      console.error("Could not read selected image.");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removeSelectedImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage(null);
    setSelectedImageDataUrl(null);
  };

  const sendMessage = async (messageText?: string) => {
    const text = (messageText ?? input).trim();

    if (!text && !selectedImage) {
      return;
    }

    const userMessageId = crypto.randomUUID();
    const assistantMessageId = crypto.randomUUID();
    const userText = text || "Please analyze this image for me.";
    const imageDataUrl = selectedImageDataUrl;

    const newMessage: Message = {
      id: userMessageId,
      role: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      image: imageDataUrl ?? selectedImage ?? undefined,
    };

    setMessages((current) => [...current, newMessage]);
    setInput("");
    removeSelectedImage();
    setIsThinking(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: selectedLanguage.name,
          conversationId,
          image: imageDataUrl ?? undefined,
          messages: [
            ...messages.map((message) => ({
              role: message.role,
              content: message.text,
            })),
            {
              role: "user",
              content: userText,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "AI request failed.");
      }

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      setMessages((current) => [
        ...current,
        {
          id: assistantMessageId,
          role: "assistant",
          text: data.reply,
          time: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ]);

      } catch (error) {
      console.error("AI assistant error:", error);

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Sorry, I couldn't connect to the SAHAYAAK AI service right now. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ]);

      } finally {
      setIsThinking(false);
    }
  };

  const handleSuggestion = (text: string) => {
    void sendMessage(text);
  };

  const toggleListening = () => {
    if (isListening) {
      speechRecognitionRef.current?.stop();
      return;
    }

    const speechWindow = window as SpeechRecognitionWindow;
    const SpeechRecognition =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge, or type your question instead.",
          time: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ]);
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLanguageMap[selectedLanguage.code] ?? "en-IN";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += event.results[index][0].transcript;
      }

      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
      setIsListening(false);
      speechRecognitionRef.current = null;
    };

    recognition.onend = () => {
      setIsListening(false);
      speechRecognitionRef.current = null;
    };

    speechRecognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error("Could not start speech recognition:", error);
      setIsListening(false);
      speechRecognitionRef.current = null;
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
          <select
            value={selectedLanguage.code}
            onChange={(event) => {
              const language = languages.find(
                (item) => item.code === event.target.value,
              );

              if (language) {
                setSelectedLanguage(language);
              }
            }}
            className="h-10 w-fit rounded-xl border border-border bg-surface px-4 text-sm font-medium text-foreground outline-none transition focus:border-primary/50"
            aria-label="Select AI language"
          >
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.nativeName} ({language.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main assistant */}
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Chat */}
        <div className="sticky top-20 flex h-[min(640px,calc(100dvh-18rem))] min-h-[420px] flex-col overflow-hidden rounded-2xl border border-border bg-surface">
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
                  Responding in {selectedLanguage.name}
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <span className="h-2 w-2 rounded-full bg-lime" />
              Ready to help
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain bg-background/40 p-4 pb-6 sm:p-6">
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
                            onClick={() => {
                              if (isSpeaking) {
                                stopSpeaking();
                              } else {
                                speakResponse(message.text);
                              }
                            }}
                            className="inline-flex items-center gap-1 transition hover:text-primary"
                            aria-label={isSpeaking ? "Stop voice response" : "Listen to response"}
                          >
                            <Volume2 className="h-3 w-3" />
                            {isSpeaking ? "Stop" : "Listen"}
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
          <div className="shrink-0 border-t border-border bg-surface p-4 shadow-[0_-8px_24px_rgba(0,0,0,0.18)] sm:p-5">
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
                    void sendMessage();
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
                aria-label={
                  isListening ? "Stop listening" : "Start voice input"
                }
                title={isListening ? "Stop listening" : "Speak"}
              >
                <Mic className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => void sendMessage()}
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
              ) : isSpeaking ? (
                <>
                  <Volume2 className="h-4 w-4" />
                  AI is speaking...
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Start speaking
                </>
              )}
            </button>

            {isSpeaking && (
              <button
                type="button"
                onClick={stopSpeaking}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition hover:bg-surface-muted hover:text-foreground"
              >
                <Volume2 className="h-4 w-4" />
                Stop voice response
              </button>
            )}
          </div>

          {/* Farming context */}
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