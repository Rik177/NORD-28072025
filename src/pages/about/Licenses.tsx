import React from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import { FileText, Download, Search, Eye } from 'lucide-react';

interface License {
  id: number;
  title: string;
  number: string;
  issueDate: string;
  expiryDate: string;
  image: string;
  type: 'license' | 'certificate';
}

const documents: License[] = [
  {
    id: 1,
    title: 'Лицензия на проектирование',
    number: 'ЛП-123456',
    issueDate: '15.01.2020',
    expiryDate: '15.01.2025',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg',
    type: 'license'
  },
  {
    id: 2,
    title: 'Сертификат ISO 9001',
    number: 'ISO-789012',
    issueDate: '01.03.2021',
    expiryDate: '01.03.2024',
    image: 'https://images.pexels.com/photos/590037/pexels-photo-590037.jpeg',
    type: 'certificate'
  },
  {
    id: 3,
    title: 'Лицензия на монтажные работы',
    number: 'ЛМ-345678',
    issueDate: '10.06.2022',
    expiryDate: '10.06.2027',
    image: 'https://images.pexels.com/photos/590058/pexels-photo-590058.jpeg',
    type: 'license'
  }
];

const Licenses: React.FC = () => {
  const [selectedType, setSelectedType] = React.useState<'all' | 'license' | 'certificate'>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDocument, setSelectedDocument] = React.useState<License | null>(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pb-12">
        <Breadcrumbs />
        
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-h1-mobile md:text-h1-desktop text-white text-center mb-6">
              Лицензии и сертификаты
            </h1>
            <p className="text-white/90 text-center max-w-2xl mx-auto">
              Документы, подтверждающие качество и надежность наших услуг
            </p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-lightBg dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedType === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Все документы
                </button>
                <button
                  onClick={() => setSelectedType('license')}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedType === 'license'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Лицензии
                </button>
                <button
                  onClick={() => setSelectedType('certificate')}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedType === 'certificate'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Сертификаты
                </button>
              </div>
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Поиск по документам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-4 pr-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-w-3 aspect-h-4">
                    <img
                      src={doc.image}
                      alt={doc.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">{doc.number}</span>
                        <span className="text-white text-sm">до {doc.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                          {doc.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Выдан: {doc.issueDate}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        doc.type === 'license'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-secondary/10 text-secondary'
                      }`}>
                        {doc.type === 'license' ? 'Лицензия' : 'Сертификат'}
                      </span>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setSelectedDocument(doc)}
                        className="flex-1 flex items-center justify-center py-2 bg-primary/10 text-primary dark:text-white rounded-md hover:bg-primary/20 transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        <span>Просмотр</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center py-2 bg-accent/10 text-accent rounded-md hover:bg-accent/20 transition-colors">
                        <Download className="h-4 w-4 mr-2" />
                        <span>Скачать</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Document Preview Modal */}
        {selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading font-bold text-h3-mobile md:text-h3-desktop text-primary dark:text-white">
                      
                      {selectedDocument.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Номер: {selectedDocument.number}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDocument(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">Закрыть</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <img
                  src={selectedDocument.image}
                  alt={selectedDocument.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Licenses;