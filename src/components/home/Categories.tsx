import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories as catalogCategories, type Category as CatalogCategory } from "../../pages/catalog/Categories";

// Берём актуальные категории из сгенерированного каталога
const topCategories: CatalogCategory[] = (() => {
  const top = (catalogCategories ?? []).filter((category) => category.level === 1);
  return (top.length > 0 ? top : catalogCategories).slice(0, 6);
})();

const Categories: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 fade-in-element">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-primary dark:text-white mb-3 sm:mb-4">
            Каталог оборудования
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Широкий ассортимент климатического оборудования от ведущих мировых производителей
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCategories.map((category) => (
            <Link
              key={category.id}
              to={`/catalog/${category.path}`}
              className="group relative rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-80 bg-gradient-to-br from-primary to-secondary"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 group-hover:from-black/80 group-hover:via-black/50 transition-all duration-300"></div>

              <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
                <div>
                  <h3 className="font-heading font-bold text-xl lg:text-2xl mb-2 text-white group-hover:text-accent transition-colors duration-300">
                    {category.name}
                  </h3>

                  <p className="text-white/90 text-sm sm:text-base mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {(category.subcategories?.length || 0)} подкатегорий
                  </p>

                  <div className="flex items-center text-accent font-semibold text-sm sm:text-base opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-200">
                    <span>Смотреть товары</span>
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-xl transition-colors duration-300 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 lg:mt-16 text-center fade-in-element">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12">
            <h3 className="font-heading font-bold text-2xl lg:text-3xl text-white mb-4">
              Не нашли нужное оборудование?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Наши специалисты помогут подобрать оптимальное решение под ваши задачи и бюджет
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <a
                href="/contacts"
                className="magnetic-effect inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-8 rounded-lg transition-colors min-h-[48px] text-lg"
              >
                Получить консультацию
              </a>
              <a
                href="/catalog"
                className="magnetic-effect inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-lg transition-colors border border-white/20 hover:border-white/30 min-h-[48px] text-lg"
              >
                Весь каталог
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;