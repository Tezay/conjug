import axios from "../api/axiosInstance";

export const fetchLeaderboardData = async () => {
  const response = await axios.get('/leaderboard');
  return response.data;
};
