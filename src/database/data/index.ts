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
    categoryName: 'Vợt',
    brandName: 'Double Fish',
    attributeValues: ['new_arrivals', 'featured'],
    title: 'Cropped Faux Leather Jacket',
    price: 29,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 5,
    discountPercentage: 15,
  },
  {
    id: 234,
    categoryName: 'Bóng',
    brandName: 'Double Fish',
    attributeValues: ['new_arrivals'],
    title: 'Calvin Shorts',
    price: 62,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.5,
  },
  {
    id: 235,
    categoryName: 'Bàn',
    brandName: 'Double Fish',
    attributeValues: ['best_seller', 'featured'],
    title: 'Giordonal',
    price: 17,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 3,
    discountPercentage: 15,
  },
  {
    id: 241,
    categoryName: 'Bóng',
    brandName: 'Double Fish',
    attributeValues: ['best_seller'],
    title: 'Fancies',
    price: 29,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 5,
  },
  {
    id: 242,
    categoryName: 'Dòng chuyên nghiệp',
    brandName: 'Double Fish',
    attributeValues: ['top_rated', 'featured'],
    title: 'Jogarbola',
    price: 62,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 3,
  },
  {
    id: 243,
    categoryName: 'Newbie',
    brandName: 'Double Fish',
    attributeValues: ['top_rated', 'featured'],
    title: 'Kirby T-Shirt',
    price: 17,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 2,
  },
  {
    id: 244,
    categoryName: 'Newbie',
    brandName: 'Mofit',
    attributeValues: ['top_rated', 'featured'],
    title: 'Cableknit Shawl',
    price: 99,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 3.5,
    discountPercentage: 10,
  },
  {
    id: 245,
    categoryName: 'Couple',
    brandName: 'Mofit',
    attributeValues: ['best_seller', 'featured'],
    title: 'Colorful Jacket',
    price: 29,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.25,
    discountPercentage: 15,
  },
  {
    id: 301,
    categoryName: 'Couple',
    brandName: 'Double Fish',
    attributeValues: ['new_arrivals', 'featured'],
    title: 'Running Sneakers',
    price: 75,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.8,
    discountPercentage: 10,
  },
  {
    id: 302,
    categoryName: 'Áo',
    brandName: 'Double Fish',
    attributeValues: ['best_seller'],
    title: 'Leather Loafers',
    price: 120,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.6,
  },
  {
    id: 303,
    categoryName: 'Quần',
    brandName: 'Mofit',
    attributeValues: ['top_rated', 'featured'],
    title: 'High-Top Sneakers',
    price: 90,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.2,
  },
  {
    id: 304,
    categoryName: 'Khăn',
    brandName: 'Double Fish',
    attributeValues: ['best_seller', 'featured'],
    title: 'Casual Canvas Shoes',
    price: 55,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.0,
  },
  {
    id: 305,
    categoryName: 'Phụ kiện',
    brandName: 'Mofit',
    attributeValues: ['new_arrivals'],
    title: 'Formal Derby Shoes',
    price: 140,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.9,
  },
  {
    id: 401,
    categoryName: 'Phụ kiện',
    brandName: 'Double Fish',
    attributeValues: ['top_rated'],
    title: 'Leather Wallet',
    price: 50,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.7,
    discountPercentage: 5,
  },
  {
    id: 402,
    categoryName: 'Dòng chuyên nghiệp',
    brandName: 'Mofit',
    attributeValues: ['best_seller'],
    title: 'Classic Wristwatch',
    price: 200,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 5.0,
  },
  {
    id: 403,
    categoryName: 'Newbie',
    brandName: 'Double Fish',
    attributeValues: ['new_arrivals', 'featured'],
    title: 'Stylish Sunglasses',
    price: 80,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.3,
  },
  {
    id: 404,
    categoryName: 'Couple',
    brandName: 'Double Fish',
    attributeValues: ['best_seller'],
    title: 'Canvas Tote Bag',
    price: 35,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.1,
  },
  {
    id: 405,
    categoryName: 'Bàn',
    brandName: 'Mofit',
    attributeValues: ['top_rated', 'featured'],
    title: 'Luxury Belt',
    price: 100,
    imgSrc:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1.jpg&w=750&q=75',
    imgSrc2:
      'https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fproduct_1-1.jpg&w=750&q=75',
    ratings: 4.5,
  },
];
