import slugify from 'slugify';

const slug = (text: string) => {
  return slugify(text, {
    lower: true,
    locale: 'vi',
    remove: /[*+~.()'"!:@]/g,
    replacement: '-',
  })
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export { slug };
