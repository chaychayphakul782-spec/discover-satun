import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterControlDeck } from './components/FilterControlDeck';
import { WildlifeCard } from './components/WildlifeCard';
import { WildlifeDetailModal } from './components/WildlifeDetailModal';
import { CitizenScienceSection } from './components/CitizenScienceSection';
import { Footer } from './components/Footer';
import { InfoModal } from './components/InfoModal';
import { WILDLIFE_DATABASE, INITIAL_FIELD_LOGS } from './data/wildlifeData';
import { WildlifeItem, TaxaType, HabitatKey, StatusKey, FieldLog } from './types';
import { SearchX } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHabitat, setSelectedHabitat] = useState<HabitatKey>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusKey>('all');
  const [selectedTaxa, setSelectedTaxa] = useState<TaxaType>('all');

  const [activeNav, setActiveNav] = useState('wildlife-encyclopedia');
  const [activeInfoModal, setActiveInfoModal] = useState<'habitats' | 'conservation-status' | 'information-and-contact' | null>(null);

  const [selectedWildlife, setSelectedWildlife] = useState<WildlifeItem | null>(null);
  const [fieldLogs, setFieldLogs] = useState<FieldLog[]>(INITIAL_FIELD_LOGS);

  // Filter items
  const filteredWildlife = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return WILDLIFE_DATABASE.filter((item) => {
      // 1. Taxa
      if (selectedTaxa !== 'all' && item.taxa !== selectedTaxa) return false;

      // 2. Habitat
      if (selectedHabitat !== 'all' && item.habitatKey !== selectedHabitat) return false;

      // 3. Status
      if (selectedStatus !== 'all' && item.statusKey !== selectedStatus) return false;

      // 4. Search query
      if (q) {
        const matchThai = item.nameTh.toLowerCase().includes(q);
        const matchEng = item.nameEn.toLowerCase().includes(q);
        const matchSci = item.sciName.toLowerCase().includes(q);
        const matchHabitat = item.habitatTh.toLowerCase().includes(q);
        const matchDiet = item.diet.toLowerCase().includes(q);
        const matchBadge = item.badgeText.toLowerCase().includes(q);
        if (!matchThai && !matchEng && !matchSci && !matchHabitat && !matchDiet && !matchBadge) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedHabitat, selectedStatus, selectedTaxa]);

  // Taxa counts based on current other filters (or global count)
  const taxaCounts = useMemo(() => {
    return {
      all: WILDLIFE_DATABASE.length,
      mammal: WILDLIFE_DATABASE.filter((i) => i.taxa === 'mammal').length,
      bird: WILDLIFE_DATABASE.filter((i) => i.taxa === 'bird').length,
      reptile: WILDLIFE_DATABASE.filter((i) => i.taxa === 'reptile').length,
      marine: WILDLIFE_DATABASE.filter((i) => i.taxa === 'marine').length,
    };
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedHabitat('all');
    setSelectedStatus('all');
    setSelectedTaxa('all');
  };

  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
    if (navId === 'wildlife-encyclopedia') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (navId === 'habitats' || navId === 'conservation-status' || navId === 'information-and-contact') {
      setActiveInfoModal(navId as any);
    }
  };

  const handleAddLog = (newLogData: Omit<FieldLog, 'id' | 'timestamp'>) => {
    const newEntry: FieldLog = {
      ...newLogData,
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
    };
    setFieldLogs([newEntry, ...fieldLogs]);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f6] text-[#1a1c1a] flex flex-col font-sans">
      {/* Top Fixed Header */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNav={activeNav}
        onNavClick={handleNavClick}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Expedition Hero Banner */}
        <HeroSection />

        {/* Sticky Filter & Search Control Deck */}
        <FilterControlDeck
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedHabitat={selectedHabitat}
          onHabitatChange={setSelectedHabitat}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedTaxa={selectedTaxa}
          onTaxaChange={setSelectedTaxa}
          taxaCounts={taxaCounts}
        />

        {/* Species Catalog Grid */}
        <div className="w-full max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 py-8">
          {/* Status & Results Count Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2 border-b border-[#e2e3df]">
            <div className="flex items-baseline gap-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#002218]">
                สารบบสิ่งมีชีวิต
              </h2>
              <span className="text-xs sm:text-sm text-[#414845]">
                (แสดง <span className="font-bold text-[#002218]">{filteredWildlife.length}</span>{' '}
                รายการที่ได้รับการบันทึก)
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#414845] text-xs">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#006972]" />
              <span>ปรับปรุงข้อมูลตามบัญชีแดง IUCN และ พ.ร.บ. สงวนและคุ้มครองสัตว์ป่า พ.ศ. 2562</span>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredWildlife.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredWildlife.map((item) => (
                <WildlifeCard
                  key={item.id}
                  item={item}
                  onSelect={(selected) => setSelectedWildlife(selected)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#eeeeeb] flex items-center justify-center text-[#717975] mb-3 shadow-inner">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#002218]">
                ไม่พบข้อมูลสัตว์ป่าตรงตามเงื่อนไข
              </h3>
              <p className="text-sm text-[#414845] max-w-md mt-1">
                กรุณาลองเปลี่ยนคำค้นหา ปรับหมวดหมู่ หรือล้างตัวกรองเพื่อสำรวจรายการอื่น
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-lg bg-[#0f382c] text-white text-xs font-bold hover:bg-[#002218] transition-colors shadow-sm"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}
        </div>

        {/* Citizen Science Community Observation Ledger */}
        <CitizenScienceSection logs={fieldLogs} onAddLog={handleAddLog} />
      </main>

      {/* Footer */}
      <Footer
        onHabitatSelect={(habitatKey) => {
          setSelectedHabitat(habitatKey as HabitatKey);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
      />

      {/* Detail Modal */}
      <WildlifeDetailModal
        item={selectedWildlife}
        onClose={() => setSelectedWildlife(null)}
      />

      {/* Nav Informational Modal */}
      <InfoModal
        view={activeInfoModal}
        onClose={() => {
          setActiveInfoModal(null);
          setActiveNav('wildlife-encyclopedia');
        }}
        onSelectHabitatFilter={(hKey) => {
          setSelectedHabitat(hKey);
          setActiveInfoModal(null);
          setActiveNav('wildlife-encyclopedia');
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
