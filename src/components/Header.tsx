import { Link } from 'react-router-dom';
import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import CartSheet from './CartSheet';

interface HeaderProps {
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Header = ({ user, onAuthClick, onLogout }: HeaderProps) => {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Icon name="Lightbulb" className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">LuxLight</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">
                Каталог
              </Link>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                О нас
              </a>
              <a href="#delivery" className="text-sm font-medium hover:text-primary transition-colors">
                Доставка
              </a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">
                Контакты
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <Icon name="ShoppingCart" className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs font-medium text-white flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="User" className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onLogout}>
                    Выйти
                  </Button>
                </div>
              ) : (
                <Button variant="default" size="sm" onClick={onAuthClick}>
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
};

export default Header;
