import React, { useEffect, useState } from 'react';
import { X, MapPin, Camera, Brain, Network, Eye, ShieldCheck, TreePine } from 'lucide-react';
import { WildlifeItem } from '../types';

interface WildlifeDetailModalProps {
  item: WildlifeItem | null;
  onClose: () => void;
}

export const WildlifeDetailModal: React.FC<WildlifeDetailModalProps> = ({ item, onClose }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const getTaxaLabel = (taxa: WildlifeItem['taxa']) => {
    switch (taxa) {
      case 'mammal':
        return 'สัตว์เลี้ยงลูกด้วยนม (Mammal)';
      case 'bird':
        return 'สัตว์ปีกและนก (Avian Specimen)';
      case 'reptile':
        return 'สัตว์เลื้อยคลานและสะเทินน้ำ (Herpetofauna)';
      case 'marine':
        return 'สัตว์ทะเลอันดามัน (Marine Specimen)';
      default:
        return 'สิ่งมีชีวิตในสตูล';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#002218]/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-y-auto z-10 flex flex-col border border-[#e2e3df]">
        {/* Sticky Close Button Bar */}
        <div className="sticky top-0 right-0 z-20 flex justify-end p-3 bg-gradient-to-b from-white via-white/90 to-transparent pointer-events-none">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="pointer-events-auto w-10 h-10 rounded-full bg-[#eeeeeb] hover:bg-[#e2e3df] text-[#1a1c1a] flex items-center justify-center transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content Body */}
        <div className="px-4 sm:px-8 pb-8 -mt-6 flex flex-col gap-6">
          {/* Header & Taxonomic Nomenclature */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${item.statusBadgeClass}`}>
                {item.statusTh}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#eeeeeb] text-[#1a1c1a] text-xs font-semibold flex items-center gap-1">
                <TreePine className="w-3.5 h-3.5 text-[#006972]" />
                {item.habitatTh}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#e8e8e5] text-[#414845] text-xs font-medium">
                {getTaxaLabel(item.taxa)}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#002218] tracking-tight">
              {item.nameTh}
            </h2>

            <div className="flex flex-wrap items-baseline gap-x-2 text-sm sm:text-base text-[#414845]">
              <span className="font-semibold text-[#1a1c1a]">{item.nameEn}</span>
              <span className="opacity-40">•</span>
              <span className="font-serif italic text-[#006972]">{item.sciName}</span>
            </div>
          </div>

          {/* Exhibition Photo Banner */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-[#eeeeeb]">
            {!imgError ? (
              <img
                src={item.imageUrl}
                alt={item.imageAlt}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#0f382c]/10 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#0f382c] mb-2 shadow-sm">
                  <TreePine className="w-8 h-8" />
                </div>
                <span className="font-serif text-xl font-bold text-[#002218]">{item.nameTh}</span>
                <span className="text-sm text-[#006972] italic">{item.sciName}</span>
              </div>
            )}

            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/65 backdrop-blur-md text-white text-xs flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#9ef0fb]" />
              <span className="font-medium">พิกัดบันทึก: {item.habitatTh}</span>
            </div>
          </div>

          {/* Dossier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Column 1: Descriptive Behavior, Ecological Role, and Rules */}
            <div className="md:col-span-7 flex flex-col gap-5">
              <div>
                <h4 className="text-base font-bold text-[#002218] flex items-center gap-2 mb-1.5">
                  <Brain className="w-4 h-4 text-[#006972]" />
                  พฤติกรรมและลักษณะเด่นทางชีววิทยา
                </h4>
                <p className="text-sm sm:text-[15px] text-[#414845] leading-relaxed">
                  {item.behavior}
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-[#002218] flex items-center gap-2 mb-1.5">
                  <Network className="w-4 h-4 text-[#006972]" />
                  บทบาทต่อระบบนิเวศแห่งสตูล
                </h4>
                <p className="text-sm sm:text-[15px] text-[#414845] leading-relaxed">
                  {item.role}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f4f4f0] border border-[#e2e3df]">
                <h4 className="text-sm font-bold text-[#002218] flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-[#006972]" />
                  คู่มือการสังเกตการณ์ & กฎการอนุรักษ์
                </h4>
                <p className="text-xs sm:text-sm text-[#414845] leading-relaxed">
                  {item.observation}
                </p>
              </div>
            </div>

            {/* Column 2: Taxonomic Matrix & Quick Facts */}
            <div className="md:col-span-5 flex flex-col gap-2 bg-[#f4f4f0] p-4 sm:p-5 rounded-xl border border-[#e2e3df]">
              <h4 className="text-xs font-bold text-[#002218] uppercase tracking-wider mb-2">
                ข้อมูลจำเพาะอนุกรมวิธาน
              </h4>

              <div className="flex justify-between py-2 border-b border-[#c1c8c3]/40 text-xs sm:text-sm">
                <span className="text-[#414845]">เขตการกระจายพันธุ์</span>
                <span className="font-semibold text-[#1a1c1a] text-right ml-2">
                  {item.distribution}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#c1c8c3]/40 text-xs sm:text-sm">
                <span className="text-[#414845]">ช่วงเวลาหากิน</span>
                <span className="font-semibold text-[#1a1c1a] text-right ml-2">
                  {item.diurnal}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#c1c8c3]/40 text-xs sm:text-sm">
                <span className="text-[#414845]">อาหารหลัก</span>
                <span className="font-semibold text-[#1a1c1a] text-right ml-2">
                  {item.diet}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#c1c8c3]/40 text-xs sm:text-sm">
                <span className="text-[#414845]">ความหนาแน่นในสตูล</span>
                <span className="font-semibold text-[#1a1c1a] text-right ml-2">
                  {item.frequency}
                </span>
              </div>

              {/* Law Protection Status Card */}
              <div className="mt-3 p-3 rounded-lg bg-white border border-[#c1c8c3]/50 flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-[#006972] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#002218]">
                    พ.ร.บ. สงวนและคุ้มครอง
                  </span>
                  <span className="text-xs text-[#414845] font-medium">
                    {item.lawStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
