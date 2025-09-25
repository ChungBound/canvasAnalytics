"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { ChartData } from "@/types";

interface ChartsProps {
  data: ChartData;
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  // Priority distribution pie chart
  const priorityOption = {
    title: {
      text: "Priority Distribution",
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#374151",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151",
      },
    },
    legend: {
      orient: "horizontal",
      bottom: "10%",
      data: data.priorityData.map((item) => item.name),
    },
    series: [
      {
        name: "Priority",
        type: "pie",
        radius: ["30%", "60%"],
        center: ["50%", "45%"],
        data: data.priorityData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        itemStyle: {
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 2,
          color: (params: any) => {
            const colors = ["#ef4444", "#f59e0b", "#10b981"];
            return colors[params.dataIndex % colors.length];
          },
        },
      },
    ],
  };

  // Type distribution pie chart
  const typeOption = {
    title: {
      text: "Type Distribution",
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#374151",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151",
      },
    },
    legend: {
      orient: "horizontal",
      bottom: "10%",
      data: data.typeData.map((item) => item.name),
    },
    series: [
      {
        name: "Type",
        type: "pie",
        radius: ["30%", "60%"],
        center: ["50%", "45%"],
        data: data.typeData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        itemStyle: {
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 2,
          color: (params: any) => {
            const colors = ["#3b82f6", "#8b5cf6", "#ec4899"];
            return colors[params.dataIndex % colors.length];
          },
        },
      },
    ],
  };

  // Sentiment analysis bar chart
  const sentimentOption = {
    title: {
      text: "Sentiment Analysis",
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#374151",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      top: "20%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.sentimentData.map((item) => item.name),
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: "#6b7280",
      },
      axisLine: {
        lineStyle: {
          color: "#e5e7eb",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#6b7280",
      },
      axisLine: {
        lineStyle: {
          color: "#e5e7eb",
        },
      },
      splitLine: {
        lineStyle: {
          color: "#f3f4f6",
        },
      },
    },
    series: [
      {
        name: "Count",
        type: "bar",
        barWidth: "50%",
        data: data.sentimentData.map((item) => ({
          value: item.value,
          itemStyle: {
            color: item.color,
            borderRadius: [4, 4, 0, 0],
          },
        })),
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Priority Distribution */}
      <div className="card p-6">
        <ReactECharts
          option={priorityOption}
          style={{ height: "400px" }}
          theme="light"
        />
      </div>

      {/* Type Distribution */}
      <div className="card p-6">
        <ReactECharts
          option={typeOption}
          style={{ height: "400px" }}
          theme="light"
        />
      </div>

      {/* Sentiment Analysis */}
      <div className="card p-6">
        <ReactECharts
          option={sentimentOption}
          style={{ height: "400px" }}
          theme="light"
        />
      </div>
    </div>
  );
};

export default Charts;
