import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight, Footprints, Bird, Bug, Fish } from 'lucide-react';
import { WildlifeItem } from '../types';

interface WildlifeCardProps {
  item: WildlifeItem;
  onSelect: (item: WildlifeItem) => void;
}

export const WildlifeCard: React.FC<WildlifeCardProps> = ({ item, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  const getTaxaIcon = (taxa: WildlifeItem['taxa']) => {
    switch (taxa) {
      case 'mammal':
        return <Footprints className="w-3.5 h-3.5 text-[#006972]" />;
      case 'bird':
        return <Bird className="w-3.5 h-3.5 text-[#006972]" />;
      case 'reptile':
        return <Bug className="w-3.5 h-3.5 text-[#006972]" />;
      case 'marine':
        return <Fish className="w-3.5 h-3.5 text-[#006972]" />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="group bg-white rounded-2xl overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.04)] hover:shadow-md border border-[#e2e3df] transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-0.5"
    >
      {/* Photographic Specimen Header */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eeeeeb]">
        {!imgError ? (
          <img
            src={item.imageUrl}
            alt={item.imageAlt}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f382c]/10 to-[#006972]/10 p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0f382c] mb-1 shadow-sm">
              {getTaxaIcon(item.taxa)}
            </div>
            <span className="text-xs font-semibold text-[#002218]">{item.nameTh}</span>
            <span className="text-[11px] text-[#414845] italic">{item.sciName}</span>
          </div>
        )}

        {/* Status Badge Over Image */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold shadow-sm backdrop-blur-md ${item.statusBadgeClass}`}>
            {item.badgeText}
          </span>
          <span className="p-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#002218] shadow-sm">
            {getTaxaIcon(item.taxa)}
          </span>
        </div>

        {/* Location pill */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center">
          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[11px] truncate flex items-center gap-1 font-medium">
            <MapPin className="w-3 h-3 text-[#9ef0fb] shrink-0" />
            <span className="truncate">{item.habitatTh}</span>
          </span>
        </div>
      </div>

      {/* Card Content Ledger */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div className="flex flex-col">
          <h3 className="font-serif text-lg font-bold text-[#002218] group-hover:text-[#006972] transition-colors leading-tight">
            {item.nameTh}
          </h3>
          <span className="text-xs sm:text-[13px] text-[#1a1c1a] font-medium mt-0.5">
            {item.nameEn}
          </span>
          <span className="font-serif italic text-xs text-[#414845] mt-0.5">
            {item.sciName}
          </span>
        </div>

        <div className="pt-2.5 flex items-center justify-between border-t border-[#e2e3df]/60">
          <span className="text-[11px] text-[#006972] font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span className="truncate max-w-[130px]">{item.diurnal}</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#eeeeeb] text-[#002218] group-hover:bg-[#0f382c] group-hover:text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>ข้อมูล</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
