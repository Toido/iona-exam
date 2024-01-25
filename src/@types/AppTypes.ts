export interface ISelectedBreed {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
}

export interface ICatImages {
  breeds: ISelectedBreed;
  id: string;
  url: string;
  height: number;
  width: number;
}

export type BreedContextType = {
  selectedBreed: ISelectedBreed;
  setSelectedBreed: (breed: ISelectedBreed) => void;
};
