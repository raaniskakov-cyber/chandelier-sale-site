import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface CatalogSidebarProps {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  selectedStyles: string[];
  setSelectedStyles: (styles: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  heightRange: [number, number];
  setHeightRange: (range: [number, number]) => void;
  widthRange: [number, number];
  setWidthRange: (range: [number, number]) => void;
  diameterRange: [number, number];
  setDiameterRange: (range: [number, number]) => void;
  hasRemote: boolean;
  setHasRemote: (value: boolean) => void;
  isDimmable: boolean;
  setIsDimmable: (value: boolean) => void;
  hasColorChange: boolean;
  setHasColorChange: (value: boolean) => void;
  isSale: boolean;
  setIsSale: (value: boolean) => void;
  isNew: boolean;
  setIsNew: (value: boolean) => void;
  hasPickup: boolean;
  setHasPickup: (value: boolean) => void;
  onResetFilters: () => void;
  isMobile?: boolean;
}

const BRANDS = [
  'Favourite', 'Maytoni', 'Lumion', 'Odeon Light', 'Eglo',
  'Citilux', 'ST Luce', 'Lightstar', 'Ideal Lux', 'Mantra',
  'Arte Lamp', 'Eurosvet', 'MW-Light', 'Lussole', 'Favourite',
  'Ambiente', 'Crystal Lux', 'Newport', 'Lucia Tucci', 'Arti Lampadari',
  'Bohemia Ivele', 'Chiaro', 'Osgona', 'Stilfort', 'Toplight'
];

const COLORS = [
  'Белый', 'Черный', 'Золотой', 'Серебряный', 'Хром',
  'Бронза', 'Медь', 'Латунь', 'Никель', 'Серый',
  'Коричневый', 'Бежевый', 'Прозрачный', 'Цветной', 'Дерево'
];

const STYLES = [
  'Современный', 'Классический', 'Хай-тек', 'Лофт', 'Минимализм',
  'Прованс', 'Скандинавский', 'Барокко', 'Арт-деко', 'Модерн',
  'Кантри', 'Эко', 'Винтаж', 'Фьюжн', 'Индустриальный'
];

const FilterContent = (props: CatalogSidebarProps) => {
  const {
    selectedBrands,
    setSelectedBrands,
    selectedColors,
    setSelectedColors,
    selectedStyles,
    setSelectedStyles,
    priceRange,
    setPriceRange,
    heightRange,
    setHeightRange,
    widthRange,
    setWidthRange,
    diameterRange,
    setDiameterRange,
    hasRemote,
    setHasRemote,
    isDimmable,
    setIsDimmable,
    hasColorChange,
    setHasColorChange,
    isSale,
    setIsSale,
    isNew,
    setIsNew,
    hasPickup,
    setHasPickup,
    onResetFilters,
  } = props;

  const toggleBrand = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(
      selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color]
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles(
      selectedStyles.includes(style)
        ? selectedStyles.filter((s) => s !== style)
        : [...selectedStyles, style]
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Фильтры</h3>
          <Button variant="ghost" size="sm" onClick={onResetFilters}>
            <Icon name="X" className="h-4 w-4 mr-1" />
            Сбросить
          </Button>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="font-semibold">Цена (₽)</Label>
          <div className="pt-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              min={0}
              max={500000}
              step={1000}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{priceRange[0].toLocaleString()} ₽</span>
              <span>{priceRange[1].toLocaleString()} ₽</span>
            </div>
          </div>
        </div>

        {/* Brands */}
        <div className="space-y-3">
          <Label className="font-semibold">Бренд</Label>
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {BRANDS.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Colors */}
        <div className="space-y-3">
          <Label className="font-semibold">Цвет</Label>
          <div className="space-y-2">
            {COLORS.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={() => toggleColor(color)}
                />
                <label
                  htmlFor={`color-${color}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Styles */}
        <div className="space-y-3">
          <Label className="font-semibold">Стиль</Label>
          <div className="space-y-2">
            {STYLES.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={`style-${style}`}
                  checked={selectedStyles.includes(style)}
                  onCheckedChange={() => toggleStyle(style)}
                />
                <label
                  htmlFor={`style-${style}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {style}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Height Range */}
        <div className="space-y-3">
          <Label className="font-semibold">Высота (см)</Label>
          <div className="pt-2">
            <Slider
              value={heightRange}
              onValueChange={(value) => setHeightRange(value as [number, number])}
              min={0}
              max={300}
              step={5}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{heightRange[0]} см</span>
              <span>{heightRange[1]} см</span>
            </div>
          </div>
        </div>

        {/* Width Range */}
        <div className="space-y-3">
          <Label className="font-semibold">Ширина (см)</Label>
          <div className="pt-2">
            <Slider
              value={widthRange}
              onValueChange={(value) => setWidthRange(value as [number, number])}
              min={0}
              max={200}
              step={5}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{widthRange[0]} см</span>
              <span>{widthRange[1]} cm</span>
            </div>
          </div>
        </div>

        {/* Diameter Range */}
        <div className="space-y-3">
          <Label className="font-semibold">Диаметр (см)</Label>
          <div className="pt-2">
            <Slider
              value={diameterRange}
              onValueChange={(value) => setDiameterRange(value as [number, number])}
              min={0}
              max={200}
              step={5}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{diameterRange[0]} см</span>
              <span>{diameterRange[1]} см</span>
            </div>
          </div>
        </div>

        {/* Boolean Filters */}
        <div className="space-y-3">
          <Label className="font-semibold">Дополнительно</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-remote"
                checked={hasRemote}
                onCheckedChange={(checked) => setHasRemote(checked as boolean)}
              />
              <label htmlFor="has-remote" className="text-sm cursor-pointer">
                С пультом управления
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is-dimmable"
                checked={isDimmable}
                onCheckedChange={(checked) => setIsDimmable(checked as boolean)}
              />
              <label htmlFor="is-dimmable" className="text-sm cursor-pointer">
                С диммером
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-color-change"
                checked={hasColorChange}
                onCheckedChange={(checked) => setHasColorChange(checked as boolean)}
              />
              <label htmlFor="has-color-change" className="text-sm cursor-pointer">
                Смена цвета
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is-sale"
                checked={isSale}
                onCheckedChange={(checked) => setIsSale(checked as boolean)}
              />
              <label htmlFor="is-sale" className="text-sm cursor-pointer">
                Скидка
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is-new"
                checked={isNew}
                onCheckedChange={(checked) => setIsNew(checked as boolean)}
              />
              <label htmlFor="is-new" className="text-sm cursor-pointer">
                Новинки
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-pickup"
                checked={hasPickup}
                onCheckedChange={(checked) => setHasPickup(checked as boolean)}
              />
              <label htmlFor="has-pickup" className="text-sm cursor-pointer">
                Самовывоз
              </label>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

const CatalogSidebar = (props: CatalogSidebarProps) => {
  const { isMobile } = props;

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <Icon name="SlidersHorizontal" className="mr-2 h-4 w-4" />
            Фильтры
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Фильтры</SheetTitle>
          </SheetHeader>
          <FilterContent {...props} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-80 border-r bg-white h-full">
      <FilterContent {...props} />
    </div>
  );
};

export default CatalogSidebar;
