// FirebaseAnalyticsDashboard.js
import React, { useEffect, useState } from 'react';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { app } from '../../firebase'

const FirebaseAnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const analytics = getAnalytics(app);
        const response = await analytics.get('users');
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div>
      <h1>Firebase Analytics Dashboard</h1>
      {analyticsData ? (
        <div>
          <p>Total Users: {analyticsData.totalUsers}</p>
          <p>Active Users: {analyticsData.activeUsers}</p>
          {/* Add more analytics data as needed */}
        </div>
      ) : (
        <p>Loading analytics data...</p>
      )}
    </div>
  );
};

export default FirebaseAnalyticsDashboard;