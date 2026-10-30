/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Save, 
  Printer, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';
import { 
  FestivalInventoryRecord, 
  AssociatedArtifact, 
  CATEGORY_LABELS, 
  SUBTYPE_LABELS, 
  VITALITY_LABELS, 
  DOSSIER_STATUS_LABELS, 
  SITE_CLASS_LABELS,
  VIETNAMESE_ETHNICITIES, 
  VIETNAMESE_PROVINCES,
  FestivalCategory,
  FestivalSubType,
  SiteClassification,
  FestivalCycle,
  VitalityStatus,
  DossierStatus
} from '../types/festival';
import { INITIAL_SAMPLE_FESTIVALS } from '../data/sampleFestivals';

interface FestivalFormProps {
  initialData: FestivalInventoryRecord;
  onSave: (record: FestivalInventoryRecord) => void;
  onCancel: () => void;
  onPreviewPrint: (record: FestivalInventoryRecord) => void;
}

export const FestivalForm: React.FC<FestivalFormProps> = ({
  initialData,
  onSave,
  onCancel,
  onPreviewPrint
}) => {
  const [formData, setFormData] = useState<FestivalInventoryRecord>(initialData);
  const [activeTab, setActiveTab] = useState<'general' | 'timing' | 'process' | 'artifacts' | 'conservation'>('general');
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  const handleTextChange = (field: string, value: any) => {
    setFormData(prev => {
      const keys = field.split('.');
      if (keys.length === 1) {
        return { ...prev, [keys[0]]: value };
      }
      if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...(prev as any)[keys[0]],
            [keys[1]]: value
          }
        };
      }
      return prev;
    });
  };

  const handleEthnicToggle = (ethnic: string) => {
    setFormData(prev => {
      const current = prev.ethnicGroups || [];
      const next = current.includes(ethnic)
        ? current.filter(e => e !== ethnic)
        : [...current, ethnic];
      return { ...prev, ethnicGroups: next };
    });
  };

  const handleThreatToggle = (threat: string) => {
    setFormData(prev => {
      const current = prev.conservationStatus.threats || [];
      const next = current.includes(threat)
        ? current.filter(t => t !== threat)
        : [...current, threat];
      return {
        ...prev,
        conservationStatus: {
          ...prev.conservationStatus,
          threats: next
        }
      };
    });
  };

  const handleAddArtifact = () => {
    const newArt: AssociatedArtifact = {
      id: `art-${Date.now()}`,
      name: '',
      type: 'Đồ thờ / Di vật',
      era: '',
      quantity: '01',
      condition: 'Bình thường',
      notes: ''
    };
    setFormData(prev => ({
      ...prev,
      associatedArtifacts: [...prev.associatedArtifacts, newArt]
    }));
  };

  const handleUpdateArtifact = (id: string, field: keyof AssociatedArtifact, val: string) => {
    setFormData(prev => ({
      ...prev,
      associatedArtifacts: prev.associatedArtifacts.map(art => 
        art.id === id ? { ...art, [field]: val } : art
      )
    }));
  };

  const handleRemoveArtifact = (id: string) => {
    setFormData(prev => ({
      ...prev,
      associatedArtifacts: prev.associatedArtifacts.filter(art => art.id !== id)
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2500);
  };

  const handleLoadSamplePreset = (presetId: string) => {
    const found = INITIAL_SAMPLE_FESTIVALS.find(s => s.id === presetId);
    if (found) {
      setFormData({
        ...JSON.parse(JSON.stringify(found)),
        id: formData.id,
        code: formData.code || found.code,
        surveyMetadata: {
          ...found.surveyMetadata,
          surveyDate: new Date().toISOString().split('T')[0]
        }
      });
    }
  };

  const tabs = [
    { id: 'general', label: 'I. Định danh & Địa bàn' },
    { id: 'timing', label: 'II. Thời gian & Thần tích' },
    { id: 'process', label: 'III. Diễn trình Lễ - Hội' },
    { id: 'artifacts', label: 'IV. Hiện vật & Giá trị' },
    { id: 'conservation', label: 'V. Hiện trạng & Thẩm định' }
  ] as const;

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              title="Quay lại danh mục"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 font-medium">
                <span>Biểu mẫu Thông tư 04/2010/TT-BVHTTDL</span>
                <span aria-hidden="true">·</span>
                <span>Mã số: {formData.code || 'Chưa tạo'}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                {formData.officialName || 'Phiếu kiểm kê lễ hội mới'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick Sample Preset Dropdown */}
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-lg text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-stone-600 dark:text-stone-400 hidden sm:inline">Mẫu tham khảo:</span>
              <select
                onChange={(e) => {
                  if (e.target.value) handleLoadSamplePreset(e.target.value);
                }}
                defaultValue=""
                className="bg-transparent text-stone-800 dark:text-stone-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="" disabled>Chọn dữ liệu chuẩn...</option>
                {INITIAL_SAMPLE_FESTIVALS.map((fest) => (
                  <option key={fest.id} value={fest.id}>
                    {fest.officialName}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => onPreviewPrint(formData)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
              title="Xem trước định dạng văn bản in ấn"
            >
              <Printer className="w-4 h-4 text-stone-600 dark:text-stone-300" />
              <span>Xem mẫu in</span>
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              {isSavedFeedback ? (
                <>
                  <Check className="w-4 h-4 text-emerald-900" />
                  <span>Đã lưu thành công!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Lưu phiếu kiểm kê</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-stone-100 dark:border-stone-800 pt-3 text-xs sm:text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-8 shadow-2xs space-y-6">
        {/* TAB 1: General & Administrative Geography */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                1. Thông tin định danh lễ hội & Phân loại
              </h3>
              <p className="text-xs text-stone-500">
                Theo Mục I Thông tư 04/2010/TT-BVHTTDL: Tên gọi chuẩn hóa, cấp độ di sản và chủ thể tộc người.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Mã số phiếu kiểm kê <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => handleTextChange('code', e.target.value)}
                  placeholder="Ví dụ: 01/DSVHPVT-LHTT"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Cấp độ quản lý di sản
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleTextChange('category', e.target.value as FestivalCategory)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                >
                  {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Tên gọi chính thức của lễ hội <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.officialName}
                  onChange={(e) => handleTextChange('officialName', e.target.value)}
                  placeholder="Ví dụ: Hội Gióng đền Phù Đổng và đền Sóc, Lễ hội Đền Hùng..."
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-serif font-bold text-base"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Tên gọi khác / Tên dân gian thường gọi
                </label>
                <input
                  type="text"
                  value={formData.alternateNames}
                  onChange={(e) => handleTextChange('alternateNames', e.target.value)}
                  placeholder="Ví dụ: Giỗ Tổ Hùng Vương, Hội làng Gióng, Hội Cầu Ngư..."
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Loại hình lễ hội
                </label>
                <select
                  value={formData.subType}
                  onChange={(e) => handleTextChange('subType', e.target.value as FestivalSubType)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                >
                  {Object.entries(SUBTYPE_LABELS).map(([key, val]) => (
                    <option key={key} value={key}>{val}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Ảnh tư liệu đại diện (URL)
                </label>
                <input
                  type="text"
                  value={formData.imageCoverUrl || ''}
                  onChange={(e) => handleTextChange('imageCoverUrl', e.target.value)}
                  placeholder="/src/assets/images/... hoặc link ảnh tư liệu"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>

            {/* Dân tộc chủ thể */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Dân tộc chủ thể thực hành di sản:
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700 max-h-36 overflow-y-auto">
                {VIETNAMESE_ETHNICITIES.map((ethnic) => {
                  const isSelected = formData.ethnicGroups?.includes(ethnic);
                  return (
                    <button
                      type="button"
                      key={ethnic}
                      onClick={() => handleEthnicToggle(ethnic)}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-amber-600 text-white font-semibold'
                          : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-amber-400'
                      }`}
                    >
                      {ethnic}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Địa bàn di tích */}
            <div className="border-t border-stone-100 dark:border-stone-800 pt-5 space-y-4">
              <h4 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                2. Địa bàn tổ chức & Di tích gắn liền
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Tỉnh / Thành phố
                  </label>
                  <select
                    value={formData.location.province}
                    onChange={(e) => handleTextChange('location.province', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  >
                    {VIETNAMESE_PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Quận / Huyện / Thị xã
                  </label>
                  <input
                    type="text"
                    value={formData.location.district}
                    onChange={(e) => handleTextChange('location.district', e.target.value)}
                    placeholder="Ví dụ: Huyện Gia Lâm"
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Xã / Phường / Thị trấn
                  </label>
                  <input
                    type="text"
                    value={formData.location.commune}
                    onChange={(e) => handleTextChange('location.commune', e.target.value)}
                    placeholder="Ví dụ: Xã Phù Đổng"
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Thôn / Bản / Làng cổ
                  </label>
                  <input
                    type="text"
                    value={formData.location.village}
                    onChange={(e) => handleTextChange('location.village', e.target.value)}
                    placeholder="Ví dụ: Làng Phù Đổng"
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Di tích cụ thể gắn liền với lễ hội (Đền, Đình, Chùa, Miếu, Lăng...)
                  </label>
                  <input
                    type="text"
                    value={formData.location.specificSites}
                    onChange={(e) => handleTextChange('location.specificSites', e.target.value)}
                    placeholder="Ví dụ: Đền Thượng, Đền Hạ, Đền Mẫu, bãi Đống Đàm..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Xếp hạng di tích lịch sử
                  </label>
                  <select
                    value={formData.location.siteClassification}
                    onChange={(e) => handleTextChange('location.siteClassification', e.target.value as SiteClassification)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  >
                    {Object.entries(SITE_CLASS_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Timing & Sacred Deities */}
        {activeTab === 'timing' && (
          <div className="space-y-6">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Thời gian diễn ra & Nhân vật phụng thờ
              </h3>
              <p className="text-xs text-stone-500">
                Ghi nhận lịch âm/dương, chu kỳ tổ chức và thần tích, sự tích nhân vật được tôn vinh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Ngày bắt đầu (Âm lịch) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.timing.lunarStartDate}
                  onChange={(e) => handleTextChange('timing.lunarStartDate', e.target.value)}
                  placeholder="Ví dụ: Mùng 7 tháng 4 âm lịch"
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Chính hội (Âm lịch)
                </label>
                <input
                  type="text"
                  value={formData.timing.lunarMainDate}
                  onChange={(e) => handleTextChange('timing.lunarMainDate', e.target.value)}
                  placeholder="Ví dụ: Mùng 9 tháng 4 âm lịch"
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Khoảng thời gian Dương lịch
                </label>
                <input
                  type="text"
                  value={formData.timing.solarSeason}
                  onChange={(e) => handleTextChange('timing.solarSeason', e.target.value)}
                  placeholder="Ví dụ: Khoảng tháng 5 dương lịch"
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Chu kỳ tổ chức
                </label>
                <select
                  value={formData.timing.cycle}
                  onChange={(e) => handleTextChange('timing.cycle', e.target.value as FestivalCycle)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                >
                  <option value="hang_nam">Hàng năm (Thường niên)</option>
                  <option value="2_nam">2 năm một lần</option>
                  <option value="3_nam">3 năm một lần (Đại hội tam niên)</option>
                  <option value="5_nam">5 năm một lần (Đại lễ ngũ niên)</option>
                  <option value="khac">Khác (Theo quy ước cộng đồng)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Nhân vật được phụng thờ chính (Thành hoàng / Thánh / Mẫu / Danh nhân) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.deities.mainDeities}
                  onChange={(e) => handleTextChange('deities.mainDeities', e.target.value)}
                  placeholder="Ví dụ: Phù Đổng Thiên Vương (Thánh Gióng), Các Vua Hùng, Đức Thánh Trần..."
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Thần tích, Sự tích & Truyền thuyết phụng thờ
                </label>
                <textarea
                  rows={4}
                  value={formData.deities.mythologyStory}
                  onChange={(e) => handleTextChange('deities.mythologyStory', e.target.value)}
                  placeholder="Ghi rõ nguồn gốc thần tích, công lao đánh giặc cứu nước hoặc khai hoang lập ấp, các huyền tích dân gian truyền khẩu..."
                  className="w-full px-3.5 py-2 text-xs leading-relaxed bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Sắc phong, tước hiệu của các triều đại
                </label>
                <textarea
                  rows={2}
                  value={formData.deities.titlesConferred}
                  onChange={(e) => handleTextChange('deities.titlesConferred', e.target.value)}
                  placeholder="Ví dụ: Được phong tặng tước hiệu Dực Bảo Trung Hưng, 21 đạo sắc phong thời Lê - Nguyễn..."
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Rituals, Practitioners & Folk Festivities */}
        {activeTab === 'process' && (
          <div className="space-y-6">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Chủ thể thực hành & Diễn trình Lễ - Hội
              </h3>
              <p className="text-xs text-stone-500">
                Ghi chép chi tiết phần nghi thức tế tự tâm linh (Phần Lễ) và các trò chơi dân gian (Phần Hội).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Cơ quan tổ chức / Ban khánh tiết
                </label>
                <input
                  type="text"
                  value={formData.practitioners.organizingCommittee}
                  onChange={(e) => handleTextChange('practitioners.organizingCommittee', e.target.value)}
                  placeholder="Ví dụ: Ban Quản lý Di tích phối hợp UBND Xã..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Ban tế lễ & Người điều hành tế tự
                </label>
                <input
                  type="text"
                  value={formData.practitioners.ritualMasters}
                  onChange={(e) => handleTextChange('practitioners.ritualMasters', e.target.value)}
                  placeholder="Ví dụ: Cụ Chánh tế, Bồi tế, Đông xướng, Tây xướng, Ban nhạc lễ..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Nghệ nhân tiêu biểu nắm giữ nghi thức
                </label>
                <input
                  type="text"
                  value={formData.practitioners.artisanHolders}
                  onChange={(e) => handleTextChange('practitioners.artisanHolders', e.target.value)}
                  placeholder="Ghi tên nghệ nhân hát múa, điều khiển nghi thức, múa cờ..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Cộng đồng người dân tham gia
                </label>
                <input
                  type="text"
                  value={formData.practitioners.communityParticipants}
                  onChange={(e) => handleTextChange('practitioners.communityParticipants', e.target.value)}
                  placeholder="Ví dụ: Nhân dân trong làng, các dòng họ, du khách thập phương..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4 pt-3 border-t border-stone-100 dark:border-stone-800">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  1. Công tác chuẩn bị trước lễ hội
                </label>
                <textarea
                  rows={2}
                  value={formData.process.preparation}
                  onChange={(e) => handleTextChange('process.preparation', e.target.value)}
                  placeholder="Họp dân làng, bao sái tượng thờ, tập dượt nghi thức, chuẩn bị kiệu rước..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-900 dark:text-amber-300 mb-1">
                  2. Phần Lễ (Nghi thức tôn nghiêm) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.process.ritualPart}
                  onChange={(e) => handleTextChange('process.ritualPart', e.target.value)}
                  placeholder="Mô tả tuần tự các nghi thức: Lễ mở cửa đền, Lễ mộc dục (tắm tượng), Lễ rước nước, Lễ rước kiệu, Lễ đại tế, Đọc chúc văn, Lễ tạ..."
                  className="w-full px-3.5 py-2 text-xs leading-relaxed bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-900 dark:text-amber-300 mb-1">
                  3. Phần Hội (Trò chơi dân gian, Diễn xướng & Ẩm thực) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.process.festivalPart}
                  onChange={(e) => handleTextChange('process.festivalPart', e.target.value)}
                  placeholder="Mô tả các hoạt động văn hóa dân gian: Đua thuyền bơi chải, đấu vật, kéo co, cướp phết, ném còn, hát quan họ thuyền rồng, hát xoan, diễn kịch dân gian..."
                  className="w-full px-3.5 py-2 text-xs leading-relaxed bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  4. Lễ vật & Ẩm thực hiến sinh dâng cúng
                </label>
                <input
                  type="text"
                  value={formData.process.offerings}
                  onChange={(e) => handleTextChange('process.offerings', e.target.value)}
                  placeholder="Ví dụ: Bánh chưng, bánh giầy, xôi gấc, lợn quay, cỗ chay, rượu nếp, trầu cau ngũ sắc..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Artifacts & Cultural Values */}
        {activeTab === 'artifacts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  Hiện vật liên quan & Giá trị di sản
                </h3>
                <p className="text-xs text-stone-500">
                  Thống kê các đồ thờ tự, sắc phong, kiệu bát cống, bia ký và đánh giá các giá trị khoa học lịch sử.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddArtifact}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm hiện vật</span>
              </button>
            </div>

            {/* Artifacts Table */}
            <div className="space-y-3">
              {formData.associatedArtifacts.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-stone-300 dark:border-stone-700 rounded-lg">
                  <p className="text-xs text-stone-500 mb-2">Chưa có hiện vật nào được thêm vào phiếu kiểm kê.</p>
                  <button
                    type="button"
                    onClick={handleAddArtifact}
                    className="text-xs font-semibold text-amber-700 dark:text-amber-400 underline cursor-pointer"
                  >
                    + Thêm hiện vật / Sắc phong / Kiệu thờ đầu tiên
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto border border-stone-200 dark:border-stone-700 rounded-lg">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-50 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold">
                        <th className="p-2.5">Tên hiện vật</th>
                        <th className="p-2.5">Loại hiện vật</th>
                        <th className="p-2.5">Niên đại</th>
                        <th className="p-2.5">Số lượng</th>
                        <th className="p-2.5">Tình trạng</th>
                        <th className="p-2.5">Ghi chú</th>
                        <th className="p-2.5 text-center">Xóa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {formData.associatedArtifacts.map((art) => (
                        <tr key={art.id}>
                          <td className="p-2">
                            <input
                              type="text"
                              value={art.name}
                              onChange={(e) => handleUpdateArtifact(art.id, 'name', e.target.value)}
                              placeholder="Tên hiện vật"
                              className="w-full px-2 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-xs"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={art.type}
                              onChange={(e) => handleUpdateArtifact(art.id, 'type', e.target.value)}
                              placeholder="Loại"
                              className="w-full px-2 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-xs"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={art.era}
                              onChange={(e) => handleUpdateArtifact(art.id, 'era', e.target.value)}
                              placeholder="Thời Lê, Nguyễn..."
                              className="w-full px-2 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-xs"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={art.quantity}
                              onChange={(e) => handleUpdateArtifact(art.id, 'quantity', e.target.value)}
                              placeholder="Số lượng"
                              className="w-20 px-2 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-xs"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={art.condition}
                              onChange={(e) => handleUpdateArtifact(art.id, 'condition', e.target.value)}
                              placeholder="Tình trạng"
                              className="w-full px-2 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-xs"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={art.notes}
                              onChange={(e) => handleUpdateArtifact(art.id, 'notes', e.target.value)}
                              placeholder="Ghi chú thêm"
                              className="w-full px-2 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-xs"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveArtifact(art.id)}
                              className="p-1 text-stone-400 hover:text-rose-600 cursor-pointer"
                              title="Xóa hiện vật"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 4 Cultural Values */}
            <div className="border-t border-stone-100 dark:border-stone-800 pt-5 space-y-4">
              <h4 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100">
                Đánh giá các giá trị di sản tiêu biểu
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Giá trị Lịch sử
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heritageValue.historicalValue}
                    onChange={(e) => handleTextChange('heritageValue.historicalValue', e.target.value)}
                    placeholder="Phản ánh quá trình đấu tranh chống ngoại xâm, mở mang bờ cõi..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Giá trị Văn hóa & Nghệ thuật diễn xướng
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heritageValue.culturalArtisticValue}
                    onChange={(e) => handleTextChange('heritageValue.culturalArtisticValue', e.target.value)}
                    placeholder="Âm nhạc, múa hát dân gian, trang phục truyền thống, nghệ thuật điêu khắc..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Giá trị Cố kết cộng đồng
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heritageValue.communityCohesionValue}
                    onChange={(e) => handleTextChange('heritageValue.communityCohesionValue', e.target.value)}
                    placeholder="Sự gắn kết tình làng nghĩa xóm, các dòng họ, sự trao truyền văn hóa qua thế hệ..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Giá trị Giáo dục truyền thống
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heritageValue.educationValue}
                    onChange={(e) => handleTextChange('heritageValue.educationValue', e.target.value)}
                    placeholder="Giáo dục lòng yêu nước, đạo lý uống nước nhớ nguồn cho thế hệ trẻ..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Conservation, Threats & Appraisal Signatures */}
        {activeTab === 'conservation' && (
          <div className="space-y-6">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                Hiện trạng bảo tồn, Nguy cơ & Thẩm định nghiệm thu
              </h3>
              <p className="text-xs text-stone-500">
                Theo Thông tư 04/2010/TT-BVHTTDL: Đánh giá sức sống thực tế, giải pháp bảo vệ và chữ ký người lập phiếu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Đánh giá sức sống của di sản hiện nay <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.conservationStatus.currentVitality}
                  onChange={(e) => handleTextChange('conservationStatus.currentVitality', e.target.value as VitalityStatus)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none font-medium"
                >
                  {Object.entries(VITALITY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v.text}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  Tình trạng duyệt hồ sơ kiểm kê
                </label>
                <select
                  value={formData.surveyMetadata.status}
                  onChange={(e) => handleTextChange('surveyMetadata.status', e.target.value as DossierStatus)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none font-medium"
                >
                  {Object.entries(DOSSIER_STATUS_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v.text}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Common Threats Checkbox List */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Các nguy cơ đe dọa hoặc thách thức bảo tồn:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Nghệ nhân cao tuổi già yếu, thiếu người kế thừa',
                  'Thanh niên đi làm ăn xa, ít tham gia lễ tế',
                  'Kinh phí duy trì và phục dựng còn hạn hẹp',
                  'Tác động của đô thị hóa và xây dựng mới',
                  'Thương mại hóa dịch vụ xung quanh lễ hội',
                  'Biến dạng nghi thức và lễ vật truyền thống',
                  'Quá tải du khách gây mất trật tự và vệ sinh cảnh quan',
                  'Mai một các làn điệu dân ca và trò chơi dân gian',
                  'Tài liệu sắc phong, cổ vật bị thất lạc hoặc hư hỏng'
                ].map((threat) => {
                  const isChecked = formData.conservationStatus.threats?.includes(threat);
                  return (
                    <label
                      key={threat}
                      className={`flex items-start gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        isChecked 
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 font-medium' 
                          : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleThreatToggle(threat)}
                        className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                      />
                      <span>{threat}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Đề xuất giải pháp bảo vệ & phát huy giá trị di sản
              </label>
              <textarea
                rows={3}
                value={formData.conservationStatus.proposals}
                onChange={(e) => handleTextChange('conservationStatus.proposals', e.target.value)}
                placeholder="Ví dụ: Mở lớp truyền dạy hát múa tế lễ cho thế hệ trẻ, hỗ trợ phụ cấp cho nghệ nhân, phục dựng trò chơi dân gian thất truyền, lập hồ sơ khoa học di sản quốc gia..."
                className="w-full px-3.5 py-2 text-xs leading-relaxed bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>

            {/* Official Survey Signatures and Agency Metadata */}
            <div className="border-t border-stone-100 dark:border-stone-800 pt-5 space-y-4">
              <h4 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600" />
                Thông tin người lập phiếu & Thẩm định nghiệm thu
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Người lập phiếu kiểm kê <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.surveyMetadata.surveyorName}
                    onChange={(e) => handleTextChange('surveyMetadata.surveyorName', e.target.value)}
                    placeholder="Họ và tên cán bộ kiểm kê"
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Chức danh / Nghề nghiệp
                  </label>
                  <input
                    type="text"
                    value={formData.surveyMetadata.surveyorTitle}
                    onChange={(e) => handleTextChange('surveyMetadata.surveyorTitle', e.target.value)}
                    placeholder="Chuyên viên văn hóa, Nhà nghiên cứu..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Cơ quan thực hiện kiểm kê
                  </label>
                  <input
                    type="text"
                    value={formData.surveyMetadata.organization}
                    onChange={(e) => handleTextChange('surveyMetadata.organization', e.target.value)}
                    placeholder="Sở VHTTDL, Phòng VHTT Huyện..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Ngày lập phiếu kiểm kê
                  </label>
                  <input
                    type="date"
                    value={formData.surveyMetadata.surveyDate}
                    onChange={(e) => handleTextChange('surveyMetadata.surveyDate', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Người kiểm tra / Thẩm định khoa học
                  </label>
                  <input
                    type="text"
                    value={formData.surveyMetadata.supervisorName}
                    onChange={(e) => handleTextChange('surveyMetadata.supervisorName', e.target.value)}
                    placeholder="Lãnh đạo đơn vị / Chuyên gia phản biện"
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Người cung cấp thông tin (Nghệ nhân / Trưởng thôn)
                  </label>
                  <input
                    type="text"
                    value={formData.surveyMetadata.informantName}
                    onChange={(e) => handleTextChange('surveyMetadata.informantName', e.target.value)}
                    placeholder="Họ tên, tuổi, địa chỉ người cung cấp"
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Hồ sơ tài liệu nghe nhìn đính kèm (Ảnh tư liệu, video, bản ghi âm, bản dập bia)
                </label>
                <textarea
                  rows={2}
                  value={formData.surveyMetadata.documentationMedia}
                  onChange={(e) => handleTextChange('surveyMetadata.documentationMedia', e.target.value)}
                  placeholder="Ví dụ: 80 ảnh tư liệu số độ phân giải cao, 02 video ghi lại lễ rước kiệu, 01 bản ghi âm chúc văn cổ..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar inside Form */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            Hủy / Quay lại danh mục
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onPreviewPrint(formData)}
              className="px-4 py-2 text-xs font-medium text-stone-800 dark:text-stone-200 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
            >
              Xem trước mẫu in
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {isSavedFeedback ? 'Đã lưu thành công!' : 'Lưu phiếu kiểm kê'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
