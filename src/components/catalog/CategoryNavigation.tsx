import { Button } from '@/components/ui/button';

interface CategoryNavigationProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'Все товары' },
  { id: 'chandeliers', label: 'Люстры' },
  { id: 'ceiling', label: 'Потолочные' },
  { id: 'wall', label: 'Настенные' },
  { id: 'floor', label: 'Напольные' },
  { id: 'table', label: 'Настольные' },
];

const CategoryNavigation = ({ selectedCategory, setSelectedCategory }: CategoryNavigationProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(category.id)}
          className="whitespace-nowrap"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryNavigation;
