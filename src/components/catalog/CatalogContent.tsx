import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from '@/lib/api';
import { Link } from 'react-router-dom';

interface CatalogContentProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product) => void;
}

const CatalogContent = ({ products, loading, onAddToCart }: CatalogContentProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <Icon name="Loader2" className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-gray-500 mt-4">Загрузка товаров...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="SearchX" className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
        <p className="text-gray-500">Попробуйте изменить параметры фильтров</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <Link to={`/product/${product.id}`}>
              <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  {product.is_sale && (
                    <Badge variant="destructive" className="shadow-lg">
                      SALE
                    </Badge>
                  )}
                  {product.is_new && (
                    <Badge className="bg-green-500 hover:bg-green-600 shadow-lg">
                      NEW
                    </Badge>
                  )}
                </div>
              </div>
            </Link>

            <div className="space-y-3">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors min-h-[40px]">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                {product.brand && (
                  <span className="flex items-center">
                    <Icon name="Award" className="h-3 w-3 mr-1" />
                    {product.brand}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-primary">
                  {product.price.toLocaleString()} ₽
                </span>
                {product.old_price && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.old_price.toLocaleString()} ₽
                  </span>
                )}
              </div>

              {product.in_stock ? (
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => onAddToCart(product)}
                >
                  <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                  В корзину
                </Button>
              ) : (
                <Button className="w-full" size="sm" variant="outline" disabled>
                  Нет в наличии
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CatalogContent;
