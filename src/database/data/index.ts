import { ERole } from 'src/common/constants/role.enum';

export const categoriesData = [
  {
    name: 'Bóng bàn',
    imgSrc: '/assets/images/categories/bong-ban.png',
    subCategories: [{ name: 'Bóng' }, { name: 'Vợt' }, { name: 'Bàn' }],
  },
  {
    name: 'Pickleball',
    imgSrc: '/assets/images/categories/pickleball.png',
    subCategories: [
      {
        name: 'Dòng chuyên nghiệp',
        imgSrc: '/assets/images/categories/dong-chuyen-nghiep.png',
      },
      { name: 'Newbie', imgSrc: '/assets/images/categories/newbie.png' },
      { name: 'Couple', imgSrc: '/assets/images/categories/couple.png' },
    ],
  },
  {
    name: 'Thời trang',
    imgSrc: '/assets/images/categories/thoi-trang.png',
    subCategories: [{ name: 'Áo' }, { name: 'Quần' }, { name: 'Khăn' }],
  },
  {
    name: 'Phụ kiện thể thao',
    imgSrc: '/assets/images/categories/phu-kien-the-thao.png',
  },
];

export const brandsData = [
  {
    name: 'Double Fish',
  },
  {
    name: 'Mofit',
  },
];

export const usersData = [
  {
    username: 'dhson0612',
    email: 'dhson0612@gmail.com',
    phoneNumber: '0354335099',
    password: '123456',
    firstName: 'Son',
    lastName: 'Dang',
  },
  {
    username: 'admin',
    email: 'admin@gmail.com',
    phoneNumber: '0919919950',
    password: '1',
    firstName: 'Admin',
    lastName: 'Double Fish',
    role: ERole.ADMIN,
  },
];

export const discountsData = [
  {
    percentage: 10,
    startDate: '2025-03-15T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
  },
  {
    percentage: 15,
    startDate: '2025-03-15T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
  },
];

export const attributesData = [
  {
    label: 'New Arrivals',
    value: 'new_arrivals',
  },
  {
    label: 'Best Seller',
    value: 'best_seller',
  },
  {
    label: 'Top Rated',
    value: 'top_rated',
  },
  {
    label: 'Featured Products',
    value: 'featured',
  },
];

export const productsData = [
  {
    id: 233,
    sku: 'DFPK-1104',
    categoryName: 'Dòng chuyên nghiệp',
    brandName: 'Double Fish',
    attributeValues: ['new_arrivals', 'featured'],
    title: 'Vợt Pickleball DFPK-1104',
    price: 58000000,
    imgSrc: '/assets/images/products/pickleball-DFPK-1104-min.png',
    imgSrc2: '/assets/images/products/pickleball-DFPK-1104-min.png',
    ratings: 5,
    discountPercentage: 15,
    shortDescription:
      'Vợt pickleball cao cấp dành cho vận động viên chuyên nghiệp, thiết kế tối ưu cho độ bền và hiệu suất.',
    description:
      "<h4 class=''>1. <strong>Thiết kế và chất liệu cao cấp</strong></h4><p class=''>Vợt pickleball được chế tạo từ chất liệu [carbon fiber / composite / gỗ cao cấp], giúp tăng độ bền, giảm trọng lượng và tối ưu lực đánh. Bề mặt vợt có kết cấu đặc biệt giúp kiểm soát bóng tốt hơn, mang đến độ xoáy và độ chính xác cao trong từng cú đánh.</p><h4 class=''>2. <strong>Hiệu suất vượt trội</strong></h4><p class=''>Với trọng lượng lý tưởng [số gram], vợt đảm bảo sự cân bằng hoàn hảo giữa sức mạnh và sự linh hoạt, phù hợp cho cả người chơi mới lẫn vận động viên chuyên nghiệp. Tay cầm được thiết kế công thái học với lớp bọc chống trượt, giúp người chơi duy trì sự thoải mái trong suốt trận đấu.</p><h4 class=''>3. <strong>Ứng dụng và lợi ích</strong></h4><h4>Dòng vợt này phù hợp cho nhiều phong cách chơi, từ tấn công mạnh mẽ đến phòng thủ linh hoạt. Công nghệ giảm chấn giúp giảm rung chấn khi tiếp xúc bóng, bảo vệ cổ tay và khuỷu tay, giúp người chơi duy trì hiệu suất cao mà không lo chấn thương.</h4><ul><li>Liên hệ: abc@test.com.vn</li><li>Tel: 0123456789</li></ul><p><br></p><p>​<br></p>",
  },
  {
    id: 234,
    sku: 'DFPK-6101',
    categoryName: 'Dòng chuyên nghiệp',
    brandName: 'Double Fish',
    attributeValues: ['new_arrivals'],
    title: 'Vợt Pickleball DFPK-6101',
    price: 2100000,
    imgSrc: '/assets/images/products/pickleball-DFPK-6101-min.png',
    imgSrc2: '/assets/images/products/pickleball-DFPK-6101-min.png',
    ratings: 4.5,
    shortDescription:
      'Vợt pickleball tiêu chuẩn với thiết kế nhẹ, dễ kiểm soát, phù hợp với người chơi ở mọi cấp độ.',
    description:
      "<h4 class=''>1. <strong>Thiết kế và chất liệu cao cấp</strong></h4><p class=''>Vợt pickleball được chế tạo từ chất liệu [carbon fiber / composite / gỗ cao cấp], giúp tăng độ bền, giảm trọng lượng và tối ưu lực đánh. Bề mặt vợt có kết cấu đặc biệt giúp kiểm soát bóng tốt hơn, mang đến độ xoáy và độ chính xác cao trong từng cú đánh.</p><h4 class=''>2. <strong>Hiệu suất vượt trội</strong></h4><p class=''>Với trọng lượng lý tưởng [số gram], vợt đảm bảo sự cân bằng hoàn hảo giữa sức mạnh và sự linh hoạt, phù hợp cho cả người chơi mới lẫn vận động viên chuyên nghiệp. Tay cầm được thiết kế công thái học với lớp bọc chống trượt, giúp người chơi duy trì sự thoải mái trong suốt trận đấu.</p><h4 class=''>3. <strong>Ứng dụng và lợi ích</strong></h4><h4>Dòng vợt này phù hợp cho nhiều phong cách chơi, từ tấn công mạnh mẽ đến phòng thủ linh hoạt. Công nghệ giảm chấn giúp giảm rung chấn khi tiếp xúc bóng, bảo vệ cổ tay và khuỷu tay, giúp người chơi duy trì hiệu suất cao mà không lo chấn thương.</h4><ul><li>Liên hệ: abc@test.com.vn</li><li>Tel: 0123456789</li></ul><p><br></p><p>​<br></p>",
  },
  {
    id: 235,
    sku: 'DF-233-WTT',
    categoryName: 'Bàn',
    brandName: 'Double Fish',
    attributeValues: ['best_seller', 'featured'],
    title: 'Bàn Bóng Bàn Double Fish 233 WTT Limited Seagame 31',
    price: 24800000,
    imgSrc: '/assets/images/products/ban-bong-ban-double-fish-233.jpg',
    imgSrc2: '/assets/images/products/ban-bong-ban-double-fish-233.jpg',
    ratings: 3,
    discountPercentage: 15,
    shortDescription:
      'Bàn bóng bàn cao cấp chuẩn thi đấu quốc tế, sử dụng trong SEA Games 31 với độ bền và chất lượng vượt trội.',
    description:
      "<h4 class=''>1. <strong>Thiết kế và chất liệu cao cấp</strong></h4><p class=''>Vợt pickleball được chế tạo từ chất liệu [carbon fiber / composite / gỗ cao cấp], giúp tăng độ bền, giảm trọng lượng và tối ưu lực đánh. Bề mặt vợt có kết cấu đặc biệt giúp kiểm soát bóng tốt hơn, mang đến độ xoáy và độ chính xác cao trong từng cú đánh.</p><h4 class=''>2. <strong>Hiệu suất vượt trội</strong></h4><p class=''>Với trọng lượng lý tưởng [số gram], vợt đảm bảo sự cân bằng hoàn hảo giữa sức mạnh và sự linh hoạt, phù hợp cho cả người chơi mới lẫn vận động viên chuyên nghiệp. Tay cầm được thiết kế công thái học với lớp bọc chống trượt, giúp người chơi duy trì sự thoải mái trong suốt trận đấu.</p><h4 class=''>3. <strong>Ứng dụng và lợi ích</strong></h4><h4>Dòng vợt này phù hợp cho nhiều phong cách chơi, từ tấn công mạnh mẽ đến phòng thủ linh hoạt. Công nghệ giảm chấn giúp giảm rung chấn khi tiếp xúc bóng, bảo vệ cổ tay và khuỷu tay, giúp người chơi duy trì hiệu suất cao mà không lo chấn thương.</h4><ul><li>Liên hệ: abc@test.com.vn</li><li>Tel: 0123456789</li></ul><p><br></p><p>​<br></p>",
  },
  {
    id: 241,
    sku: 'DF-2A-C',
    categoryName: 'Vợt',
    brandName: 'Double Fish',
    attributeValues: ['best_seller'],
    title: 'Vợt Bóng Bàn Double Fish 2A-C',
    price: 280000,
    imgSrc: '/assets/images/products/vot-bong-ban-double-fish-2ac.jpg',
    imgSrc2: '/assets/images/products/vot-bong-ban-double-fish-2ac.jpg',
    ratings: 5,
    shortDescription:
      'Vợt bóng bàn chất lượng cao, phù hợp cho cả người mới chơi và người chơi chuyên nghiệp.',
    description:
      "<h4 class=''>1. <strong>Thiết kế và chất liệu cao cấp</strong></h4><p class=''>Vợt pickleball được chế tạo từ chất liệu [carbon fiber / composite / gỗ cao cấp], giúp tăng độ bền, giảm trọng lượng và tối ưu lực đánh. Bề mặt vợt có kết cấu đặc biệt giúp kiểm soát bóng tốt hơn, mang đến độ xoáy và độ chính xác cao trong từng cú đánh.</p><h4 class=''>2. <strong>Hiệu suất vượt trội</strong></h4><p class=''>Với trọng lượng lý tưởng [số gram], vợt đảm bảo sự cân bằng hoàn hảo giữa sức mạnh và sự linh hoạt, phù hợp cho cả người chơi mới lẫn vận động viên chuyên nghiệp. Tay cầm được thiết kế công thái học với lớp bọc chống trượt, giúp người chơi duy trì sự thoải mái trong suốt trận đấu.</p><h4 class=''>3. <strong>Ứng dụng và lợi ích</strong></h4><h4>Dòng vợt này phù hợp cho nhiều phong cách chơi, từ tấn công mạnh mẽ đến phòng thủ linh hoạt. Công nghệ giảm chấn giúp giảm rung chấn khi tiếp xúc bóng, bảo vệ cổ tay và khuỷu tay, giúp người chơi duy trì hiệu suất cao mà không lo chấn thương.</h4><ul><li>Liên hệ: abc@test.com.vn</li><li>Tel: 0123456789</li></ul><p><br></p><p>​<br></p>",
  },
  {
    id: 242,
    sku: 'DF-201C',
    categoryName: 'Bàn',
    brandName: 'Double Fish',
    attributeValues: ['top_rated', 'featured'],
    title: 'Bàn Bóng Bàn Double Fish DF 201C',
    price: 8990000,
    imgSrc: '/assets/images/products/ban-bong-ban-double-fish-201c.jpg',
    imgSrc2: '/assets/images/products/ban-bong-ban-double-fish-201c.jpg',
    ratings: 3,
    shortDescription:
      'Bàn bóng bàn chất lượng với thiết kế chắc chắn, phù hợp cho cả luyện tập và thi đấu.',

    description:
      "<h4 class=''>1. <strong>Thiết kế và chất liệu cao cấp</strong></h4><p class=''>Vợt pickleball được chế tạo từ chất liệu [carbon fiber / composite / gỗ cao cấp], giúp tăng độ bền, giảm trọng lượng và tối ưu lực đánh. Bề mặt vợt có kết cấu đặc biệt giúp kiểm soát bóng tốt hơn, mang đến độ xoáy và độ chính xác cao trong từng cú đánh.</p><h4 class=''>2. <strong>Hiệu suất vượt trội</strong></h4><p class=''>Với trọng lượng lý tưởng [số gram], vợt đảm bảo sự cân bằng hoàn hảo giữa sức mạnh và sự linh hoạt, phù hợp cho cả người chơi mới lẫn vận động viên chuyên nghiệp. Tay cầm được thiết kế công thái học với lớp bọc chống trượt, giúp người chơi duy trì sự thoải mái trong suốt trận đấu.</p><h4 class=''>3. <strong>Ứng dụng và lợi ích</strong></h4><h4>Dòng vợt này phù hợp cho nhiều phong cách chơi, từ tấn công mạnh mẽ đến phòng thủ linh hoạt. Công nghệ giảm chấn giúp giảm rung chấn khi tiếp xúc bóng, bảo vệ cổ tay và khuỷu tay, giúp người chơi duy trì hiệu suất cao mà không lo chấn thương.</h4><ul><li>Liên hệ: abc@test.com.vn</li><li>Tel: 0123456789</li></ul><p><br></p><p>​<br></p>",
  },
  {
    id: 243,
    sku: 'DFPK-3101',
    categoryName: 'Newbie',
    brandName: 'Double Fish',
    attributeValues: ['top_rated', 'featured'],
    title: 'Vợt Pickleball DFPK-3101',
    price: 1390000,
    imgSrc: '/assets/images/products/DFPK-3106-min.png',
    imgSrc2: '/assets/images/products/DFPK-3106-min.png',
    ratings: 2,
    shortDescription:
      'Vợt pickleball dành cho người mới chơi, thiết kế đơn giản nhưng vẫn đảm bảo hiệu suất tốt.',
    description:
      "<h4 class=''>1. <strong>Thiết kế và chất liệu cao cấp</strong></h4><p class=''>Vợt pickleball được chế tạo từ chất liệu [carbon fiber / composite / gỗ cao cấp], giúp tăng độ bền, giảm trọng lượng và tối ưu lực đánh. Bề mặt vợt có kết cấu đặc biệt giúp kiểm soát bóng tốt hơn, mang đến độ xoáy và độ chính xác cao trong từng cú đánh.</p><h4 class=''>2. <strong>Hiệu suất vượt trội</strong></h4><p class=''>Với trọng lượng lý tưởng [số gram], vợt đảm bảo sự cân bằng hoàn hảo giữa sức mạnh và sự linh hoạt, phù hợp cho cả người chơi mới lẫn vận động viên chuyên nghiệp. Tay cầm được thiết kế công thái học với lớp bọc chống trượt, giúp người chơi duy trì sự thoải mái trong suốt trận đấu.</p><h4 class=''>3. <strong>Ứng dụng và lợi ích</strong></h4><h4>Dòng vợt này phù hợp cho nhiều phong cách chơi, từ tấn công mạnh mẽ đến phòng thủ linh hoạt. Công nghệ giảm chấn giúp giảm rung chấn khi tiếp xúc bóng, bảo vệ cổ tay và khuỷu tay, giúp người chơi duy trì hiệu suất cao mà không lo chấn thương.</h4><ul><li>Liên hệ: abc@test.com.vn</li><li>Tel: 0123456789</li></ul><p><br></p><p>​<br></p>",
  },
  {
    id: 244,
    sku: 'DFPK-3105',
    categoryName: 'Newbie',
    brandName: 'Mofit',
    attributeValues: ['top_rated', 'featured'],
    title: 'Vợt Pickleball DFPK-3105',
    price: 1290000,
    imgSrc: '/assets/images/products/DFPK-3105-min.png',
    imgSrc2: '/assets/images/products/DFPK-3105-min.png',
    ratings: 3.5,
    discountPercentage: 10,
    shortDescription:
      'Vợt pickleball cho người chơi nghiệp dư, thiết kế gọn nhẹ và dễ kiểm soát.',
    description:
      "<h4 class=''>1. <strong>Thiết kế và chất liệu cao cấp</strong></h4><p class=''>Vợt pickleball được chế tạo từ chất liệu [carbon fiber / composite / gỗ cao cấp], giúp tăng độ bền, giảm trọng lượng và tối ưu lực đánh. Bề mặt vợt có kết cấu đặc biệt giúp kiểm soát bóng tốt hơn, mang đến độ xoáy và độ chính xác cao trong từng cú đánh.</p><h4 class=''>2. <strong>Hiệu suất vượt trội</strong></h4><p class=''>Với trọng lượng lý tưởng [số gram], vợt đảm bảo sự cân bằng hoàn hảo giữa sức mạnh và sự linh hoạt, phù hợp cho cả người chơi mới lẫn vận động viên chuyên nghiệp. Tay cầm được thiết kế công thái học với lớp bọc chống trượt, giúp người chơi duy trì sự thoải mái trong suốt trận đấu.</p><h4 class=''>3. <strong>Ứng dụng và lợi ích</strong></h4><h4>Dòng vợt này phù hợp cho nhiều phong cách chơi, từ tấn công mạnh mẽ đến phòng thủ linh hoạt. Công nghệ giảm chấn giúp giảm rung chấn khi tiếp xúc bóng, bảo vệ cổ tay và khuỷu tay, giúp người chơi duy trì hiệu suất cao mà không lo chấn thương.</h4><ul><li>Liên hệ: abc@test.com.vn</li><li>Tel: 0123456789</li></ul><p><br></p><p>​<br></p>",
  },
  {
    id: 245,
    sku: 'DFPK-3102',
    categoryName: 'Couple',
    brandName: 'Mofit',
    attributeValues: ['best_seller', 'featured'],
    title: 'Vợt Couple Pickleball DFPK-3102',
    price: 1190000,
    imgSrc: '/assets/images/products/DFPK-3102.jpg',
    imgSrc2: '/assets/images/products/DFPK-3102.jpg',
    ratings: 4.25,
    discountPercentage: 15,
    shortDescription:
      'Bộ vợt pickleball dành cho cặp đôi, thiết kế tiện lợi và dễ sử dụng.',
    description:
      "<h4 class=''>1. <strong>Thiết kế và chất liệu cao cấp</strong></h4><p class=''>Vợt pickleball được chế tạo từ chất liệu [carbon fiber / composite / gỗ cao cấp], giúp tăng độ bền, giảm trọng lượng và tối ưu lực đánh. Bề mặt vợt có kết cấu đặc biệt giúp kiểm soát bóng tốt hơn, mang đến độ xoáy và độ chính xác cao trong từng cú đánh.</p><h4 class=''>2. <strong>Hiệu suất vượt trội</strong></h4><p class=''>Với trọng lượng lý tưởng [số gram], vợt đảm bảo sự cân bằng hoàn hảo giữa sức mạnh và sự linh hoạt, phù hợp cho cả người chơi mới lẫn vận động viên chuyên nghiệp. Tay cầm được thiết kế công thái học với lớp bọc chống trượt, giúp người chơi duy trì sự thoải mái trong suốt trận đấu.</p><h4 class=''>3. <strong>Ứng dụng và lợi ích</strong></h4><h4>Dòng vợt này phù hợp cho nhiều phong cách chơi, từ tấn công mạnh mẽ đến phòng thủ linh hoạt. Công nghệ giảm chấn giúp giảm rung chấn khi tiếp xúc bóng, bảo vệ cổ tay và khuỷu tay, giúp người chơi duy trì hiệu suất cao mà không lo chấn thương.</h4><ul><li>Liên hệ: abc@test.com.vn</li><li>Tel: 0123456789</li></ul><p><br></p><p>​<br></p>",
  },
  {
    id: 305,
    sku: 'MOFIT-2016',
    categoryName: 'Phụ kiện thể thao',
    brandName: 'Mofit',
    attributeValues: ['new_arrivals'],
    title: 'Đai Massage bụng MOFIT 2016',
    price: 1190000,
    imgSrc: '/assets/images/products/dai-massage-bung.jpg',
    imgSrc2: '/assets/images/products/dai-massage-bung.jpg',
    ratings: 4.9,
    shortDescription:
      'Đai massage bụng hỗ trợ giảm mỡ, cải thiện tuần hoàn máu, phù hợp cho mọi lứa tuổi.',
    description:
      "<h4 class=''>1. <strong>Thiết kế và chất liệu cao cấp</strong></h4><p class=''>Vợt pickleball được chế tạo từ chất liệu [carbon fiber / composite / gỗ cao cấp], giúp tăng độ bền, giảm trọng lượng và tối ưu lực đánh. Bề mặt vợt có kết cấu đặc biệt giúp kiểm soát bóng tốt hơn, mang đến độ xoáy và độ chính xác cao trong từng cú đánh.</p><h4 class=''>2. <strong>Hiệu suất vượt trội</strong></h4><p class=''>Với trọng lượng lý tưởng [số gram], vợt đảm bảo sự cân bằng hoàn hảo giữa sức mạnh và sự linh hoạt, phù hợp cho cả người chơi mới lẫn vận động viên chuyên nghiệp. Tay cầm được thiết kế công thái học với lớp bọc chống trượt, giúp người chơi duy trì sự thoải mái trong suốt trận đấu.</p><h4 class=''>3. <strong>Ứng dụng và lợi ích</strong></h4><h4>Dòng vợt này phù hợp cho nhiều phong cách chơi, từ tấn công mạnh mẽ đến phòng thủ linh hoạt. Công nghệ giảm chấn giúp giảm rung chấn khi tiếp xúc bóng, bảo vệ cổ tay và khuỷu tay, giúp người chơi duy trì hiệu suất cao mà không lo chấn thương.</h4><ul><li>Liên hệ: abc@test.com.vn</li><li>Tel: 0123456789</li></ul><p><br></p><p>​<br></p>",
  },
];
