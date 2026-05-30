export interface MenuItem {
  id: string;
  name: string;
  subCategory?: string;
  weight: string;
  price: number;
  ingredients: string;
  image: string | null;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}



const rawData = {
  categories: [
    {
      id: "zakuski",
      name: "ЗАКУСКИ",
      items: [
        { id: "z1", name: "Кавказская нарезка", weight: "300 гр", price: 2200, ingredients: "огурцы, помидоры, болгарский перец, красный лук, брынза оливки, зелень", image: "/kavkaz.png" },
        { id: "z2", name: "Русская закуска", weight: "300 гр", price: 2200, ingredients: "сельдь, картофель, красный лук, солёный огурец, оливковое масло", image: "/russ.png" },
        { id: "z3", name: "Погребок", weight: "300 гр", price: 2200, ingredients: "помидоры, солёные огурцы, квашенная капуста, красный лук, грибы", image: "/pogrebok.png" },
      ],
    },
    {
      id: "salaty",
      name: "САЛАТЫ",
      items: [
        { id: "s1", name: "Цезарь с курицей", weight: "200 гр", price: 2900, ingredients: "курин. филе, лист.салаты, томаты черри, яйцо, сыр, сухари, майонез", image: "/kurcezar.png" },
        { id: "s2", name: "Цезарь с креветками", weight: "200 гр", price: 3400, ingredients: "креветки 3 шт, лист.салаты, томаты черри, сыр, сухари, яйцо, соус", image: "/crew.png" },
        { id: "s3", name: "Цезарь с сёмгой", weight: "200 гр", price: 3000, ingredients: "сёмга 3 шт, лист.салаты, томаты черри, сухари, яйцо, сыр, соус", image: "/cezarlosos.png" },
        { id: "s4", name: "Греческий", weight: "200 гр", price: 2000, ingredients: "оливки, лист салата, болгарский перец, фетакса, томаты черри, огурцы, красный лук, оливковое масло", image: "/grecheski.png" },
        { id: "s5", name: "Сельд под шубой", weight: "200 гр", price: 2300, ingredients: "селёдка, свекла, картофель, марковь, лук, яйцо, майонез, зелень", image: "/shuba.png" },
        { id: "s6", name: "Хрустящий баклажан", weight: "300 гр", price: 3400, ingredients: "баклажан, томаты черри, сыр, кисло-сладкий соус, кунжут", image: "/bakl.png" },
        { id: "s7", name: "Тбилиси", weight: "200 гр", price: 3400, ingredients: "отварная говядина, болгарский перец, консерв. фасоль, грец. орех, чеснок, оливковое масло", image: "/tbilisi.png" },
        { id: "s8", name: "Оливье", weight: "", price: 2000, ingredients: "ветчина, картофель, морковь, солёные огурцы, яйцо, лук, майонез, укроп", image: "/olivie.png" },
        { id: "s9", name: "Требуха", weight: "200 гр", price: 3000, ingredients: "Требуха, болгарский перец, лук, чеснок, на масле обжаренный", image: "/trebuha.png" },
        { id: "s10", name: "Салат с печенью", weight: "200 гр", price: 2300, ingredients: "печень, лук, майонез, томаты черри, корнишоны, укроп", image: "/salatpechen.png" },
      ],
    },
    {
      id: "supy",
      name: "СУПЫ (Первые блюда)",
      items: [
        { id: "sp1", name: "Борщ с говядиной", weight: "", price: 2000, ingredients: "подаётся со сметаной и с горчицей", image: "/borsh.png" },
        { id: "sp2", name: "Окрошка", weight: "", price: 2000, ingredients: "на минералке, с уксусом", image: "/okroshka.png" },
        { id: "sp3", name: "Солянка", weight: "", price: 2400, ingredients: "", image: "/soly.png" },
        { id: "sp4", name: "Рамён", weight: "", price: 3200, ingredients: "", image: "/ramen.png" },
        { id: "sp5", name: "Шурпа с бараниной", weight: "", price: 3300, ingredients: "", image: "/shurpa.png" },
        { id: "sp6", name: "Суп-лапша с курицей. По домашнему", weight: "", price: 2000, ingredients: "", image: "/suplapsha.png" },
        { id: "sp8", name: "Пельмени домашние", weight: "", price: 2000, ingredients: "", image: "/pelmeni.png" },
      ],
    },
    {
      id: "vtorye",
      name: "ВТОРЫЕ БЛЮДА",
      items: [
        { id: "v1", name: "Жаркое", weight: "", price: 2500, ingredients: "говядина, картофель, укроп, лук.", image: "/zhar.png" },
        { id: "v2", name: "Баранина по - Кавказски", weight: "", price: 3500, ingredients: "баранины ребра, картофель, болгарский перец, баклажан, чеснок, соевый соус, кинза, лук", image: "/kavkazbar.png" },
        { id: "v3", name: "Фри с мясом на жаровне", weight: "", price: 3500, ingredients: "говядина, болгарский перец, перец острый чили, фри, томаты, соевый соус, кинза", image: "/fry.png" },
        { id: "v4", name: "Штрудель", weight: "", price: 3300, ingredients: "говяжье мясо в сливочном соусе, картофель, штрудель, кинза, лук.", image: "/shtudel.png" },
        { id: "v5", name: "Сёмга в сливочном соусе со шпинатом", weight: "", price: 3800, ingredients: "сёмга, шпинат, томаты черри, сливки", image: "/semga.png" },
        { id: "v6", name: "Плов Ташкентский", weight: "", price: 2500, ingredients: "", image: "/plov.png" },
        { id: "v7", name: "Курица по-Тайски", weight: "", price: 2500, ingredients: "филе куриное, болгарский перец, огурцы, марковка по корейский, чеснок, соевый соус, черри, кинза", image: "/potaykuryha.png" },
        { id: "v8", name: "Печень в сметане на жаровне", weight: "", price: 2300, ingredients: "печень, сметана, лук, перец", image: "/pechen.png" },
        { id: "v9", name: "Манты/Хошан", weight: "", price: 2500, ingredients: "", image: "/manti.png" },
        { id: "v10", name: "Сірне", weight: "", price: 3500, ingredients: "картошка, морковь, лук, болгарский перец, мясо баранина", image: "/sirne.png" },
        { id: "v11", name: "Мясо по-Тайски", weight: "", price: 2500, ingredients: "мясо говядины, болгарский перец, огурцы, томаты, чеснок, кунжут", image: "/potaimyaso.png" },
        { id: "v12", name: "Бешбармак", weight: "", price: 3500, ingredients: "", image: "/beshh.png" },
      ],
    },
    {
      id: "kompaniya",
      name: "МЕНЮ НА КОМПАНИЮ",
      items: [
        { id: "k1", name: "Манты/Хошан", weight: "", price: 16000, ingredients: "", image: "/mantikomp.png" },
        { id: "k2", name: "Сірне", weight: "", price: 20000, ingredients: "картошка, морковь, лук, болгарский перец, мясо баранина", image: "/sirnekomp.png" },
        { id: "k3", name: "Жаркое", weight: "", price: 15000, ingredients: "мясо, картошка, лук", image: "/zharkoekomp.png" },
        { id: "k4", name: "Дапанджи", weight: "", price: 15000, ingredients: "курица, овощи, жайма, специи", image: "/dapanzhikomp.png" },
        { id: "k5", name: "Мясо по-Тайски", weight: "", price: 16000, ingredients: "мясо говядины, болгарский перец, огурцы, томаты, чеснок, кунжут", image: "/potaimyaso.png" },
        { id: "k6", name: "Курица по-Тайски", weight: "", price: 14000, ingredients: "филе куриное, болгарский перец, огурцы, морковь по корейский, чеснок, соевый соус, черри, кунжут", image: "/potaykuryha.png" },
      ],
    },
    {
      id: "pivnoy_set",
      name: "ПИВНОЙ СЕТ",
      items: [
        { id: "ps1", name: "СЕТ 1 (2-4 персоны)", weight: "", price: 7000, ingredients: "гренки, сырные палочки, охотничьи сосиски, кур. крылышки, наггетсы, картофельные дольки, луковые кольца, кавказский, чесночный соусы.", image: null },
        { id: "ps2", name: "СЕТ 2", weight: "", price: 9000, ingredients: "гренки-6 шт, куриные наггетсы -6 шт, чечил, чипсы, сырные палочки, фисташки, охотничьи колбаски кольцами, лаваш жаренный", image: null },
        { id: "ps3", name: "СЕТ Фирменный", weight: "", price: 7000, ingredients: "криветки, луковые кольца, чесночные гренки, фри, куринные крылышки, охотничье сосиски, лаваш", image: null },
      ],
    },
    {
      id: "shashlyk_set",
      name: "ШАШЛЫЧНЫЙ СЕТ",
      items: [
        { id: "shs1", name: "СЕТ 1", weight: "", price: 11000, ingredients: "баранина 1п, утка 1п, люля кебаб 1п, куринные крылышки 1п + фри, лаваш, лук, соус", image: null },
        { id: "shs2", name: "СЕТ 2", weight: "", price: 16000, ingredients: "баранина 1п, утка 1п, люля кебаб 2п, куриное филе 2п, фри, лаваш, лук, соус", image: null },
        { id: "shs3", name: "СЕТ Фирменный", weight: "", price: 20000, ingredients: "баранина 2п, люля кебаб 2п, утка 2 п, куриные крылышки 2п, грибы 2п, фри, лаваш, лук, соус", image: null },
      ],
    },
    {
      id: "shashlyk",
      name: "ШАШЛЫК",
      items: [
        { id: "sh1", name: "Баранина", weight: "", price: 3500, ingredients: "", image: null },
        { id: "sh2", name: "Индейка", weight: "", price: 2900, ingredients: "", image: null },
        { id: "sh3", name: "Утка", weight: "", price: 2800, ingredients: "", image: null },
        { id: "sh4", name: "Куриное филе", weight: "", price: 1800, ingredients: "", image: null },
        { id: "sh5", name: "Люля кебаб", weight: "", price: 3000, ingredients: "", image: null },
        { id: "sh6", name: "Грибы на мангале", weight: "", price: 2000, ingredients: "", image: null },
        { id: "sh7", name: "Овощи на гриле", weight: "", price: 2000, ingredients: "", image: null },
        { id: "sh8", name: "Куриные крылышки", weight: "", price: 1800, ingredients: "", image: null },
      ],
    },
    {
      id: "pizza",
      name: "ПИЦЦА",
      items: [
        { id: "pz1_30", name: "Пепперони", weight: "30 см", price: 2500, ingredients: "", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=240&fit=crop&q=80" },
        { id: "pz1_35", name: "Пепперони", weight: "35 см", price: 2900, ingredients: "", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=240&fit=crop&q=80" },
        { id: "pz2_30", name: "Маргарита", weight: "30 см", price: 2000, ingredients: "", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=240&fit=crop&q=80" },
        { id: "pz2_35", name: "Маргарита", weight: "35 см", price: 2300, ingredients: "", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=240&fit=crop&q=80" },
        { id: "pz3_30", name: "Болонезье", weight: "30 см", price: 2500, ingredients: "", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=240&fit=crop&q=80" },
        { id: "pz3_35", name: "Болонезье", weight: "35 см", price: 2800, ingredients: "", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=240&fit=crop&q=80" },
        { id: "pz4_30", name: "4 сезона", weight: "30 см", price: 2500, ingredients: "", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=240&fit=crop&q=80" },
        { id: "pz4_35", name: "4 сезона", weight: "35 см", price: 2900, ingredients: "", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=240&fit=crop&q=80" },
        { id: "pz5_30", name: "Куриная", weight: "30 см", price: 2300, ingredients: "", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&h=240&fit=crop&q=80" },
        { id: "pz5_35", name: "Куриная", weight: "35 см", price: 2600, ingredients: "", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&h=240&fit=crop&q=80" },
        { id: "pz6_30", name: "Сырная", weight: "30 см", price: 2000, ingredients: "", image: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=300&h=240&fit=crop&q=80" },
        { id: "pz6_35", name: "Сырная", weight: "35 см", price: 2300, ingredients: "", image: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=300&h=240&fit=crop&q=80" },
      ],
    },
    {
      id: "vypechka",
      name: "ВЫПЕЧКА",
      items: [
        { id: "vp1", name: "Самса", weight: "1 шт", price: 350, ingredients: "", image: "/samsa.png" },
        { id: "vp2", name: "Лепёшки", weight: "1 шт", price: 300, ingredients: "", image: "/lepeshka.png" },
        { id: "vp3", name: "Чебуреки", weight: "1 шт", price: 300, ingredients: "", image: "/chebur.png" },
        { id: "vp4", name: "Лаваш", weight: "1 шт", price: 300, ingredients: "", image: null },
      ],
    },
    {
      id: "k_pivu",
      name: "К ПИВУ",
      items: [
        { id: "kp1", name: "Чечил", weight: "", price: 1200, ingredients: "", image: null },
        { id: "kp2", name: "Фисташки", weight: "", price: 1200, ingredients: "", image: null },
        { id: "kp3", name: "Чипсы", weight: "", price: 1200, ingredients: "", image: null },
        { id: "kp4", name: "Кириешки", weight: "", price: 700, ingredients: "", image: null },
      ],
    },
    {
      id: "pivo",
      name: "ПИВО НА РАЗЛИВ",
      items: [
        { id: "p1", name: "Yichang светлое 4%", weight: "", price: 800, ingredients: "", image: null },
        { id: "p2", name: "Пражское 4,5 %", weight: "", price: 900, ingredients: "", image: null },
        { id: "p3", name: "Арасан фирменное 4%", weight: "", price: 750, ingredients: "", image: null },
      ],
    },
    {
      id: "alkogol",
      name: "АЛКОГОЛЬ",
      items: [
        { id: "a1", name: "Godunoff Platinum", subCategory: "Водка", weight: "0,5 л", price: 6000, ingredients: "", image: null },
        { id: "a2", name: "Godunoff Gold", subCategory: "Водка", weight: "0,5 л", price: 6000, ingredients: "", image: null },
        { id: "a3", name: "Nemiroff деликат", subCategory: "Водка", weight: "0,5 л", price: 8000, ingredients: "", image: null },
        { id: "a4", name: "Хортиця Айс", subCategory: "Водка", weight: "0,5 л", price: 6000, ingredients: "", image: null },
        { id: "a5", name: "Мороша Синевир", subCategory: "Водка", weight: "0,5 л", price: 5500, ingredients: "", image: null },
        { id: "a6", name: "Absolut Blue", subCategory: "Водка", weight: "0,5 л", price: 12000, ingredients: "", image: null },
        { id: "a7", name: "Ballantine Finest", subCategory: "Виски", weight: "0,5 л", price: 14000, ingredients: "", image: null },
        { id: "a8", name: "William Lawson Spiced", subCategory: "Виски", weight: "0.7 л", price: 12000, ingredients: "", image: null },
        { id: "a9", name: "William Lawson Medial", subCategory: "Виски", weight: "0.7 л", price: 12000, ingredients: "", image: null },
        { id: "a11", name: "Казахстан Classic 3*", subCategory: "Коньяк", weight: "0.5 л", price: 6000, ingredients: "", image: null },
        { id: "a12", name: "SANTO STEFANO ROSSO", subCategory: "Вино", weight: "0.75 л", price: 6000, ingredients: "", image: null },
        { id: "a13", name: "Lambrusco Rose Rosato", subCategory: "Вино", weight: "0.75 л", price: 7000, ingredients: "", image: null },
        { id: "a14", name: "Lambrusco Rose Bianco", subCategory: "Вино", weight: "0.75 л", price: 7000, ingredients: "", image: null },
        { id: "a15", name: "Натуральный сок", subCategory: "Напитки", weight: "1 л", price: 1400, ingredients: "", image: null },
        { id: "a16", name: "Cola, Pepsi", subCategory: "Напитки", weight: "1 л", price: 1000, ingredients: "", image: null },
        { id: "a17", name: "Turan минеральная вода", subCategory: "Напитки", weight: "1 л", price: 600, ingredients: "", image: null },
      ],
    },
    {
      id: "lemonades",
      name: "ЛИМОНАДЫ",
      items: [
        { "id": "lem1", "name": "Манго-маракуя", "weight": "1 л", "price": 2800, "ingredients": "", "image": null },
        { "id": "lem2", "name": "Киви-лайм", "weight": "1 л", "price": 2800, "ingredients": "", "image": null },
        { "id": "lem3", "name": "Мохито", "weight": "1 л", "price": 2800, "ingredients": "", "image": null },
        { "id": "lem4", "name": "Лесные ягоды", "weight": "1 л", "price": 2800, "ingredients": "", "image": null }
      ]
    },
    {
      id: "teas",
      name: "ЧАИ",
      items: [
        { "id": "t1_s", "name": "Ташкентский", "weight": "чашка", "price": 300, "ingredients": "", "image": null },
        { "id": "t1_m", "name": "Ташкентский", "weight": "средний", "price": 1200, "ingredients": "", "image": null },
        { "id": "t1_l", "name": "Ташкентский", "weight": "большой", "price": 1800, "ingredients": "", "image": null },
        { "id": "t2_s", "name": "Марокканский", "weight": "чашка", "price": 300, "ingredients": "", "image": null },
        { "id": "t2_m", "name": "Марокканский", "weight": "средний", "price": 1200, "ingredients": "", "image": null },
        { "id": "t2_l", "name": "Марокканский", "weight": "большой", "price": 1800, "ingredients": "", "image": null },
        { "id": "t3_s", "name": "Чай с молоком", "weight": "чашка", "price": 250, "ingredients": "", "image": null },
        { "id": "t3_m", "name": "Чай с молоком", "weight": "средний", "price": 1100, "ingredients": "", "image": null },
        { "id": "t3_l", "name": "Чай с молоком", "weight": "большой", "price": 1800, "ingredients": "", "image": null },
        { "id": "t4_s", "name": "Чай черный", "weight": "чашка", "price": 150, "ingredients": "", "image": null },
        { "id": "t4_m", "name": "Чай черный", "weight": "средний", "price": 700, "ingredients": "", "image": null },
        { "id": "t4_l", "name": "Чай черный", "weight": "большой", "price": 1000, "ingredients": "", "image": null },
        { "id": "t5_s", "name": "Чай зеленый", "weight": "чашка", "price": 150, "ingredients": "", "image": null },
        { "id": "t5_m", "name": "Чай зеленый", "weight": "средний", "price": 700, "ingredients": "", "image": null },
        { "id": "t5_l", "name": "Чай зеленый", "weight": "большой", "price": 1000, "ingredients": "", "image": null }
      ]
    }
  ],
};

export const menuData: MenuCategory[] = rawData.categories.map((cat) => ({
  ...cat,
  items: cat.items.map((item) => ({ ...item })),
}));

export const globalCategories = [
  {
    id: "main",
    name: "Основное меню",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=220&h=180&fit=crop&q=80",
    categoryIds: ["zakuski", "salaty", "supy", "vtorye", "kompaniya", "pizza", "vypechka"],
  },
  {
    id: "bar",
    name: "Барное меню",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=220&h=180&fit=crop&q=80",
    categoryIds: ["pivo", "alkogol", "lemonades", "teas", "k_pivu"],
  },
  {
    id: "sets",
    name: "СЕТЫ И ШАШЛЫКИ",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=220&h=180&fit=crop&q=80",
    categoryIds: ["pivnoy_set", "shashlyk_set", "shashlyk"],
  },
];

export const promotions = [
  {
    id: "promo1",
    badge: "2+1",
    title: "возьми два пива, получи третье в подарок!",
    bg: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=300&fit=crop&q=80",
  },
  {
    id: "promo2",
    badge: "−15%",
    title: "скидка на шашлык при заказе от 3 порций",
    bg: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=300&fit=crop&q=80",
  },
  {
    id: "promo3",
    badge: "Сет",
    title: "пивной сет для компании от 2 до 4 человек",
    bg: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=300&fit=crop&q=80",
  },
];
