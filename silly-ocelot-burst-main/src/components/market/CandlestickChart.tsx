import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickSeries, AreaSeries, HistogramSeries, LineSeries } from 'lightweight-charts';

interface CandlestickChartProps {
  data: any[];
  volumeData?: any[];
  type?: 'candle' | 'area';
  height?: number;
  showIndicators?: boolean;
}

const CandlestickChart = ({ data, volumeData, type = 'candle', height = 550, showIndicators = true }: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const mainSeriesRef = useRef<ISeriesApi<any> | null>(null);
  const smaSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Fixed dimensions for initialization to ensure visibility
    const container = chartContainerRef.current;
    const initialWidth = container.clientWidth || 800;

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: '#050A14' },
        textColor: 'rgba(255, 255, 255, 0.4)',
        fontSize: 11,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.02)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.02)' },
      },
      width: initialWidth,
      height: height,
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        autoScale: true,
      },
      crosshair: {
        mode: 0,
        vertLine: { color: 'rgba(0, 208, 156, 0.5)', style: 3 },
        horzLine: { color: 'rgba(0, 208, 156, 0.5)', style: 3 },
      },
    });

    if (type === 'candle') {
      mainSeriesRef.current = chart.addSeries(CandlestickSeries, {
        upColor: '#00D09C',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#00D09C',
        wickDownColor: '#ef4444',
      });
    } else {
      mainSeriesRef.current = chart.addSeries(AreaSeries, {
        lineColor: '#00D09C',
        topColor: 'rgba(0, 208, 156, 0.2)',
        bottomColor: 'transparent',
        lineWidth: 2,
      });
    }

    if (data && data.length > 0) {
      mainSeriesRef.current.setData(data);
      chart.timeScale().fitContent();
    }

    if (showIndicators && data && data.length >= 20) {
      smaSeriesRef.current = chart.addSeries(LineSeries, {
        color: '#3b82f6',
        lineWidth: 1,
        priceLineVisible: false,
      });
      const smaData = data.map((d, i) => {
        if (i < 20) return null;
        const avg = data.slice(i - 20, i).reduce((acc, curr) => acc + curr.close, 0) / 20;
        return { time: d.time, value: avg };
      }).filter(d => d !== null);
      smaSeriesRef.current.setData(smaData as any);
    }

    chartRef.current = chart;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Extra resize trigger after a short delay to ensure correct width
    setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, type, height, showIndicators]);

  return <div ref={chartContainerRef} className="w-full h-full min-h-[550px] bg-[#050A14]" />;
};

export default CandlestickChart;