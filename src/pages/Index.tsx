import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthDialog from '@/components/AuthDialog';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { api, Product, User } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const data = await api.getProducts({ limit: 8, is_sale: 'true' });
      setFeaturedProducts(data.products);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({ title: 'Вы вышли из аккаунта' });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: 'Добавлено в корзину',
      description: product.name,
    });
  };

  return (
    <>
      <SEO />
      <div className="min-h-screen flex flex-col">
        <Header user={user} onAuthClick={() => setShowAuth(true)} onLogout={handleLogout} />

        <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Освещение премиум-класса
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Эксклюзивные люстры и светильники от ведущих европейских производителей
              </p>
              <Link to="/catalog">
                <Button size="lg" className="text-lg px-8">
                  <Icon name="Sparkles" className="mr-2 h-5 w-5" />
                  Смотреть каталог
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon name="Truck" className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2">Быстрая доставка</h3>
                  <p className="text-gray-600 text-sm">
                    Доставка по Москве в течение 1-2 дней
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon name="Shield" className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2">Гарантия качества</h3>
                  <p className="text-gray-600 text-sm">
                    Официальная гарантия на всю продукцию
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon name="HeartHandshake" className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2">Поддержка 24/7</h3>
                  <p className="text-gray-600 text-sm">
                    Консультации по выбору и установке
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Специальные предложения</h2>
              <p className="text-gray-600">Успейте купить со скидкой до 50%</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Загрузка...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                  <Card key={product.id} className="group hover:shadow-xl transition-shadow">
                    <CardContent className="p-4">
                      <div className="relative mb-4 overflow-hidden rounded-lg">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.is_sale && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            SALE
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2 text-sm line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-lg font-bold">{product.price.toLocaleString()} ₽</p>
                          {product.old_price && (
                            <p className="text-sm text-gray-400 line-through">
                              {product.old_price.toLocaleString()} ₽
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                        В корзину
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link to="/catalog">
                <Button variant="outline" size="lg">
                  Смотреть все товары
                  <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">О нашем магазине</h2>
              <p className="text-gray-600 mb-4">
                LuxLight — это премиум интернет-магазин осветительных приборов в Москве.
                Мы специализируемся на продаже элитных люстр, светильников и бра от ведущих
                европейских производителей.
              </p>
              <p className="text-gray-600">
                Наша команда профессионалов поможет вам подобрать идеальное освещение для
                любого интерьера — от классических до современных стилей.
              </p>
            </div>
          </div>
        </section>

        <section id="delivery" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Доставка и оплата</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Icon name="Package" className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Доставка по Москве</h3>
                    <p className="text-gray-600">
                      Бесплатная доставка при заказе от 10 000 ₽. Доставка в течение 1-2 рабочих дней.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="MapPin" className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Доставка по России</h3>
                    <p className="text-gray-600">
                      Отправка транспортными компаниями. Стоимость рассчитывается индивидуально.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="CreditCard" className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Способы оплаты</h3>
                    <p className="text-gray-600">
                      Оплата картой онлайн, наличными или картой при получении, безналичный расчет для юр. лиц.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Контакты</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Icon name="Phone" className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="font-semibold mb-1">Телефон</p>
                  <p className="text-gray-600">+7 (495) 123-45-67</p>
                </div>
                <div>
                  <Icon name="Mail" className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="font-semibold mb-1">Email</p>
                  <p className="text-gray-600">info@luxlight.ru</p>
                </div>
                <div>
                  <Icon name="MapPin" className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="font-semibold mb-1">Адрес</p>
                  <p className="text-gray-600">Москва, ул. Примерная, 1</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <AuthDialog open={showAuth} onOpenChange={setShowAuth} onSuccess={handleAuthSuccess} />
    </>
  );
};

export default Index;
