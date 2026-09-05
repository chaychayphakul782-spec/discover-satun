import React from 'react';
import { BadgeCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0f382c] text-white">
      {/* Ambient Forest Canopy Background Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#a6d0be 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#002218]/80 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 pt-32 pb-16 flex flex-col gap-8">
        {/* Overline Tagging */}
        <div className="flex flex-wrap items-center gap-3 text-[#c1ecda]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs uppercase tracking-wider font-bold text-[#c1ecda] border border-white/10">
            <BadgeCheck className="w-4 h-4 text-[#9ef0fb]" />
            Satun UNESCO Global Geopark
          </span>
          <span className="text-[11px] sm:text-xs tracking-widest uppercase opacity-85 font-medium">
            Biological Diversity Archive 2025
          </span>
        </div>

        {/* Headline & Editorial Narrative & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] leading-[1.15] tracking-tight text-white font-semibold">
              ค้นพบสิ่งมีชีวิตและสัตว์ป่า<br />
              <span className="italic font-normal text-[#c1ecda]">แห่งผืนแผ่นดินสตูล</span>
            </h1>
            <p className="text-base sm:text-lg text-[#a6d0be]/90 max-w-2xl mt-2 font-light leading-relaxed">
              จากผืนป่าดงดิบชื้นเทือกเขาบรรทัดและทะเลบัน สู่แนวปะการังอันดามันแห่งอุทยานแห่งชาติหมู่เกาะตะรุเตาและเภตรา แหล่งรวบรวมอนุกรมวิธานสิ่งมีชีวิตหายากระดับโลก
            </p>
          </div>

          {/* Quick Stats Counter Pills */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col hover:bg-white/15 transition-all">
                <span className="text-xs text-[#c1ecda]/80 font-medium">สัตว์เลี้ยงลูกด้วยนม</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white my-0.5">120+</span>
                <span className="text-[11px] text-[#9ef0fb] font-medium">Mammal species</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col hover:bg-white/15 transition-all">
                <span className="text-xs text-[#c1ecda]/80 font-medium">นกประจำถิ่นและอพยพ</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white my-0.5">280+</span>
                <span className="text-[11px] text-[#9ef0fb] font-medium">Avian records</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col hover:bg-white/15 transition-all">
                <span className="text-xs text-[#c1ecda]/80 font-medium">สัตว์เลื้อยคลาน/สะเทินน้ำ</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white my-0.5">94</span>
                <span className="text-[11px] text-[#9ef0fb] font-medium">Herpetofauna</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col hover:bg-white/15 transition-all">
                <span className="text-xs text-[#c1ecda]/80 font-medium">สัตว์ทะเล & ปะการัง</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white my-0.5">450+</span>
                <span className="text-[11px] text-[#9ef0fb] font-medium">Marine Fauna</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
