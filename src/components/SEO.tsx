import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

const SEO = ({
  title = 'Интернет-магазин люстр | LuxLight',
  description = 'Купить люстры, светильники, бра в Москве. Огромный выбор осветительных приборов с доставкой по России.',
  keywords = 'люстры, светильники, бра, торшеры, настольные лампы, освещение, купить люстру',
  ogImage = '/og-image.jpg',
  ogType = 'website'
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
