interface CatalogHeaderProps {
  totalProducts: number;
}

const CatalogHeader = ({ totalProducts }: CatalogHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-4">Каталог светильников</h1>
      <p className="text-gray-600">
        Найдено товаров: <span className="font-semibold">{totalProducts}</span>
      </p>
    </div>
  );
};

export default CatalogHeader;
