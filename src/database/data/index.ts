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
    categoryName: 'Dòng chuyên nghiệp',
    brandName: 'Double Fish',
    attributeValues: ['new_arrivals', 'featured'],
    title: 'Vợt Pickleball DFPK-1104',
    price: 58000000,
    imgSrc: '/assets/images/products/pickleball-DFPK-1104-min.png',
    imgSrc2: '/assets/images/products/pickleball-DFPK-1104-min.png',
    ratings: 5,
    discountPercentage: 15,
  },
  {
    id: 234,
    categoryName: 'Dòng chuyên nghiệp',
    brandName: 'Double Fish',
    attributeValues: ['new_arrivals'],
    title: 'Vợt Pickleball DFPK-6101',
    price: 2100000,
    imgSrc: '/assets/images/products/pickleball-DFPK-6101-min.png',
    imgSrc2: '/assets/images/products/pickleball-DFPK-6101-min.png',
    ratings: 4.5,
  },
  {
    id: 235,
    categoryName: 'Bàn',
    brandName: 'Double Fish',
    attributeValues: ['best_seller', 'featured'],
    title: 'Bàn Bóng Bàn Double Fish 233 WTT Limited Seagame 31',
    price: 24800000,
    imgSrc: '/assets/images/products/ban-bong-ban-double-fish-233.jpg',
    imgSrc2: '/assets/images/products/ban-bong-ban-double-fish-233.jpg',
    ratings: 3,
    discountPercentage: 15,
  },
  {
    id: 241,
    categoryName: 'Vợt',
    brandName: 'Double Fish',
    attributeValues: ['best_seller'],
    title: 'Vợt Bóng Bàn Double Fish 2A-C',
    price: 280000,
    imgSrc: '/assets/images/products/vot-bong-ban-double-fish-2ac.jpg',
    imgSrc2: '/assets/images/products/vot-bong-ban-double-fish-2ac.jpg',
    ratings: 5,
  },
  {
    id: 242,
    categoryName: 'Bàn',
    brandName: 'Double Fish',
    attributeValues: ['top_rated', 'featured'],
    title: 'Bàn Bóng Bàn Double Fish DF 201C',
    price: 8990000,
    imgSrc: '/assets/images/products/ban-bong-ban-double-fish-201c.jpg',
    imgSrc2: '/assets/images/products/ban-bong-ban-double-fish-201c.jpg',
    ratings: 3,
  },
  {
    id: 243,
    categoryName: 'Newbie',
    brandName: 'Double Fish',
    attributeValues: ['top_rated', 'featured'],
    title: 'Vợt Pickleball DFPK-3101',
    price: 1390000,
    imgSrc: '/assets/images/products/DFPK-3106-min.png',
    imgSrc2: '/assets/images/products/DFPK-3106-min.png',
    ratings: 2,
  },
  {
    id: 244,
    categoryName: 'Newbie',
    brandName: 'Mofit',
    attributeValues: ['top_rated', 'featured'],
    title: 'Vợt Pickleball DFPK-3105',
    price: 1290000,
    imgSrc: '/assets/images/products/DFPK-3105-min.png',
    imgSrc2: '/assets/images/products/DFPK-3105-min.png',
    ratings: 3.5,
    discountPercentage: 10,
  },
  {
    id: 245,
    categoryName: 'Couple',
    brandName: 'Mofit',
    attributeValues: ['best_seller', 'featured'],
    title: 'Vợt Couple Pickleball DFPK-3102',
    price: 1190000,
    imgSrc: '/assets/images/products/DFPK-3102.jpg',
    imgSrc2: '/assets/images/products/DFPK-3102.jpg',
    ratings: 4.25,
    discountPercentage: 15,
  },
  {
    id: 305,
    categoryName: 'Phụ kiện',
    brandName: 'Mofit',
    attributeValues: ['new_arrivals'],
    title: 'Đai Massage bụng MOFIT 2016',
    price: 1190000,
    imgSrc: '/assets/images/products/dai-massage-bung.jpg',
    imgSrc2: '/assets/images/products/dai-massage-bung.jpg',
    ratings: 4.9,
  },
];
