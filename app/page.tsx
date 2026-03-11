"use client";

import { useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
            Welcome to Recuerdame
          </h1>
          <p className="text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Never forget an important date in your life
          </p>
          
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 rounded-full bg-zinc-900 px-8 py-3 text-white transition-all duration-300 hover:scale-105 hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Add New Event
            </button>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowForm(false);
              }}
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
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-lg border border-zinc-300 py-2 text-zinc-700 transition-all duration-200 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
