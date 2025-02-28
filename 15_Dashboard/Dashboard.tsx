import { useState } from "react";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}>
      <div className="flex">

        <aside className="w-64 bg-blue-600 text-white min-h-screen p-5">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <ul className="mt-5 space-y-2">
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">📊 Статистика</li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">📁 Проекты</li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">⚙ Настройки</li>
          </ul>
        </aside>


        <main className="flex-1 p-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">📊 Обзор</h2>
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "🌞 Светлая тема" : "🌙 Тёмная тема"}
            </button>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white dark:bg-gray-300 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">😀 Пользователи</h3>
              <p className="text-2xl font-bold">1,235</p>
            </div>
            <div className="bg-white dark:bg-gray-300 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">💰 Доход</h3>
              <p className="text-2xl font-bold">$12,450</p>
            </div>
            <div className="bg-white dark:bg-gray-300 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">📦 Заказы</h3>
              <p className="text-2xl font-bold">389</p>
            </div>
            <div className="bg-white dark:bg-gray-300 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">📈 Рост</h3>
              <p className="text-2xl font-bold">+15%</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
