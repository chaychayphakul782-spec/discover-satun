export type TaxaType = 'all' | 'mammal' | 'bird' | 'reptile' | 'marine';
export type HabitatKey = 'all' | 'thaleban' | 'tarutao' | 'phetra' | 'mangrove';
export type StatusKey = 'all' | 'reserved' | 'EN' | 'VU' | 'NT' | 'LC';

export interface WildlifeItem {
  id: string;
  nameTh: string;
  nameEn: string;
  sciName: string;
  taxa: 'mammal' | 'bird' | 'reptile' | 'marine';
  habitatKey: 'thaleban' | 'tarutao' | 'phetra' | 'mangrove';
  habitatTh: string;
  statusKey: 'reserved' | 'EN' | 'VU' | 'NT' | 'LC';
  statusTh: string;
  statusBadgeClass: string;
  badgeText: string;
  imageUrl: string;
  imageAlt: string;
  distribution: string;
  diurnal: string;
  diet: string;
  frequency: string;
  lawStatus: string;
  behavior: string;
  role: string;
  observation: string;
}

export interface FieldLog {
  id: string;
  species: string;
  location: string;
  date: string;
  observer: string;
  notes: string;
  timestamp: number;
}
