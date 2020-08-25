export interface Activity {
    id: number;
    activityName: string;
    activityCode: string;
    tags?: string[];
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
  }