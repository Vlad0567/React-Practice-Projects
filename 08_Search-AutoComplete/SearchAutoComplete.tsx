import { useState, useEffect } from "react";
import "./SearchAutoComplete.css";

const SearchAutoComplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [error, setError] = useState("");


  const fetchSuggestions = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoadingSuggestions(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=5`
      );

      if (!response.ok) throw new Error("Ошибка загрузки данных");

      const data = await response.json();
      setSuggestions(data.docs.map((book: any) => book.title));
    } catch (err) {
      setError("Ошибка при загрузке данных");
    } finally {
      setLoadingSuggestions(false);
    }
  };


  const fetchBooks = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoadingBooks(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=5`
      );

      if (!response.ok) throw new Error("Ошибка загрузки данных");

      const data = await response.json();
      setBooks(
        data.docs.map((book: any) => ({
          title: book.title,
          author: book.author_name ? book.author_name.join(", ") : "Неизвестен",
          year: book.first_publish_year || "Неизвестно",
          editionCount: book.edition_count || "Неизвестно",
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
        }))
      );
    } catch (err) {
      setError("Ошибка при загрузке книг!");
    } finally {
      setLoadingBooks(false);
    }
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 2) fetchSuggestions(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(query);
  };

  return (
    <div className="container">
      <h2>Поиск книг</h2>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите название книги..."
          className="search-input"
        />
        <button type="submit" className="search-btn">🔍</button>
      </form>

      {loadingSuggestions && <p className="loading">Загрузка...</p>}


      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((title, index) => (
            <li key={index} onClick={() => setQuery(title)}>
              {title}
            </li>
          ))}
        </ul>
      )}

      {loadingBooks && <p className="loading">Загрузка книг...</p>}


      {books.length > 0 && (
        <div className="books-list">
          {books.map((book, index) => (
            <div key={index} className="book-card">
              {book.cover && <img src={book.cover} alt={book.title} className="book-cover" />}
              <div className="book-info">
                <h3>{book.title}</h3>
                <p><strong>Автор:</strong> {book.author}</p>
                <p><strong>Год издания:</strong> {book.year}</p>
                <p><strong>Кол-во изданий:</strong> {book.editionCount}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {query.length > 2 && !loadingBooks && books.length === 0 && (
        <p className="no-results">Ничего не найдено</p>
      )}
    </div>
  );
};

export default SearchAutoComplete;
