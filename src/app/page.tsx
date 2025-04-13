'use client';

import { useState, useCallback, useEffect } from 'react';
import DailyImage from '../components/DailyImage';
import DatePicker from '../components/DatePicker';

export default function HomePage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [showDescription, setShowDescription] = useState(true); // Новий стан для опису
  const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

  const fetchData = useCallback(async (selectedDate: string) => {
    try {
      setError('');
      setData(null);
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${selectedDate}`
      );
      if (!res.ok) throw new Error('Помилка запиту');
      const json = await res.json();
      setData(json);
    } catch {
      setError('Зображення не знайдено, спробуйте іншу дату.');
    }
  }, [API_KEY]);

  useEffect(() => {
    fetchData(date);
  }, [date, fetchData]);

  const handleDateChange = useCallback(() => {
    fetchData(date);
  }, [fetchData, date]);

  const handleNext = () => {
    setShowDescription(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
      {showDescription ? (
        <div className="max-w-2xl text-center">
          <p className="text-lg mb-4">
            Одним із найпопулярніших веб-сайтів NASA є Astronomy Picture of the Day. Фактично, цей веб-сайт є одним із найпопулярніших веб-сайтів у всіх федеральних агентств. Це популярне відео Джекі Бівера. Для кінцева точка структури зображення APOD і потенційно метадані, щоб їх можна було використовувати для різних програм. Крім того, якщо concept_tags для цього метадані встановлено значення True, повертаються ключові слова, отримані з пошуку зображень. Ключові слова можна використовувати як автоматичні хештеги для каналу Twitter або Instagram; якщо задано додаткові знання релевантні зображення.
          </p>
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Далі
          </button>
        </div>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          {data && <DailyImage data={data} />}
          <DatePicker date={date} setDate={setDate} onSubmit={handleDateChange} />
        </>
      )}
    </div>
  );
}