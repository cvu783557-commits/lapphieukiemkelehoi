/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FestivalList } from './components/FestivalList';
import { FestivalForm } from './components/FestivalForm';
import { OfficialPrintView } from './components/OfficialPrintView';
import { AnalyticsView } from './components/AnalyticsView';
import { GuidelinesModal } from './components/GuidelinesModal';
import { 
  FestivalInventoryRecord, 
  FestivalCategory 
} from './types/festival';
import { 
  getFestivals, 
  saveFestival, 
  deleteFestival, 
  duplicateFestival, 
  resetToSampleData, 
  exportDossierJSON, 
  exportAllFestivalsJSON, 
  createEmptyFestivalRecord 
} from './utils/storage';

export default function App() {
  const [festivals, setFestivals] = useState<FestivalInventoryRecord[]>([]);
  const [activeView, setActiveView] = useState<'list' | 'form' | 'print' | 'analytics'>('list');
  const [currentFestival, setCurrentFestival] = useState<FestivalInventoryRecord | null>(null);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Load initial data
  useEffect(() => {
    const data = getFestivals();
    setFestivals(data);
  }, []);

  // Sync dark theme with document root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleNewRecord = () => {
    const newRecord = createEmptyFestivalRecord();
    setCurrentFestival(newRecord);
    setActiveView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectForEdit = (festival: FestivalInventoryRecord) => {
    setCurrentFestival(festival);
    setActiveView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectForPrint = (festival: FestivalInventoryRecord) => {
    setCurrentFestival(festival);
    setActiveView('print');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveRecord = (record: FestivalInventoryRecord) => {
    const updated = saveFestival(record);
    setFestivals(updated);
    setCurrentFestival(record);
  };

  const handleDeleteRecord = (id: string) => {
    const updated = deleteFestival(id);
    setFestivals(updated);
    if (currentFestival?.id === id) {
      setCurrentFestival(null);
      setActiveView('list');
    }
  };

  const handleDuplicateRecord = (id: string) => {
    const dup = duplicateFestival(id);
    if (dup) {
      const updated = getFestivals();
      setFestivals(updated);
      setCurrentFestival(dup);
      setActiveView('form');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetSamples = () => {
    if (confirm('Khôi phục danh sách về 3 hồ sơ mẫu chuẩn ban đầu (Hội Gióng, Đền Hùng, Cầu Ngư)?')) {
      const resetted = resetToSampleData();
      setFestivals(resetted);
      setActiveView('list');
    }
  };

  const handleImportData = (imported: FestivalInventoryRecord[]) => {
    let nextList = [...festivals];
    imported.forEach(item => {
      const idx = nextList.findIndex(f => f.id === item.id);
      if (idx >= 0) {
        nextList[idx] = item;
      } else {
        nextList = [item, ...nextList];
      }
    });
    try {
      localStorage.setItem('vietnam_festival_inventory_records_v1', JSON.stringify(nextList));
    } catch (e) {
      console.error(e);
    }
    setFestivals(nextList);
    alert(`Đã nhập thành công ${imported.length} hồ sơ phiếu kiểm kê!`);
  };

  const handleCategoryFilterFromAnalytics = (category: FestivalCategory) => {
    setActiveView('list');
    // Scroll down to list section
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const unescoCount = festivals.filter(f => f.category === 'unesco' || f.category === 'quoc_gia').length;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Top Header */}
      <Header
        activeView={activeView}
        onNavigate={(view) => {
          if (view === 'form' && !currentFestival) {
            handleNewRecord();
          } else {
            setActiveView(view);
          }
        }}
        onNewRecord={handleNewRecord}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Hero Section shown on list view */}
        {activeView === 'list' && (
          <HeroSection
            totalCount={festivals.length}
            unescoCount={unescoCount}
            onNewRecord={handleNewRecord}
            onOpenHandbook={() => setIsHandbookOpen(true)}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {activeView === 'list' && (
            <FestivalList
              festivals={festivals}
              onSelectFestivalForEdit={handleSelectForEdit}
              onSelectFestivalForPrint={handleSelectForPrint}
              onDuplicate={handleDuplicateRecord}
              onDelete={handleDeleteRecord}
              onExportSingle={exportDossierJSON}
              onExportAll={() => exportAllFestivalsJSON(festivals)}
              onImportData={handleImportData}
              onResetSamples={handleResetSamples}
              onNewRecord={handleNewRecord}
            />
          )}

          {activeView === 'form' && currentFestival && (
            <FestivalForm
              initialData={currentFestival}
              onSave={handleSaveRecord}
              onCancel={() => setActiveView('list')}
              onPreviewPrint={handleSelectForPrint}
            />
          )}

          {activeView === 'print' && currentFestival && (
            <OfficialPrintView
              festival={currentFestival}
              onBack={() => setActiveView('list')}
              onEdit={() => handleSelectForEdit(currentFestival)}
            />
          )}

          {activeView === 'analytics' && (
            <AnalyticsView
              festivals={festivals}
              onBack={() => setActiveView('list')}
              onSelectCategoryFilter={handleCategoryFilterFromAnalytics}
            />
          )}
        </div>
      </main>

      {/* Institutional Quiet Footer */}
      <footer className="no-print border-t border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/60 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-800 dark:text-stone-300">
              Hệ thống Kiểm kê Di sản Văn hóa Phi vật thể
            </span>
            <span aria-hidden="true">·</span>
            <span>Chuẩn hóa theo Thông tư 04/2010/TT-BVHTTDL</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsHandbookOpen(true)}
              className="hover:text-stone-900 dark:hover:text-stone-300 underline cursor-pointer"
            >
              Quy chuẩn nghiệp vụ
            </button>
            <span>Dữ liệu lưu trữ trình duyệt an toàn</span>
          </div>
        </div>
      </footer>

      {/* Survey Handbook Modal */}
      <GuidelinesModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />
    </div>
  );
}
