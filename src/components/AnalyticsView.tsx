/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  AlertTriangle, 
  Award, 
  MapPin, 
  ArrowLeft 
} from 'lucide-react';
import { 
  FestivalInventoryRecord, 
  CATEGORY_LABELS, 
  SUBTYPE_LABELS, 
  VITALITY_LABELS,
  FestivalCategory,
  FestivalSubType,
  VitalityStatus 
} from '../types/festival';

interface AnalyticsViewProps {
  festivals: FestivalInventoryRecord[];
  onBack: () => void;
  onSelectCategoryFilter: (category: FestivalCategory) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  festivals,
  onBack,
  onSelectCategoryFilter
}) => {
  const stats = useMemo(() => {
    const total = festivals.length;
    const unescoCount = festivals.filter(f => f.category === 'unesco').length;
    const nationalCount = festivals.filter(f => f.category === 'quoc_gia').length;
    const provincialCount = festivals.filter(f => f.category === 'cap_tinh').length;
    const villageCount = festivals.filter(f => f.category === 'lang_xa').length;

    const healthyCount = festivals.filter(f => f.conservationStatus.currentVitality === 'rat_tot' || f.conservationStatus.currentVitality === 'tot').length;
    const atRiskCount = festivals.filter(f => f.conservationStatus.currentVitality === 'nguy_co_mai_mot' || f.conservationStatus.currentVitality === 'can_bao_ve_khan_cap').length;

    // By SubType
    const bySubtype: Record<string, number> = {};
    festivals.forEach(f => {
      bySubtype[f.subType] = (bySubtype[f.subType] || 0) + 1;
    });

    // By Province
    const byProvince: Record<string, number> = {};
    festivals.forEach(f => {
      byProvince[f.location.province] = (byProvince[f.location.province] || 0) + 1;
    });

    // Threats frequency
    const threatCounts: Record<string, number> = {};
    festivals.forEach(f => {
      f.conservationStatus.threats?.forEach(th => {
        threatCounts[th] = (threatCounts[th] || 0) + 1;
      });
    });

    const topThreats = Object.entries(threatCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      total,
      unescoCount,
      nationalCount,
      provincialCount,
      villageCount,
      healthyCount,
      atRiskCount,
      bySubtype,
      byProvince,
      topThreats
    };
  }, [festivals]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            title="Quay lại danh mục"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs text-stone-500">Báo cáo tổng hợp số liệu kiểm kê</div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
              Thống kê & Đánh giá Sức sống Di sản Lễ hội
            </h3>
          </div>
        </div>

        <div className="text-xs text-stone-500 font-mono">
          Tổng số hồ sơ: <strong className="text-stone-900 dark:text-stone-100">{stats.total}</strong>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Tổng hồ sơ đã lập</span>
            <BarChart3 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {stats.total}
          </div>
          <div className="text-2xs text-stone-500">Cơ sở dữ liệu di sản phi vật thể</div>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>UNESCO & Quốc gia</span>
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-purple-700 dark:text-purple-300 tabular-nums">
            {stats.unescoCount + stats.nationalCount}
          </div>
          <div className="text-2xs text-stone-500">
            {stats.unescoCount} Di sản UNESCO · {stats.nationalCount} Quốc gia
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Thực hành tốt</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
            {stats.healthyCount}
          </div>
          <div className="text-2xs text-stone-500">
            {stats.total > 0 ? Math.round((stats.healthyCount / stats.total) * 100) : 0}% duy trì sức sống ổn định
          </div>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Cần bảo tồn cấp thiết</span>
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-rose-700 dark:text-rose-300 tabular-nums">
            {stats.atRiskCount}
          </div>
          <div className="text-2xs text-stone-500">Nguy cơ mai một hoặc suy giảm</div>
        </div>
      </div>

      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classification Breakdown */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white">
            Phân loại theo Cấp độ quản lý di sản
          </h4>

          <div className="space-y-3">
            {[
              { key: 'unesco', count: stats.unescoCount, label: CATEGORY_LABELS.unesco },
              { key: 'quoc_gia', count: stats.nationalCount, label: CATEGORY_LABELS.quoc_gia },
              { key: 'cap_tinh', count: stats.provincialCount, label: CATEGORY_LABELS.cap_tinh },
              { key: 'lang_xa', count: stats.villageCount, label: CATEGORY_LABELS.lang_xa }
            ].map((item) => {
              const pct = stats.total > 0 ? (item.count / stats.total) * 100 : 0;
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                    <button
                      onClick={() => onSelectCategoryFilter(item.key as FestivalCategory)}
                      className="hover:text-amber-600 dark:hover:text-amber-400 text-left cursor-pointer"
                    >
                      {item.label}
                    </button>
                    <span className="font-mono tabular-nums">{item.count} ({Math.round(pct)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SubType Breakdown */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white">
            Phân loại theo Loại hình lễ hội
          </h4>

          <div className="space-y-3">
            {Object.entries(SUBTYPE_LABELS).map(([subTypeKey, label]) => {
              const count = stats.bySubtype[subTypeKey] || 0;
              const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
              return (
                <div key={subTypeKey} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
                    <span className="truncate pr-2">{label}</span>
                    <span className="font-mono tabular-nums shrink-0">{count}</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-700 dark:bg-stone-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Conservation Threats */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Các thách thức & Nguy cơ mai một hàng đầu
          </h4>

          {stats.topThreats.length > 0 ? (
            <div className="space-y-2.5">
              {stats.topThreats.map(([threat, count], idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-lg text-xs"
                >
                  <span className="text-stone-800 dark:text-stone-200">{threat}</span>
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400 tabular-nums">
                    {count} lễ hội
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-500">Chưa ghi nhận thách thức bảo tồn nổi cộm.</p>
          )}
        </div>

        {/* Regional Coverage */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <h4 className="font-serif text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            Phân bố theo Tỉnh / Thành phố
          </h4>

          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {Object.entries(stats.byProvince)
              .sort((a, b) => b[1] - a[1])
              .map(([prov, count]) => (
                <div 
                  key={prov} 
                  className="flex items-center justify-between p-2 bg-stone-50 dark:bg-stone-800/50 rounded-lg text-xs"
                >
                  <span className="text-stone-700 dark:text-stone-300 font-medium truncate">{prov}</span>
                  <span className="font-mono font-bold text-stone-900 dark:text-stone-100 tabular-nums">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
