import slugify from 'slugify';

const slug = (text: string) => {
  const replacedText = text.replace(/\//g, '-');
  return slugify(replacedText, {
    lower: true,
    locale: 'vi',
    remove: /[*+~.()'"!:@]/g,
    replacement: '-',
  })
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export { slug };
