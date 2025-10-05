import { TournamentResponse } from '../types';

export const demoTournamentData: TournamentResponse = {
  status: 'success',
  msg: 'Demo data loaded successfully',
  err: null,
  data: [
    {
      sports_id: 7020104,
      sport_name: 'Badminton',
      tournaments: [
        {
          id: 1,
          name: 'BWF World Championships 2025',
          tournament_img_url: 'https://img.icons8.com/color/100/000000/trophy.png',
          level: 'International',
          start_date: '2025-08-15T04:20:47',
          matches: [
            {
              id: 1,
              stage: 'Quarterfinals',
              team_a: 'Viktor Axelsen (DEN)',
              team_b: 'Kento Momota (JPN)',
              start_time: '2025-08-15T09:30:00',
              venue: 'Tokyo Dome',
              status: 'upcoming'
            },
            {
              id: 2,
              stage: 'Semifinals',
              team_a: 'P.V. Sindhu (IND)',
              team_b: 'Carolina Marin (ESP)',
              start_time: '2025-08-16T14:00:00',
              venue: 'Tokyo Dome',
              status: 'upcoming'
            }
          ]
        },
        {
          id: 2,
          name: 'Thomas Cup 2025',
          tournament_img_url: 'https://img.icons8.com/color/100/000000/gold-medal.png',
          level: 'International',
          start_date: '2025-09-10T06:00:00',
          matches: [
            {
              id: 3,
              stage: 'Group Stage',
              team_a: 'India',
              team_b: 'Malaysia',
              start_time: '2025-09-10T11:00:00',
              venue: 'Kuala Lumpur',
              status: 'upcoming'
            }
          ]
        }
      ]
    },
    {
      sports_id: 7061509,
      sport_name: 'Football',
      tournaments: [
        {
          id: 3,
          name: 'Durand Cup 2025',
          tournament_img_url: 'https://img.icons8.com/color/100/000000/championship.png',
          level: 'Domestic',
          start_date: '2025-08-20T04:20:47',
          matches: [
            {
              id: 4,
              stage: 'Quarterfinals',
              team_a: 'Jamshedpur FC',
              team_b: 'Mohun Bagan',
              start_time: '2025-08-20T19:30:00',
              venue: 'Salt Lake Stadium, Kolkata',
              status: 'upcoming'
            },
            {
              id: 5,
              stage: 'Semifinals',
              team_a: 'East Bengal',
              team_b: 'Kerala Blasters',
              start_time: '2025-08-22T19:30:00',
              venue: 'Salt Lake Stadium, Kolkata',
              status: 'upcoming'
            }
          ]
        },
        {
          id: 4,
          name: 'I-League 2025-26',
          tournament_img_url: 'https://img.icons8.com/color/100/000000/football-league.png',
          level: 'Domestic',
          start_date: '2025-10-01T10:00:00',
          matches: [
            {
              id: 7,
              stage: 'Round 1',
              team_a: 'Gokulam Kerala FC',
              team_b: 'Real Kashmir FC',
              start_time: '2025-10-01T15:30:00',
              venue: 'EMS Corporation Stadium, Kozhikode',
              status: 'upcoming'
            },
            {
              id: 8,
              stage: 'Round 1',
              team_a: 'Mohammedan SC',
              team_b: 'Aizawl FC',
              start_time: '2025-10-02T19:00:00',
              venue: 'Kishore Bharati Krirangan, Kolkata',
              status: 'upcoming'
            },
            {
              id: 9,
              stage: 'Round 2',
              team_a: 'Churchill Brothers',
              team_b: 'TRAU FC',
              start_time: '2025-10-05T17:00:00',
              venue: 'Fatorda Stadium, Goa',
              status: 'live'
            },
            {
              id: 10,
              stage: 'Round 2',
              team_a: 'Rajasthan United FC',
              team_b: 'Sudeva Delhi FC',
              start_time: '2025-10-06T15:30:00',
              venue: 'Ambedkar Stadium, Delhi',
              status: 'upcoming'
            }
          ]
        }
      ]
    },
    {
      sports_id: 7020105,
      sport_name: 'Cricket',
      tournaments: [
        {
          id: 5,
          name: 'Ranji Trophy 2025-26',
          tournament_img_url: 'https://img.icons8.com/color/100/000000/cricket-bat-ball.png',
          level: 'Domestic',
          start_date: '2025-10-15T04:30:00',
          matches: [
            {
              id: 6,
              stage: 'Group Stage',
              team_a: 'Mumbai',
              team_b: 'Delhi',
              start_time: '2025-10-15T09:30:00',
              venue: 'Wankhede Stadium, Mumbai',
              status: 'upcoming'
            }
          ]
        }
      ]
    }
  ]
};

export const demoSportsData = [
  { id: '7020104', name: 'Badminton' },
  { id: '7061509', name: 'Football' },
  { id: '7020105', name: 'Cricket' },
  { id: '7020106', name: 'Tennis' },
  { id: '7020107', name: 'Basketball' },
];