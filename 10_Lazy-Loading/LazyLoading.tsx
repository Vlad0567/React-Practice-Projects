import React, { useEffect, useState, useRef, useCallback } from "react";
import "./LazyLoading.css";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY; 
const API_URL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=20`;

const LazyLoading = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useRef<HTMLDivElement | null>(null);


  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Ошибка загрузки данных");

      const data = await response.json();
      setPhotos((prev) => [...prev, ...data]);
    } catch (err) {
      setError("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPhotos();
        }
      },
      { threshold: 1.0 }
    );

    if (lastPhotoRef.current) {
      observerRef.current.observe(lastPhotoRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [fetchPhotos, loading]);


  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="container">
      <h1>Ленивая подгрузка фото</h1>
      <div className="grid">
        {photos.map((photo, index) => (
          <div
            className="card"
            key={photo.id}
            ref={index === photos.length - 1 ? lastPhotoRef : null}
          >
            <img src={photo.urls.small} alt={photo.alt_description || "Фото"} />
            <p className="author">📸 {photo.user.name}</p>
            <p>❤️ {photo.likes}</p>
          </div>
        ))}
      </div>
      {loading && <p className="loading">Загрузка...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LazyLoading;
