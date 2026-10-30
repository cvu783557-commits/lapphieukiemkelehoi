/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FestivalCategory = 
  | 'unesco'
  | 'quoc_gia'
  | 'cap_tinh'
  | 'cap_huyen'
  | 'lang_xa';

export type FestivalSubType = 
  | 'lich_su'
  | 'nong_nghiep'
  | 'ton_giao_tin_nguong'
  | 'dan_gian_thieu_so'
  | 'nghe_nghiep'
  | 'anh_hung_dan_toc';

export type SiteClassification = 
  | 'dac_biet'
  | 'quoc_gia'
  | 'cap_tinh'
  | 'chua_xep_hang';

export type FestivalCycle = 
  | 'hang_nam'
  | '2_nam'
  | '3_nam'
  | '5_nam'
  | 'khac';

export type VitalityStatus = 
  | 'rat_tot'
  | 'tot'
  | 'suy_giam'
  | 'nguy_co_mai_mot'
  | 'can_bao_ve_khan_cap';

export type DossierStatus = 
  | 'ban_thao'
  | 'cho_tham_dinh'
  | 'da_duyet'
  | 'chuyen_ho_so_quoc_gia';

export interface AssociatedArtifact {
  id: string;
  name: string;
  type: string;
  era: string;
  quantity: string;
  condition: string;
  notes: string;
}

export interface FestivalInventoryRecord {
  id: string;
  code: string; // Mã phiếu kiểm kê (e.g. 01/BVHTTDL-LH)
  officialName: string; // Tên gọi chính thức
  alternateNames: string; // Tên gọi khác / dân gian
  category: FestivalCategory;
  subType: FestivalSubType;
  ethnicGroups: string[]; // Dân tộc chủ thể
  
  // Địa điểm
  location: {
    province: string;
    district: string;
    commune: string;
    village: string;
    specificSites: string; // Đền, đình, chùa, bến sông...
    siteClassification: SiteClassification;
    coordinates?: string;
  };

  // Thời gian
  timing: {
    lunarStartDate: string; // e.g. "Mùng 6 tháng Ba"
    lunarMainDate: string;  // e.g. "Mùng 10 tháng Ba"
    solarSeason: string;    // e.g. "Tháng 4 dương lịch"
    cycle: FestivalCycle;
    durationDays: number;
  };

  // Nhân vật phụng thờ
  deities: {
    mainDeities: string; // Nhân vật phụng thờ chính
    mythologyStory: string; // Thần tích, sự tích phụng thờ
    titlesConferred: string; // Sắc phong, tước hiệu
  };

  // Chủ thể thực hành
  practitioners: {
    organizingCommittee: string; // Ban tổ chức / Ban khánh tiết
    ritualMasters: string; // Chủ tế, bồi tế, đội tế nam/nữ
    artisanHolders: string; // Nghệ nhân tiêu biểu nắm giữ nghi thức
    communityParticipants: string; // Cộng đồng dân cư tham gia
  };

  // Diễn biến quy trình
  process: {
    preparation: string; // Chuẩn bị lễ vật, bao sái, tập dượt
    ritualPart: string; // Phần Lễ: Mộc dục, rước nước, rước kiệu, đại tế
    festivalPart: string; // Phần Hội: Trò chơi dân gian, hát xướng
    offerings: string; // Lễ vật dâng cúng, ẩm thực truyền thống
  };

  // Hiện vật liên quan
  associatedArtifacts: AssociatedArtifact[];

  // Giá trị di sản
  heritageValue: {
    historicalValue: string; // Giá trị lịch sử
    culturalArtisticValue: string; // Giá trị văn hóa - nghệ thuật
    communityCohesionValue: string; // Gắn kết cộng đồng
    educationValue: string; // Giáo dục truyền thống
  };

  // Hiện trạng & Bảo tồn
  conservationStatus: {
    currentVitality: VitalityStatus;
    threats: string[]; // Nguy cơ mai một
    proposals: string; // Đề xuất giải pháp bảo vệ
  };

  // Thông tin kiểm kê
  surveyMetadata: {
    surveyorName: string;
    surveyorTitle: string;
    organization: string;
    surveyDate: string;
    supervisorName: string;
    informantName: string; // Người cung cấp thông tin (nghệ nhân/cao niên)
    documentationMedia: string; // Tài liệu đính kèm: Ảnh, ghi âm, video
    status: DossierStatus;
  };

  imageCoverUrl?: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<FestivalCategory, string> = {
  unesco: 'Di sản thế giới (UNESCO)',
  quoc_gia: 'Di sản Quốc gia',
  cap_tinh: 'Di sản Cấp Tỉnh',
  cap_huyen: 'Cấp Huyện / Vùng',
  lang_xa: 'Lễ hội Làng / Xã'
};

export const SUBTYPE_LABELS: Record<FestivalSubType, string> = {
  lich_su: 'Lịch sử - Tưởng niệm anh hùng',
  nong_nghiep: 'Nông nghiệp & Tín ngưỡng phồn thực',
  ton_giao_tin_nguong: 'Tôn giáo - Tín ngưỡng tâm linh',
  dan_gian_thieu_so: 'Lễ hội dân gian các dân tộc thiểu số',
  nghe_nghiep: 'Nghề nghiệp - Lễ giỗ tổ nghề',
  anh_hung_dan_toc: 'Tưởng nhớ danh nhân anh hùng dân tộc'
};

export const VITALITY_LABELS: Record<VitalityStatus, { text: string; colorClass: string }> = {
  rat_tot: { text: 'Thực hành rất tốt', colorClass: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300' },
  tot: { text: 'Duy trì ổn định', colorClass: 'text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300' },
  suy_giam: { text: 'Có dấu hiệu suy giảm', colorClass: 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300' },
  nguy_co_mai_mot: { text: 'Nguy cơ mai một cao', colorClass: 'text-orange-700 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-300' },
  can_bao_ve_khan_cap: { text: 'Cần bảo vệ khẩn cấp', colorClass: 'text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300' }
};

export const DOSSIER_STATUS_LABELS: Record<DossierStatus, { text: string; colorClass: string }> = {
  ban_thao: { text: 'Bản thảo', colorClass: 'text-stone-600 bg-stone-100 dark:bg-stone-800 dark:text-stone-300' },
  cho_tham_dinh: { text: 'Chờ thẩm định', colorClass: 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300' },
  da_duyet: { text: 'Đã nghiệm thu', colorClass: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300' },
  chuyen_ho_so_quoc_gia: { text: 'Lập hồ sơ Quốc gia', colorClass: 'text-purple-700 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300' }
};

export const SITE_CLASS_LABELS: Record<SiteClassification, string> = {
  dac_biet: 'Di tích Quốc gia đặc biệt',
  quoc_gia: 'Di tích Quốc gia',
  cap_tinh: 'Di tích Cấp Tỉnh/Thành phố',
  chua_xep_hang: 'Di tích chưa xếp hạng'
};

export const VIETNAMESE_ETHNICITIES = [
  'Kinh (Việt)', 'Tày', 'Thái', 'Mường', 'H\'Mông', 'Dao', 'Khmer', 'Nùng', 
  'Chăm', 'Hoa', 'Gia Rai', 'Ê Đê', 'Ba Na', 'Sán Chay', 'Cơ Ho', 'Chăm Hroi',
  'Xơ Đăng', 'Sán Dìu', 'Hrê', 'Mnông', 'Ra Glai', 'Bru - Vân Kiều', 'Thổ', 
  'Giáy', 'Cơ Tu', 'Giẻ Triêng', 'Tà Ôi', 'Mạ', 'Kháng', 'Co', 'Ta Ôi', 'Khác'
];

export const VIETNAMESE_PROVINCES = [
  'Hà Nội', 'TP. Hồ Chí Minh', 'Phú Thọ', 'Bắc Ninh', 'Bắc Giang', 'Quảng Ninh', 
  'Ninh Bình', 'Nam Định', 'Thái Bình', 'Hải Dương', 'Hải Phòng', 'Hà Nam', 
  'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên Huế', 
  'Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định', 'Phú Yên', 'Khánh Hòa', 
  'Ninh Thuận', 'Bình Thuận', 'Kon Tum', 'Gia Lai', 'Đắk Lắk', 'Đắk Nông', 
  'Lâm Đồng', 'Bình Phước', 'Tây Ninh', 'Bình Dương', 'Đồng Nai', 'Bà Rịa - Vũng Tàu', 
  'Long An', 'Tiền Giang', 'Bến Tre', 'Trà Vinh', 'Vĩnh Long', 'Đồng Tháp', 
  'An Giang', 'Kiên Giang', 'Cần Thơ', 'Hậu Giang', 'Sóc Trăng', 'Bạc Liêu', 
  'Cà Mau', 'Hòa Bình', 'Sơn La', 'Điện Biên', 'Lai Châu', 'Lào Cai', 
  'Yên Bái', 'Hà Giang', 'Tuyên Quang', 'Cao Bằng', 'Bắc Kạn', 'Thái Nguyên', 
  'Lạng Sơn'
];
