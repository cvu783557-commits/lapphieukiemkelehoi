/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, BookOpen, CheckCircle2, AlertCircle, FileCheck, Users } from 'lucide-react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              Cẩm nang Nghiệp vụ Kiểm kê Lễ hội Truyền thống
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-base text-stone-950 dark:text-stone-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Căn cứ pháp lý & Nguyên tắc kiểm kê
            </h4>
            <p>
              Căn cứ theo <strong>Thông tư số 04/2010/TT-BVHTTDL</strong> ngày 30/6/2010 của Bộ Văn hóa, Thể thao và Du lịch quy định việc kiểm kê di sản văn hóa phi vật thể và lập hồ sơ khoa học di sản văn hóa phi vật thể:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600 dark:text-stone-400">
              <li><strong>Tôn trọng chủ thể di sản:</strong> Kiểm kê phải có sự tham gia tích cực và đồng thuận của cộng đồng dân cư - người trực tiếp nắm giữ và thực hành di sản lễ hội.</li>
              <li><strong>Đảm bảo tính chân thực:</strong> Ghi chép trung thực diễn biến thực tế của lễ hội, không gán ghép các yếu tố ngoại lai hoặc tự ý cải biên nghi thức cổ truyền.</li>
              <li><strong>Không phân biệt đối xử:</strong> Tôn trọng sự đa dạng văn hóa của 54 dân tộc anh em trên khắp mọi miền đất nước.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-base text-stone-950 dark:text-stone-100 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-600" />
              2. Hướng dẫn phân định & ghi chép Quy trình Lễ - Hội
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl space-y-1">
                <span className="font-bold text-stone-900 dark:text-stone-100 block">Phần Lễ (Nghi thức tôn nghiêm)</span>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Ghi chép tuần tự: Lễ mở cửa đình/đền, Lễ mộc dục (tắm tượng), Lễ rước nước, Lễ cáo yết, Lễ rước kiệu thánh, Đại tế (văn tế, tuần rượu, dâng hương), Lễ tạ thần. Cần ghi nhận trang phục tế, nhạc lễ (bát âm), các cử chỉ tuần tế.
                </p>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl space-y-1">
                <span className="font-bold text-stone-900 dark:text-stone-100 block">Phần Hội (Diễn xướng & Trò chơi)</span>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Ghi chép các trò chơi dân gian (đấu vật, kéo co, bơi chải, cướp phết, ném còn, đẩy gậy...), các hình thức diễn xướng dân gian (hát quan họ thuyền rồng, hát chèo, hát then, hát xoan, múa cồng chiêng, múa rối nước).
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-base text-stone-950 dark:text-stone-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              3. Phương pháp phỏng vấn nghệ nhân cao niên
            </h4>
            <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600 dark:text-stone-400">
              <li>Xác định nghệ nhân tiêu biểu, các cụ trong ban khánh tiết, người giữ gia phả hoặc nắm chúc văn cổ.</li>
              <li>Sử dụng máy ghi âm, máy ảnh kỹ thuật số để lưu lại khẩu âm, cách đọc chúc văn và trình tự điều khiển kiệu tế.</li>
              <li>Kiểm tra tính thống nhất giữa thần tích văn bia tại di tích với truyền thuyết dân gian truyền miệng.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-base text-stone-950 dark:text-stone-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              4. Tiêu chí đánh giá Sức sống & Nguy cơ mai một
            </h4>
            <p>
              Căn cứ để xếp loại sức sống di sản gồm:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600 dark:text-stone-400">
              <li><strong>Rất tốt / Duy trì:</strong> Lễ hội diễn ra đều đặn, cộng đồng tự nguyện đóng góp, thanh thiếu niên tham gia đông đảo, không gian di tích được bảo tồn tốt.</li>
              <li><strong>Nguy cơ mai một / Cần bảo vệ khẩn cấp:</strong> Không gian diễn xướng bị thu hẹp, thế hệ trẻ không học tế lễ/hát múa, thiếu kinh phí, hoặc các nghi thức bị thương mại hóa làm biến tướng.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 flex items-center justify-between">
          <span className="text-2xs text-stone-500">
            Nguồn: Bộ Văn hóa, Thể thao và Du lịch Việt Nam
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Đã hiểu quy chuẩn
          </button>
        </div>
      </div>
    </div>
  );
};
