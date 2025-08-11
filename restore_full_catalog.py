#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
from pathlib import Path

def restore_full_catalog():
    """
    Восстанавливает полный каталог из анализа MIRCLI_CATALOGUE
    """
    
    try:
        # Загружаем анализ каталога
        analysis_path = Path('catalogue_analysis.json')
        if not analysis_path.exists():
            print("Файл анализа каталога не найден!")
            return
        
        with open(analysis_path, 'r', encoding='utf-8') as f:
            analysis = json.load(f)
        
        # Загружаем категории из текущего файла
        current_catalog_path = Path('src/data/enhanced-categories.ts')
        if not current_catalog_path.exists():
            print("Текущий файл каталога не найден!")
            return
            
        with open(current_catalog_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Извлекаем категории из текущего файла
        categories_start = content.find('export const categories: Category[] = ')
        categories_end = content.find('];', categories_start)
        categories_json = content[categories_start + len('export const categories: Category[] = '):categories_end + 1]
        categories_data = json.loads(categories_json)
        
        print(f"Восстанавливаю полный каталог:")
        print(f"  Категорий: {len(categories_data)}")
        print(f"  Товаров из анализа: {len(analysis['products_data'])}")
        
        # Преобразуем товары из анализа в нужный формат
        products_data = []
        
        for i, product in enumerate(analysis['products_data']):
            name_parts = product['name'].split('\\n')
            product_name = name_parts[0].strip() if len(name_parts) > 0 else "Товар"
            
            # Извлекаем артикул
            article = None
            for part in name_parts:
                if 'арт:' in part or 'СЂС‚:' in part:
                    import re
                    article_match = re.search(r'(\d{6})', part)
                    if article_match:
                        article = article_match.group(1)
                        break
            
            if not article:
                continue
            
            # Создаем ID товара
            product_id = f"{product_name.lower().replace(' ', '-')}-{product['brand'].lower()}-арт-{article}"
            product_id = product_id.replace('ё', 'е').replace('ъ', '').replace('ь', '')
            
            # Извлекаем цену
            price_str = product.get('price', '0 руб')
            price = 0
            try:
                price_match = re.search(r'(\d+(?:\s+\d+)*)', price_str.replace(' ', ''))
                if price_match:
                    price = int(price_match.group(1).replace(' ', ''))
            except:
                price = 0
            
            product_data = {
                "id": product_id,
                "name": product_name,
                "brand": product['brand'],
                "model": "",
                "category": "вентиляторы/напольные",  # По умолчанию
                "price": price,
                "currency": "RUB",
                "availability": "В наличии",
                "image": product.get('image_url', ''),
                "specifications": {},
                "url": product.get('image_url', ''),
                "rating": 0,
                "reviewCount": 0,
                "isNew": False,
                "isSale": False,
                "isPopular": False,
                "isBestseller": False
            }
            
            products_data.append(product_data)
        
        print(f"  Обработано товаров: {len(products_data)}")
        
        # Создаем полный файл каталога
        full_content = f"""// Автоматически сгенерировано на основе MIRCLI_CATALOGUE_results.json

export interface Subcategory {{
  id: string;
  name: string;
  path: string;
  url: string;
  parentId: string;
  level: number;
  subcategories?: Subcategory[];
}}

export interface Category {{
  id: string;
  name: string;
  path: string;
  url: string;
  parentId: string;
  level: number;
  subcategories?: Subcategory[];
}}

export interface ProductSpecification {{
  [key: string]: string;
}}

export interface Product {{
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  currency: string;
  availability: string;
  image: string;
  specifications: ProductSpecification;
  url: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isSale: boolean;
  isPopular: boolean;
  isBestseller: boolean;
}}

export const categories: Category[] = {json.dumps(categories_data, ensure_ascii=False, indent=2)};

export const products: Product[] = {json.dumps(products_data, ensure_ascii=False, indent=2)};

// Функции для работы с данными
export const getCategoryById = (id: string): Category | undefined => {{
  return categories.find(cat => cat.id === id);
}};

export const getCategoryByPath = (path: string): Category | undefined => {{
  return categories.find(cat => cat.path === path);
}};

export const getProductsByCategory = (categoryPath: string): Product[] => {{
  return products.filter(product => product.category === categoryPath);
}};

export const getProductsByBrand = (brand: string): Product[] => {{
  return products.filter(product => product.brand.toLowerCase().includes(brand.toLowerCase()));
}};

export const searchProducts = (query: string): Product[] => {{
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.model.toLowerCase().includes(lowerQuery)
  );
}};

export const getCategoryHierarchy = (categoryId: string): Category[] => {{
  const hierarchy: Category[] = [];
  let currentCategory = categories.find(cat => cat.id === categoryId);

  while (currentCategory) {{
    hierarchy.unshift(currentCategory);
    if (currentCategory.parentId) {{
      currentCategory = categories.find(cat => cat.id === currentCategory.parentId);
    }} else {{
      break;
    }}
  }}

  return hierarchy;
}};

export const getSubcategories = (categoryId: string): Category[] => {{
  const category = categories.find(cat => cat.id === categoryId);
  return category?.subcategories || [];
}};

export const getAllProducts = (): Product[] => {{
  return products;
}};

export const getProductsBySubcategory = (subcategoryPath: string): Product[] => {{
  return products.filter(product => product.category === subcategoryPath);
}};
"""
        
        # Сохраняем полный файл
        with open(current_catalog_path, 'w', encoding='utf-8') as f:
            f.write(full_content)
        
        print("✅ Полный каталог восстановлен!")
        
        # Проверяем размер
        new_size = current_catalog_path.stat().st_size
        print(f"Размер файла: {new_size:,} байт")
        
    except Exception as e:
        print(f"Ошибка при восстановлении полного каталога: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    restore_full_catalog()
