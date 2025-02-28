import { useEffect, useState } from "react";
import './UserList.css'

type User = {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
};

const UserList = () => {
  const [users,setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<"name" | "email" | "city">("name");
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  },[]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const getField = (user: User): string =>
      sortField === "city" ? user.address.city : user[sortField];
  
    return getField(a).localeCompare(getField(b));
  });

  return (
    <div className="container">
      <h2>Список пользователей</h2>


      <input
        type="text"
        placeholder="🔍 Поиск по имени..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      <div className="sort-buttons">
        <button onClick={() => setSortField("name")}>Сортировать по имени</button>
        <button onClick={() => setSortField("email")}>Сортировать по email</button>
        <button onClick={() => setSortField("city")}>Сортировать по городу</button>
      </div>


      {loading && <p> Загрузка...</p>}
      {error && <p className="error">⚠ Ошибка: {error}</p>}


      {!loading && !error && (
        <ul className="user-list">
          {sortedUsers.map((user) => (
            <li key={user.id}>
              <h3>😀 {user.name}</h3>
              <p>📧 Email: {user.email}</p>
              <p>🌍 Город: {user.address.city}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList