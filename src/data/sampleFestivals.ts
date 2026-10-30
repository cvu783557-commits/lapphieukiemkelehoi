/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FestivalInventoryRecord } from '../types/festival';

export const INITIAL_SAMPLE_FESTIVALS: FestivalInventoryRecord[] = [
  {
    id: 'PKK-LH-HN-001',
    code: '01/DSVHPVT-LHTT',
    officialName: 'Hội Gióng đền Phù Đổng và đền Sóc',
    alternateNames: 'Hội làng Gióng, Lễ hội Thánh Gióng Phù Đổng',
    category: 'unesco',
    subType: 'anh_hung_dan_toc',
    ethnicGroups: ['Kinh (Việt)'],
    location: {
      province: 'Hà Nội',
      district: 'Gia Lâm & Sóc Sơn',
      commune: 'Xã Phù Đổng & Xã Phù Linh',
      village: 'Làng Phù Đổng, Làng Vệ Linh',
      specificSites: 'Đền Thượng Phù Đổng, Đền Hạ, Đền Mẫu, Đền Sóc',
      siteClassification: 'dac_biet',
      coordinates: '21.0562, 105.9521'
    },
    timing: {
      lunarStartDate: 'Mùng 7 tháng 4 âm lịch',
      lunarMainDate: 'Mùng 9 tháng 4 âm lịch',
      solarSeason: 'Tháng 5 dương lịch',
      cycle: 'hang_nam',
      durationDays: 4
    },
    deities: {
      mainDeities: 'Phù Đổng Thiên Vương (Thánh Gióng - một trong Tứ bất tử của tín ngưỡng dân gian Việt Nam)',
      mythologyStory: 'Truyền thuyết Thánh Gióng đánh tan giặc Ân thời Hùng Vương thứ 6, sau khi dẹp tan quân xâm lược đã cởi bỏ áo giáp bay về trời tại núi Sóc Sơn. Hội Gióng là một kịch trường dân gian diễn xướng lại toàn bộ chiến công oanh liệt.',
      titlesConferred: 'Được phong tặng tước hiệu Phù Đổng Thiên Vương, Dực Bảo Trung Hưng, các đời vua Lý, Trần, Lê, Nguyễn đều ban sắc phong và chuẩn cho quốc tế.'
    },
    practitioners: {
      organizingCommittee: 'Ban quản lý di tích Đền Phù Đổng và UBND Huyện Gia Lâm',
      ritualMasters: 'Chủ tế thượng đồng, Ban khánh tiết các thôn chạ, Đội tế phụ lão',
      artisanHolders: 'Nghệ nhân múa cờ lệnh, các Cô Tướng, Đội phù giá, Quân đồng phục khiêng kiệu',
      communityParticipants: 'Toàn thể cộng đồng cư dân vùng Phù Đổng cùng hàng vạn du khách trẩy hội thập phương.'
    },
    process: {
      preparation: 'Từ tháng Ba âm lịch, các giáp họp chọn người đóng vai Ông Hiệu (Hiệu Cờ, Hiệu Trống, Hiệu Chiêng, Hiệu Tiểu Cổ), tuyển chọn các bé gái thanh khiết đóng 28 Cô Tướng tượng trưng cho quân giặc.',
      ritualPart: 'Lễ rước nước giếng đền Hạ về đền Thượng tôi luyện vũ khí; Lễ rước khám đường; Lễ tế khao quân; Nghi thức múa Cờ Lệnh của Ông Hiệu Cờ tái hiện các thế trận đánh giặc ngoạn mục.',
      festivalPart: 'Diễn xướng trận đánh giặc Ân tại bãi Đống Đàm và Soi Bia; nghi thức cướp chiếu, giằng hoa tre lấy lộc may mắn; hát xướng quan họ trên thuyền rồng.',
      offerings: 'Voi chiến đan nan, ngựa sắt, hoa tre nhuộm phẩm màu ngũ sắc, cỗ chay thanh tịnh, quả dừa, cau trầu tế lễ.'
    },
    associatedArtifacts: [
      {
        id: 'art-001',
        name: 'Sắc phong thời Lê - Nguyễn cho Đền Phù Đổng',
        type: 'Văn bản Hán Nôm',
        era: 'Thế kỷ XVII - XIX',
        quantity: '21 đạo sắc phong',
        condition: 'Bảo quản tốt trong hộp đựng sắc',
        notes: 'Nội dung ca ngợi công đức dẹp giặc của Đức Phù Đổng Thiên Vương.'
      },
      {
        id: 'art-002',
        name: 'Kiệu Bát Cống sơn son thếp vàng',
        type: 'Đồ gỗ mỹ nghệ thờ tự',
        era: 'Hậu Lê (Thế kỷ XVIII)',
        quantity: '04 cỗ',
        condition: 'Còn nguyên vẹn đường nét chạm trổ rồng mây',
        notes: 'Dùng trong lễ rước kiệu chính hội mùng 9 tháng 4.'
      },
      {
        id: 'art-003',
        name: 'Bia đá Phù Đổng Thiên Vương miếu bi ký',
        type: 'Bia ký đá cổ',
        era: 'Năm Chính Hòa (1684)',
        quantity: '01 tấm',
        condition: 'Chữ khắc còn rõ, đặt tại đền Thượng',
        notes: 'Ghi chép quy mô đền miếu và quy ước tế lễ hàng năm.'
      }
    ],
    heritageValue: {
      historicalValue: 'Bảo lưu trọn vẹn tri thức dân gian và tinh thần yêu nước chống ngoại xâm quật cường từ thuở mở nước thời đại Hùng Vương.',
      culturalArtisticValue: 'Đỉnh cao của kịch trường tâm linh dân gian với biểu tượng hoa tre, trang phục tướng lĩnh, vũ điệu cờ lệnh.',
      communityCohesionValue: 'Liên kết chặt chẽ các làng xã cổ (hệ thống liên làng chạ ven sông Đuống) qua hàng trăm năm lịch sử.',
      educationValue: 'Giáo dục lòng yêu nước, ý thức quật cường và tinh thần đoàn kết chống giặc ngoại xâm cho các thế hệ con cháu.'
    },
    conservationStatus: {
      currentVitality: 'rat_tot',
      threats: ['Đông đúc quá tải du khách', 'Thương mại hóa dịch vụ xung quanh', 'Cần giữ gìn nghiêm cẩn nghi thức hiến tế cổ truyền'],
      proposals: 'Tiếp tục thực hiện Kế hoạch hành động quốc gia bảo vệ di sản văn hóa phi vật thể UNESCO; hỗ trợ chế độ cho các gia đình nghệ nhân đóng vai Hiệu.'
    },
    surveyMetadata: {
      surveyorName: 'Nguyễn Văn Hùng',
      surveyorTitle: 'Chuyên viên kiểm kê di sản',
      organization: 'Sở Văn hóa và Thể thao Hà Nội',
      surveyDate: '2026-04-15',
      supervisorName: 'PGS. TS. Trần Đình Tuấn',
      informantName: 'Cụ Nguyễn Khắc Đạt (84 tuổi, Trưởng ban khánh tiết đền Phù Đổng)',
      documentationMedia: '120 ảnh tư liệu số, 03 băng video 4K ghi lại trận đánh giặc tại Soi Bia, 01 bản ghi âm chúc văn.',
      status: 'da_duyet'
    },
    imageCoverUrl: '/src/assets/images/festival_procession_1793362719548.jpg',
    updatedAt: '2026-04-18T10:30:00Z'
  },
  {
    id: 'PKK-LH-PT-002',
    code: '02/DSVHPVT-LHTT',
    officialName: 'Lễ hội Đền Hùng (Giỗ Tổ Hùng Vương)',
    alternateNames: 'Lễ giỗ Tổ, Quốc giỗ Hùng Vương, Lễ hội Phong Châu',
    category: 'quoc_gia',
    subType: 'lich_su',
    ethnicGroups: ['Kinh (Việt)', 'Mường'],
    location: {
      province: 'Phú Thọ',
      district: 'Việt Trì & Lâm Thao',
      commune: 'Xã Hy Cương, Xã Chu Hóa, Tiên Kiên',
      village: 'Làng Cổ Tích',
      specificSites: 'Khu Di tích lịch sử Đền Hùng (Đền Hạ, Đền Trung, Đền Thượng, Lăng Hùng Vương, Đền Giếng)',
      siteClassification: 'dac_biet',
      coordinates: '21.3654, 105.3218'
    },
    timing: {
      lunarStartDate: 'Mùng 1 tháng 3 âm lịch',
      lunarMainDate: 'Mùng 10 tháng 3 âm lịch',
      solarSeason: 'Tháng 4 dương lịch',
      cycle: 'hang_nam',
      durationDays: 10
    },
    deities: {
      mainDeities: '18 đời Hùng Vương - Thủy tổ dựng nước của dân tộc Việt Nam, Đức Quốc Tổ Lạc Long Quân và Mẹ Âu Cơ',
      mythologyStory: 'Huyền thoại Con Rồng Cháu Tiên, trăm trứng nở trăm con, mở mang bờ cõi Phong Châu đặt nền móng Văn Lang.',
      titlesConferred: 'Các triều đại đều suy tôn là Tổ tiên nước Nam, lập miếu phụng thờ tại núi Nghĩa Lĩnh.'
    },
    practitioners: {
      organizingCommittee: 'UBND Tỉnh Phú Thọ phối hợp Bộ Văn hóa, Thể thao và Du lịch',
      ritualMasters: 'Đại diện lãnh đạo Đảng, Nhà nước cùng Ban chủ tế các làng cổ ven chân núi Đền Hùng',
      artisanHolders: 'Nghệ nhân Hát Xoan Phú Thọ, đội rước kiệu các xã vùng ven (Hy Cương, Chu Hóa, Hùng Lô)',
      communityParticipants: 'Hàng triệu đồng bào từ khắp mọi miền Tổ quốc và kiều bào nước ngoài hành hương về nguồn.'
    },
    process: {
      preparation: 'Dâng hương tưởng niệm Đức Quốc Tổ Lạc Long Quân mùng 6/3, Lễ dâng hương Tổ Mẫu Âu Cơ, trang hoàng cờ hoa ngũ sắc.',
      ritualPart: 'Lễ rước kiệu về Đền Hùng của các xã vùng ven; Lễ dâng hương chính thức vào 7h00 sáng mùng 10/3 âm lịch trên đỉnh núi Nghĩa Lĩnh linh thiêng.',
      festivalPart: 'Liên hoan hát Xoan cổ làng cổ, thi gói bánh chưng giã bánh giầy, hội bơi chải trên sông Lô, thi đấu cờ tướng, bắn nỏ, hội trại văn hóa các huyện.',
      offerings: 'Bánh chưng hình vuông tượng trưng cho Đất, Bánh giầy hình tròn tượng trưng cho Trời, ngũ quả sơn hào hải vị, rượu cúc.'
    },
    associatedArtifacts: [
      {
        id: 'art-004',
        name: 'Trống đồng Hy Cương (Trống đồng Đền Hùng)',
        type: 'Bảo vật Quốc gia',
        era: 'Văn hóa Đông Sơn (Cách ngày nay ~2.500 năm)',
        quantity: '01 chiếc',
        condition: 'Bảo quản đặc biệt tại Bảo tàng Hùng Vương',
        notes: 'Trống loại I Heger, hoa văn hình chim lạc, thuyền chiến, người giã gạo.'
      },
      {
        id: 'art-005',
        name: 'Bia đá Cổ tích từ bi ký',
        type: 'Bia đá thời Nguyễn',
        era: 'Năm Khải Định thứ 7 (1922)',
        quantity: '01 tấm',
        condition: 'Nguyên vẹn tại đền Thượng',
        notes: 'Khắc ghi ngày quốc tế chính thức 10 tháng 3 âm lịch hàng năm.'
      }
    ],
    heritageValue: {
      historicalValue: 'Biểu tượng tối cao của sự khởi nguồn giống nòi và lịch sử dựng nước hào hùng của dân tộc Việt Nam.',
      culturalArtisticValue: 'Gắn liền với Di sản Hát Xoan Phú Thọ và nghệ thuật ẩm thực cúng tiến độc đáo.',
      communityCohesionValue: 'Cội nguồn tâm linh cố kết sức mạnh đại đoàn kết toàn dân tộc: "Dù ai đi ngược về xuôi - Nhớ ngày Giỗ Tổ mùng mười tháng Ba".',
      educationValue: 'Khơi dậy niềm tự hào dân tộc, đạo lý uống nước nhớ nguồn sâu sắc cho mọi thế hệ người Việt.'
    },
    conservationStatus: {
      currentVitality: 'rat_tot',
      threats: ['Áp lực du khách đột biến trong ngày chính hội', 'Quản lý cảnh quan và chống rác thải sinh thái'],
      proposals: 'Phát triển bảo tàng số Đền Hùng, chuẩn hóa nghi thức tế lễ địa phương, bảo tồn không gian diễn xướng Hát Xoan gốc.'
    },
    surveyMetadata: {
      surveyorName: 'Lê Hoàng Yến',
      surveyorTitle: 'Nghiên cứu viên di sản',
      organization: 'Khu Di tích Lịch sử Đền Hùng',
      surveyDate: '2026-03-25',
      supervisorName: 'Đặng Thị Minh',
      informantName: 'Cụ Triệu Quốc Cường (Chủ tế đình làng Hùng Lô)',
      documentationMedia: 'Hồ sơ khoa học di sản quốc gia, 200 bức ảnh độ phân giải cao, sơ đồ bản đồ phân bố di tích.',
      status: 'da_duyet'
    },
    imageCoverUrl: '/src/assets/images/festival_hero_banner_1793362717654.jpg',
    updatedAt: '2026-03-28T08:15:00Z'
  },
  {
    id: 'PKK-LH-BT-003',
    code: '03/DSVHPVT-LHTT',
    officialName: 'Lễ hội Cầu ngư Vạn Thủy Tú',
    alternateNames: 'Hội Nghinh Ông, Lễ hội cúng Thần Nam Hải',
    category: 'quoc_gia',
    subType: 'nong_nghiep',
    ethnicGroups: ['Kinh (Việt)', 'Chăm'],
    location: {
      province: 'Bình Thuận',
      district: 'Thành phố Phan Thiết',
      commune: 'Phường Đức Thắng',
      village: 'Vạn Thủy Tú',
      specificSites: 'Đình Vạn Thủy Tú, Đền thờ Nam Hải Thần Ngư, bến cá Phan Thiết',
      siteClassification: 'quoc_gia',
      coordinates: '10.9234, 108.1021'
    },
    timing: {
      lunarStartDate: 'Ngày 19 tháng 6 âm lịch',
      lunarMainDate: 'Ngày 20 tháng 6 âm lịch',
      solarSeason: 'Tháng 7 - 8 dương lịch',
      cycle: 'hang_nam',
      durationDays: 3
    },
    deities: {
      mainDeities: 'Nam Hải Cự Tộc Ngọc Lân Tôn Thần (Thần Cá Voi - Thần hộ mệnh của ngư dân miền biển)',
      mythologyStory: 'Tín ngưỡng tôn kính cá voi thường cứu giúp thuyền bè ngư dân vượt qua phong ba bão táp trên biển cả. Xác cá voi trôi dạt vào bờ được nhân dân mai táng trọng thể và thờ cúng trong vạn.',
      titlesConferred: 'Triều Nguyễn ban tặng 24 đạo sắc phong tôn thần Nam Hải, suy tôn là phúc thần bảo trợ ngư dân bình an trên biển cả.'
    },
    practitioners: {
      organizingCommittee: 'Ban quản lý Vạn Thủy Tú cùng Hội nghề cá Thành phố Phan Thiết',
      ritualMasters: 'Cụ Chánh bái là ngư dân cao tuổi đức độ, uy tín và am hiểu lễ tục',
      artisanHolders: 'Đội Hát Bả Trạo (chèo bả trạo cầu an), đội nhạc lễ bát âm miền biển',
      communityParticipants: 'Hàng ngàn ngư dân các làng chài ven biển Phan Thiết cùng các thuyền viên.'
    },
    process: {
      preparation: 'Họp dân vạn, kiểm tra trang phục bả trạo, sơn sửa thuyền rước nghinh thần, chuẩn bị lễ vật hiến tế.',
      ritualPart: 'Lễ rước sắc thần từ bến biển về đình; Lễ thỉnh sanh; Đại lễ tế Thần Nam Hải lúc nửa đêm; nghi thức chèo Bả Trạo với các bài hát múa chèo thuyền vượt sóng gió.',
      festivalPart: 'Đua thuyền rồng truyền thống trên sông Cà Ty, hội lắc thúng chai trên bãi biển, biểu diễn hát bội (tuồng) phục vụ nhân dân.',
      offerings: 'Đầu heo, xôi gấc, rượu nếp, trầu cau, hoa quả tươi (tuyệt đối không cúng hải sản tôm cá).'
    },
    associatedArtifacts: [
      {
        id: 'art-006',
        name: 'Bộ xương cá voi lớn nhất Đông Nam Á',
        type: 'Tiêu bản di cốt sinh vật biển',
        era: 'Hơn 250 năm trước',
        quantity: '01 bộ (Dài 22 mét, nặng 65 tấn)',
        condition: 'Bảo tồn hoàn hảo trong nhà trưng bày di cốt vạn Thủy Tú',
        notes: 'Được ngư dân lưu giữ tôn kính qua nhiều thế hệ.'
      },
      {
        id: 'art-007',
        name: 'Sắc phong thời vua Thiệu Trị, Tự Đức cho Thần Nam Hải',
        type: 'Văn bản Hán Nôm sắc phong',
        era: 'Thế kỷ XIX',
        quantity: '24 đạo sắc',
        condition: 'Lưu giữ trang nghiêm trong khánh thờ',
        notes: 'Minh chứng cho chính sách của triều đình đối với tín ngưỡng biển đảo.'
      }
    ],
    heritageValue: {
      historicalValue: 'Phản ánh quá trình khai hoang lập nghiệp của cư dân người Việt gắn liền với không gian biển đảo miền Trung.',
      culturalArtisticValue: 'Nghệ thuật diễn xướng dân gian chèo Bả Trạo độc đáo, kết hợp giữa thi ca, âm nhạc và động tác chèo thuyền nhịp nhàng.',
      communityCohesionValue: 'Thắt chặt tinh thần tương trợ giữa các bạn thuyền, gìn giữ tình làng nghĩa xóm vùng duyên hải.',
      educationValue: 'Ý thức bảo vệ môi trường biển, tôn trọng thiên nhiên và khẳng định chủ quyền biển đảo thiêng liêng.'
    },
    conservationStatus: {
      currentVitality: 'tot',
      threats: ['Lực lượng diễn viên trẻ hát bả trạo ít dần', 'Ô nhiễm môi trường ven bờ'],
      proposals: 'Mở lớp truyền dạy hát múa bả trạo trong trường học địa phương; số hóa kho tư liệu sắc phong Hán Nôm.'
    },
    surveyMetadata: {
      surveyorName: 'Nguyễn Tấn Đạt',
      surveyorTitle: 'Cán bộ bảo tồn di sản',
      organization: 'Bảo tàng Tỉnh Bình Thuận',
      surveyDate: '2026-07-02',
      supervisorName: 'Võ Thị Thu Thảo',
      informantName: 'Ông Huỳnh Văn Sáu (76 tuổi, Chánh bái vạn Thủy Tú)',
      documentationMedia: '01 đĩa DVD diễn xướng chèo bả trạo, 85 ảnh khảo sát thực địa, bản ký âm làn điệu cổ.',
      status: 'da_duyet'
    },
    imageCoverUrl: '/src/assets/images/festival_boat_race_1793362719085.jpg',
    updatedAt: '2026-07-05T14:20:00Z'
  }
];
