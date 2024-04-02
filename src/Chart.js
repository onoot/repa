import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

const Chart = ({ data }) => {
  useEffect(() => {
    // Создаем график
    Highcharts.chart('chart-container', {
      chart: {
        type: 'line' // Изменяем тип графика на линейный
      },
      title: {
        text: 'График данных'
      },
      xAxis: {
        categories: ['Сегодня', 'Вчера', 'Прошлая неделя']
      },
      yAxis: {
        title: {
          text: 'Значение'
        }
      },
      series: [{
        name: data.paymentType,
        data: [data.today, data.yesterday, data.lastWeek]
      }]
    });
  }, [data]); // Вызываем эффект при изменении данных

  return (
    <div id="chart-container"></div>
  );
};

export default Chart;
