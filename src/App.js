import React, { useState, useEffect } from 'react';
import './App.css';
import Chart from './Chart.js';

const data = [
  { id: 1, paymentType: 'Наличные', today: 350000, yesterday: 350000, lastWeek: 350000 },
  { id: 2, paymentType: 'Безналичные', today: 100000, yesterday: 100000, lastWeek: 100000 },
  { id: 3, paymentType: 'Кредитные карты', today: 100000, yesterday: 100000, lastWeek: 100000 },
  { id: 4, paymentType: 'Средний чек', today: 1000, yesterday: 900, lastWeek: 900 },
  { id: 5, paymentType: 'Средний гость', today: 1000, yesterday: 900, lastWeek: 900 },
  { id: 6, paymentType: 'Средний гость', today: 1000, yesterday: 1100, lastWeek: 1000 },
  { id: 7, paymentType: 'Удаления из чека (после оплаты)', today: 1000, yesterday: 1100, lastWeek: 500 },
  { id: 8, paymentType: 'Удаления из чека (до оплаты)', today: 400, yesterday: 350, lastWeek: 380 },
  { id: 9, paymentType: 'Количество чеков', today: 34, yesterday: 36, lastWeek: 34 },
  { id: 10, paymentType: 'Количество гостей', today: 34, yesterday: 36, lastWeek: 32 },
];

const data_1 = [
  { id: 1, paymentType: 'Выручка в руб.', today: 500500, yesterday: 450000, lastWeek: 505000 },
];

const App = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    setSelectedData(data_1[0]); // Установка первого элемента массива данных при старте
  }, []); // Пустой массив зависимостей, чтобы хук useEffect сработал только один раз при монтировании

  const handleRowClick = (id) => {
    setSelectedRow(id);
    const newData = data.find(item => item.id === id);
    setSelectedData(newData);
  };

  const renderChart = () => {
    if (selectedData !== null) {
      return (
        <div>
          <Chart data={selectedData} />
        </div>
      );
    } else {
      return <div>Выберите строку для отображения графика</div>;
    }
  };
  const getPercentageColor = (today, yesterday) => {
    const difference = today - yesterday;
    if (difference < 0) {
      return 'red';
    } else if (difference > 0) {
      return 'green';
    } else {
      return 'black';
    }
  };
  
  const getPercentageSign = (today, yesterday) => {
    const difference = today - yesterday;
    if (difference < 0) {
      return '-';
    } else {
      return '';
    }
  };
  
  const getCellStyle = (today, yesterday) => {
    const difference = today - yesterday;
    if (difference < 0) {
      return {
        backgroundColor: '#ffcccc',
        color: 'red'
      };
    } else if (difference > 0) {
      return {
        backgroundColor: '#ccffcc',
        color: 'green'
      };
    } else {
      return {
        backgroundColor: '#66666625',
      };
    }
  };

  const calculatePercentage = (larger, smaller) => {
    if (larger > smaller) {
      return Math.round(((larger - smaller) / smaller) * 100);
    } else if (larger < smaller) {
      return Math.round(((smaller - larger) / larger) * 100);
    } else {
      return 0;
    }
  };
  
  return (
    <div className="App">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Показатель</th>
              <th>Сегодня</th>
              <th>Вчера</th>
              <th>Прошлая неделя</th>
            </tr>
          </thead>
          <tbody>
            {data_1.map(row => (
              <tr key={row.id} className={selectedRow === row.id ? 'selected' : ''} onClick={() => handleRowClick(row.id)}>
                <td>{row.paymentType}</td>
                <td style={getCellStyle(row.today, row.yesterday)}>{row.today}</td>
                <td style={getCellStyle(row.yesterday, row.today)}>{row.yesterday}</td>
                <td style={getCellStyle(row.yesterday, row.today)}>{row.lastWeek}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="chart-container">
        {renderChart()}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Показатель</th>
              <th>Сегодня</th>
              <th>Вчера</th>
              <th>Прошлая неделя</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id} className={selectedRow === row.id ? 'selected' : ''} onClick={() => handleRowClick(row.id)}>
                <td>{row.paymentType}</td>
                <td style={getCellStyle(row.today, row.yesterday)}>{row.today}</td>
                <td style={{ ...getCellStyle(row.yesterday, row.today), position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 50 }}>{row.yesterday}</span>
                  <span style={{ position: 'absolute', right: 10, color: getPercentageColor(row.today, row.yesterday) }}>
                    {getPercentageSign(row.today, row.yesterday)}{Math.abs(calculatePercentage(row.today, row.yesterday))}%
                  </span>
                </td>
                <td style={getCellStyle(row.yesterday, row.today)}>{row.lastWeek}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
