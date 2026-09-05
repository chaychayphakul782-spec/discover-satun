import React from 'react';
import { X, Trees, Waves, Mountain, Compass, ShieldAlert, Phone, MapPin, ExternalLink } from 'lucide-react';
import { HabitatKey } from '../types';

interface InfoModalProps {
  view: 'habitats' | 'conservation-status' | 'information-and-contact' | null;
  onClose: () => void;
  onSelectHabitatFilter: (key: HabitatKey) => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  view,
  onClose,
  onSelectHabitatFilter,
}) => {
  if (!view) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div onClick={onClose} className="fixed inset-0 bg-[#002218]/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto z-10 p-6 sm:p-8 border border-[#e2e3df]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#eeeeeb] hover:bg-[#e2e3df] flex items-center justify-center text-[#1a1c1a] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {view === 'habitats' && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold text-[#006972] uppercase tracking-wider">
                Satun Biosphere Zones
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#002218] mt-1">
                ถิ่นที่อยู่อาศัยสำคัญแห่งสตูล
              </h2>
              <p className="text-sm text-[#414845] mt-1">
                สำรวจระบบนิเวศทั้ง 4 โซนหลักของอุทยานธรณีโลกสตูลและอุทยานแห่งชาติ
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => {
                  onSelectHabitatFilter('thaleban');
                  onClose();
                }}
                className="p-4 rounded-xl bg-[#f4f4f0] border border-[#e2e3df] hover:border-[#006972] cursor-pointer transition-all flex flex-col gap-2 group"
              >
                <div className="flex items-center gap-2 text-[#002218] font-bold">
                  <Trees className="w-5 h-5 text-[#006972]" />
                  <span>อุทยานแห่งชาติทะเลบัน</span>
                </div>
                <p className="text-xs text-[#414845] leading-relaxed">
                  ป่าดงดิบชื้นเทือกเขาบรรทัด แหล่งอาศัยของสมเสร็จ นกเงือกหัวหงอก และเขียดกูดัวร์ประจำบึงน้ำวังประ
                </p>
                <span className="text-xs font-bold text-[#006972] group-hover:underline mt-auto">
                  กรองสัตว์ป่าในโซนนี้ →
                </span>
              </div>

              <div
                onClick={() => {
                  onSelectHabitatFilter('tarutao');
                  onClose();
                }}
                className="p-4 rounded-xl bg-[#f4f4f0] border border-[#e2e3df] hover:border-[#006972] cursor-pointer transition-all flex flex-col gap-2 group"
              >
                <div className="flex items-center gap-2 text-[#002218] font-bold">
                  <Waves className="w-5 h-5 text-[#006972]" />
                  <span>อุทยานแห่งชาติหมู่เกาะตะรุเตา</span>
                </div>
                <p className="text-xs text-[#414845] leading-relaxed">
                  หมู่เกาะ 51 เกาะ ชายหาดวางไข่เต่าตนุ แนวหญ้าทะเลพะยูน กองหินแปดไมล์ถิ่นฉลามวาฬ และนกแก๊ก
                </p>
                <span className="text-xs font-bold text-[#006972] group-hover:underline mt-auto">
                  กรองสัตว์ป่าในโซนนี้ →
                </span>
              </div>

              <div
                onClick={() => {
                  onSelectHabitatFilter('phetra');
                  onClose();
                }}
                className="p-4 rounded-xl bg-[#f4f4f0] border border-[#e2e3df] hover:border-[#006972] cursor-pointer transition-all flex flex-col gap-2 group"
              >
                <div className="flex items-center gap-2 text-[#002218] font-bold">
                  <Mountain className="w-5 h-5 text-[#006972]" />
                  <span>อุทยานแห่งชาติหมู่เกาะเภตรา</span>
                </div>
                <p className="text-xs text-[#414845] leading-relaxed">
                  ผาหินปูนยุคออร์โดวิเชียนสูงชัน แหล่งหลบภัยและหากินของเลียงผา และแนวปะการังน้ำใส
                </p>
                <span className="text-xs font-bold text-[#006972] group-hover:underline mt-auto">
                  กรองสัตว์ป่าในโซนนี้ →
                </span>
              </div>

              <div
                onClick={() => {
                  onSelectHabitatFilter('mangrove');
                  onClose();
                }}
                className="p-4 rounded-xl bg-[#f4f4f0] border border-[#e2e3df] hover:border-[#006972] cursor-pointer transition-all flex flex-col gap-2 group"
              >
                <div className="flex items-center gap-2 text-[#002218] font-bold">
                  <Compass className="w-5 h-5 text-[#006972]" />
                  <span>ป่าชายเลนและปากแม่น้ำสตูล</span>
                </div>
                <p className="text-xs text-[#414845] leading-relaxed">
                  ป่าชายเลนตำมะลังและปากอ่าวสตูล ถิ่นหากินของฝูงลิงแสม และโลมาหัวบาตรหลังเรียบ
                </p>
                <span className="text-xs font-bold text-[#006972] group-hover:underline mt-auto">
                  กรองสัตว์ป่าในโซนนี้ →
                </span>
              </div>
            </div>
          </div>
        )}

        {view === 'conservation-status' && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold text-[#006972] uppercase tracking-wider">
                IUCN Red List & Wildlife Law
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#002218] mt-1">
                ระดับสถานะการอนุรักษ์
              </h2>
              <p className="text-sm text-[#414845] mt-1">
                การจำแนกสถานะความเสี่ยงตามมาตรฐานสหภาพระหว่างประเทศเพื่อการอนุรักษ์ธรรมชาติ (IUCN) และกฎหมายไทย
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-[#FBECE3] border border-[#8A3816]/20">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#8A3816] text-sm">
                    สัตว์ป่าสงวนแห่งประเทศไทย (พ.ร.บ. สงวนและคุ้มครองสัตว์ป่า พ.ศ. 2562)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#8A3816] text-white text-[10px] font-bold">
                    คุ้มครองสูงสุด
                  </span>
                </div>
                <p className="text-xs text-[#8A3816] mt-1.5 leading-relaxed">
                  สัตว์ป่าหายากใกล้สูญพันธุ์อย่างยิ่ง ห้ามล่า ค้า ครอบครอง หรือเพาะพันธุ์โดยเด็ดขาด เช่น สมเสร็จ, เลียงผา, พะยูน, ฉลามวาฬ
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBECE3] border border-[#8A3816]/20">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#8A3816] text-sm">
                    ใกล้สูญพันธุ์ (Endangered - EN)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#8A3816]/15 text-[#8A3816] text-[10px] font-bold">
                    IUCN EN
                  </span>
                </div>
                <p className="text-xs text-[#8A3816] mt-1 leading-relaxed">
                  สิ่งมีชีวิตที่มีความเสี่ยงสูงมากที่จะสูญพันธุ์ไปจากธรรมชาติในอนาคตอันใกล้ เช่น นกเงือกหัวหงอก, เต่าตนุ, ลิงแสม
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF3EB] border border-[#7C5528]/20">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#7C5528] text-sm">
                    มีแนวโน้มใกล้สูญพันธุ์ (Vulnerable - VU)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#7C5528]/15 text-[#7C5528] text-[10px] font-bold">
                    IUCN VU
                  </span>
                </div>
                <p className="text-xs text-[#7C5528] mt-1 leading-relaxed">
                  สิ่งมีชีวิตที่มีความเสี่ยงสูงต่อการสูญพันธุ์จากถิ่นอาศัยธรรมชาติ เช่น โลมาหัวบาตรหลังเรียบ, งูจงอาง
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#E8F1ED] border border-[#0F382C]/20">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F382C] text-sm">
                    ใกล้ถูกคุกคาม & เสี่ยงต่ำ (NT / LC)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0F382C]/15 text-[#0F382C] text-[10px] font-bold">
                    Monitored
                  </span>
                </div>
                <p className="text-xs text-[#0F382C] mt-1 leading-relaxed">
                  สิ่งมีชีวิตที่ยังคงพบเห็นได้ในประชากรที่สมดุล แต่ยังต้องได้รับการติดตามและปกป้องถิ่นอาศัย เช่น เขียดกูดัวร์, หมาไม้, นกแก๊ก
                </p>
              </div>
            </div>
          </div>
        )}

        {view === 'information-and-contact' && (
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold text-[#006972] uppercase tracking-wider">
                Visitor Centers & Support
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#002218] mt-1">
                ศูนย์ข้อมูลและติดต่อราชการ
              </h2>
              <p className="text-sm text-[#414845] mt-1">
                พิกัดที่ทำการอุทยาน ศูนย์วิจัย และช่องทางติดต่อฉุกเฉิน
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-[#f4f4f0] border border-[#e2e3df]">
                <div className="flex items-center gap-2 text-[#002218] font-bold text-sm">
                  <MapPin className="w-4 h-4 text-[#006972]" />
                  <span>ศูนย์บริการข้อมูลอุทยานธรณีโลกสตูล (Satun Geopark Center)</span>
                </div>
                <p className="text-xs text-[#414845] mt-1">
                  ตำบลทุ่งหว้า อำเภอทุ่งหว้า จังหวัดสตูล 91120
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-[#006972]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>โทร: 074-789-317</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f4f4f0] border border-[#e2e3df]">
                <div className="flex items-center gap-2 text-[#002218] font-bold text-sm">
                  <MapPin className="w-4 h-4 text-[#006972]" />
                  <span>ที่ทำการอุทยานแห่งชาติทะเลบัน</span>
                </div>
                <p className="text-xs text-[#414845] mt-1">
                  หมู่ 4 ตำบลวังประจัน อำเภอควนโดน จังหวัดสตูล 91160
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-[#006972]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>โทร: 074-750-758 / 083-533-1710</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f4f4f0] border border-[#e2e3df]">
                <div className="flex items-center gap-2 text-[#002218] font-bold text-sm">
                  <MapPin className="w-4 h-4 text-[#006972]" />
                  <span>ที่ทำการอุทยานแห่งชาติหมู่เกาะตะรุเตา</span>
                </div>
                <p className="text-xs text-[#414845] mt-1">
                  ท่าเรือปากบารา ตำบลปากน้ำ อำเภอละงู จังหวัดสตูล 91110
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-[#006972]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>โทร: 074-783-485</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#ffdad6] border border-[#ba1a1a]/30 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#ba1a1a] text-sm flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    สายด่วนพิทักษ์ป่า กรมอุทยานแห่งชาติ
                  </div>
                  <div className="text-xs text-[#ba1a1a]/80 mt-0.5">
                    โทรฟรีตลอด 24 ชั่วโมง เพื่อแจ้งไฟป่าและสัตว์ป่าพลัดหลง
                  </div>
                </div>
                <a
                  href="tel:1362"
                  className="px-4 py-2 rounded-lg bg-[#ba1a1a] text-white font-bold text-sm hover:bg-[#93000a] transition-colors"
                >
                  โทร 1362
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
