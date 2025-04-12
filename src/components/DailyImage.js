import React from 'react';

const DailyImage = ({ data }) => {
  // Перевірка, чи data існує, щоб уникнути помилок при зверненні до властивостей
  if (!data) {
    return null; // або можна повернути заглушку, наприклад <div>Завантаження...</div>
  }

  return (
    <div className="text-center">
      <img
        src={data.url}
        alt={data.title || 'Зображення дня'} // Додано запасний alt
        className="mx-auto max-w-full max-h-[500px] rounded-lg shadow-lg mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">{data.title || 'Без назви'}</h2>
      <p className="mb-2">{data.date || 'Дата не вказана'}</p>
      <p className="text-sm text-gray-300">{data.explanation || 'Опис відсутній'}</p>
    </div>
  );
};

export default DailyImage;