// Заглушка для данных вентиляции (будет заменена после парсинга)
export const ventilationCategories = [
  {
    id: 1,
    title: "Вентиляторы",
    url: "https://mircli.ru/ventilyatsiya/ventilyatory",
    image: null,
    subcategories: [
      {
        id: 1,
        title: "Канальные вентиляторы",
        url: "https://mircli.ru/ventilyatsiya/ventilyatory/kanalnye",
        image: null,
        subcategories: []
      },
      {
        id: 2,
        title: "Крышные вентиляторы",
        url: "https://mircli.ru/ventilyatsiya/ventilyatory/kryshnye",
        image: null,
        subcategories: []
      }
    ]
  },
  {
    id: 2,
    title: "Воздуховоды",
    url: "https://mircli.ru/ventilyatsiya/vozdukhovody",
    image: null,
    subcategories: []
  },
  {
    id: 3,
    title: "Решетки и диффузоры",
    url: "https://mircli.ru/ventilyatsiya/reshetki",
    image: null,
    subcategories: []
  }
];

export const ventilationProducts = [
  {
    id: 1,
    title: "Вентилятор канальный ВКРС 150",
    url: "https://mircli.ru/ventilyatsiya/ventilyatory/kanalnye/vkrs-150",
    image: null,
    price: "12 500 ₽",
    sku: "VKRS-150",
    category: "Канальные вентиляторы",
    categoryId: 1,
    description: "Канальный вентилятор для систем вентиляции и кондиционирования",
    specifications: {
      "Производительность": "150 м³/ч",
      "Мощность": "45 Вт",
      "Уровень шума": "35 дБ"
    },
    images: []
  },
  {
    id: 2,
    title: "Воздуховод круглый 200 мм",
    url: "https://mircli.ru/ventilyatsiya/vozdukhovody/kruglye/200mm",
    image: null,
    price: "850 ₽/м",
    sku: "VD-200",
    category: "Воздуховоды",
    categoryId: 2,
    description: "Круглый воздуховод из оцинкованной стали",
    specifications: {
      "Диаметр": "200 мм",
      "Толщина стенки": "0.5 мм",
      "Длина": "3 м"
    },
    images: []
  }
];

export const ventilationData = {
  categories: ventilationCategories,
  products: ventilationProducts,
  totalProducts: ventilationProducts.length,
  totalCategories: ventilationCategories.length,
  parsedAt: new Date().toISOString()
}; 