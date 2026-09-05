import React from 'react';
import { PhoneCall, Trees, Waves, Mountain, ShieldCheck, Compass } from 'lucide-react';
import { SATUN_LOGO_URL } from '../data/wildlifeData';

interface FooterProps {
  onHabitatSelect?: (habitatKey: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onHabitatSelect }) => {
  return (
    <footer className="w-full bg-[#f4f4f0] text-[#1a1c1a] border-t border-[#e2e3df]">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#c1c8c3]/40">
          {/* Brand & Hotline */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="Discover Satun Wildlife Logo"
                className="h-9 w-auto object-contain"
                src={SATUN_LOGO_URL}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-[#002218]">
                  Discover Satun Wildlife
                </span>
                <span className="text-xs text-[#414845]">สตูลแดนธรรมชาติและสัตว์ป่า</span>
              </div>
            </div>

            <p className="text-sm text-[#414845] leading-relaxed max-w-md">
              ศูนย์รวบรวมข้อมูลความหลากหลายทางชีวภาพ อนุกรมวิธาน และรายงานการสำรวจภาคสนามแห่งคาบสมุทรสตูล ภายใต้การดูแลของระบบอุทยานและเครือข่ายอนุรักษ์ธรรมชาติสากล
            </p>

            {/* Emergency Hotline Banner */}
            <div className="inline-flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#e2e3df] shadow-xs max-w-md">
              <div className="w-10 h-10 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#414845] uppercase tracking-wider">
                  เหตุฉุกเฉิน / แจ้งเบาะแสสัตว์ป่าบาดเจ็บ
                </div>
                <div className="font-serif text-lg font-bold text-[#ba1a1a]">
                  สายด่วนพิทักษ์ป่า 1362
                </div>
              </div>
            </div>
          </div>

          {/* Protected Parks Links */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#002218] uppercase tracking-wider">
              พื้นที่คุ้มครองธรรมชาติและอุทยาน
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-[#414845]">
              <li>
                <button
                  onClick={() => onHabitatSelect && onHabitatSelect('thaleban')}
                  className="hover:text-[#002218] hover:underline transition-colors flex items-center gap-2 text-left"
                >
                  <Trees className="w-4 h-4 text-[#006972] shrink-0" />
                  <span>อุทยานแห่งชาติทะเลบัน (Thale Ban)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onHabitatSelect && onHabitatSelect('tarutao')}
                  className="hover:text-[#002218] hover:underline transition-colors flex items-center gap-2 text-left"
                >
                  <Waves className="w-4 h-4 text-[#006972] shrink-0" />
                  <span>อุทยานแห่งชาติหมู่เกาะตะรุเตา (Tarutao)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onHabitatSelect && onHabitatSelect('phetra')}
                  className="hover:text-[#002218] hover:underline transition-colors flex items-center gap-2 text-left"
                >
                  <Mountain className="w-4 h-4 text-[#006972] shrink-0" />
                  <span>อุทยานแห่งชาติหมู่เกาะเภตรา (Mu Ko Phetra)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onHabitatSelect && onHabitatSelect('mangrove')}
                  className="hover:text-[#002218] hover:underline transition-colors flex items-center gap-2 text-left"
                >
                  <Compass className="w-4 h-4 text-[#006972] shrink-0" />
                  <span>อุทยานธรณีโลกสตูล (Satun UNESCO Geopark)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Standards */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-[#002218] uppercase tracking-wider">
              การกำกับดูแล
            </h4>
            <p className="text-xs text-[#414845] leading-relaxed">
              ขับเคลื่อนโดยความร่วมมือระหว่างกรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช ร่วมกับเครือข่ายวิทยาศาสตร์พลเมืองจังหวัดสตูล
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#e8e8e5] text-[11px] font-bold text-[#1a1c1a]">
                Archive Linen 0-L
              </span>
              <span className="px-2.5 py-1 rounded bg-[#9ef0fb]/40 text-[#006972] text-[11px] font-bold border border-[#006972]/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                IUCN Monitored
              </span>
            </div>
          </div>
        </div>

        {/* Legal & Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#717975]">
          <p>© 2025 Discover Satun Wildlife. นโยบายข้อมูลเปิดเพื่อการวิจัยและอนุรักษ์ธรรมชาติ สงวนลิขสิทธิ์</p>
          <div className="flex items-center gap-4 font-medium">
            <a href="#rules" className="hover:text-[#002218] transition-colors">
              ข้อกำหนดการใช้งาน
            </a>
            <a href="#privacy" className="hover:text-[#002218] transition-colors">
              นโยบายความเป็นส่วนตัว
            </a>
            <a href="#taxonomy" className="hover:text-[#002218] transition-colors">
              ฐานข้อมูลอนุกรมวิธาน
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
