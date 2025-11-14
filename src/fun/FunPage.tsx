import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function FunPage() {
  const tabs = [
    "Mini Games",
    "Memes",
    "Fun Facts",
    "Riddles",
    "Relax Mode",
    "Avatar Creator",
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="p-6 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Fun Zone</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl shadow-md transition-all duration-200 text-sm font-semibold ${
              activeTab === tab
                ? "bg-blue-600 text-white scale-105"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-4"
      >
        {activeTab === "Mini Games" && <MiniGames />}
        {activeTab === "Memes" && <Memes />}
        {activeTab === "Fun Facts" && <FunFacts />}
        {activeTab === "Riddles" && <Riddles />}
        {activeTab === "Relax Mode" && <RelaxMode />}
        {activeTab === "Avatar Creator" && <AvatarCreator />}
      </motion.div>
    </div>
  );
}

/* -------------------- MINI GAMES -------------------- */
function MiniGames() {
  const [count, setCount] = useState(0);
  const [target] = useState(() => Math.floor(Math.random() * 30) + 10);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-3">Mini Game: Reach the Number</h2>
      <p className="mb-2">Try to reach the target number: <b>{target}</b></p>

      <div className="flex gap-4 mt-4 items-center">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Add +1
        </button>
        <h3 className="text-xl font-bold">{count}</h3>
      </div>

      {count === target && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mt-4 text-green-600 font-bold text-xl"
        >
          🎉 You reached the target!
        </motion.p>
      )}
    </div>
  );
}

/* -------------------- MEMES (API) -------------------- */
function Memes() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    axios
      .get("https://meme-api.com/gimme/5")
      .then((res) => setMemes(res.data.memes || []))
      .catch(() => {});
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {memes.map((m : any , i ) => (
        <img
          key={i}
          src={m.url}
          alt="meme"
          className="rounded-xl shadow-lg"
        />
      ))}
    </div>
  );
}

/* -------------------- FUN FACTS -------------------- */
function FunFacts() {
  const facts = [
    "Honey never spoils.",
    "A snail can sleep for 3 years.",
    "Octopuses have 3 hearts.",
    "Bananas are berries.",
  ];

  return (
    <ul className="list-disc ml-6 text-lg space-y-2">
      {facts.map((fact, i) => (
        <li key={i}>{fact}</li>
      ))}
    </ul>
  );
}

/* -------------------- RIDDLES -------------------- */
function Riddles() {
  const riddles = [
    { q: "What has keys but can't open locks?", a: "A piano" },
    { q: "What has a face but no eyes?", a: "A clock" },
  ];

  return (
    <div className="space-y-4">
      {riddles.map((r, i) => (
        <details key={i} className="p-4 border rounded-lg shadow cursor-pointer">
          <summary className="font-semibold text-lg">{r.q}</summary>
          <p className="mt-2">{r.a}</p>
        </details>
      ))}
    </div>
  );
}

/* -------------------- RELAX MODE -------------------- */
function RelaxMode() {
  return (
    <div className="text-center p-6">
      <p className="text-lg mb-4">Take a deep breath and relax ✨</p>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-32 h-32 mx-auto rounded-full bg-blue-300 shadow-lg"
      />
    </div>
  );
}

/* -------------------- AVATAR CREATOR -------------------- */
function AvatarCreator() {
  const [hair, setHair] = useState("black");
  const [eyes, setEyes] = useState("brown");
  const [skin, setSkin] = useState("peach");

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Avatar Creator</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar Preview */}
        <div className="p-6 bg-gray-100 rounded-xl shadow w-60 text-center">
          <div
            className="w-32 h-32 rounded-full mx-auto mb-4"
            style={{ background: skin }}
          ></div>
          <p className="mb-1">Hair: {hair}</p>
          <p className="mb-1">Eyes: {eyes}</p>
          <p>Skin: {skin}</p>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label>Hair Color:</label>
            <select
              className="ml-2 border p-1 rounded"
              value={hair}
              onChange={(e) => setHair(e.target.value)}
            >
              <option value="black">Black</option>
              <option value="brown">Brown</option>
              <option value="blonde">Blonde</option>
              <option value="red">Red</option>
            </select>
          </div>

          <div>
            <label>Eye Color:</label>
            <select
              className="ml-2 border p-1 rounded"
              value={eyes}
              onChange={(e) => setEyes(e.target.value)}
            >
              <option value="brown">Brown</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </select>
          </div>

          <div>
            <label>Skin Tone:</label>
            <select
              className="ml-2 border p-1 rounded"
              value={skin}
              onChange={(e) => setSkin(e.target.value)}
            >
              <option value="peach">Peach</option>
              <option value="tan">Tan</option>
              <option value="brown">Brown</option>
              <option value="darkbrown">Dark Brown</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
