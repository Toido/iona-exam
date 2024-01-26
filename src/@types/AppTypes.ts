export interface ISelectedBreed {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
}

export interface ISearch {
  id?: string;
  page: number;
}

export interface ICatDetails {
  breeds: ISelectedBreed;
  id: string;
  url: string;
  height: number;
  width: number;
}

export type AppContextType = {
  selectedBreed: string;
  setSelectedBreed: (breedId: string) => void;
  search: ISearch;
  setSearch: (search: ISearch) => void;
};
