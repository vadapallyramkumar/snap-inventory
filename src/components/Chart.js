import React from "react";
import { Bar, Line, Doughnut, Pie, Bubble, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  LineController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  ArcElement,
  PointElement,
  LinearScale,
  BarElement,
  LineController,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Generate random colors
const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `rgba(${Math.floor(Math.random() * 255)}, 
                         ${Math.floor(Math.random() * 255)}, 
                         ${Math.floor(Math.random() * 255)}, 0.7)`;
    colors.push(color);
  }
  return colors;
};

const Chart = ({ type, title, chartData, chartTitle, labels }) => {
  const colors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a'] || generateColors(6);
  const data = {
    labels: labels,
    datasets: [
      {
        label: chartTitle,
        data: chartData,
        tension: 0.3,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors,
        borderColor: colors,
      },
    ],
  };

  let options = {
    responsive: true,
    hoverOffset: 25,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (type === "Doughnut" || type === "Pie") {
    options = {
      ...options,
      scales: {},
      
    };
  }
  if (title) {
    options = {
      ...options,
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
    };
  }

  const chartTypes = {
    Bar: <Bar data={data} options={options} />,
    Line: <Line data={data} options={options} />,
    PolarArea: <PolarArea data={data} options={options} />,
    Doughnut: <Doughnut data={data} options={options} />,
    Pie: <Pie data={data} options={options} />,
    Bubble: <Bubble data={data} options={options} />,
  };

  return (
    <div className="chart flex content-center shadow-md justify-center bg-white p-4 rounded-lg border border-background-VERY_LIGHT">
      {chartTypes[type]}
    </div>
  );
};

export default Chart;
