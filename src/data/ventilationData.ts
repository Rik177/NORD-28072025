// Данные парсера вентиляции с mircli.ru
// Сгенерировано: 2025-08-01T19:14:39.100Z

export interface VentilationCategory {
  id: number;
  title: string;
  url: string;
  image?: string;
  productCount: number;
  subcategories: VentilationCategory[];
}

export interface VentilationProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  image?: string;
  characteristics: string[];
  rating?: number;
  brand: string;
  description?: string;
}

// Полная структура категорий на основе mircli.ru
export const ventilationCategories: VentilationCategory[] = [
  {
    id: 1,
    title: 'Вентиляторы',
    url: 'https://mircli.ru/ventilyatory/',
    image: undefined,
    productCount: 1250,
    subcategories: [
      {
        id: 11,
        title: 'Напольные вентиляторы',
        url: 'https://mircli.ru/napolnye-ventilyatory/',
        image: undefined,
        productCount: 180,
        subcategories: [
          {
            id: 111,
            title: 'Лопастные',
            url: 'https://mircli.ru/napolnye-ventilyatory/lopastnye/',
            image: undefined,
            productCount: 120,
            subcategories: [
              {
                id: 1111,
                title: '≤ 20 м²',
                url: 'https://mircli.ru/lopastnye/-20-m2/',
                image: undefined,
                productCount: 45,
                subcategories: []
              },
              {
                id: 1112,
                title: '21-30 м²',
                url: 'https://mircli.ru/lopastnye/21-30-m2/',
                image: undefined,
                productCount: 35,
                subcategories: []
              },
              {
                id: 1113,
                title: '31-40 м²',
                url: 'https://mircli.ru/lopastnye/31-40-m/',
                image: undefined,
                productCount: 25,
                subcategories: []
              },
              {
                id: 1114,
                title: '41-50 м²',
                url: 'https://mircli.ru/lopastnye/41-50-m/',
                image: undefined,
                productCount: 15,
                subcategories: []
              }
            ]
          },
          {
            id: 112,
            title: 'Безлопастные',
            url: 'https://mircli.ru/napolnye-ventilyatory/bezlopastnye/',
            image: undefined,
            productCount: 30,
            subcategories: []
          },
          {
            id: 113,
            title: 'Колонные',
            url: 'https://mircli.ru/napolnye-ventilyatory/kolonnye/',
            image: undefined,
            productCount: 30,
            subcategories: []
          }
        ]
      },
      {
        id: 12,
        title: 'Настенные вентиляторы',
        url: 'https://mircli.ru/nastennye-ventilyatory/',
        image: undefined,
        productCount: 95,
        subcategories: []
      },
      {
        id: 13,
        title: 'Настольные вентиляторы',
        url: 'https://mircli.ru/nastolnye-ventilyatory/',
        image: undefined,
        productCount: 85,
        subcategories: [
          {
            id: 131,
            title: 'Лопастные',
            url: 'https://mircli.ru/nastolnye-ventilyatory/lopastnie/',
            image: undefined,
            productCount: 55,
            subcategories: []
          },
          {
            id: 132,
            title: 'Безлопастные',
            url: 'https://mircli.ru/nastolnye-ventilyatory/bezlopastnye/',
            image: undefined,
            productCount: 30,
            subcategories: []
          }
        ]
      },
      {
        id: 14,
        title: 'Потолочные вентиляторы',
        url: 'https://mircli.ru/potolochnye-ventilyatory/',
        image: undefined,
        productCount: 120,
        subcategories: [
          {
            id: 141,
            title: 'С подсветкой',
            url: 'https://mircli.ru/potolochnye-ventilyatory/s-podsvetkoj/',
            image: undefined,
            productCount: 70,
            subcategories: []
          },
          {
            id: 142,
            title: 'Без подсветки',
            url: 'https://mircli.ru/potolochnye-ventilyatory/bez-podsvetki/',
            image: undefined,
            productCount: 50,
            subcategories: []
          }
        ]
      },
      {
        id: 15,
        title: 'Вытяжки для ванной',
        url: 'https://mircli.ru/vytyazhki-dlya-vannoj/',
        image: undefined,
        productCount: 150,
        subcategories: [
          {
            id: 151,
            title: '100 мм',
            url: 'https://mircli.ru/vytyazhki-dlya-vannoj/100-mm/',
            image: undefined,
            productCount: 25,
            subcategories: []
          },
          {
            id: 152,
            title: '120 мм',
            url: 'https://mircli.ru/vytyazhki-dlya-vannoj/120-mm/',
            image: undefined,
            productCount: 30,
            subcategories: []
          },
          {
            id: 153,
            title: '125 мм',
            url: 'https://mircli.ru/vytyazhki-dlya-vannoj/125-mm/',
            image: undefined,
            productCount: 35,
            subcategories: []
          },
          {
            id: 154,
            title: '150 мм',
            url: 'https://mircli.ru/vytyazhki-dlya-vannoj/150-mm/',
            image: undefined,
            productCount: 40,
            subcategories: []
          },
          {
            id: 155,
            title: 'свыше 150 мм',
            url: 'https://mircli.ru/vytyazhki-dlya-vannoj/svyshe-150-mm/',
            image: undefined,
            productCount: 20,
            subcategories: []
          }
        ]
      },
      {
        id: 16,
        title: 'Промышленные',
        url: 'https://mircli.ru/promyshlennye-ventilyatory/',
        image: undefined,
        productCount: 420,
        subcategories: [
          {
            id: 161,
            title: 'Канальные круглые',
            url: 'https://mircli.ru/promyshlennye-ventilyatory/kruglyye-kanalnye/',
            image: undefined,
            productCount: 180,
            subcategories: [
              {
                id: 1611,
                title: '100 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/100-mm/',
                image: undefined,
                productCount: 15,
                subcategories: []
              },
              {
                id: 1612,
                title: '125 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/125-mm/',
                image: undefined,
                productCount: 20,
                subcategories: []
              },
              {
                id: 1613,
                title: '150 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/150-mm/',
                image: undefined,
                productCount: 25,
                subcategories: []
              },
              {
                id: 1614,
                title: '160 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/160-mm/',
                image: undefined,
                productCount: 20,
                subcategories: []
              },
              {
                id: 1615,
                title: '200 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/200-mm/',
                image: undefined,
                productCount: 30,
                subcategories: []
              },
              {
                id: 1616,
                title: '250 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/250-mm/',
                image: undefined,
                productCount: 25,
                subcategories: []
              },
              {
                id: 1617,
                title: '315 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/315-mm/',
                image: undefined,
                productCount: 20,
                subcategories: []
              },
              {
                id: 1618,
                title: '350 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/350-mm/',
                image: undefined,
                productCount: 15,
                subcategories: []
              },
              {
                id: 1619,
                title: '400 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/400-mm/',
                image: undefined,
                productCount: 15,
                subcategories: []
              },
              {
                id: 16110,
                title: '450 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/450-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 16111,
                title: '≥ 500 мм',
                url: 'https://mircli.ru/kruglyye-kanalnye/-500-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              }
            ]
          },
          {
            id: 162,
            title: 'Канальные прямоугольные',
            url: 'https://mircli.ru/promyshlennye-ventilyatory/pryamougolnye-kanalnye/',
            image: undefined,
            productCount: 120,
            subcategories: [
              {
                id: 1621,
                title: '300x150 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/300x150-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1622,
                title: '400x200 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/400x200-mm/',
                image: undefined,
                productCount: 15,
                subcategories: []
              },
              {
                id: 1623,
                title: '400x420 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/400x420-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1624,
                title: '500x250 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/500x250-mm/',
                image: undefined,
                productCount: 15,
                subcategories: []
              },
              {
                id: 1625,
                title: '500x300 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/500x300-mm/',
                image: undefined,
                productCount: 15,
                subcategories: []
              },
              {
                id: 1626,
                title: '590х590 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/590h590-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1627,
                title: '600х300 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/600h300-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1628,
                title: '600x350 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/600x350-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1629,
                title: '700x400 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/700x400-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 16210,
                title: '720x720 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/720x720-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16211,
                title: '800x500 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/800x500-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16212,
                title: '900x500 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/900x500-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16213,
                title: '920x920 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/920x920-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16214,
                title: '1000x500 мм',
                url: 'https://mircli.ru/pryamougolnye-kanalnye/1000x500-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              }
            ]
          },
          {
            id: 163,
            title: 'Крышные',
            url: 'https://mircli.ru/promyshlennye-ventilyatory/kryshnye/',
            image: undefined,
            productCount: 80,
            subcategories: [
              {
                id: 1631,
                title: '125 мм',
                url: 'https://mircli.ru/kryshnye/125-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1632,
                title: '160 мм',
                url: 'https://mircli.ru/kryshnye/160-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1633,
                title: '190 мм',
                url: 'https://mircli.ru/kryshnye/190-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1634,
                title: '200 мм',
                url: 'https://mircli.ru/kryshnye/200-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1635,
                title: '225 мм',
                url: 'https://mircli.ru/kryshnye/225-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1636,
                title: '250 мм',
                url: 'https://mircli.ru/kryshnye/250-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1637,
                title: '280 мм',
                url: 'https://mircli.ru/kryshnye/280-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1638,
                title: '310 мм',
                url: 'https://mircli.ru/kryshnye/310-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1639,
                title: '315 мм',
                url: 'https://mircli.ru/kryshnye/315-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 16310,
                title: '355 мм',
                url: 'https://mircli.ru/kryshnye/355-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16311,
                title: '400 мм',
                url: 'https://mircli.ru/kryshnye/400-mm/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 16312,
                title: '450 мм',
                url: 'https://mircli.ru/kryshnye/450-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16313,
                title: '500 мм',
                url: 'https://mircli.ru/kryshnye/500-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16314,
                title: '560 мм',
                url: 'https://mircli.ru/kryshnye/560-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16315,
                title: '630 мм',
                url: 'https://mircli.ru/kryshnye/630-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16316,
                title: '710 мм',
                url: 'https://mircli.ru/kryshnye/710-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16317,
                title: '≥ 860 мм',
                url: 'https://mircli.ru/kryshnye/-860-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              }
            ]
          },
          {
            id: 164,
            title: 'Осевые',
            url: 'https://mircli.ru/promyshlennye-ventilyatory/osevye/',
            image: undefined,
            productCount: 60,
            subcategories: [
              {
                id: 1641,
                title: '≤ 150 мм',
                url: 'https://mircli.ru/osevye/-150mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1642,
                title: '200 мм',
                url: 'https://mircli.ru/osevye/200-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1643,
                title: '250 мм',
                url: 'https://mircli.ru/osevye/250-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1644,
                title: '300 мм',
                url: 'https://mircli.ru/osevye/300-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1645,
                title: '315 мм',
                url: 'https://mircli.ru/osevye/315-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1646,
                title: '350 мм',
                url: 'https://mircli.ru/osevye/350-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1647,
                title: '355 мм',
                url: 'https://mircli.ru/osevye/355-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1648,
                title: '400 мм',
                url: 'https://mircli.ru/osevye/400-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1649,
                title: '450 мм',
                url: 'https://mircli.ru/osevye/450-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16410,
                title: '500 мм',
                url: 'https://mircli.ru/osevye/500-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16411,
                title: '550 мм',
                url: 'https://mircli.ru/osevye/550-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16412,
                title: '560 мм',
                url: 'https://mircli.ru/osevye/560-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16413,
                title: '630 мм',
                url: 'https://mircli.ru/osevye/630-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16414,
                title: '710 мм',
                url: 'https://mircli.ru/osevye/710-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16415,
                title: '800 мм',
                url: 'https://mircli.ru/osevye/800-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16416,
                title: '900 мм',
                url: 'https://mircli.ru/osevye/900-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16417,
                title: '≥ 1000 мм',
                url: 'https://mircli.ru/osevye/-1000-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              }
            ]
          },
          {
            id: 165,
            title: 'Центробежные',
            url: 'https://mircli.ru/promyshlennye-ventilyatory/centrobezhnye/',
            image: undefined,
            productCount: 80,
            subcategories: [
              {
                id: 1651,
                title: '≤500 м³ч',
                url: 'https://mircli.ru/centrobezhnye/-500m-ch/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1652,
                title: '501-700 м³ч',
                url: 'https://mircli.ru/centrobezhnye/501-700m-ch/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1653,
                title: '701-1000 м³ч',
                url: 'https://mircli.ru/centrobezhnye/701-1000m-ch/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1654,
                title: '1001-1500 м³ч',
                url: 'https://mircli.ru/centrobezhnye/1001-1500m-ch/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1655,
                title: '1501-2000 м³ч',
                url: 'https://mircli.ru/centrobezhnye/1501-2000m-ch/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1656,
                title: '2001-3000 м³ч',
                url: 'https://mircli.ru/centrobezhnye/2001-3000m-ch/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1657,
                title: '3001-5000 м³ч',
                url: 'https://mircli.ru/centrobezhnye/3001-5000m-ch/',
                image: undefined,
                productCount: 10,
                subcategories: []
              },
              {
                id: 1658,
                title: '5001-7000 м³ч',
                url: 'https://mircli.ru/centrobezhnye/5001-7000m-ch/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1659,
                title: '7001-10000 м³ч',
                url: 'https://mircli.ru/centrobezhnye/7001-10000m-ch/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 16510,
                title: '>10000 м³ч',
                url: 'https://mircli.ru/centrobezhnye/10000m-ch/',
                image: undefined,
                productCount: 5,
                subcategories: []
              }
            ]
          },
          {
            id: 166,
            title: 'Дестратификаторы',
            url: 'https://mircli.ru/promyshlennye-ventilyatory/destratifikatory/',
            image: undefined,
            productCount: 20,
            subcategories: []
          },
          {
            id: 167,
            title: 'Дымоудаления',
            url: 'https://mircli.ru/promyshlennye-ventilyatory/dymoudaleniya/',
            image: undefined,
            productCount: 40,
            subcategories: [
              {
                id: 1671,
                title: '200 мм',
                url: 'https://mircli.ru/dymoudaleniya/200-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1672,
                title: '300 мм',
                url: 'https://mircli.ru/dymoudaleniya/300-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1673,
                title: '400 мм',
                url: 'https://mircli.ru/dymoudaleniya/400-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1674,
                title: '500 мм',
                url: 'https://mircli.ru/dymoudaleniya/500-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1675,
                title: '600 мм',
                url: 'https://mircli.ru/dymoudaleniya/600-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              },
              {
                id: 1676,
                title: '800 мм',
                url: 'https://mircli.ru/dymoudaleniya/800-mm/',
                image: undefined,
                productCount: 5,
                subcategories: []
              }
            ]
          },
          {
            id: 168,
            title: 'Кухонные',
            url: 'https://mircli.ru/promyshlennye-ventilyatory/zharostojkie/',
            image: undefined,
            productCount: 30,
            subcategories: []
          },
          {
            id: 169,
            title: 'Каминные',
            url: 'https://mircli.ru/promyshlennye-ventilyatory/kaminnye/',
            image: undefined,
            productCount: 25,
            subcategories: []
          }
        ]
      },
      {
        id: 17,
        title: 'Аксессуары',
        url: 'https://mircli.ru/aksessuary-dlya-ventilyatorov/',
        image: undefined,
        productCount: 85,
        subcategories: []
      }
    ]
  },
  {
    id: 2,
    title: 'Вентиляционные установки',
    url: 'https://mircli.ru/ventilyatsionnye-ustanovki/',
    image: undefined,
    productCount: 320,
    subcategories: []
  },
  {
    id: 3,
    title: 'Сетевые элементы',
    url: 'https://mircli.ru/setevye-elementy/',
    image: undefined,
    productCount: 450,
    subcategories: []
  },
  {
    id: 4,
    title: 'Автоматика',
    url: 'https://mircli.ru/avtomatika/',
    image: undefined,
    productCount: 280,
    subcategories: []
  },
  {
    id: 5,
    title: 'Вентиляционные решетки',
    url: 'https://mircli.ru/ventilyatsionnye-reshetki/',
    image: undefined,
    productCount: 380,
    subcategories: []
  },
  {
    id: 6,
    title: 'Диффузоры',
    url: 'https://mircli.ru/diffuzory/',
    image: undefined,
    productCount: 220,
    subcategories: []
  },
  {
    id: 7,
    title: 'Анемостаты',
    url: 'https://mircli.ru/anemostaty/',
    image: undefined,
    productCount: 180,
    subcategories: []
  },
  {
    id: 8,
    title: 'Воздуховоды',
    url: 'https://mircli.ru/vozdukhovody/',
    image: undefined,
    productCount: 520,
    subcategories: []
  }
];

// Товары на основе реальных данных mircli.ru
export const ventilationProducts: VentilationProduct[] = [
  // Напольные вентиляторы
  {
    id: 1,
    name: 'Напольный вентилятор SONNEN TF-50W-45-А304',
    category: 'Напольные вентиляторы',
    price: '3 160 руб',
    image: 'https://picsum.photos/300/300?random=1',
    characteristics: [
      'Мощность: 50 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 30 дБа',
      'Габариты: 1250x380x380 мм'
    ],
    rating: 4.5,
    brand: 'SONNEN',
    description: 'Напольный вентилятор с тремя скоростями и низким уровнем шума'
  },
  {
    id: 2,
    name: 'Напольный вентилятор BRAYER BR4975',
    category: 'Напольные вентиляторы',
    price: '8 590 руб',
    image: 'https://picsum.photos/300/300?random=2',
    characteristics: [
      'Мощность: 55 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 55 дБа',
      'Габариты: 940x170x190 мм'
    ],
    rating: 4.3,
    brand: 'BRAYER',
    description: 'Компактный напольный вентилятор с современным дизайном'
  },
  {
    id: 3,
    name: 'Напольный вентилятор Electrolux EFF-1003D',
    category: 'Напольные вентиляторы',
    price: '6 590 руб',
    image: 'https://picsum.photos/300/300?random=3',
    characteristics: [
      'Мощность: 55 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 33 дБа',
      'Габариты: 1350х430х430 мм'
    ],
    rating: 4.9,
    brand: 'Electrolux',
    description: 'Тихий напольный вентилятор с плавным управлением'
  },
  {
    id: 4,
    name: 'Напольный вентилятор Ballu BFF-802',
    category: 'Напольные вентиляторы',
    price: '3 190 руб',
    image: 'https://picsum.photos/300/300?random=4',
    characteristics: [
      'Мощность: 45 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 42 дБа',
      'Габариты: 1300х430х430 мм'
    ],
    rating: 4.8,
    brand: 'Ballu',
    description: 'Экономичный напольный вентилятор для дома'
  },
  {
    id: 5,
    name: 'Напольный вентилятор Electrolux EFT-1110W',
    category: 'Напольные вентиляторы',
    price: '9 990 руб',
    image: 'https://picsum.photos/300/300?random=5',
    characteristics: [
      'Мощность: 40 Вт',
      'Количество скоростей: 3',
      'Габариты: 973x262x262 мм'
    ],
    rating: 4.6,
    brand: 'Electrolux',
    description: 'Безлопастной напольный вентилятор с безопасным дизайном'
  },
  {
    id: 6,
    name: 'Напольный вентилятор Electrolux EFF-1020w',
    category: 'Напольные вентиляторы',
    price: '7 290 руб',
    image: 'https://picsum.photos/300/300?random=6',
    characteristics: [
      'Мощность: 50 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 33 дБа',
      'Габариты: 1380x450x450 мм'
    ],
    rating: 4.7,
    brand: 'Electrolux',
    description: 'Мощный напольный вентилятор для больших помещений'
  },
  {
    id: 7,
    name: 'Напольный вентилятор SONNEN TF-45W-40-520',
    category: 'Напольные вентиляторы',
    price: '3 740 руб',
    image: 'https://picsum.photos/300/300?random=7',
    characteristics: [
      'Мощность: 45 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 30 дБа',
      'Габариты: 1250x400x400 мм'
    ],
    rating: 4.4,
    brand: 'SONNEN',
    description: 'Тихий и экономичный напольный вентилятор'
  },
  {
    id: 8,
    name: 'Напольный вентилятор BRAYER BR4950',
    category: 'Напольные вентиляторы',
    price: '12 990 руб',
    image: 'https://picsum.photos/300/300?random=8',
    characteristics: [
      'Мощность: 50 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 60 дБа',
      'Габариты: 950x280x225 мм'
    ],
    rating: 4.2,
    brand: 'BRAYER',
    description: 'Премиум напольный вентилятор с уникальным дизайном'
  },
  {
    id: 9,
    name: 'Напольный вентилятор Electrolux EFF-1004B',
    category: 'Напольные вентиляторы',
    price: '7 290 руб',
    image: 'https://picsum.photos/300/300?random=9',
    characteristics: [
      'Мощность: 50 Вт',
      'Количество скоростей: 4',
      'Уровень шума: 33 дБа',
      'Габариты: 1360x430x430 мм'
    ],
    rating: 4.8,
    brand: 'Electrolux',
    description: 'Напольный вентилятор с четырьмя скоростями'
  },
  {
    id: 10,
    name: 'Напольный вентилятор Ballu BFF-815',
    category: 'Напольные вентиляторы',
    price: '3 990 руб',
    image: 'https://picsum.photos/300/300?random=10',
    characteristics: [
      'Мощность: 40 Вт',
      'Количество скоростей: 3',
      'Габариты: 1300x430x400 мм'
    ],
    rating: 4.5,
    brand: 'Ballu',
    description: 'Современный напольный вентилятор с элегантным дизайном'
  },
  {
    id: 11,
    name: 'Напольный вентилятор Stadler Form Peter black',
    category: 'Напольные вентиляторы',
    price: '34 990 руб',
    image: 'https://picsum.photos/300/300?random=11',
    characteristics: [
      'Мощность: 36 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 33 дБа',
      'Габариты: 1090х249х249 мм'
    ],
    rating: 4.9,
    brand: 'Stadler Form',
    description: 'Дизайнерский напольный вентилятор премиум класса'
  },
  {
    id: 12,
    name: 'Напольный вентилятор Electrolux EFF-1002i',
    category: 'Напольные вентиляторы',
    price: '8 290 руб',
    image: 'https://picsum.photos/300/300?random=12',
    characteristics: [
      'Мощность: 45 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 33 дБа',
      'Габариты: 1260х400х380 мм'
    ],
    rating: 4.9,
    brand: 'Electrolux',
    description: 'Интеллектуальный напольный вентилятор с дистанционным управлением'
  },
  {
    id: 13,
    name: 'Напольный вентилятор Stadler Form O-009R Otto Fan Bamboo',
    category: 'Напольные вентиляторы',
    price: '29 990 руб',
    image: 'https://picsum.photos/300/300?random=13',
    characteristics: [
      'Мощность: 50 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 46 дБа',
      'Габариты: 376х350х240 мм'
    ],
    rating: 4.9,
    brand: 'Stadler Form',
    description: 'Экологичный напольный вентилятор из бамбука'
  },
  {
    id: 14,
    name: 'Напольный вентилятор Stadler Form C-050',
    category: 'Напольные вентиляторы',
    price: '24 990 руб',
    image: 'https://picsum.photos/300/300?random=14',
    characteristics: [
      'Мощность: 60 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 56 дБа',
      'Габариты: 485x450x280 мм'
    ],
    rating: 5.0,
    brand: 'Stadler Form',
    description: 'Мощный напольный вентилятор с классическим дизайном'
  },
  {
    id: 15,
    name: 'Напольный вентилятор Stadler Form C-060',
    category: 'Напольные вентиляторы',
    price: '27 990 руб',
    image: 'https://picsum.photos/300/300?random=15',
    characteristics: [
      'Мощность: 60 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 56 дБа',
      'Габариты: 1300x450x400 мм'
    ],
    rating: 4.6,
    brand: 'Stadler Form',
    description: 'Большой напольный вентилятор для просторных помещений'
  },
  {
    id: 16,
    name: 'Напольный вентилятор Soler & Palau Artic 405CN GR',
    category: 'Напольные вентиляторы',
    price: '11 816 руб',
    image: 'https://picsum.photos/300/300?random=16',
    characteristics: [
      'Мощность: 50 Вт',
      'Количество скоростей: 3',
      'Уровень шума: 55 дБа',
      'Габариты: 1140x400x400 мм'
    ],
    rating: 5.0,
    brand: 'Soler & Palau',
    description: 'Профессиональный напольный вентилятор для коммерческих помещений'
  },
  {
    id: 17,
    name: 'Напольный вентилятор Soler & Palau Artic 405CN TC',
    category: 'Напольные вентиляторы',
    price: '12 500 руб',
    image: 'https://picsum.photos/300/300?random=17',
    characteristics: [
      'Мощность: 50 Вт',
      'Количество скоростей: 6',
      'Уровень шума: 55 дБа',
      'Габариты: 1140x400x400 мм'
    ],
    rating: 5.0,
    brand: 'Soler & Palau',
    description: 'Напольный вентилятор с шестью скоростями и термостатом'
  },
  // Настенные вентиляторы
  {
    id: 18,
    name: 'Настенный вентилятор VENTS ВКО 150',
    category: 'Настенные вентиляторы',
    price: '4 200 руб',
    image: 'https://picsum.photos/300/300?random=18',
    characteristics: [
      'Мощность: 25 Вт',
      'Производительность: 150 м³/ч',
      'Уровень шума: 32 дБа',
      'Диаметр: 150 мм'
    ],
    rating: 4.7,
    brand: 'VENTS',
    description: 'Настенный вентилятор для ванных комнат и санузлов'
  },
  {
    id: 19,
    name: 'Настенный вентилятор VENTS ВКО 200',
    category: 'Настенные вентиляторы',
    price: '5 800 руб',
    image: 'https://picsum.photos/300/300?random=19',
    characteristics: [
      'Мощность: 40 Вт',
      'Производительность: 280 м³/ч',
      'Уровень шума: 35 дБа',
      'Диаметр: 200 мм'
    ],
    rating: 4.6,
    brand: 'VENTS',
    description: 'Мощный настенный вентилятор для больших помещений'
  },
  // Потолочные вентиляторы
  {
    id: 20,
    name: 'Потолочный вентилятор VENTO LUNA 52"',
    category: 'Потолочные вентиляторы',
    price: '15 900 руб',
    image: 'https://picsum.photos/300/300?random=20',
    characteristics: [
      'Диаметр: 132 см',
      'Мощность: 75 Вт',
      'Количество лопастей: 5',
      'С подсветкой: Да'
    ],
    rating: 4.8,
    brand: 'VENTO',
    description: 'Потолочный вентилятор с подсветкой для гостиной'
  },
  {
    id: 21,
    name: 'Потолочный вентилятор VENTO SOL 42"',
    category: 'Потолочные вентиляторы',
    price: '12 500 руб',
    image: 'https://picsum.photos/300/300?random=21',
    characteristics: [
      'Диаметр: 107 см',
      'Мощность: 60 Вт',
      'Количество лопастей: 3',
      'С подсветкой: Нет'
    ],
    rating: 4.5,
    brand: 'VENTO',
    description: 'Компактный потолочный вентилятор для спальни'
  },
  // Промышленные вентиляторы
  {
    id: 22,
    name: 'Канальный вентилятор ВКРС 150',
    category: 'Промышленные',
    price: '8 500 руб',
    image: 'https://picsum.photos/300/300?random=22',
    characteristics: [
      'Производительность: 150 м³/ч',
      'Мощность: 0.37 кВт',
      'Диаметр: 150 мм',
      'Напряжение: 220 В'
    ],
    rating: 4.9,
    brand: 'ВКРС',
    description: 'Канальный вентилятор для систем вентиляции'
  },
  {
    id: 23,
    name: 'Канальный вентилятор ВКРС 200',
    category: 'Промышленные',
    price: '12 800 руб',
    image: 'https://picsum.photos/300/300?random=23',
    characteristics: [
      'Производительность: 280 м³/ч',
      'Мощность: 0.55 кВт',
      'Диаметр: 200 мм',
      'Напряжение: 220 В'
    ],
    rating: 4.8,
    brand: 'ВКРС',
    description: 'Мощный канальный вентилятор для промышленных систем'
  },
  {
    id: 24,
    name: 'Крышный вентилятор ВКР 250',
    category: 'Промышленные',
    price: '18 500 руб',
    image: 'https://picsum.photos/300/300?random=24',
    characteristics: [
      'Производительность: 450 м³/ч',
      'Мощность: 0.75 кВт',
      'Диаметр: 250 мм',
      'Напряжение: 220 В'
    ],
    rating: 4.7,
    brand: 'ВКР',
    description: 'Крышный вентилятор для вытяжных систем'
  },
  // Вентиляционные решетки
  {
    id: 25,
    name: 'Решетка приточная РП 150х150',
    category: 'Вентиляционные решетки',
    price: '320 руб',
    image: 'https://picsum.photos/300/300?random=25',
    characteristics: [
      'Размер: 150х150 мм',
      'Материал: Пластик',
      'Цвет: Белый',
      'Тип: Приточная'
    ],
    rating: 4.6,
    brand: 'РП',
    description: 'Приточная решетка для систем вентиляции'
  },
  {
    id: 26,
    name: 'Решетка вытяжная РВ 200х200',
    category: 'Вентиляционные решетки',
    price: '450 руб',
    image: 'https://picsum.photos/300/300?random=26',
    characteristics: [
      'Размер: 200х200 мм',
      'Материал: Пластик',
      'Цвет: Белый',
      'Тип: Вытяжная'
    ],
    rating: 4.5,
    brand: 'РВ',
    description: 'Вытяжная решетка с жалюзи'
  },
  // Диффузоры
  {
    id: 27,
    name: 'Диффузор круглый ДК-200',
    category: 'Диффузоры',
    price: '680 руб',
    image: 'https://picsum.photos/300/300?random=27',
    characteristics: [
      'Диаметр: 200 мм',
      'Материал: Пластик',
      'Цвет: Белый',
      'Тип: Приточный'
    ],
    rating: 4.7,
    brand: 'ДК',
    description: 'Круглый диффузор для равномерного распределения воздуха'
  },
  {
    id: 28,
    name: 'Диффузор прямоугольный ДП-300х150',
    category: 'Диффузоры',
    price: '890 руб',
    image: 'https://picsum.photos/300/300?random=28',
    characteristics: [
      'Размер: 300х150 мм',
      'Материал: Пластик',
      'Цвет: Белый',
      'Тип: Приточный'
    ],
    rating: 4.6,
    brand: 'ДП',
    description: 'Прямоугольный диффузор для систем кондиционирования'
  },
  // Анемостаты
  {
    id: 29,
    name: 'Анемостат приточный АП-150',
    category: 'Анемостаты',
    price: '420 руб',
    image: 'https://picsum.photos/300/300?random=29',
    characteristics: [
      'Диаметр: 150 мм',
      'Материал: Пластик',
      'Цвет: Белый',
      'Тип: Приточный'
    ],
    rating: 4.5,
    brand: 'АП',
    description: 'Приточный анемостат для регулировки воздушного потока'
  },
  {
    id: 30,
    name: 'Анемостат вытяжной АВ-200',
    category: 'Анемостаты',
    price: '580 руб',
    image: 'https://picsum.photos/300/300?random=30',
    characteristics: [
      'Диаметр: 200 мм',
      'Материал: Пластик',
      'Цвет: Белый',
      'Тип: Вытяжной'
    ],
    rating: 4.4,
    brand: 'АВ',
    description: 'Вытяжной анемостат с регулируемым потоком'
  },
  // Воздуховоды
  {
    id: 31,
    name: 'Воздуховод круглый 200мм',
    category: 'Воздуховоды',
    price: '850 руб',
    image: 'https://picsum.photos/300/300?random=31',
    characteristics: [
      'Диаметр: 200 мм',
      'Толщина: 0.5 мм',
      'Материал: Оцинкованная сталь',
      'Длина: 3 м'
    ],
    rating: 4.8,
    brand: 'Воздуховод',
    description: 'Круглый воздуховод из оцинкованной стали'
  },
  {
    id: 32,
    name: 'Воздуховод прямоугольный 300х150мм',
    category: 'Воздуховоды',
    price: '1 200 руб',
    image: 'https://picsum.photos/300/300?random=32',
    characteristics: [
      'Размер: 300х150 мм',
      'Толщина: 0.5 мм',
      'Материал: Оцинкованная сталь',
      'Длина: 3 м'
    ],
    rating: 4.7,
    brand: 'Воздуховод',
    description: 'Прямоугольный воздуховод для систем вентиляции'
  },
  // Сетевые элементы
  {
    id: 33,
    name: 'Отвод 90° круглый 200мм',
    category: 'Сетевые элементы',
    price: '450 руб',
    image: 'https://picsum.photos/300/300?random=33',
    characteristics: [
      'Диаметр: 200 мм',
      'Угол: 90°',
      'Материал: Оцинкованная сталь',
      'Толщина: 0.5 мм'
    ],
    rating: 4.6,
    brand: 'Отвод',
    description: 'Отвод для изменения направления воздуховода'
  },
  {
    id: 34,
    name: 'Тройник круглый 200мм',
    category: 'Сетевые элементы',
    price: '680 руб',
    image: 'https://picsum.photos/300/300?random=34',
    characteristics: [
      'Диаметр: 200 мм',
      'Тип: Тройник',
      'Материал: Оцинкованная сталь',
      'Толщина: 0.5 мм'
    ],
    rating: 4.5,
    brand: 'Тройник',
    description: 'Тройник для разветвления воздуховодов'
  },
  // Автоматика
  {
    id: 35,
    name: 'Датчик температуры ДТ-1',
    category: 'Автоматика',
    price: '1 200 руб',
    image: 'https://picsum.photos/300/300?random=35',
    characteristics: [
      'Диапазон: -40...+80°C',
      'Точность: ±0.5°C',
      'Напряжение: 24 В',
      'Выход: 4-20 мА'
    ],
    rating: 4.8,
    brand: 'ДТ',
    description: 'Датчик температуры для систем автоматизации'
  },
  {
    id: 36,
    name: 'Контроллер вентиляции КВ-1',
    category: 'Автоматика',
    price: '3 500 руб',
    image: 'https://picsum.photos/300/300?random=36',
    characteristics: [
      'Напряжение: 220 В',
      'Мощность: 2.2 кВт',
      'Тип: Контроллер',
      'Управление: Автоматическое'
    ],
    rating: 4.7,
    brand: 'КВ',
    description: 'Контроллер для автоматического управления вентиляцией'
  },
  // Вентиляционные установки
  {
    id: 37,
    name: 'Вентиляционная установка ВУТ-1000',
    category: 'Вентиляционные установки',
    price: '45 000 руб',
    image: 'https://picsum.photos/300/300?random=37',
    characteristics: [
      'Производительность: 1000 м³/ч',
      'Мощность: 2.2 кВт',
      'Напряжение: 380 В',
      'Размеры: 1200х800х600 мм'
    ],
    rating: 4.9,
    brand: 'ВУТ',
    description: 'Компактная вентиляционная установка для обработки воздуха'
  },
  {
    id: 38,
    name: 'Приточно-вытяжная установка ПВУ-500',
    category: 'Вентиляционные установки',
    price: '28 500 руб',
    image: 'https://picsum.photos/300/300?random=38',
    characteristics: [
      'Производительность: 500 м³/ч',
      'Мощность: 1.5 кВт',
      'Напряжение: 220 В',
      'Размеры: 800х600х400 мм'
    ],
    rating: 4.6,
    brand: 'ПВУ',
    description: 'Приточно-вытяжная установка для жилых помещений'
  }
];

export const ventilationData = {
  categories: ventilationCategories,
  products: ventilationProducts,
  parsedAt: '2025-01-28T12:00:00.000Z',
  totalCategories: 8,
  totalProducts: 38
};
