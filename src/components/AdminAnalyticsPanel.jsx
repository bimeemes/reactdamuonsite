import React, { useEffect, useState, useRef } from 'react';
import './AdminAnalyticsPanel.css';
import Chart from 'chart.js/auto';

export default function AdminAnalyticsPanel() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chart refs
  const trafficChartRef = useRef(null);
  const newsChartRef = useRef(null);
  const actionsChartRef = useRef(null);

  // Draw charts when analytics data loads
  useEffect(() => {
    if (!analytics) {
      return;
    }
    // Site traffic chart
    if (trafficChartRef.current) {
      new Chart(trafficChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['بازدید کل سایت', 'مشاهده صفحات'],
          datasets: [
            {
              data: [analytics.siteVisits || 0, analytics.pageViews || 0],
              backgroundColor: ['#ff9800', '#607d8b'],
            },
          ],
        },
        options: { plugins: { legend: { position: 'bottom' } } },
      });
    }
    // News views chart
    if (newsChartRef.current) {
      new Chart(newsChartRef.current, {
        type: 'bar',
        data: {
          labels: (analytics.newsViews || []).map(n => n.title),
          datasets: [
            {
              label: 'تعداد مشاهده',
              data: (analytics.newsViews || []).map(n => n.views),
              backgroundColor: '#ff9800',
            },
          ],
        },
        options: { plugins: { legend: { display: false } } },
      });
    }
    // User actions chart
    if (actionsChartRef.current) {
      new Chart(actionsChartRef.current, {
        type: 'pie',
        data: {
          labels: (analytics.userActions || []).map(a => a.action),
          datasets: [
            {
              data: (analytics.userActions || []).map(a => a.count),
              backgroundColor: ['#ff9800', '#607d8b', '#e0e0e0'],
            },
          ],
        },
        options: { plugins: { legend: { position: 'bottom' } } },
      });
    }
  }, [analytics]);

  return (
    <div className='admin-analytics-panel'>
      <h2>آنالیز سایت</h2>
      <div className='admin-analytics-charts'>
        <div>
          <h3>ترافیک سایت</h3>
          <canvas ref={trafficChartRef} />
        </div>
        <div>
          <h3>مشاهده اخبار</h3>
          <canvas ref={newsChartRef} />
        </div>
        <div>
          <h3>عملیات کاربران</h3>
          <canvas ref={actionsChartRef} />
        </div>
      </div>
    </div>
  );
}
