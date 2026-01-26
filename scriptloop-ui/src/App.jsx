import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/")

      // fetch("http://localhost:3000/auth")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-950 text-white flex flex-col">

      {/* TOP BAR */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <h1 className="text-xl font-semibold tracking-wide">
          Scriptloop — Auth Table
        </h1>
        <span className="text-sm text-gray-400">
          Total users: {users.length}
        </span>
      </header>

      {/* TABLE AREA */}
      <main className="flex-1 overflow-hidden">

        <div className="h-full overflow-auto">

          {loading ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              Loading data…
            </div>
          ) : (
            <table className="min-w-full border-collapse text-sm">

              {/* HEADER */}
              <thead className="sticky top-0 z-10 bg-slate-900 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left border-b border-white/10">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left border-b border-white/10">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left border-b border-white/10">
                    Password
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-white/5">
                {users.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4 text-gray-400">
                      {u.id}
                    </td>

                    <td className="px-6 py-4 font-medium text-white">
                      {u.username}
                    </td>

                    <td className="px-6 py-4 text-gray-500 tracking-widest">
                      ••••••
                    </td>
                  </motion.tr>
                ))}
              </tbody>

            </table>
          )}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="h-10 flex items-center px-8 border-t border-white/10 text-xs text-gray-500 bg-slate-900/80">
        Full-screen data view
      </footer>
    </div>
  );
}
