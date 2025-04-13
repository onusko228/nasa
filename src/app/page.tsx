'use client';

import { useState, useCallback, useEffect } from 'react';
import DailyImage from '../components/DailyImage';
import DatePicker from '../components/DatePicker';

export default function HomePage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [show,setShow]=useState(true);
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

  const showNext = () => {
    setShow(false);
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
      {show ? (
        <div className="max-w-2xl text-center">
          <p className="text-lg mb-4">
          Щоденний космос — це веб-додаток,з використанням NASA API, який щодня відкриває перед вами красу Всесвіту через зображення від NASA.
 Переглядайте захопливі фото космосу з науковими поясненнями англійською мовою.
 Обирайте дату, щоб побачити, яке космічне диво було зафіксовано саме тоді.
          </p>
          <button
            onClick={showNext}
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