import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHelmet from "../../components/shared/SEOHelmet";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import Breadcrumbs from "../../components/shared/Breadcrumbs";
import { Search, Grid, List, ArrowRight } from "lucide-react";
import { seoPages } from "../../utils/seo";
import { categories } from "./Categories";

interface Category {
  id: string;
  name: string;
  path: string;
  url: string;
  parentId: string;
  level: number;
  subcategories?: Category[];
}


const Catalog: React.FC = () => {
  // Debug logs removed for production
  
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Каталог климатического оборудования",
    description:
      "Полный каталог вентиляционного и климатического оборудования от ведущих производителей",
    url: "https://nordengineering.ru/catalog",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categories.length,
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.name,
        description: `Каталог ${category.name.toLowerCase()}`,
      })),
    },
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet {...seoPages.catalog} structuredData={structuredData} />
      <Header />
      <main className="pb-12">
        <Breadcrumbs />

        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Каталог оборудования
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Полный каталог климатического и вентиляционного оборудования от
              ведущих производителей
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Поиск по каталогу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-secondary text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-secondary text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  По вашему запросу ничего не найдено. Попробуйте изменить
                  параметры поиска.
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={category.path}
                    className="group bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col h-full"
                  >
                    <div
                      className={`flex flex-col flex-1 ${viewMode === "list" ? "flex-row" : ""}`}
                    >
                      <div
                        className={`relative ${viewMode === "list" ? "w-1/3" : "aspect-w-16 aspect-h-9"}`}
                      >
                        <div className={`bg-gradient-to-br from-primary to-secondary ${
                          viewMode === "list"
                            ? "w-full h-full"
                            : "w-full h-48"
                        } flex items-center justify-center`}>
                          <div className="text-white text-center">
                            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                            <p className="text-sm opacity-90">
                              {category.subcategories?.length || 0} подкатегорий
                            </p>
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-white/90 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                            {category.subcategories?.length || 0} подкатегорий
                          </span>
                        </div>
                      </div>
                      <div
                        className={`p-6 flex flex-col flex-1 ${viewMode === "list" ? "justify-center" : ""}`}
                      >
                        <h2 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white mb-3">
                          {category.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Каталог {category.name.toLowerCase()} с полным ассортиментом товаров
                        </p>
                        <div className="flex items-center text-secondary group-hover:text-primary dark:group-hover:text-white transition-colors mt-auto">
                          <span className="mr-2">Смотреть товары</span>
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Statistics */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary dark:text-white mb-2">
                  {categories.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0)}+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Товаров в каталоге
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary dark:text-white mb-2">
                  {categories.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Категорий
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary dark:text-white mb-2">
                  50+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Производителей
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary dark:text-white mb-2">
                  18+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Лет опыта
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
