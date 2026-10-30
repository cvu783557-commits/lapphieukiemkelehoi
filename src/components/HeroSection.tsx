/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, FileCheck, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  totalCount: number;
  unescoCount: number;
  onNewRecord: () => void;
  onOpenHandbook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalCount,
  unescoCount,
  onNewRecord,
  onOpenHandbook
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100 border-b border-stone-800">
      {/* Background imagery with measured contrast scrim */}
      <div className="absolute inset-0 z-0 opacity-28 pointer-events-none">
        <img
          src="/src/assets/images/festival_hero_banner_1793362717654.jpg"
          alt="Lễ hội truyền thống Việt Nam"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400">
              <span>Thông tư 04/2010/TT-BVHTTDL</span>
              <span aria-hidden="true">·</span>
              <span>Cục Di sản Văn hóa</span>
              <span aria-hidden="true">·</span>
              <span>Kiểm kê di sản phi vật thể</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight text-balance">
              Công cụ Lập Phiếu Kiểm Kê & Hồ Sơ Lễ Hội Truyền Thống
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Chuẩn hóa quy trình điều tra điền dã, số hóa dữ liệu nghi thức, hiện vật, thần tích và hiện trạng bảo tồn phục vụ lập hồ sơ khoa học di sản văn hóa quốc gia và UNESCO.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onNewRecord}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>Bắt đầu lập phiếu kiểm kê</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenHandbook}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-800/80 hover:bg-stone-800 text-stone-200 hover:text-white text-sm font-medium border border-stone-700 rounded-lg transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Cẩm nang quy chuẩn Thông tư 04</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-stone-950/70 border border-stone-800/80 rounded-xl p-5 space-y-4 backdrop-blur-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Thống kê cơ sở dữ liệu
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-2xl lg:text-3xl font-serif font-bold text-amber-400 tabular-nums">
                    {totalCount}
                  </div>
                  <div className="text-xs text-stone-400">Phiếu kiểm kê đã lưu</div>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl lg:text-3xl font-serif font-bold text-amber-300 tabular-nums">
                    {unescoCount}
                  </div>
                  <div className="text-xs text-stone-400">Di sản UNESCO / Quốc gia</div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Chuẩn form in ấn văn bản hành chính
                </span>
                <span>Tự động lưu trữ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
