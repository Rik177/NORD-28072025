import React, { useState } from 'react';
import { Search, Clock, CheckCircle, AlertCircle, Phone, Mail, Calendar, User, FileText, MessageSquare } from 'lucide-react';

interface RequestStatus {
  id: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  timestamp: string;
  description: string;
  specialist?: string;
}

interface Request {
  id: string;
  type: 'consultation' | 'installation' | 'maintenance' | 'repair';
  title: string;
  description: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  address?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  currentStatus: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  estimatedCost?: number;
  actualCost?: number;
  specialist?: string;
  createdAt: string;
  statusHistory: RequestStatus[];
  notes?: string[];
}

const mockRequests: Request[] = [
  {
    id: 'REQ-2025-001',
    type: 'consultation',
    title: 'Консультация по проектированию вентиляции',
    description: 'Требуется консультация по проектированию системы вентиляции для офиса 200 м²',
    clientName: 'Иван Петров',
    clientPhone: '+7 (495) 123-45-67',
    clientEmail: 'ivan.petrov@example.com',
    address: 'г. Москва, ул. Тверская, д. 10',
    scheduledDate: '2025-01-20',
    scheduledTime: '14:00',
    currentStatus: 'confirmed',
    priority: 'normal',
    estimatedCost: 0,
    specialist: 'Алексей Сидоров',
    createdAt: '2025-01-15T10:30:00Z',
    statusHistory: [
      {
        id: '1',
        status: 'pending',
        timestamp: '2025-01-15T10:30:00Z',
        description: 'Заявка создана и ожидает обработки'
      },
      {
        id: '2',
        status: 'confirmed',
        timestamp: '2025-01-15T11:15:00Z',
        description: 'Заявка подтверждена, назначен специалист',
        specialist: 'Алексей Сидоров'
      }
    ],
    notes: [
      'Клиент предпочитает встречу во второй половине дня',
      'Необходимо взять с собой каталог оборудования'
    ]
  },
  {
    id: 'REQ-2025-002',
    type: 'installation',
    title: 'Установка кондиционера Daikin FTXB25C',
    description: 'Монтаж настенной сплит-системы в квартире',
    clientName: 'Мария Иванова',
    clientPhone: '+7 (495) 987-65-43',
    clientEmail: 'maria.ivanova@example.com',
    address: 'г. Москва, ул. Ленина, д. 25, кв. 15',
    scheduledDate: '2025-01-18',
    scheduledTime: '10:00',
    currentStatus: 'in_progress',
    priority: 'normal',
    estimatedCost: 45000,
    specialist: 'Дмитрий Козлов',
    createdAt: '2025-01-10T14:20:00Z',
    statusHistory: [
      {
        id: '1',
        status: 'pending',
        timestamp: '2025-01-10T14:20:00Z',
        description: 'Заявка создана'
      },
      {
        id: '2',
        status: 'confirmed',
        timestamp: '2025-01-10T15:30:00Z',
        description: 'Заявка подтверждена, оборудование заказано'
      },
      {
        id: '3',
        status: 'in_progress',
        timestamp: '2025-01-18T09:45:00Z',
        description: 'Специалист выехал на объект, начат монтаж',
        specialist: 'Дмитрий Козлов'
      }
    ]
  },
  {
    id: 'REQ-2025-003',
    type: 'maintenance',
    title: 'Техническое обслуживание VRF системы',
    description: 'Плановое ТО системы кондиционирования в офисном центре',
    clientName: 'ООО "Бизнес Центр"',
    clientPhone: '+7 (495) 555-12-34',
    clientEmail: 'maintenance@business-center.ru',
    address: 'г. Москва, Деловой центр, д. 1',
    currentStatus: 'completed',
    priority: 'low',
    estimatedCost: 15000,
    actualCost: 12000,
    specialist: 'Сергей Волков',
    createdAt: '2025-01-05T09:00:00Z',
    statusHistory: [
      {
        id: '1',
        status: 'pending',
        timestamp: '2025-01-05T09:00:00Z',
        description: 'Заявка создана'
      },
      {
        id: '2',
        status: 'confirmed',
        timestamp: '2025-01-05T10:30:00Z',
        description: 'Заявка подтверждена'
      },
      {
        id: '3',
        status: 'in_progress',
        timestamp: '2025-01-08T08:00:00Z',
        description: 'Начато техническое обслуживание'
      },
      {
        id: '4',
        status: 'completed',
        timestamp: '2025-01-08T16:30:00Z',
        description: 'Техническое обслуживание завершено успешно'
      }
    ]
  }
];

const RequestTracking: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'in_progress':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Ожидает обработки';
      case 'confirmed':
        return 'Подтверждена';
      case 'in_progress':
        return 'В работе';
      case 'completed':
        return 'Завершена';
      case 'cancelled':
        return 'Отменена';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'in_progress':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'normal':
        return 'bg-blue-500';
      case 'low':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'Консультация';
      case 'installation':
        return 'Установка';
      case 'maintenance':
        return 'Обслуживание';
      case 'repair':
        return 'Ремонт';
      default:
        return type;
    }
  };

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || request.currentStatus === filterStatus;
    const matchesType = filterType === 'all' || request.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-card p-6">
      <div className="flex items-center mb-6">
        <FileText className="h-8 w-8 text-primary mr-3" />
        <h2 className="font-heading font-bold text-h2-mobile md:text-h2-desktop text-primary dark:text-white">
          Отслеживание заявок
        </h2>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по номеру, клиенту..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
        >
          <option value="all">Все статусы</option>
          <option value="pending">Ожидает обработки</option>
          <option value="confirmed">Подтверждена</option>
          <option value="in_progress">В работе</option>
          <option value="completed">Завершена</option>
          <option value="cancelled">Отменена</option>
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
        >
          <option value="all">Все типы</option>
          <option value="consultation">Консультация</option>
          <option value="installation">Установка</option>
          <option value="maintenance">Обслуживание</option>
          <option value="repair">Ремонт</option>
        </select>

        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          Найдено: {filteredRequests.length} заявок
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              onClick={() => setSelectedRequest(request)}
              className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedRequest?.id === request.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-primary dark:text-white mr-2">
                      {request.id}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(request.priority)}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {request.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getTypeText(request.type)} • {request.clientName}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.currentStatus)}`}>
                    {getStatusIcon(request.currentStatus)}
                    <span className="ml-1">{getStatusText(request.currentStatus)}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatDate(request.createdAt)}
                  </p>
                </div>
              </div>

              {request.scheduledDate && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(request.scheduledDate).toLocaleDateString('ru-RU')} в {request.scheduledTime}
                </div>
              )}

              {request.specialist && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4 mr-1" />
                  Специалист: {request.specialist}
                </div>
              )}
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Заявки не найдены
              </p>
            </div>
          )}
        </div>

        {/* Request Details */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          {selectedRequest ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-h3-desktop text-primary dark:text-white mb-4">
                  Детали заявки {selectedRequest.id}
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Основная информация
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Тип:</span>
                        <span>{getTypeText(selectedRequest.type)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Статус:</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedRequest.currentStatus)}`}>
                          {getStatusText(selectedRequest.currentStatus)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Приоритет:</span>
                        <span className="capitalize">{selectedRequest.priority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Создана:</span>
                        <span>{formatDate(selectedRequest.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Контактная информация
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{selectedRequest.clientName}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={`tel:${selectedRequest.clientPhone}`} className="text-primary hover:underline">
                          {selectedRequest.clientPhone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={`mailto:${selectedRequest.clientEmail}`} className="text-primary hover:underline">
                          {selectedRequest.clientEmail}
                        </a>
                      </div>
                      {selectedRequest.address && (
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                          <span>{selectedRequest.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedRequest.scheduledDate && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Запланированная встреча
                      </h4>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <div className="flex items-center text-blue-800 dark:text-blue-300">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {new Date(selectedRequest.scheduledDate).toLocaleDateString('ru-RU')} в {selectedRequest.scheduledTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {(selectedRequest.estimatedCost || selectedRequest.actualCost) && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Стоимость
                      </h4>
                      <div className="space-y-2 text-sm">
                        {selectedRequest.estimatedCost && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Предварительная:</span>
                            <span>{selectedRequest.estimatedCost.toLocaleString()} ₽</span>
                          </div>
                        )}
                        {selectedRequest.actualCost && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Итоговая:</span>
                            <span className="font-semibold">{selectedRequest.actualCost.toLocaleString()} ₽</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Описание
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 rounded p-3">
                      {selectedRequest.description}
                    </p>
                  </div>

                  {selectedRequest.notes && selectedRequest.notes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Заметки
                      </h4>
                      <div className="space-y-2">
                        {selectedRequest.notes.map((note, index) => (
                          <div key={index} className="flex items-start bg-white dark:bg-gray-700 rounded p-3">
                            <MessageSquare className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      История статусов
                    </h4>
                    <div className="space-y-3">
                      {selectedRequest.statusHistory.map((status, index) => (
                        <div key={status.id} className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            {getStatusIcon(status.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-sm">
                                {getStatusText(status.status)}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(status.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {status.description}
                            </p>
                            {status.specialist && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Специалист: {status.specialist}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Выберите заявку для просмотра деталей
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestTracking;