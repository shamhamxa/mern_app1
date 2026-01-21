import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WALLPAPERS = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80", // Earth from space
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80", // Abstract tech
  "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80", // Digital network
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80", // Circuit board
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80", // Tech background
];

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWallpaper, setCurrentWallpaper] = useState(0);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/auth")

      // fetch("https://johnette-nonapplicatory-robena.ngrok-free.dev/auth")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWallpaper((prev) => (prev + 1) % WALLPAPERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWallpaper}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${WALLPAPERS[currentWallpaper]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/60 to-blue-900/70" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative text-gray-100">

        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
          <div className="max-w-[1440px] mx-auto px-8 py-6">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              Scriptloop Dashboard
            </h1>
            <p className="text-sm text-gray-200 mt-1">
              Auth table overview (live from database)
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-[1440px] mx-auto px-8 py-10 space-y-10">

          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard title="Total Users" value={users.length} />
            <DashboardCard title="Active Sessions" value="12" />
            <DashboardCard title="System Status" value="Online" />
            <DashboardCard title="Environment" value="Production" />
          </section>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20"
          >
            <div className="px-6 py-4 border-b border-white/20">
              <h2 className="text-lg font-semibold text-white">Auth Table</h2>
            </div>

            {loading ? (
              <div className="p-10 text-center text-gray-300">
                Loading data...
              </div>
            ) : (
              <div className="max-h-[65vh] overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-white/10 backdrop-blur-md text-sm text-gray-200 z-10">
                    <tr>
                      <th className="text-left px-6 py-3">ID</th>
                      <th className="text-left px-6 py-3">Username</th>
                      <th className="text-left px-6 py-3">Password</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((u, i) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-t border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-300 truncate max-w-[280px]">
                          {u.id}
                        </td>
                        <td className="px-6 py-4 font-medium text-white">
                          {u.username}
                        </td>
                        <td className="px-6 py-4 text-gray-400 tracking-widest">
                          ••••••
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

        </main>
      </div>
    </div>
  );
}

/* ---------- Small Components ---------- */

function DashboardCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-white/20"
    >
      <p className="text-sm text-gray-200">{title}</p>
      <h3 className="text-3xl font-bold mt-2 text-white drop-shadow-lg">
        {value}
      </h3>
    </motion.div>
  );
}