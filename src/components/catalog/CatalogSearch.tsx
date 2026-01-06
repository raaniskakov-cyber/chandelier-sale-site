import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CatalogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CatalogSearch = ({ searchQuery, setSearchQuery }: CatalogSearchProps) => {
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      toast({
        title: 'Поиск по изображению',
        description: 'Функция в разработке',
      });
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <div className="relative flex-1">
        <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Поиск по названию, бренду, стилю..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button variant="outline" className="relative" asChild>
        <label className="cursor-pointer">
          <Icon name="Image" className="h-4 w-4" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </Button>
    </div>
  );
};

export default CatalogSearch;
