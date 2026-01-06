import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import CategoryNavigation from '@/components/catalog/CategoryNavigation';
import CatalogHeader from '@/components/catalog/CatalogHeader';
import CatalogSearch from '@/components/catalog/CatalogSearch';
import CatalogSidebar from '@/components/catalog/CatalogSidebar';
import CatalogContent from '@/components/catalog/CatalogContent';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { api, Product, User } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import Icon from '@/components/ui/icon';

const ITEMS_PER_PAGE = 20;

const Catalog = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // User state
  const [user, setUser] = useState<User | null>(null);

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [heightRange, setHeightRange] = useState<[number, number]>([0, 300]);
  const [widthRange, setWidthRange] = useState<[number, number]>([0, 200]);
  const [diameterRange, setDiameterRange] = useState<[number, number]>([0, 200]);
  const [hasRemote, setHasRemote] = useState(false);
  const [isDimmable, setIsDimmable] = useState(false);
  const [hasColorChange, setHasColorChange] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [hasPickup, setHasPickup] = useState(false);

  // Mobile state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [
    selectedCategory,
    searchQuery,
    sortBy,
    selectedBrands,
    selectedColors,
    selectedStyles,
    priceRange,
    heightRange,
    widthRange,
    diameterRange,
    hasRemote,
    isDimmable,
    hasColorChange,
    isSale,
    isNew,
    hasPickup,
    currentPage,
  ]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        min_price: priceRange[0],
        max_price: priceRange[1],
      };

      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (sortBy === 'price_asc') {
        params.sort_by = 'price';
        params.order = 'asc';
      } else if (sortBy === 'price_desc') {
        params.sort_by = 'price';
        params.order = 'desc';
      } else if (sortBy === 'name') {
        params.sort_by = 'name';
        params.order = 'asc';
      }

      if (selectedBrands.length > 0) {
        params.brands = selectedBrands.join(',');
      }

      if (selectedColors.length > 0) {
        params.colors = selectedColors.join(',');
      }

      if (selectedStyles.length > 0) {
        params.styles = selectedStyles.join(',');
      }

      if (hasRemote) params.has_remote = 'true';
      if (isDimmable) params.is_dimmable = 'true';
      if (hasColorChange) params.has_color_change = 'true';
      if (isSale) params.is_sale = 'true';
      if (isNew) params.is_new = 'true';
      if (hasPickup) params.has_pickup = 'true';

      const data = await api.getProducts(params);
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      console.error('Failed to load products:', error);
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить товары',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedStyles([]);
    setPriceRange([0, 500000]);
    setHeightRange([0, 300]);
    setWidthRange([0, 200]);
    setDiameterRange([0, 200]);
    setHasRemote(false);
    setIsDimmable(false);
    setHasColorChange(false);
    setIsSale(false);
    setIsNew(false);
    setHasPickup(false);
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: 'Добавлено в корзину',
      description: product.name,
    });
  };

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  return (
    <>
      <SEO
        title="Каталог светильников"
        description="Широкий выбор люстр и светильников для дома"
      />
      <div className="min-h-screen flex flex-col">
        <Header user={user} onAuthClick={() => {}} onLogout={() => {}} />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <CatalogHeader totalProducts={totalProducts} />

            <div className="mb-6">
              <CategoryNavigation
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            <CatalogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className="flex gap-6">
              {isMobile ? (
                <div className="w-full space-y-4">
                  <CatalogSidebar
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    selectedStyles={selectedStyles}
                    setSelectedStyles={setSelectedStyles}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    heightRange={heightRange}
                    setHeightRange={setHeightRange}
                    widthRange={widthRange}
                    setWidthRange={setWidthRange}
                    diameterRange={diameterRange}
                    setDiameterRange={setDiameterRange}
                    hasRemote={hasRemote}
                    setHasRemote={setHasRemote}
                    isDimmable={isDimmable}
                    setIsDimmable={setIsDimmable}
                    hasColorChange={hasColorChange}
                    setHasColorChange={setHasColorChange}
                    isSale={isSale}
                    setIsSale={setIsSale}
                    isNew={isNew}
                    setIsNew={setIsNew}
                    hasPickup={hasPickup}
                    setHasPickup={setHasPickup}
                    onResetFilters={handleResetFilters}
                    isMobile={true}
                  />

                  <div className="flex justify-between items-center">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Сортировка" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">По популярности</SelectItem>
                        <SelectItem value="price_asc">Цена: по возрастанию</SelectItem>
                        <SelectItem value="price_desc">Цена: по убыванию</SelectItem>
                        <SelectItem value="name">По названию</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <CatalogContent
                    products={products}
                    loading={loading}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ) : (
                <>
                  <CatalogSidebar
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    selectedStyles={selectedStyles}
                    setSelectedStyles={setSelectedStyles}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    heightRange={heightRange}
                    setHeightRange={setHeightRange}
                    widthRange={widthRange}
                    setWidthRange={setWidthRange}
                    diameterRange={diameterRange}
                    setDiameterRange={setDiameterRange}
                    hasRemote={hasRemote}
                    setHasRemote={setHasRemote}
                    isDimmable={isDimmable}
                    setIsDimmable={setIsDimmable}
                    hasColorChange={hasColorChange}
                    setHasColorChange={setHasColorChange}
                    isSale={isSale}
                    setIsSale={setIsSale}
                    isNew={isNew}
                    setIsNew={setIsNew}
                    hasPickup={hasPickup}
                    setHasPickup={setHasPickup}
                    onResetFilters={handleResetFilters}
                    isMobile={false}
                  />

                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Показано {products.length} из {totalProducts} товаров
                      </p>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-52">
                          <SelectValue placeholder="Сортировка" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popular">По популярности</SelectItem>
                          <SelectItem value="price_asc">Цена: по возрастанию</SelectItem>
                          <SelectItem value="price_desc">Цена: по убыванию</SelectItem>
                          <SelectItem value="name">По названию</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <CatalogContent
                      products={products}
                      loading={loading}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                </>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNum)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Catalog;
