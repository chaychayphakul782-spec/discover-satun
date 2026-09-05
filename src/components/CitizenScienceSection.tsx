import React, { useState } from 'react';
import { Users, Calendar, MapPin, User, CheckCircle2, Send } from 'lucide-react';
import { FieldLog } from '../types';

interface CitizenScienceSectionProps {
  logs: FieldLog[];
  onAddLog: (log: Omit<FieldLog, 'id' | 'timestamp'>) => void;
}

export const CitizenScienceSection: React.FC<CitizenScienceSectionProps> = ({ logs, onAddLog }) => {
  const [species, setSpecies] = useState('');
  const [location, setLocation] = useState('อช. ทะเลบัน (บึงน้ำวังประ)');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [observer, setObserver] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!species.trim()) return;

    // Format date nicely to Thai
    const dateObj = new Date(date);
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const formattedThaiDate = isNaN(dateObj.getTime())
      ? date
      : `${dateObj.getDate()} ${thaiMonths[dateObj.getMonth()]} ${dateObj.getFullYear() + 543}`;

    onAddLog({
      species: species.trim(),
      location,
      date: formattedThaiDate,
      observer: observer.trim() || 'นักสำรวจภาคสนาม',
      notes: notes.trim(),
    });

    setSpecies('');
    setObserver('');
    setNotes('');
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 3000);
  };

  return (
    <section id="citizen-science" className="w-full bg-[#f4f4f0] py-16 mt-12 border-t border-[#e2e3df]">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Observation Form */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9ef0fb]/40 text-[#006972] text-xs font-bold uppercase tracking-wider mb-2 border border-[#006972]/20">
                <Users className="w-3.5 h-3.5" />
                Citizen Science Satun
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#002218]">
                รายงานการพบเห็นสัตว์ป่าภาคสนาม
              </h2>
              <p className="text-sm text-[#414845] mt-1 leading-relaxed">
                ร่วมส่งต่อพิกัดการค้นพบเพื่อสนับสนุนงานวิจัยความหลากหลายทางชีวภาพของเครือข่ายอุทยานแห่งชาติและอุทยานธรณีโลกสตูล
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-[#e2e3df] flex flex-col gap-4"
            >
              <div>
                <label className="block text-xs font-bold text-[#1a1c1a] mb-1.5">
                  ชื่อชนิดพันธุ์ที่พบเห็น <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  placeholder="เช่น สมเสร็จ, นกเงือกหัวหงอก, เขียดกูดัวร์"
                  className="w-full h-11 px-3.5 bg-[#f4f4f0] rounded-xl text-sm text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#0f382c] border border-transparent focus:border-[#0f382c]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1a1c1a] mb-1.5">
                    สถานที่ในสตูล <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-11 px-3 bg-[#f4f4f0] rounded-xl text-xs sm:text-sm text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#0f382c] border border-transparent cursor-pointer"
                  >
                    <option value="อช. ทะเลบัน (บึงน้ำวังประ)">อช. ทะเลบัน (บึงน้ำวังประ)</option>
                    <option value="อช. ทะเลบัน (เส้นทางศึกษาธรรมชาติ)">อช. ทะเลบัน (เส้นทางธรรมชาติ)</option>
                    <option value="อช. ตะรุเตา (อ่าวพันเตมะละกา)">อช. ตะรุเตา (อ่าวพันเตมะละกา)</option>
                    <option value="เกาะหลีเป๊ะ / เกาะสาหร่าย">เกาะหลีเป๊ะ / เกาะสาหร่าย</option>
                    <option value="อช. หมู่เกาะเภตรา (หาดราไว / เกาะเขาใหญ่)">อช. หมู่เกาะเภตรา (หาดราไว)</option>
                    <option value="ป่าชายเลนตำมะลัง / อ.เมืองสตูล">ป่าชายเลนตำมะลัง / อ.เมือง</option>
                    <option value="เขตรักษาพันธุ์ฯ เขาบรรทัด">เขตรักษาพันธุ์ฯ เขาบรรทัด</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a1c1a] mb-1.5">
                    วันเวลาที่สำรวจ <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-11 px-3 bg-[#f4f4f0] rounded-xl text-xs sm:text-sm text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#0f382c] border border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a1c1a] mb-1.5">
                  ชื่อผู้บันทึก หรือ หน่วยลาดตระเวน
                </label>
                <input
                  type="text"
                  value={observer}
                  onChange={(e) => setObserver(e.target.value)}
                  placeholder="ระบุชื่อ หรือ กลุ่มนักดูนก / ชมรมอนุรักษ์"
                  className="w-full h-11 px-3.5 bg-[#f4f4f0] rounded-xl text-sm text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#0f382c] border border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a1c1a] mb-1.5">
                  บันทึกพฤติกรรม / สภาพแวดล้อม
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="ระบุจำนวนตัว, กิจกรรม (กำลังหากิน/เกาะคอน), สภาพอากาศ หรือพิกัดเฉพาะ..."
                  className="w-full p-3 bg-[#f4f4f0] rounded-xl text-sm text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#0f382c] border border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                className={`w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ${
                  submittedSuccess
                    ? 'bg-[#006972]'
                    : 'bg-[#0f382c] hover:bg-[#002218]'
                }`}
              >
                {submittedSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#9ef0fb]" />
                    <span>บันทึกสำเร็จลงสู่สมุดปูมแล้ว!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>บันทึกการพบเจอลงสู่สมุดปูม</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Live Observation Feed */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002218] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#006972]" />
                สมุดปูมบันทึกภาคสนามล่าสุด (Recent Field Logs)
              </h3>
              <span className="text-xs text-[#717975] font-medium bg-[#e8e8e5] px-2.5 py-1 rounded-full">
                อัปเดตแบบเรียลไทม์ ({logs.length})
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {logs.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-xl bg-white shadow-sm flex flex-col gap-1.5 hover:shadow transition-shadow border-l-4 border-[#0f382c] border-y border-r border-[#e2e3df]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-base font-bold text-[#002218]">{item.species}</span>
                    <span className="text-xs text-[#717975] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#006972]" />
                      {item.date}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 text-xs sm:text-sm text-[#006972] font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                    <span className="text-[#c1c8c3]">•</span>
                    <span className="text-[#414845] flex items-center gap-1 font-normal">
                      <User className="w-3.5 h-3.5 text-[#717975]" />
                      {item.observer || 'ผู้ใช้นิรนาม'}
                    </span>
                  </div>

                  {item.notes && (
                    <p className="text-xs sm:text-sm text-[#1a1c1a] mt-1 leading-relaxed bg-[#f9f9f6] p-2.5 rounded-lg border border-[#e2e3df]/60">
                      {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
