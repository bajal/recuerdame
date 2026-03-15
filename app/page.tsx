"use client";

import { useState, useEffect } from "react";

interface Event {
  id: string;
  date: string;
  description: string;
}

const getTodayDate = () => new Date().toISOString().split("T")[0];

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState<Event[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recuerdame-events");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [date, setDate] = useState(getTodayDate);
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("recuerdame-events", JSON.stringify(events));
  }, [events]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      id: Date.now().toString(),
      date,
      description,
    };
    const updated = [newEvent, ...events];
    setEvents(updated);
    localStorage.setItem("recuerdame-events", JSON.stringify(updated));
    setDate("");
    setDescription("");
    setShowForm(false);
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localStorage.setItem("recuerdame-events", JSON.stringify(updated));
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center py-16 px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
            Welcome to Recuerdame
          </h1>
          <p className="text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Never forget an important date in your life
          </p>
          
          {!showForm ? (
            <button
              onClick={() => {
                setDate(getTodayDate());
                setDescription("");
                setShowForm(true);
              }}
              className="mt-4 rounded-full bg-zinc-900 px-8 py-3 text-white transition-all duration-300 hover:scale-105 hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Add New Event
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex w-full max-w-md flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300"
            >
              <div className="flex flex-col gap-2 text-left">
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="rounded-lg border border-zinc-300 px-4 py-2 transition-colors focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-zinc-500"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  placeholder="What happened?"
                  className="rounded-lg border border-zinc-300 px-4 py-2 transition-colors focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-zinc-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-zinc-900 py-2 text-white transition-all duration-200 hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Save Event
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setDate(getTodayDate());
                    setDescription("");
                  }}
                  className="flex-1 rounded-lg border border-zinc-300 py-2 text-zinc-700 transition-all duration-200 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {events.length > 0 && (
          <div className="mt-16 w-full max-w-md">
            <h2 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
              Your Events
            </h2>
            <div className="flex flex-col gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-black dark:text-zinc-100">
                      {event.description}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="rounded p-1 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
