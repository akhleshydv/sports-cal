export interface Sport {
  id: string;
  name: string;
}

export interface Match {
  id: number;
  stage: string;
  team_a: string;
  team_b: string;
  start_time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
}

export interface Tournament {
  id: number;
  name: string;
  tournament_img_url: string;
  level: string;
  start_date: string;
  matches: Match[];
}

export interface SportData {
  sports_id: number;
  sport_name: string;
  tournaments: Tournament[];
}

export interface TournamentResponse {
  status: string;
  msg: string;
  err: any;
  data: SportData[];
}

export interface CalendarDay {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export interface MarkedDates {
  [key: string]: {
    marked?: boolean;
    dotColor?: string;
    activeOpacity?: number;
    selected?: boolean;
    selectedColor?: string;
  };
}