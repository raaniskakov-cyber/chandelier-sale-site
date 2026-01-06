import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Lightbulb" className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">LuxLight</span>
            </div>
            <p className="text-sm text-gray-600">
              Интернет-магазин люстр и светильников премиум-класса
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog?category=Люстры" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Люстры
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Светильники" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Светильники
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Бра" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Бра
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=Торшеры" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Торшеры
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  О компании
                </a>
              </li>
              <li>
                <a href="#delivery" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Гарантия
                </a>
              </li>
              <li>
                <a href="#contacts" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <Icon name="Phone" className="h-4 w-4" />
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <Icon name="Mail" className="h-4 w-4" />
                <span>info@luxlight.ru</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <Icon name="MapPin" className="h-4 w-4" />
                <span>Москва, ул. Примерная, 1</span>
              </li>
            </ul>
            <div className="flex items-center space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Icon name="Instagram" className="h-5 w-5" fallback="Share2" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Icon name="Facebook" className="h-5 w-5" fallback="Share2" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Icon name="Youtube" className="h-5 w-5" fallback="Video" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} LuxLight. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
