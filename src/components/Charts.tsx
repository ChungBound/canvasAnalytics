"use client";

import React from "react";
import ReactECharts from "echarts-for-react";
import { ChartData } from "@/types";

interface ChartsProps {
  data: ChartData;
  onPriorityClick?: (priority: string) => void;
  onTypeClick?: (type: string) => void;
  onSentimentClick?: (sentiment: string) => void;
}

const Charts: React.FC<ChartsProps> = ({ 
  data, 
  onPriorityClick, 
  onTypeClick, 
  onSentimentClick 
}) => {
  // Map priority display name to value
  const mapPriorityNameToValue = (name: string): string => {
    const mapping: Record<string, string> = {
      "Low Priority": "low",
      "Medium Priority": "medium",
      "High Priority": "high",
    };
    return mapping[name] || name.toLowerCase();
  };

  // Map type display name to value
  const mapTypeNameToValue = (name: string): string => {
    return name.toLowerCase();
  };

  // Map sentiment display name to enum value
  const mapSentimentNameToValue = (name: string): string => {
    const mapping: Record<string, string> = {
      "Academic Desperation": "ACADEMIC_DESPERATION",
      "Productive Struggle": "PRODUCTIVE_STRUGGLE",
      "Confusion": "CONFUSION",
      "Technostress": "TECHNOSTRESS",
      "Boredom": "BOREDOM",
      "Hostility": "HOSTILITY",
      "Epistemic Curiosity": "EPISTEMIC_CURIOSITY",
    };
    return mapping[name] || name;
  };
  // Priority distribution vertical bar chart
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
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any) => {
        const param = params[0];
        return `${param.name}<br/>Count: ${param.value}`;
      },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151",
      },
    },
    grid: {
      left: "15%",
      right: "10%",
      bottom: "15%",
      top: "15%",
      containLabel: false,
    },
    xAxis: {
      type: "category",
      data: data.priorityData.map((item) => item.name),
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
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
        barWidth: "60%",
        data: data.priorityData.map((item, index) => ({
          value: item.value,
          itemStyle: {
            color: (() => {
              // Color mapping: Low Priority (green), Medium Priority (yellow), High Priority (red)
              const colors = ["#10b981", "#f59e0b", "#ef4444"];
              return colors[index % colors.length];
            })(),
            borderRadius: [4, 4, 0, 0],
          },
        })),
        label: {
          show: true,
          position: "top",
          color: "#374151",
          fontSize: 12,
        },
      },
    ],
  };

  // Handle priority chart click
  const handlePriorityClick = (params: any) => {
    if (onPriorityClick && params.name) {
      const priorityValue = mapPriorityNameToValue(params.name);
      onPriorityClick(priorityValue);
    }
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
            // Color mapping: Lecture (blue), Workshop (purple), Assignment (teal)
            // Using different colors from Priority to make charts visually distinct
            const colors = ["#3b82f6", "#8b5cf6", "#14b8a6"];
            return colors[params.dataIndex % colors.length];
          },
        },
      },
    ],
  };

  // Handle type chart click
  const handleTypeClick = (params: any) => {
    if (onTypeClick && params.name) {
      const typeValue = mapTypeNameToValue(params.name);
      onTypeClick(typeValue);
    }
  };

  // Sentiment analysis horizontal bar chart
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
      formatter: (params: any) => {
        const param = params[0];
        return `${param.name}<br/>Count: ${param.value}`;
      },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      textStyle: {
        color: "#374151",
      },
    },
    grid: {
      left: "15%",
      right: "5%",
      bottom: "5%",
      top: "15%",
      containLabel: false,
    },
    xAxis: {
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
    yAxis: {
      type: "category",
      data: data.sentimentData.map((item) => item.name),
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: "#e5e7eb",
        },
      },
    },
    series: [
      {
        name: "Count",
        type: "bar",
        barWidth: "60%",
        data: data.sentimentData.map((item) => ({
          value: item.value,
          itemStyle: {
            color: item.color,
            borderRadius: [0, 4, 4, 0],
          },
        })),
        label: {
          show: true,
          position: "right",
          color: "#374151",
          fontSize: 12,
        },
      },
    ],
  };

  // Handle sentiment chart click
  const handleSentimentClick = (params: any) => {
    if (onSentimentClick && params.name) {
      const sentimentValue = mapSentimentNameToValue(params.name);
      onSentimentClick(sentimentValue);
    }
  };

  return (
    <div className="space-y-6">
      {/* Priority and Type Distribution - Two pie charts in one row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <div className="card p-6">
          <ReactECharts
            option={priorityOption}
            style={{ height: "500px" }}
            theme="light"
            onEvents={{
              click: handlePriorityClick,
            }}
            opts={{ renderer: "svg" }}
          />
        </div>

        {/* Type Distribution */}
        <div className="card p-6">
          <ReactECharts
            option={typeOption}
            style={{ height: "500px" }}
            theme="light"
            onEvents={{
              click: handleTypeClick,
            }}
            opts={{ renderer: "svg" }}
          />
        </div>
      </div>

      {/* Sentiment Analysis - Horizontal bar chart in separate row */}
      <div className="card p-6">
        <ReactECharts
          option={sentimentOption}
          style={{ height: "500px" }}
          theme="light"
          onEvents={{
            click: handleSentimentClick,
          }}
          opts={{ renderer: "svg" }}
        />
      </div>
    </div>
  );
};

export default Charts;
