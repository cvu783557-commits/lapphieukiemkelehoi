/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Printer, 
  ArrowLeft, 
  Edit3, 
  Download, 
  FileText 
} from 'lucide-react';
import { 
  FestivalInventoryRecord, 
  CATEGORY_LABELS, 
  SUBTYPE_LABELS, 
  SITE_CLASS_LABELS, 
  VITALITY_LABELS 
} from '../types/festival';

interface OfficialPrintViewProps {
  festival: FestivalInventoryRecord;
  onBack: () => void;
  onEdit: () => void;
}

export const OfficialPrintView: React.FC<OfficialPrintViewProps> = ({
  festival,
  onBack,
  onEdit
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportWordHtml = () => {
    const printArea = document.getElementById('official-dossier-document');
    if (!printArea) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Phiếu kiểm kê - ${festival.officialName}</title>
        <style>
          body { font-family: "Times New Roman", Times, serif; font-size: 13pt; line-height: 1.5; color: black; margin: 40px; }
          .header { text-align: center; font-weight: bold; }
          .title { text-align: center; font-size: 16pt; font-weight: bold; margin-top: 20px; text-transform: uppercase; }
          .subtitle { text-align: center; font-style: italic; font-size: 12pt; margin-bottom: 25px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px; }
          th, td { border: 1px solid black; padding: 6px 10px; text-align: left; vertical-align: top; }
          th { background-color: #f2f2f2; font-weight: bold; }
          .section-title { font-weight: bold; font-size: 13pt; margin-top: 20px; text-transform: uppercase; }
          .signatures { width: 100%; margin-top: 40px; border: none; }
          .signatures td { border: none; text-align: center; }
        </style>
      </head>
      <body>
        ${printArea.innerHTML}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `Phieu_Kiem_Ke_${festival.officialName.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Toolbar (Hidden when printing) */}
      <div className="no-print bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            title="Quay lại danh mục"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-xs text-stone-500">Mẫu in văn bản hành chính quy chuẩn</div>
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
              Phiếu kiểm kê di sản: {festival.officialName}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-stone-600 dark:text-stone-400" />
            <span>Chỉnh sửa hồ sơ</span>
          </button>

          <button
            onClick={handleExportWordHtml}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
            title="Xuất file văn bản định dạng tương thích Microsoft Word"
          >
            <Download className="w-4 h-4 text-stone-600 dark:text-stone-400" />
            <span>Xuất file Word (.doc)</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In phiếu kiểm kê (Print / PDF)</span>
          </button>
        </div>
      </div>

      {/* Official Governmental Dossier Document */}
      <div 
        id="official-dossier-document"
        className="bg-white text-stone-950 p-8 sm:p-14 rounded-xl border border-stone-300 shadow-sm max-w-4xl mx-auto font-serif leading-relaxed"
      >
        {/* National Emblem & Header */}
        <div className="grid grid-cols-2 gap-4 pb-6 border-b border-stone-300 text-xs">
          <div className="text-center font-sans">
            <div className="font-semibold uppercase tracking-wider text-stone-700">
              {festival.surveyMetadata.organization || 'SỞ VĂN HÓA, THỂ THAO VÀ DU LỊCH'}
            </div>
            <div className="font-medium text-stone-600 mt-0.5">
              BAN QUẢN LÝ DI TÍCH & DI SẢN VĂN HÓA
            </div>
            <div className="font-mono text-stone-500 mt-2">
              Mã số: {festival.code}
            </div>
          </div>

          <div className="text-center font-sans">
            <div className="font-bold uppercase tracking-wider text-stone-900">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </div>
            <div className="font-semibold text-stone-800 text-xs mt-0.5">
              Độc lập - Tự do - Hạnh phúc
            </div>
            <div className="text-stone-500 text-2xs mt-1 italic">
              {festival.location.province}, ngày {new Date(festival.surveyMetadata.surveyDate || Date.now()).getDate()} tháng {new Date(festival.surveyMetadata.surveyDate || Date.now()).getMonth() + 1} năm {new Date(festival.surveyMetadata.surveyDate || Date.now()).getFullYear()}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center py-6 space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-stone-950">
            PHIẾU KIỂM KÊ DI SẢN VĂN HÓA PHI VẬT THỂ
          </h1>
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-900">
            LOẠI HÌNH: LỄ HỘI TRUYỀN THỐNG
          </p>
          <p className="text-xs italic text-stone-600 font-sans">
            (Ban hành kèm theo Thông tư số 04/2010/TT-BVHTTDL ngày 30 tháng 6 năm 2010 của Bộ Văn hóa, Thể thao và Du lịch)
          </p>
        </div>

        {/* Photo if exists */}
        {festival.imageCoverUrl && (
          <div className="my-4 p-2 border border-stone-200 rounded-lg text-center avoid-break">
            <img
              src={festival.imageCoverUrl}
              alt={festival.officialName}
              className="max-h-72 w-full object-cover rounded mx-auto"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs italic text-stone-600 mt-2 font-sans">
              Ảnh tư liệu: Không gian diễn xướng và nghi thức {festival.officialName}
            </p>
          </div>
        )}

        {/* Section I */}
        <div className="space-y-4 my-6">
          <div className="bg-stone-100 px-3 py-1.5 font-bold uppercase text-xs tracking-wider border-l-4 border-amber-800 text-stone-900">
            I. THÔNG TIN CHUNG VỀ LỄ HỘI
          </div>

          <table className="w-full text-xs border border-stone-300">
            <tbody>
              <tr className="border-b border-stone-300">
                <td className="p-2.5 font-bold bg-stone-50 w-1/3">1. Tên gọi chính thức của lễ hội:</td>
                <td className="p-2.5 font-bold text-stone-950 text-sm">{festival.officialName}</td>
              </tr>
              <tr className="border-b border-stone-300">
                <td className="p-2.5 font-bold bg-stone-50">2. Tên gọi khác / Tên dân gian:</td>
                <td className="p-2.5 italic">{festival.alternateNames || '(Không có)'}</td>
              </tr>
              <tr className="border-b border-stone-300">
                <td className="p-2.5 font-bold bg-stone-50">3. Cấp độ di sản:</td>
                <td className="p-2.5 font-semibold text-amber-900">{CATEGORY_LABELS[festival.category]}</td>
              </tr>
              <tr className="border-b border-stone-300">
                <td className="p-2.5 font-bold bg-stone-50">4. Loại hình đặc thù:</td>
                <td className="p-2.5">{SUBTYPE_LABELS[festival.subType]}</td>
              </tr>
              <tr className="border-b border-stone-300">
                <td className="p-2.5 font-bold bg-stone-50">5. Dân tộc chủ thể:</td>
                <td className="p-2.5 font-medium">{festival.ethnicGroups?.join(', ') || 'Kinh (Việt)'}</td>
              </tr>
              <tr className="border-b border-stone-300">
                <td className="p-2.5 font-bold bg-stone-50">6. Địa bàn phân bố / Tổ chức:</td>
                <td className="p-2.5">
                  <div>Thôn/Bản: {festival.location.village || '...'}</div>
                  <div>Xã/Phường: {festival.location.commune || '...'}, Huyện/Quận: {festival.location.district || '...'}</div>
                  <div className="font-semibold">Tỉnh / Thành phố: {festival.location.province}</div>
                </td>
              </tr>
              <tr className="border-b border-stone-300">
                <td className="p-2.5 font-bold bg-stone-50">7. Di tích gắn liền với lễ hội:</td>
                <td className="p-2.5">
                  <div>{festival.location.specificSites || 'Chưa cập nhật'}</div>
                  <div className="text-stone-600 mt-0.5">Xếp hạng: {SITE_CLASS_LABELS[festival.location.siteClassification]}</div>
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold bg-stone-50">8. Thời gian tổ chức:</td>
                <td className="p-2.5">
                  <div>- Âm lịch: {festival.timing.lunarStartDate} {festival.timing.lunarMainDate ? `(Chính hội: ${festival.timing.lunarMainDate})` : ''}</div>
                  <div>- Dương lịch tương ứng: {festival.timing.solarSeason || 'Đầu mùa Xuân'}</div>
                  <div>- Chu kỳ: {festival.timing.cycle === 'hang_nam' ? 'Hàng năm' : festival.timing.cycle}; Thời lượng: {festival.timing.durationDays} ngày</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section II */}
        <div className="space-y-4 my-6 avoid-break">
          <div className="bg-stone-100 px-3 py-1.5 font-bold uppercase text-xs tracking-wider border-l-4 border-amber-800 text-stone-900">
            II. CHỦ THỂ & NHÂN VẬT PHỤNG THỜ
          </div>

          <div className="text-xs space-y-3">
            <div>
              <strong className="text-stone-900 block mb-1">1. Nhân vật được phụng thờ chính:</strong>
              <div className="p-2.5 bg-stone-50 border border-stone-200 rounded font-semibold text-stone-900">
                {festival.deities.mainDeities || 'Chưa cập nhật'}
              </div>
            </div>

            <div>
              <strong className="text-stone-900 block mb-1">2. Thần tích, Huyền tích & Sự tích phụng thờ:</strong>
              <div className="p-2.5 border border-stone-200 rounded text-stone-800 leading-relaxed text-justify">
                {festival.deities.mythologyStory || 'Chưa ghi chép'}
              </div>
            </div>

            {festival.deities.titlesConferred && (
              <div>
                <strong className="text-stone-900 block mb-1">3. Sắc phong, tước hiệu các triều đại phong tặng:</strong>
                <div className="p-2.5 bg-stone-50 border border-stone-200 rounded text-stone-800">
                  {festival.deities.titlesConferred}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-2 border border-stone-200 rounded">
                <span className="font-bold block">Ban tổ chức / Ban khánh tiết:</span>
                <span>{festival.practitioners.organizingCommittee || 'UBND xã và Ban khánh tiết thôn làng'}</span>
              </div>
              <div className="p-2 border border-stone-200 rounded">
                <span className="font-bold block">Chức việc tế lễ:</span>
                <span>{festival.practitioners.ritualMasters || 'Chủ tế, bồi tế, đông xướng, tây xướng'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section III */}
        <div className="space-y-4 my-6 avoid-break">
          <div className="bg-stone-100 px-3 py-1.5 font-bold uppercase text-xs tracking-wider border-l-4 border-amber-800 text-stone-900">
            III. DIỄN TRÌNH QUY TRÌNH LỄ - HỘI
          </div>

          <div className="text-xs space-y-3">
            {festival.process.preparation && (
              <div>
                <strong className="text-stone-900 block mb-0.5">1. Công tác chuẩn bị:</strong>
                <p className="text-stone-800 text-justify">{festival.process.preparation}</p>
              </div>
            )}

            <div>
              <strong className="text-stone-900 block mb-0.5">2. Phần Lễ (Nghi thức phụng tế truyền thống):</strong>
              <div className="p-2.5 bg-stone-50 border border-stone-200 rounded text-stone-900 leading-relaxed text-justify">
                {festival.process.ritualPart || 'Chưa ghi chép'}
              </div>
            </div>

            <div>
              <strong className="text-stone-900 block mb-0.5">3. Phần Hội (Trò chơi dân gian & Diễn xướng nghệ thuật):</strong>
              <div className="p-2.5 bg-stone-50 border border-stone-200 rounded text-stone-900 leading-relaxed text-justify">
                {festival.process.festivalPart || 'Chưa ghi chép'}
              </div>
            </div>

            {festival.process.offerings && (
              <div>
                <strong className="text-stone-900 block mb-0.5">4. Lễ vật & Ẩm thực hiến dâng:</strong>
                <p className="text-stone-800 italic">{festival.process.offerings}</p>
              </div>
            )}
          </div>
        </div>

        {/* Section IV: Artifacts Table */}
        <div className="space-y-4 my-6 avoid-break">
          <div className="bg-stone-100 px-3 py-1.5 font-bold uppercase text-xs tracking-wider border-l-4 border-amber-800 text-stone-900">
            IV. HIỆN VẬT LIÊN QUAN & GIÁ TRỊ DI SẢN
          </div>

          <div className="text-xs space-y-3">
            <strong className="text-stone-900 block">1. Danh mục hiện vật, cổ vật, đồ thờ tự gắn liền:</strong>
            {festival.associatedArtifacts.length > 0 ? (
              <table className="w-full text-xs border border-stone-300">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-300 font-bold">
                    <th className="p-2 border-r border-stone-300">TT</th>
                    <th className="p-2 border-r border-stone-300">Tên hiện vật</th>
                    <th className="p-2 border-r border-stone-300">Phân loại</th>
                    <th className="p-2 border-r border-stone-300">Niên đại</th>
                    <th className="p-2 border-r border-stone-300">Số lượng</th>
                    <th className="p-2">Tình trạng bảo quản</th>
                  </tr>
                </thead>
                <tbody>
                  {festival.associatedArtifacts.map((art, idx) => (
                    <tr key={art.id} className="border-b border-stone-200">
                      <td className="p-2 border-r border-stone-300 text-center">{idx + 1}</td>
                      <td className="p-2 border-r border-stone-300 font-semibold">{art.name}</td>
                      <td className="p-2 border-r border-stone-300">{art.type}</td>
                      <td className="p-2 border-r border-stone-300">{art.era}</td>
                      <td className="p-2 border-r border-stone-300 text-center">{art.quantity}</td>
                      <td className="p-2">{art.condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="italic text-stone-500">Chưa ghi nhận danh mục hiện vật cụ thể.</p>
            )}

            <div className="pt-2 space-y-2">
              <strong className="text-stone-900 block">2. Đánh giá các giá trị di sản tiêu biểu:</strong>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-2xs sm:text-xs">
                <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                  <span className="font-bold block text-stone-900">Giá trị lịch sử:</span>
                  <span>{festival.heritageValue.historicalValue || 'Bảo lưu dấu ấn lịch sử dân tộc.'}</span>
                </div>
                <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                  <span className="font-bold block text-stone-900">Giá trị văn hóa - nghệ thuật:</span>
                  <span>{festival.heritageValue.culturalArtisticValue || 'Đỉnh cao diễn xướng tâm linh truyền thống.'}</span>
                </div>
                <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                  <span className="font-bold block text-stone-900">Giá trị cố kết cộng đồng:</span>
                  <span>{festival.heritageValue.communityCohesionValue || 'Gắn kết bền chặt cộng đồng làng xã.'}</span>
                </div>
                <div className="p-2 bg-stone-50 border border-stone-200 rounded">
                  <span className="font-bold block text-stone-900">Giá trị giáo dục:</span>
                  <span>{festival.heritageValue.educationValue || 'Uống nước nhớ nguồn cho các thế hệ trẻ.'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section V */}
        <div className="space-y-4 my-6 avoid-break">
          <div className="bg-stone-100 px-3 py-1.5 font-bold uppercase text-xs tracking-wider border-l-4 border-amber-800 text-stone-900">
            V. HIỆN TRẠNG BẢO TỒN & GIẢI PHÁP
          </div>

          <div className="text-xs space-y-2.5">
            <div>
              <span className="font-bold text-stone-900">Sức sống thực tế của di sản: </span>
              <span className="font-semibold text-amber-900">{VITALITY_LABELS[festival.conservationStatus.currentVitality]?.text}</span>
            </div>

            {festival.conservationStatus.threats && festival.conservationStatus.threats.length > 0 && (
              <div>
                <span className="font-bold text-stone-900 block mb-1">Các nguy cơ, thách thức:</span>
                <ul className="list-disc list-inside space-y-0.5 text-stone-800 pl-2">
                  {festival.conservationStatus.threats.map((thr, i) => (
                    <li key={i}>{thr}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <span className="font-bold text-stone-900 block mb-1">Đề xuất giải pháp bảo vệ và phát huy giá trị di sản:</span>
              <p className="p-2.5 bg-stone-50 border border-stone-200 rounded text-stone-800 leading-relaxed text-justify">
                {festival.conservationStatus.proposals || 'Tiếp tục duy trì và tạo điều kiện thuận lợi cho cộng đồng thực hành di sản.'}
              </p>
            </div>

            {festival.surveyMetadata.documentationMedia && (
              <div>
                <span className="font-bold text-stone-900">Hồ sơ nghe nhìn đính kèm: </span>
                <span className="italic text-stone-700">{festival.surveyMetadata.documentationMedia}</span>
              </div>
            )}
          </div>
        </div>

        {/* Official Signatures Block */}
        <div className="mt-12 pt-6 border-t-2 border-stone-400 avoid-break">
          <div className="grid grid-cols-3 gap-4 text-center font-sans text-xs">
            <div className="space-y-16">
              <div>
                <div className="font-bold uppercase text-stone-900">NGƯỜI LẬP PHIẾU</div>
                <div className="text-stone-500 italic text-2xs">(Ký và ghi rõ họ tên)</div>
              </div>
              <div className="font-semibold text-stone-900 pt-8">
                {festival.surveyMetadata.surveyorName || 'Nguyễn Văn A'}
              </div>
            </div>

            <div className="space-y-16">
              <div>
                <div className="font-bold uppercase text-stone-900">ĐẠI DIỆN CỘNG ĐỒNG</div>
                <div className="text-stone-500 italic text-2xs">(Nghệ nhân / Trưởng thôn)</div>
              </div>
              <div className="font-semibold text-stone-900 pt-8">
                {festival.surveyMetadata.informantName || 'Trưởng ban khánh tiết'}
              </div>
            </div>

            <div className="space-y-16">
              <div>
                <div className="font-bold uppercase text-stone-900">THỦ TRƯỞNG ĐƠN VỊ</div>
                <div className="text-stone-500 italic text-2xs">(Ký tên và đóng dấu)</div>
              </div>
              <div className="font-semibold text-stone-900 pt-8">
                {festival.surveyMetadata.supervisorName || 'Lãnh đạo đơn vị'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
