/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plus, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeView: 'list' | 'form' | 'print' | 'analytics';
  onNavigate: (view: 'list' | 'form' | 'print' | 'analytics') => void;
  onNewRecord: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  onNewRecord,
  isDark,
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => onNavigate('list')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-amber-950 dark:text-amber-100 group-hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
              Di Sản Lễ Hội Việt Nam
            </span>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => onNavigate('list')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeView === 'list'
                  ? 'text-amber-900 dark:text-amber-300 border-b-2 border-amber-800 dark:border-amber-400 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Danh mục hồ sơ
            </button>
            <button
              onClick={() => onNavigate('form')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeView === 'form'
                  ? 'text-amber-900 dark:text-amber-300 border-b-2 border-amber-800 dark:border-amber-400 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Biểu mẫu Thông tư 04
            </button>
            <button
              onClick={() => onNavigate('analytics')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeView === 'analytics'
                  ? 'text-amber-900 dark:text-amber-300 border-b-2 border-amber-800 dark:border-amber-400 font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Thống kê di sản
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleTheme}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              title={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
              aria-label="Đổi giao diện"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>

            <button
              onClick={onNewRecord}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-lg shadow-xs transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Lập phiếu mới</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
