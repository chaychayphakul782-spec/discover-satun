import React from 'react';
import { Search, X, ChevronDown, Filter, Footprints, Bird, Bug, Fish } from 'lucide-react';
import { TaxaType, HabitatKey, StatusKey } from '../types';

interface FilterControlDeckProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedHabitat: HabitatKey;
  onHabitatChange: (val: HabitatKey) => void;
  selectedStatus: StatusKey;
  onStatusChange: (val: StatusKey) => void;
  selectedTaxa: TaxaType;
  onTaxaChange: (val: TaxaType) => void;
  taxaCounts: {
    all: number;
    mammal: number;
    bird: number;
    reptile: number;
    marine: number;
  };
}

export const FilterControlDeck: React.FC<FilterControlDeckProps> = ({
  searchQuery,
  onSearchChange,
  selectedHabitat,
  onHabitatChange,
  selectedStatus,
  onStatusChange,
  selectedTaxa,
  onTaxaChange,
  taxaCounts,
}) => {
  return (
    <section className="sticky top-20 z-40 w-full bg-[#f9f9f6]/95 backdrop-blur-md shadow-sm border-b border-[#e2e3df]/70">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 py-3 flex flex-col gap-3">
        {/* Primary Search and Park Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Field */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#006972] w-5 h-5 pointer-events-none" />
            <input
              id="wildlife-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ค้นหาชื่อไทย, ชื่ออังกฤษ, ชื่อวิทยาศาสตร์ (เช่น สมเสร็จ, Dugong, Hornbill)..."
              className="w-full h-12 pl-11 pr-10 bg-white text-[#1a1c1a] rounded-xl text-sm md:text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0f382c] border border-[#c1c8c3]/60 shadow-sm"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717975] hover:text-[#1a1c1a] p-1 rounded-full hover:bg-gray-100 transition-colors"
                title="ล้างคำค้นหา"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Habitat Selector */}
          <div className="md:col-span-3 relative">
            <select
              id="habitat-filter"
              value={selectedHabitat}
              onChange={(e) => onHabitatChange(e.target.value as HabitatKey)}
              className="w-full h-12 px-4 bg-white text-[#1a1c1a] rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0f382c] border border-[#c1c8c3]/60 shadow-sm cursor-pointer pr-10"
            >
              <option value="all">ทุกถิ่นที่อยู่ (ทุกอุทยาน)</option>
              <option value="thaleban">อุทยานแห่งชาติทะเลบัน (ป่าดงดิบชื้น)</option>
              <option value="tarutao">อุทยานแห่งชาติตะรุเตา (เกาะและทะเล)</option>
              <option value="phetra">อุทยานแห่งชาติหมู่เกาะเภตรา</option>
              <option value="mangrove">ป่าชายเลนและปากแม่น้ำสตูล</option>
            </select>
            <ChevronDown className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#717975] pointer-events-none" />
          </div>

          {/* IUCN / Conservation Filter */}
          <div className="md:col-span-3 relative">
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value as StatusKey)}
              className="w-full h-12 px-4 bg-white text-[#1a1c1a] rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0f382c] border border-[#c1c8c3]/60 shadow-sm cursor-pointer pr-10"
            >
              <option value="all">สถานะอนุรักษ์ทั้งหมด</option>
              <option value="reserved">สัตว์ป่าสงวนไทย (Reserved Wildlife)</option>
              <option value="EN">ใกล้สูญพันธุ์ (Endangered - EN)</option>
              <option value="VU">มีแนวโน้มใกล้สูญพันธุ์ (Vulnerable - VU)</option>
              <option value="NT">ใกล้ถูกคุกคาม (Near Threatened - NT)</option>
              <option value="LC">ความเสี่ยงต่ำ / น่ากังวลน้อย (LC)</option>
            </select>
            <Filter className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#717975] pointer-events-none" />
          </div>
        </div>

        {/* Taxonomic Class Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none" id="taxa-chips">
          <button
            onClick={() => onTaxaChange('all')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              selectedTaxa === 'all'
                ? 'bg-[#0f382c] text-white ring-1 ring-[#0f382c]'
                : 'bg-white text-[#1a1c1a] hover:bg-[#e8e8e5] border border-[#c1c8c3]/60'
            }`}
          >
            <span>ทั้งหมด</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedTaxa === 'all' ? 'bg-white/20 text-white' : 'bg-[#eeeeeb] text-[#1a1c1a]'
              }`}
            >
              {taxaCounts.all}
            </span>
          </button>

          <button
            onClick={() => onTaxaChange('mammal')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              selectedTaxa === 'mammal'
                ? 'bg-[#0f382c] text-white ring-1 ring-[#0f382c]'
                : 'bg-white text-[#1a1c1a] hover:bg-[#e8e8e5] border border-[#c1c8c3]/60'
            }`}
          >
            <Footprints className="w-3.5 h-3.5 text-[#006972]" />
            <span>สัตว์บกและเลี้ยงลูกด้วยนม</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedTaxa === 'mammal' ? 'bg-white/20 text-white' : 'bg-[#eeeeeb] text-[#1a1c1a]'
              }`}
            >
              {taxaCounts.mammal}
            </span>
          </button>

          <button
            onClick={() => onTaxaChange('bird')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              selectedTaxa === 'bird'
                ? 'bg-[#0f382c] text-white ring-1 ring-[#0f382c]'
                : 'bg-white text-[#1a1c1a] hover:bg-[#e8e8e5] border border-[#c1c8c3]/60'
            }`}
          >
            <Bird className="w-3.5 h-3.5 text-[#006972]" />
            <span>นกและสัตว์ปีก</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedTaxa === 'bird' ? 'bg-white/20 text-white' : 'bg-[#eeeeeb] text-[#1a1c1a]'
              }`}
            >
              {taxaCounts.bird}
            </span>
          </button>

          <button
            onClick={() => onTaxaChange('reptile')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              selectedTaxa === 'reptile'
                ? 'bg-[#0f382c] text-white ring-1 ring-[#0f382c]'
                : 'bg-white text-[#1a1c1a] hover:bg-[#e8e8e5] border border-[#c1c8c3]/60'
            }`}
          >
            <Bug className="w-3.5 h-3.5 text-[#006972]" />
            <span>สัตว์เลื้อยคลาน & ครึ่งบกครึ่งน้ำ</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedTaxa === 'reptile' ? 'bg-white/20 text-white' : 'bg-[#eeeeeb] text-[#1a1c1a]'
              }`}
            >
              {taxaCounts.reptile}
            </span>
          </button>

          <button
            onClick={() => onTaxaChange('marine')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              selectedTaxa === 'marine'
                ? 'bg-[#0f382c] text-white ring-1 ring-[#0f382c]'
                : 'bg-white text-[#1a1c1a] hover:bg-[#e8e8e5] border border-[#c1c8c3]/60'
            }`}
          >
            <Fish className="w-3.5 h-3.5 text-[#006972]" />
            <span>สิ่งมีชีวิตทางทะเล</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedTaxa === 'marine' ? 'bg-white/20 text-white' : 'bg-[#eeeeeb] text-[#1a1c1a]'
              }`}
            >
              {taxaCounts.marine}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
