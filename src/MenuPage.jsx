import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, Clock3, Instagram, MapPin, Search, Utensils, X } from 'lucide-react';
import PageLoader from './PageLoader.jsx';
import './menu.css';

const translations = {
  ru: {
    back: 'Главная', kicker: 'Вкус начинается с выбора', titleA: 'Меню', titleB: 'Amarant.', intro: 'Любимые блюда, щедрые порции и свежие вкусы. Выберите категорию и найдите то, что подходит именно вашему вечеру.',
    food: 'Кухня', drinks: 'Напитки', all: 'Всё меню', search: 'Найти блюдо или напиток', items: 'позиций', fromPdf: 'Цены из меню ресторана', notice: 'Цены указаны по предоставленному меню и могут измениться. Наличие блюд уточняйте у ресторана.',
    call: 'Забронировать столик', location: 'Лутфи, 49 · Ташкент', hours: 'Ежедневно · 11:00–23:00', noResults: 'Ничего не найдено', noResultsText: 'Попробуйте изменить поисковый запрос или категорию.',
    categories: { salads: 'Салаты', starters: 'Закуски', soups: 'Первые блюда', national: 'Национальные блюда', meat: 'Мясо', chicken: 'Блюда из курицы', fish: 'Блюда из рыбы', pasta: 'Паста', bbq: 'Барбекю', steak: 'Стейки', shashlik: 'Шашлык', sides: 'Гарниры', desserts: 'Десерты', bread: 'Хлеб', tea: 'Чай', lemonade: 'Лимонады', fresh: 'Фреши и шейки', soft: 'Холодные напитки', cocktails: 'Коктейли', wine: 'Вино', spirits: 'Крепкие напитки', beer: 'Пиво' },
    groupCaption: { food: 'Из кухни', drinks: 'Из бара' }, catalogLabel: '01 / КАТАЛОГ', tableLabel: '02 / ВАШ СТОЛ', photoCaption: 'БЛЮДА, КОТОРЫМИ ХОЧЕТСЯ ДЕЛИТЬСЯ', sidePhrase: 'ВКУС · ВСТРЕЧИ · AMARANT', brandCity: 'ТАШКЕНТ', locationOverline: 'РЕСТОРАН · ТАШКЕНТ', categoryAria: 'Категории меню', menuTypeAria: 'Тип меню', clearSearch: 'Очистить поиск', mapAria: 'Открыть карту', instagramAria: 'Instagram Amarant', 
  },
  en: {
    back: 'Home', kicker: 'The pleasure of choosing', titleA: 'The menu', titleB: 'at Amarant.', intro: 'Guest favourites, generous plates and fresh flavours. Explore the categories and find something made for your kind of evening.',
    food: 'Food', drinks: 'Drinks', all: 'All items', search: 'Search dishes and drinks', items: 'items', fromPdf: 'Prices from the restaurant menu', notice: 'Prices are transcribed from the supplied menu and may change. Please contact the restaurant to confirm availability.',
    call: 'Book a table', location: '49 Lutfi Street · Tashkent', hours: 'Daily · 11:00 AM–11:00 PM', noResults: 'No items found', noResultsText: 'Try changing your search or selected category.',
    categories: { salads: 'Salads', starters: 'Starters', soups: 'Soups', national: 'Uzbek favourites', meat: 'Meat', chicken: 'Chicken', fish: 'Fish', pasta: 'Pasta', bbq: 'Barbecue', steak: 'Steaks', shashlik: 'Shashlik', sides: 'Sides', desserts: 'Desserts', bread: 'Bread', tea: 'Tea', lemonade: 'Lemonades', fresh: 'Fresh juice & shakes', soft: 'Soft drinks', cocktails: 'Cocktails', wine: 'Wine', spirits: 'Spirits', beer: 'Beer' },
    groupCaption: { food: 'From the kitchen', drinks: 'From the bar' }, catalogLabel: '01 / THE CATALOG', tableLabel: '02 / YOUR TABLE', photoCaption: 'MADE TO BE SHARED', sidePhrase: 'GOOD FOOD · GOOD PEOPLE', brandCity: 'TASHKENT', locationOverline: 'RESTAURANT · TASHKENT', categoryAria: 'Menu categories', menuTypeAria: 'Menu type', clearSearch: 'Clear search', mapAria: 'Open map', instagramAria: 'Amarant on Instagram',
  },
  uz: {
    back: 'Bosh sahifa', kicker: 'Tanlovdan boshlanadigan lazzat', titleA: 'Menyu', titleB: 'Amarantda.', intro: 'Mehmonlar sevgan taomlar, mo‘l porsiyalar va yangi ta’mlar. Kategoriyani tanlang va kechangiz uchun mos taomni toping.',
    food: 'Taomlar', drinks: 'Ichimliklar', all: 'Barcha menyu', search: 'Taom yoki ichimlikni qidirish', items: 'ta pozitsiya', fromPdf: 'Restoran menyusidagi narxlar', notice: 'Narxlar taqdim etilgan menyudan olindi va o‘zgarishi mumkin. Taom mavjudligini restorandan aniqlashtiring.',
    call: 'Stol band qilish', location: 'Lutfiy ko‘chasi, 49 · Toshkent', hours: 'Har kuni · 11:00–23:00', noResults: 'Hech narsa topilmadi', noResultsText: 'Qidiruv so‘zini yoki kategoriyani o‘zgartirib ko‘ring.',
    categories: { salads: 'Salatlar', starters: 'Gazaklar', soups: 'Birinchi taomlar', national: 'Milliy taomlar', meat: 'Go‘shtli taomlar', chicken: 'Tovuq taomlari', fish: 'Baliq taomlari', pasta: 'Pasta', bbq: 'Barbekyu', steak: 'Steyklar', shashlik: 'Shashlik', sides: 'Garnirlar', desserts: 'Shirinliklar', bread: 'Non', tea: 'Choy', lemonade: 'Limonadlar', fresh: 'Fresh va sheyklar', soft: 'Salqin ichimliklar', cocktails: 'Kokteyllar', wine: 'Vino', spirits: 'Kuchli ichimliklar', beer: 'Pivo' },
    groupCaption: { food: 'Oshxonadan', drinks: 'Bardan' }, catalogLabel: '01 / KATALOG', tableLabel: '02 / SIZNING DASTURXONINGIZ', photoCaption: 'BAHAM KO‘RISH UCHUN YARATILGAN TA’MLAR', sidePhrase: 'TA’M · UCHRASHUV · AMARANT', brandCity: 'TOSHKENT', locationOverline: 'RESTORAN · TOSHKENT', categoryAria: 'Menyu kategoriyalari', menuTypeAria: 'Menyu turi', clearSearch: 'Qidiruvni tozalash', mapAria: 'Xaritani ochish', instagramAria: 'Amarant Instagram sahifasi',
  },
};

const make = (id, category, group, price, image, ru, en, uz) => ({ id, category, group, price, image: `/menu/${image}${['beer-glass', 'whisky-bottle', 'wine-bottle'].includes(image) ? '.svg' : '.webp'}`, name: { ru, en, uz } });

// Item names and prices below are taken from the two supplied AMARANT menu PDFs.
// Photos are cropped directly from those menu pages for a cohesive, authentic gallery.
const items = [
  make('salad-greek','salads','food',55000,'salad-greek','Греческий салат','Greek salad','Yunon salati'),
  make('salad-summer','salads','food',35000,'salad-summer','Салат летний','Summer salad','Yozgi salat'),
  make('salad-english','salads','food',55000,'salad-english','Английский салат','English salad','Inglizcha salat'),
  make('salad-crispy','salads','food',88000,'salad-crispy','Салат «Хрустящие баклажаны»','Crispy eggplant salad','Qarsildoq baqlajon salati'),
  make('salad-eggplant','salads','food',65000,'salad-eggplant','Баклажановый салат','Eggplant salad','Baqlajon salati'),
  make('salad-achichuk','salads','food',35000,'salad-achichuk','Ачичук','Achichuk tomato salad','Achchiq-chuchuk'),
  make('salad-green','salads','food',71000,'salad-green','Зелёный салат с кунжутной заправкой','Green salad with sesame dressing','Kunjutli sousli ko‘k salat'),
  make('salad-beet','salads','food',50000,'salad-beet','Салат «Черчилль»','Churchill salad','Cherchill salati'),
  make('salad-burrata','salads','food',135000,'salad-mix','Закуска «Буррата»','Burrata starter','Burrata gazagi'),
  make('cold-vegetables','starters','food',82000,'salad-greek','Овощное ассорти','Vegetable assortment','Sabzavotlar assortisi'),
  make('cold-pickles','starters','food',110000,'salad-mix','Маринованное ассорти','Pickled assortment','Marinadlangan assorti'),
  make('cold-suzma','starters','food',19000,'salad-summer','Сузьма','Suzma','Suzma'),
  make('hot-shrimp','starters','food',120000,'pasta-shrimp','Креветки темпура','Tempura prawns','Tempura krevetkalari'),
  make('hot-julienne','starters','food',45000,'soup-mushroom','Жюльен овощной','Vegetable julienne','Sabzavotli julien'),
  make('hot-mushroom','starters','food',63000,'salad-eggplant','Жареные грибы со сливками','Creamy fried mushrooms','Qaymoqli qovurilgan qo‘ziqorin'),
  make('soup-dumplings','soups','food',46000,'soup-dumplings','Пельмени','Dumplings','Chuchvara'),
  make('soup-mastava','soups','food',49000,'soup-mastava','Мастава','Mastava soup','Mastava'),
  make('soup-solyanka','soups','food',48000,'soup-solyanka','Солянка','Solyanka soup','Solyanka sho‘rva'),
  make('soup-shurpa','soups','food',58000,'soup-shurpa','Шурпа','Shurpa','Sho‘rva'),
  make('soup-lentil','soups','food',35000,'soup-lentil','Чечевичный суп-пюре','Lentil cream soup','Yasmiqli krem-sho‘rva'),
  make('soup-borscht','soups','food',54000,'soup-borscht','Борщ','Borscht','Borsh'),
  make('national-lamb','national','food',45000,'national-lamb','Умайкай из баранины (100 г)','Lamb umaykai (100 g)','Qo‘y go‘shtli umaykay (100 g)'),
  make('national-ribs','national','food',50000,'national-ribs','Жиз из бараньих рёбрышек (100 г)','Lamb ribs jiz (100 g)','Qo‘y qovurg‘asidan jiz (100 g)'),
  make('national-beef','national','food',77000,'national-beef','Жиз из филе говядины (100 г)','Beef fillet jiz (100 g)','Mol filetosidan jiz (100 g)'),
  make('national-shoulder','national','food',350000,'national-lamb','Запечённая баранья лопатка (1 кг)','Roasted lamb shoulder (1 kg)','Duxovkada pishirilgan qo‘y kuragi (1 kg)'),
  make('meat-beijing','meat','food',126000,'bbq-beef','Мясо по-пекински','Beijing-style beef','Pekincha go‘sht'),
  make('meat-medallions','meat','food',196000,'steak-classic','Медальоны с овощным гарниром','Beef medallions with vegetables','Sabzavotli mol go‘shti medalyonlari'),
  make('meat-veal','meat','food',138000,'bbq-veal','Телятина с овощами','Veal with vegetables','Sabzavotli buzoq go‘shti'),
  make('meat-mushroom','meat','food',156000,'steak-pepper','Мясо с грибами','Beef with mushrooms','Qo‘ziqorinli go‘sht'),
  make('meat-creamy','meat','food',181000,'bbq-beef','Телятина со сливочным соусом','Veal in creamy sauce','Qaymoqli sousdagi buzoq go‘shti'),
  make('chicken-fricassee','chicken','food',61000,'bbq-chicken','Фрикасе из курицы','Chicken fricassee','Tovuq frikasesi'),
  make('chicken-vegetables','chicken','food',61000,'bbq-chicken','Курица с овощами','Chicken with vegetables','Sabzavotli tovuq'),
  make('chicken-roll','chicken','food',59000,'bbq-chicken','Куриный рулет с фетакой','Chicken roll with feta','Fetali tovuq ruleti'),
  make('fish-dorado','fish','food',54000,'fish-dorado','Дорадо с овощами на гриле','Grilled dorado with vegetables','Grilda pishirilgan dorado va sabzavotlar'),
  make('fish-salmon','fish','food',207000,'fish-salmon','Лосось в икорном соусе','Salmon in roe sauce','Ikra sousidagi losos'),
  make('fish-trout','fish','food',54000,'fish-trout','Форель жареная (100 г)','Fried trout (100 g)','Qovurilgan forel (100 g)'),
  make('pasta-bolognese','pasta','food',83000,'pasta-bolognese','Спагетти Болоньезе','Spaghetti Bolognese','Bolonez spagettisi'),
  make('pasta-salmon','pasta','food',99000,'pasta-salmon','Спагетти с лососем','Spaghetti with salmon','Lososli spagetti'),
  make('pasta-shrimp','pasta','food',95000,'pasta-shrimp','Спагетти с креветкой','Spaghetti with shrimp','Krevetkali spagetti'),
  make('bbq-beef','bbq','food',215000,'bbq-beef','Барбекю из говядины','Beef barbecue','Mol go‘shti barbekyusi'),
  make('bbq-assortment','bbq','food',870000,'bbq-assortment','Барбекю ассорти','Barbecue assortment','Barbekyu assortisi'),
  make('bbq-lamb','bbq','food',165000,'bbq-lamb','Барбекю из баранины','Lamb barbecue','Qo‘y go‘shti barbekyusi'),
  make('steak-classic','steak','food',178000,'steak-classic','Классический стейк','Classic steak','Klassik steyk'),
  make('steak-pepper','steak','food',172000,'steak-pepper','Пеппер-стейк','Pepper steak','Murchli steyk'),
  make('shashlik-fillet','shashlik','food',131000,'skewer-fillet','Шашлык из филе','Fillet shashlik','File shashligi'),
  make('shashlik-mushroom','shashlik','food',50000,'skewer-mushroom','Шашлык грибной','Mushroom shashlik','Qo‘ziqorin shashligi'),
  make('shashlik-salmon','shashlik','food',124000,'skewer-salmon','Шашлык из лосося','Salmon shashlik','Losos shashligi'),
  make('shashlik-ribs','shashlik','food',166000,'skewer-ribs','Шашлык из бараньих рёбрышек','Lamb rib shashlik','Qo‘y qovurg‘asi shashligi'),
  make('side-fries','sides','food',24000,'side-fries','Картофель фри','French fries','Kartoshka fri'),
  make('side-vegetables','sides','food',27500,'side-vegetables','Овощной гарнир','Vegetable side','Sabzavotli garnir'),
  make('side-risotto','sides','food',35000,'side-risotto','Ризотто','Risotto','Rizotto'),
  make('side-rustic','sides','food',15500,'side-potato','Картофель по-деревенски','Country-style potatoes','Qishloqcha kartoshka'),
  make('dessert-san-sebastian','desserts','food',45000,'dessert-san-sebastian','Чизкейк «Сан-Себастьян»','San Sebastián cheesecake','San-Sebastyan chizkeyki'),
  make('dessert-fruit','desserts','food',350000,'dessert-fruit','Фруктовое ассорти','Fruit assortment','Mevalar assortisi'),
  make('dessert-icecream','desserts','food',16000,'dessert-icecream','Мороженое','Ice cream','Muzqaymoq'),
  make('dessert-newyork','desserts','food',39000,'dessert-newyork','Чизкейк «Нью-Йорк»','New York cheesecake','Nyu-York chizkeyki'),
  make('dessert-fondant','desserts','food',32000,'dessert-fondant','Шоколадный фондан','Chocolate fondant','Shokoladli fondan'),
  make('dessert-raspberry','desserts','food',42500,'dessert-raspberry','Малиновый чизкейк','Raspberry cheesecake','Malinali chizkeyk'),
  make('bread-garlic','bread','food',6000,'bread-garlic','Чесночный хлеб','Garlic bread','Sarimsoqli non'),
  make('bread-assortment','bread','food',43000,'bread-assortment','Хлебное ассорти','Bread assortment','Non assortisi'),
  make('tea-seabuckthorn','tea','drinks',38000,'tea-seabuckthorn','Чай облепиховый','Sea buckthorn tea','Chakanda choyi'),
  make('tea-green-lemon','tea','drinks',19000,'tea-green-lemon','Чай зелёный с лимоном','Green tea with lemon','Limonli ko‘k choy'),
  make('tea-ginger','tea','drinks',25000,'tea-ginger','Чай имбирно-фруктовый','Ginger fruit tea','Zanjabil-mevali choy'),
  make('tea-berry','tea','drinks',38000,'tea-berry','Чай «Ягодный микс»','Berry mix tea','Rezavorlar aralashmasi choyi'),
  make('lemonade-mango','lemonade','drinks',70000,'lemonade-mango','Лимонад «Манго-маракуйя»','Mango passion fruit lemonade','Mango-marakuya limonadi'),
  make('lemonade-tarragon','lemonade','drinks',70000,'lemonade-tarragon','Лимонад «Тархун»','Tarragon lemonade','Tarxun limonadi'),
  make('lemonade-tropical','lemonade','drinks',70000,'lemonade-tropical','Лимонад «Тропический»','Tropical lemonade','Tropik limonad'),
  make('lemonade-mojito','lemonade','drinks',70000,'lemonade-mojito','Лимонад «Мохито»','Mojito lemonade','Moxito limonadi'),
  make('fresh-orange','fresh','drinks',60000,'fresh-orange','Фреш апельсиновый','Fresh orange juice','Yangi siqilgan apelsin sharbati'),
  make('fresh-pomegranate','fresh','drinks',24000,'fresh-pomegranate','Фреш гранатовый','Fresh pomegranate juice','Yangi siqilgan anor sharbati'),
  make('fresh-apple','fresh','drinks',32000,'fresh-apple','Фреш яблочный','Fresh apple juice','Yangi siqilgan olma sharbati'),
  make('fresh-banana','fresh','drinks',34000,'fresh-banana','Шейк банановый','Banana shake','Bananli sheyk'),
  make('soft-cola','soft','drinks',17000,'cold-cola','Кока-кола 0,25 л','Coca-Cola 0.25 L','Coca-Cola 0,25 l'),
  make('soft-fanta','soft','drinks',17000,'cold-fanta','Фанта 0,25 л','Fanta 0.25 L','Fanta 0,25 l'),
  make('soft-sprite','soft','drinks',13000,'cold-sprite','Спрайт 0,25 л','Sprite 0.25 L','Sprite 0,25 l'),
  make('soft-energy','soft','drinks',30000,'cold-energy','Red Bull','Red Bull','Red Bull'),
  make('cocktail-mojito','cocktails','drinks',77000,'cocktail-mojito','Коктейль «Махито» алкогольный','Alcoholic Mojito cocktail','Alkogolli Moxito kokteyli'),
  make('cocktail-long-island','cocktails','drinks',90000,'cocktail-longisland','Коктейль Long Island','Long Island cocktail','Long Island kokteyli'),
  make('cocktail-pina-colada','cocktails','drinks',60000,'fresh-banana','Коктейль Pina Colada','Pina Colada cocktail','Pina Colada kokteyli'),
  make('cocktail-margarita','cocktails','drinks',102000,'lemonade-tropical','Коктейль Margarita','Margarita cocktail','Margarita kokteyli'),
  make('cocktail-aperol','cocktails','drinks',138000,'cocktail-aperol','Коктейль Aperol Spritz','Aperol Spritz cocktail','Aperol Spritz kokteyli'),
  make('wine-monte','wine','drinks',320000,'wine-monte','Вино Monte Bianco (0,75 л)','Monte Bianco wine (0.75 L)','Monte Bianco vinosi (0,75 l)'),
  make('wine-pinot','wine','drinks',156000,'wine-pinot','Вино Laguna Pinot Noir (0,75 л)','Laguna Pinot Noir wine (0.75 L)','Laguna Pinot Noir vinosi (0,75 l)'),
  make('wine-shiraz','wine','drinks',160000,'wine-shiraz','Вино Laguna Shiraz (0,75 л)','Laguna Shiraz wine (0.75 L)','Laguna Shiraz vinosi (0,75 l)'),
  make('wine-marani','wine','drinks',396000,'wine-bottle','Вино Marani Киндзмараули (0,75 л)','Marani Kindzmarauli wine (0.75 L)','Marani Kindzmarauli vinosi (0,75 l)'),
  make('spirit-chizano','spirits','drinks',590000,'spirit-vermouth','Вермут Chizano Rosso (1 л)','Chizano Rosso vermouth (1 L)','Chizano Rosso vermuti (1 l)'),
  make('spirit-martini','spirits','drinks',620000,'spirit-martini','Вермут Martini Extra Dry (1 л)','Martini Extra Dry vermouth (1 L)','Martini Extra Dry vermuti (1 l)'),
  make('spirit-vodka','spirits','drinks',920000,'spirit-uzbekistan','Водка Premium Uzbekistan Gold (0,7 л)','Premium Uzbekistan Gold vodka (0.7 L)','Premium Uzbekistan Gold arog‘i (0,7 l)'),
  make('spirit-greygoose','spirits','drinks',880000,'spirit-greygoose','Водка Grey Goose (0,5 л)','Grey Goose vodka (0.5 L)','Grey Goose arog‘i (0,5 l)'),
  make('spirit-tequila','spirits','drinks',1008000,'whisky-bottle','Текила Lunazul','Lunazul tequila','Lunazul tekilasi'),
  make('spirit-chivas','spirits','drinks',2622000,'whisky-bottle','Виски Chivas Regal 18 (0,7 л)','Chivas Regal 18 whisky (0.7 L)','Chivas Regal 18 viskisi (0,7 l)'),
  make('spirit-jack','spirits','drinks',890000,'whisky-bottle','Виски Jack Daniel’s (0,7 л)','Jack Daniel’s whisky (0.7 L)','Jack Daniel’s viskisi (0,7 l)'),
  make('spirit-jameson','spirits','drinks',990000,'whisky-bottle','Виски Jameson (1 л)','Jameson whiskey (1 L)','Jameson viskisi (1 l)'),
  make('beer-baltika','beer','drinks',30000,'beer-glass','Пиво «Балтика 7» (0,45 л)','Baltika 7 beer (0.45 L)','Baltika 7 pivosi (0,45 l)'),
  make('beer-chimkent','beer','drinks',42000,'beer-glass','Пиво «Шымкент» разливное (0,5 л)','Shymkent draft beer (0.5 L)','Shymkent quyma pivosi (0,5 l)'),
  make('beer-heineken','beer','drinks',70000,'beer-glass','Пиво Heineken (0,5 л)','Heineken beer (0.5 L)','Heineken pivosi (0,5 l)'),
  make('beer-tuborg','beer','drinks',25000,'beer-glass','Пиво Tuborg разливное (0,5 л)','Tuborg draft beer (0.5 L)','Tuborg quyma pivosi (0,5 l)'),
  make('beer-efes','beer','drinks',44000,'beer-glass','Пиво Efes (0,45 л)','Efes beer (0.45 L)','Efes pivosi (0,45 l)'),
];

export default function MenuPage() {
  const [language, setLanguage] = useState(() => {
    try { const saved = localStorage.getItem('amarant-language'); return ['ru', 'en', 'uz'].includes(saved) ? saved : 'ru'; }
    catch { return 'ru'; }
  });
  const [group, setGroup] = useState('food');
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const t = translations[language];
  useEffect(() => { document.documentElement.lang = language; }, [language]);

  const changeLanguage = (next) => {
    setLanguage(next);
    try { localStorage.setItem('amarant-language', next); } catch { /* localStorage may be disabled */ }
  };
  const categories = useMemo(() => [...new Set(items.filter((entry) => entry.group === group).map((entry) => entry.category))], [group]);
  const visibleItems = useMemo(() => items.filter((entry) => {
    if (entry.group !== group) return false;
    if (category !== 'all' && entry.category !== category) return false;
    const searchText = `${entry.name.ru} ${entry.name.en} ${entry.name.uz} ${t.categories[entry.category]}`.toLocaleLowerCase();
    return searchText.includes(query.trim().toLocaleLowerCase());
  }), [group, category, query, t]);

  const switchGroup = (next) => { setGroup(next); setCategory('all'); setQuery(''); };
  const price = (amount) => `${new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ru-RU').format(amount)} ${language === 'uz' ? "so'm" : language === 'en' ? 'UZS' : 'сум'}`;

  return (
    <div className="menu-page">
      <PageLoader />
      <header className="menu-header">
        <a className="menu-brand" href="/" aria-label="Amarant home"><span className="menu-brand-mark">A<span>✳</span></span><span>AMARANT<small>RESTAURANT</small></span></a>
        <a className="menu-back" href="/"><ArrowLeft size={16} /> {t.back}</a>
        <div className="menu-header-right">
          <div className="menu-language" aria-label="Language selector">
            {['ru','en','uz'].map((code, index) => <React.Fragment key={code}>{index > 0 && <span>/</span>}<button className={language === code ? 'active' : ''} onClick={() => changeLanguage(code)} aria-pressed={language === code}>{code.toUpperCase()}</button></React.Fragment>)}
          </div>
          <a className="menu-book-link" href="tel:+998950767777">{t.call}<ArrowUpRight size={15} /></a>
        </div>
      </header>

      <main>
        <section className="menu-hero">
          <div className="menu-hero-overline"><span />AMARANT · {t.locationOverline}</div>
          <div className="menu-hero-layout">
            <div>
              <p className="menu-kicker">{t.kicker}</p>
              <h1>{t.titleA}<br /><em>{t.titleB}</em></h1>
              <p className="menu-intro">{t.intro}</p>
              <div className="menu-hero-bottom"><span>01 — 02</span><i /><span>{items.length} {t.items}</span><ArrowDown size={16} /></div>
            </div>
            <div className="menu-hero-photo"><img src="/menu/bbq-assortment.webp" alt="Amarant barbecue assortment" /><div className="menu-hero-photo-caption"><span>{t.photoCaption}</span><span>AMARANT · {t.brandCity}</span></div></div>
          </div>
          <span className="menu-hero-side">{t.sidePhrase}</span>
        </section>

        <section className="menu-catalog" aria-label={t.all}>
          <div className="catalog-heading">
            <div><span className="menu-section-number">{t.catalogLabel}</span><h2>{t.all}<span>.</span></h2></div>
            <div className="catalog-heading-note"><Utensils size={18} /><p>{t.fromPdf}<br /><small>{t.notice}</small></p></div>
          </div>

          <div className="catalog-controls">
            <div className="menu-group-tabs" role="tablist" aria-label={t.menuTypeAria}>
              <button className={group === 'food' ? 'active' : ''} onClick={() => switchGroup('food')} role="tab" aria-selected={group === 'food'}>{t.food}<span>{items.filter((x) => x.group === 'food').length.toString().padStart(2,'0')}</span></button>
              <button className={group === 'drinks' ? 'active' : ''} onClick={() => switchGroup('drinks')} role="tab" aria-selected={group === 'drinks'}>{t.drinks}<span>{items.filter((x) => x.group === 'drinks').length.toString().padStart(2,'0')}</span></button>
            </div>
            <label className="menu-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} aria-label={t.search} />{query && <button onClick={() => setQuery('')} aria-label={t.clearSearch}><X size={15} /></button>}</label>
          </div>

          <div className="category-chips" aria-label={t.categoryAria}>
            <button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>{t.all}</button>
            {categories.map((key) => <button key={key} className={category === key ? 'active' : ''} onClick={() => setCategory(key)}>{t.categories[key]}</button>)}
          </div>

          <div className="catalog-result-line"><span>{t.groupCaption[group]}</span><span>{visibleItems.length.toString().padStart(2,'0')} {t.items}</span></div>
          {visibleItems.length > 0 ? <div className="menu-items-grid">
            {visibleItems.map((item, index) => <article className="menu-item-card" key={item.id} style={{ '--item-index': index % 9 }}>
              <div className="menu-item-image"><img src={item.image} alt={item.name[language]} loading="lazy" onLoad={(event) => event.currentTarget.parentElement.classList.add('image-loaded')} onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement.classList.add('image-fallback'); }} /><span className="menu-item-index">{String(index + 1).padStart(2, '0')}</span><span className="menu-item-category">{t.categories[item.category]}</span></div>
              <div className="menu-item-info"><h3>{item.name[language]}</h3><div className="menu-item-bottom"><span>{t.categories[item.category]}</span><strong>{price(item.price)}</strong></div></div>
            </article>)}
          </div> : <div className="empty-menu"><Search size={24} /><h3>{t.noResults}</h3><p>{t.noResultsText}</p></div>}
        </section>

        <section className="menu-booking">
          <div><span className="menu-section-number">{t.tableLabel}</span><h2>{language === 'ru' ? 'Пусть вечер' : language === 'uz' ? 'Kechangiz' : 'Let the evening'}<br /><em>{language === 'ru' ? 'будет особенным.' : language === 'uz' ? 'o‘zgacha bo‘lsin.' : 'be memorable.'}</em></h2></div>
          <div className="menu-booking-action"><p>{language === 'ru' ? 'Позвоните нам, чтобы забронировать столик или уточнить наличие блюд.' : language === 'uz' ? 'Stol band qilish yoki taomlar mavjudligini bilish uchun bizga qo‘ng‘iroq qiling.' : 'Call us to reserve a table or ask about today’s menu.'}</p><a className="menu-call-button" href="tel:+998950767777">{t.call}<ArrowUpRight size={16} /></a></div>
        </section>
      </main>

      <footer className="menu-footer"><a className="menu-footer-brand" href="/">AMARANT <small>RESTAURANT</small></a><span>{t.location}</span><span className="menu-footer-hours"><Clock3 size={14} />{t.hours}</span><a href="https://www.instagram.com/amarant.restaurants/?hl=ru" target="_blank" rel="noreferrer" aria-label={t.instagramAria}><Instagram size={17} /></a><a href="https://www.google.com/maps/search/?api=1&query=Amarant+Restaurant+Lutfi+Street+49+Tashkent" target="_blank" rel="noreferrer" aria-label={t.mapAria}><MapPin size={17} /></a></footer>
    </div>
  );
}
