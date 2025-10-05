import axios from 'axios';
import { Sport, TournamentResponse } from '../types';
import { demoTournamentData, demoSportsData } from '../data/demoData';

const BASE_URL = 'https://stapubox.com';
const DEMO_URL = 'https://mockly.me/custom/tournament/demo/v2';
const USE_DEMO_DATA = true; // Set to false for production

class ApiService {
  private readonly axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getSportsList(): Promise<Sport[]> {
    if (USE_DEMO_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return demoSportsData;
    }

    try {
      const response = await this.axiosInstance.get(`${BASE_URL}/sportslist`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sports list:', error);
      // Fallback to demo data
      return demoSportsData;
    }
  }

  async getTournaments(sportsId?: string, month?: number): Promise<TournamentResponse> {
    if (USE_DEMO_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredData = demoTournamentData.data;
      
      // Filter by sport if specified
      if (sportsId && sportsId !== 'all') {
        filteredData = filteredData.filter(sport => 
          sport.sports_id.toString() === sportsId
        );
      }
      
      // Filter by month if specified
      if (month) {
        filteredData = filteredData.map(sport => ({
          ...sport,
          tournaments: sport.tournaments.filter(tournament => {
            const tournamentMonth = new Date(tournament.start_date).getMonth() + 1;
            return tournamentMonth === month;
          })
        })).filter(sport => sport.tournaments.length > 0);
      }
      
      return {
        ...demoTournamentData,
        data: filteredData
      };
    }

    try {
      let url = `${BASE_URL}/tournament/demo`;
      const params = new URLSearchParams();
      
      if (sportsId && sportsId !== 'all') {
        params.append('sports_id', sportsId);
      }
      
      if (month) {
        params.append('month', month.toString());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await this.axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      // Fallback to demo data
      return demoTournamentData;
    }
  }
}

export default new ApiService();