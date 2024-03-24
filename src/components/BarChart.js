import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy(); // Уничтожаем предыдущий экземпляр графика
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(result => result.paymentDate),
        datasets: [{
          label: 'Общий доход на дату',
          data: data.map(result => result.totalAmount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); // Уничтожаем экземпляр графика при размонтировании компонента
      }
    };
  }, [data]);

  return <canvas className="barchart" ref={chartRef} />;
};


