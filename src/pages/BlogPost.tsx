import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEOHelmet from '../components/shared/SEOHelmet';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import { Calendar, User, Clock, Tag, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { getPostById, getRecentPosts } from '../data/blogPosts';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? getPostById(id) : undefined;
  const recentPosts = getRecentPosts(3);
  
  if (!post) {
    return <Navigate to="/blog\" replace />;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована в буфер обмена');
    }
  };

  const structuredData = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.imageUrl,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "НОРДИНЖИНИРИНГ"
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nordengineering.ru/blog/${post.id}`
    }
  } : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {post && (
        <SEOHelmet
          title={post.title}
          description={post.excerpt}
          keywords={`${post.tags.join(', ')}, климатическое оборудование, вентиляция`}
          canonical={`https://nordengineering.ru/blog/${post.id}`}
          ogTitle={post.title}
          ogDescription={post.excerpt}
          ogImage={post.imageUrl}
          ogType="article"
          structuredData={structuredData}
        />
      )}
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Article Header */}
        <section className="py-8 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                to="/blog"
                className="inline-flex items-center text-secondary hover:text-primary dark:hover:text-white mb-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Вернуться к блогу
              </Link>
              
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold bg-secondary/10 text-secondary rounded-full mb-4">
                  {post.category}
                </span>
                
                <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-primary dark:text-white mb-4">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readTime} мин чтения</span>
                  </div>
                  <button 
                    onClick={sharePost}
                    className="flex items-center hover:text-secondary transition-colors"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Поделиться
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="aspect-w-16 aspect-h-9 mb-8">
                <img 
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <div 
                      className="article-content"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                  
                  {/* Share Section */}
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading font-bold text-lg text-primary dark:text-white mb-2">
                          Понравилась статья?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Поделитесь ей с коллегами и друзьями
                        </p>
                      </div>
                      <button 
                        onClick={sharePost}
                        className="btn btn-primary"
                      >
                        <Share2 className="h-5 w-5 mr-2" />
                        Поделиться
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    {/* Author Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-card mb-8">
                      <h3 className="font-heading font-bold text-lg text-primary dark:text-white mb-4">
                        Об авторе
                      </h3>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary dark:text-white">
                            {post.author}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Эксперт по климатическому оборудованию
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Специалист с многолетним опытом в области проектирования и монтажа климатических систем.
                      </p>
                    </div>
                    
                    {/* Recent Posts */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-card">
                      <h3 className="font-heading font-bold text-lg text-primary dark:text-white mb-4">
                        Похожие статьи
                      </h3>
                      <div className="space-y-4">
                        {recentPosts.filter(p => p.id !== post.id).slice(0, 3).map((recentPost) => (
                          <Link 
                            key={recentPost.id}
                            to={`/blog/${recentPost.id}`}
                            className="block group"
                          >
                            <div className="flex gap-3">
                              <img 
                                src={recentPost.imageUrl}
                                alt={recentPost.title}
                                className="w-16 h-16 object-cover rounded flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm text-primary dark:text-white group-hover:text-secondary line-clamp-2 mb-1">
                                  {recentPost.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(recentPost.date)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <Link 
                  to="/blog"
                  className="inline-flex items-center text-secondary hover:text-primary dark:hover:text-white"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Все статьи
                </Link>
                
                <Link 
                  to="/contacts"
                  className="inline-flex items-center text-secondary hover:text-primary dark:hover:text-white"
                >
                  Есть вопросы? Свяжитесь с нами
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;