'use client';

import { useState, useEffect } from 'react';
import DailyImage from '../components/DailyImage';
import DatePicker from '../components/DatePicker';

export default function HomePage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const API_KEY=process.env.NEXT_PUBLIC_NASA_API_KEY

  const fetchData = async (selectedDate) => {
    try {
      setError('');
      setData(null);
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`
      );
      if (!res.ok) throw new Error('Помилка запиту');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError('Зображення не знайдено, спробуйте іншу дату.');
    }
  };

  useEffect(() => {
    fetchData(date);
  }, [date]); // Додано date до залежностей, щоб оновлювати дані при зміні дати

  const handleDateChange = () => {
    fetchData(date);
  };

  return (
    <div className="flex flex-col items-center">
      {error && <p className="text-red-500">{error}</p>}
      {data && <DailyImage data={data} />}
      <DatePicker date={date} setDate={setDate} onSubmit={handleDateChange} />
    </div>
  );
}