import React from "react";
import { Link } from "react-router-dom";
import SEOHelmet from "../components/shared/SEOHelmet";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Breadcrumbs from "../components/shared/Breadcrumbs";
import { Search, Calendar, User, ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts, getAllCategories, getAllTags } from "../data/blogPosts";
import { seoPages } from "../utils/seo";
import OptimizedImage, {
  generateBlogAlt,
} from "../components/shared/OptimizedImage";

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Все посты");
  const [filteredPosts, setFilteredPosts] = React.useState(blogPosts);

  const categories = ["Все посты", ...getAllCategories()];
  const allTags = getAllTags();

  React.useEffect(() => {
    let filtered = blogPosts;

    // Фильтрация по категории
    if (selectedCategory !== "Все посты") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Блог НОРДИНЖИНИРИНГ",
    description: "Полезные статьи о климатических системах и вентиляции",
    url: "https://nordengineering.ru/blog",
    publisher: {
      "@type": "Organization",
      name: "НОРДИНЖИНИРИНГ",
      url: "https://nordengineering.ru",
      logo: "https://nordengineering.ru/logo.png",
    },
    blogPost: filteredPosts.slice(0, 5).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://nordengineering.ru/blog/${post.id}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author,
      },
      image: post.imageUrl,
    })),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHelmet {...seoPages.blog} structuredData={structuredData} />
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Блог компании
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Актуальные новости, полезные статьи и экспертные материалы о
              системах вентиляции и кондиционирования
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
                  placeholder="Поиск статей..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-secondary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  По вашему запросу ничего не найдено. Попробуйте изменить
                  параметры поиска.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <OptimizedImage
                        src={post.imageUrl}
                        alt={generateBlogAlt(post.title)}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-2" />
                        <span>{post.author}</span>
                      </div>

                      <h2 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-3 hover:text-primary transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h2>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{post.readTime} мин</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center text-secondary hover:text-secondary-dark transition-colors font-medium"
                        >
                          Читать далее
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Popular Tags */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white text-center mb-8">
              Популярные теги
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {allTags.slice(0, 15).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-secondary hover:text-white transition-colors"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
