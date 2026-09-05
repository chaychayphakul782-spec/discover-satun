import React from 'react';
import { Globe, Search, User, Menu, X, ShieldCheck } from 'lucide-react';
import { SATUN_LOGO_URL } from '../data/wildlifeData';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  activeNav,
  onNavClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'wildlife-encyclopedia', label: 'สารานุกรมสัตว์ป่า' },
    { id: 'habitats', label: 'ถิ่นที่อยู่อาศัย' },
    { id: 'conservation-status', label: 'สถานะการอนุรักษ์' },
    { id: 'information-and-contact', label: 'ศูนย์ข้อมูลและติดต่อ' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9f6]/95 backdrop-blur-xl border-b border-[#e2e3df]/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-20 max-w-[1360px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand & UNESCO Badge */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavClick('wildlife-encyclopedia');
            }}
            className="flex items-center gap-3 group"
          >
            <img
              alt="Discover Satun Wildlife Logo"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              src={SATUN_LOGO_URL}
              onError={(e) => {
                // Fallback shield icon if external logo fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-[22px] font-semibold text-[#002218] tracking-tight leading-tight">
                Discover Satun Wildlife
              </span>
              <span className="text-[11px] sm:text-xs text-[#414845] font-medium tracking-wide">
                สตูลแดนธรรมชาติและสัตว์ป่า
              </span>
            </div>
          </a>

          <div className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#e8e8e5] text-[#1a1c1a] border border-[#c1c8c3]/40">
            <Globe className="w-3.5 h-3.5 text-[#006972]" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#1a1c1a]">
              UNESCO GLOBAL GEOPARK SATUN
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0f382c] text-white shadow-sm'
                    : 'text-[#414845] hover:bg-[#eeeeeb] hover:text-[#1a1c1a]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Search and Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative hidden sm:block w-44 md:w-56 xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006972] w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ค้นหาสัตว์ป่า, พืชพรรณ..."
              className="w-full h-10 pl-9 pr-3 bg-white rounded-xl text-xs sm:text-sm text-[#1a1c1a] placeholder:text-[#717975] focus:outline-none focus:ring-2 focus:ring-[#0f382c]/30 border border-[#c1c8c3]/50 shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all"
            />
          </div>

          <button
            aria-label="User Account"
            className="w-9 h-9 rounded-full bg-[#002218] text-white flex items-center justify-center hover:bg-[#0f382c] transition-colors shadow-sm"
            title="เจ้าหน้าที่ / นักสำรวจพิทักษ์ป่า"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#1a1c1a] hover:bg-[#eeeeeb]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e2e3df] bg-[#f9f9f6] px-4 py-3 shadow-lg flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
          <div className="sm:hidden relative w-full mb-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#006972] w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ค้นหาสัตว์ป่า, พืชพรรณ..."
              className="w-full h-10 pl-9 pr-3 bg-white rounded-xl text-sm border border-[#c1c8c3]"
            />
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavClick(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeNav === item.id
                  ? 'bg-[#0f382c] text-white'
                  : 'text-[#414845] hover:bg-[#eeeeeb]'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-[#e2e3df] flex items-center gap-2 text-xs text-[#414845]">
            <ShieldCheck className="w-4 h-4 text-[#006972]" />
            <span>อุทยานธรณีโลกสตูล (Satun UNESCO Global Geopark)</span>
          </div>
        </div>
      )}
    </header>
  );
};
