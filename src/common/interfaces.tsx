// Interfaces Document

export interface UserInfo {
    name: string;
    email: string;
    selectedEvents: Array<EclipseData | NearEarthObject>;
}

  
export interface EclipseData {
    type: string;
    date: string;
    hour: string;
    mode: string;
    places: string;
}
  
export interface NearEarthObject {
    id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: {
      kilometers: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
    };
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: Array<{
      close_approach_date: string;
      relative_velocity: {
        kilometers_per_hour: string;
      };
      miss_distance: {
        kilometers: string;
      };
    }>;
}





//settings
  
export interface UserSettings {
    language: string;
    color: string;
}