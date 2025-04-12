import React from 'react';

const DatePicker = ({ date, setDate, onSubmit }) => {
  // Обробка зміни дати з додатковою валідацією
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
      <input
        type="date"
        value={date || ''} // Захист від undefined
        onChange={handleDateChange}
        className="px-4 py-2 rounded text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3aafa9]"
        max={new Date().toISOString().split('T')[0]} // Обмеження на сьогоднішню дату
        aria-label="Обрати дату для зображення"
      />
      <button
        onClick={onSubmit}
        className="bg-[#3aafa9] hover:bg-[#2b8f8a] px-4 py-2 rounded text-white transition-colors duration-200"
        disabled={!date} // Вимикаємо кнопку, якщо дата не обрана
      >
        Показати
      </button>
    </div>
  );
};

export default DatePicker;