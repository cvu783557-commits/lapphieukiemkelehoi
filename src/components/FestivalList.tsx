/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Printer, 
  Edit3, 
  Copy, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw, 
  MapPin, 
  Calendar, 
  Users, 
  LayoutGrid, 
  List as ListIcon 
} from 'lucide-react';
import { 
  FestivalInventoryRecord, 
  FestivalCategory, 
  CATEGORY_LABELS, 
  SUBTYPE_LABELS, 
  VITALITY_LABELS,
  VIETNAMESE_PROVINCES 
} from '../types/festival';

interface FestivalListProps {
  festivals: FestivalInventoryRecord[];
  onSelectFestivalForEdit: (festival: FestivalInventoryRecord) => void;
  onSelectFestivalForPrint: (festival: FestivalInventoryRecord) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onExportSingle: (festival: FestivalInventoryRecord) => void;
  onExportAll: () => void;
  onImportData: (imported: FestivalInventoryRecord[]) => void;
  onResetSamples: () => void;
  onNewRecord: () => void;
}

export const FestivalList: React.FC<FestivalListProps> = ({
  festivals,
  onSelectFestivalForEdit,
  onSelectFestivalForPrint,
  onDuplicate,
  onDelete,
  onExportSingle,
  onExportAll,
  onImportData,
  onResetSamples,
  onNewRecord
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const filteredFestivals = useMemo(() => {
    return festivals.filter(f => {
      const matchSearch = 
        f.officialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.alternateNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.location.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.location.specificSites.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.deities.mainDeities.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'all' || f.category === selectedCategory;
      const matchProvince = selectedProvince === 'all' || f.location.province === selectedProvince;

      return matchSearch && matchCategory && matchProvince;
    });
  }, [festivals, searchTerm, selectedCategory, selectedProvince]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          onImportData(parsed);
        } else if (parsed && typeof parsed === 'object' && parsed.id) {
          onImportData([parsed]);
        }
      } catch (err) {
        console.error('Lỗi phân tích cú pháp tệp JSON:', err);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên lễ hội, nhân vật phụng thờ, di tích, địa danh hoặc mã phiếu..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-3 py-2 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-xs font-medium text-stone-800 dark:text-stone-200 focus:outline-none"
            >
              <option value="all">Tất cả tỉnh thành</option>
              {VIETNAMESE_PROVINCES.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>

            <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs' 
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
                title="Dạng lưới thẻ"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs' 
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
                title="Dạng bảng dữ liệu"
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Segmented Controls & Data Management Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Tất cả ({festivals.length})
            </button>
            {(['unesco', 'quoc_gia', 'cap_tinh', 'lang_xa'] as FestivalCategory[]).map((cat) => {
              const count = festivals.filter(f => f.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {CATEGORY_LABELS[cat]} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
              title="Nhập dữ liệu từ file JSON"
            >
              <Upload className="w-3.5 h-3.5 text-stone-500" />
              <span>Nhập JSON</span>
            </button>
            <button
              onClick={onExportAll}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
              title="Sao lưu toàn bộ cơ sở dữ liệu phiếu kiểm kê"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Xuất sao lưu</span>
            </button>
            <button
              onClick={onResetSamples}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
              title="Khôi phục hồ sơ mẫu chuẩn ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Mẫu gốc</span>
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredFestivals.length === 0 && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-12 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-700 dark:text-amber-400">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-white">
              Không tìm thấy hồ sơ lễ hội phù hợp
            </h3>
            <p className="text-sm text-stone-500 max-w-md mx-auto">
              Hãy thử tìm kiếm với từ khóa khác, thay đổi bộ lọc tỉnh thành hoặc bắt đầu lập phiếu kiểm kê mới.
            </p>
          </div>
          <button
            onClick={onNewRecord}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Lập phiếu kiểm kê mới
          </button>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && filteredFestivals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFestivals.map((fest) => {
            const vitality = VITALITY_LABELS[fest.conservationStatus.currentVitality] || VITALITY_LABELS.tot;
            const categoryText = CATEGORY_LABELS[fest.category];
            const subTypeText = SUBTYPE_LABELS[fest.subType];

            return (
              <div
                key={fest.id}
                className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden hover:border-amber-400/80 dark:hover:border-amber-500/80 transition-all shadow-2xs hover:shadow-md flex flex-col"
              >
                {/* Visual Cover Header */}
                <div className="relative h-48 bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  {fest.imageCoverUrl ? (
                    <img
                      src={fest.imageCoverUrl}
                      alt={fest.officialName}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-stone-200 to-amber-100/50 dark:from-stone-800 dark:to-stone-700">
                      <span className="font-serif text-2xl font-bold text-amber-900/40 dark:text-amber-100/40">
                        {fest.officialName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                  {/* Top unboxed badges overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white drop-shadow-sm font-medium">
                    <span className="bg-stone-950/70 backdrop-blur-xs px-2.5 py-1 rounded text-amber-300">
                      {fest.code}
                    </span>
                    <span className="bg-stone-950/70 backdrop-blur-xs px-2.5 py-1 rounded">
                      {categoryText}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-lg font-bold leading-snug drop-shadow-sm line-clamp-1">
                      {fest.officialName}
                    </h3>
                    {fest.alternateNames && (
                      <p className="text-xs text-stone-200 drop-shadow-xs line-clamp-1 italic">
                        {fest.alternateNames}
                      </p>
                    )}
                  </div>
                </div>

                {/* Content Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">
                        {fest.location.commune ? `${fest.location.commune}, ` : ''}
                        {fest.location.district ? `${fest.location.district}, ` : ''}
                        <strong className="text-stone-900 dark:text-stone-100">{fest.location.province}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="font-medium text-stone-800 dark:text-stone-200">
                        {fest.timing.lunarStartDate || 'Chưa cập nhật ngày'} 
                        {fest.timing.lunarMainDate ? ` (Chính hội: ${fest.timing.lunarMainDate})` : ''}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Users className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">
                        Phụng thờ: <strong className="text-stone-900 dark:text-stone-100">{fest.deities.mainDeities || 'Chưa điền'}</strong>
                      </span>
                    </div>

                    {/* Metadata unboxed separator */}
                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                      <span>{subTypeText}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${vitality.colorClass}`}>
                        {vitality.text}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-1">
                    <button
                      onClick={() => onSelectFestivalForPrint(fest)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-amber-100 dark:bg-stone-800 dark:hover:bg-amber-950/60 dark:text-stone-100 rounded-lg transition-colors cursor-pointer"
                      title="Xem biểu mẫu chuẩn Thông tư 04 để in hoặc xuất PDF"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                      <span>In phiếu</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onSelectFestivalForEdit(fest)}
                        className="p-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                        title="Chỉnh sửa phiếu kiểm kê"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDuplicate(fest.id)}
                        className="p-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                        title="Nhân bản phiếu làm mẫu tương tự"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onExportSingle(fest)}
                        className="p-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                        title="Tải tệp hồ sơ JSON"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc chắn muốn xóa phiếu kiểm kê "${fest.officialName}"?`)) {
                            onDelete(fest.id);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-md transition-colors cursor-pointer"
                        title="Xóa phiếu kiểm kê"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && filteredFestivals.length > 0 && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Mã số</th>
                  <th className="py-3 px-4">Tên Lễ Hội</th>
                  <th className="py-3 px-4">Địa điểm</th>
                  <th className="py-3 px-4">Thời gian âm lịch</th>
                  <th className="py-3 px-4">Phân loại di sản</th>
                  <th className="py-3 px-4">Hiện trạng</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredFestivals.map((fest) => {
                  const vitality = VITALITY_LABELS[fest.conservationStatus.currentVitality] || VITALITY_LABELS.tot;
                  return (
                    <tr
                      key={fest.id}
                      className="hover:bg-stone-50/80 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono text-stone-500 font-medium whitespace-nowrap">
                        {fest.code}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-sm">
                          {fest.officialName}
                        </div>
                        {fest.alternateNames && (
                          <div className="text-stone-500 italic text-2xs">{fest.alternateNames}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-stone-600 dark:text-stone-300">
                        {fest.location.district ? `${fest.location.district}, ` : ''}
                        <strong>{fest.location.province}</strong>
                      </td>
                      <td className="py-3.5 px-4 text-stone-700 dark:text-stone-300 whitespace-nowrap">
                        {fest.timing.lunarStartDate || '-'}
                      </td>
                      <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                        {CATEGORY_LABELS[fest.category]}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-2xs font-medium ${vitality.colorClass}`}>
                          {vitality.text}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onSelectFestivalForPrint(fest)}
                            className="p-1.5 text-stone-600 hover:text-amber-800 dark:hover:text-amber-300 rounded cursor-pointer"
                            title="In phiếu kiểm kê"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onSelectFestivalForEdit(fest)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 dark:hover:text-white rounded cursor-pointer"
                            title="Sửa phiếu"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDuplicate(fest.id)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 dark:hover:text-white rounded cursor-pointer"
                            title="Nhân bản"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onExportSingle(fest)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 dark:hover:text-white rounded cursor-pointer"
                            title="Xuất JSON"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Bạn có chắc chắn muốn xóa phiếu "${fest.officialName}"?`)) {
                                onDelete(fest.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded cursor-pointer"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
