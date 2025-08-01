// Утилиты для аудита и автоматического исправления alt-текстов

interface ImageAuditResult {
  element: HTMLImageElement;
  src: string;
  currentAlt: string;
  suggestedAlt: string;
  issues: string[];
}

// Функции для генерации семантических alt-текстов
export const generateProductAlt = (productName: string, context?: string) => {
  const baseAlt = `${productName} - климатическое оборудование НОРДИНЖИНИРИНГ`;
  return context ? `${baseAlt} - ${context}` : baseAlt;
};

export const generateCategoryAlt = (categoryName: string) => {
  return `${categoryName} - каталог климатического оборудования НОРДИНЖИНИРИНГ`;
};

export const generateBlogAlt = (title: string, isHero = false) => {
  const suffix = isHero ? 'главное изображение статьи' : 'иллюстрация к статье';
  return `${title} - ${suffix} блога НОРДИНЖИНИРИНГ`;
};

export const generateCompanyAlt = (context: string) => {
  return `НОРДИНЖИНИРИНГ - ${context}`;
};

export const generateServiceAlt = (serviceName: string) => {
  return `${serviceName} - услуги НОРДИНЖИНИРИНГ по климатическому оборудованию`;
};

export const generateProjectAlt = (projectName: string, stage: 'before' | 'after' | 'process') => {
  const stageText = {
    before: 'до установки климатического оборудования',
    after: 'после установки климатического оборудования',
    process: 'процесс установки климатического оборудования'
  };
  return `${projectName} - ${stageText[stage]} НОРДИНЖИНИРИНГ`;
};

// Функция для проверки качества alt-текста
const evaluateAltText = (alt: string, src: string): string[] => {
  const issues: string[] = [];
  
  if (!alt || alt.trim() === '') {
    issues.push('Отсутствует alt-текст');
  } else {
    if (alt.length < 10) {
      issues.push('Alt-текст слишком короткий (менее 10 символов)');
    }
    if (alt.length > 125) {
      issues.push('Alt-текст слишком длинный (более 125 символов)');
    }
    if (alt.toLowerCase().includes('image') || alt.toLowerCase().includes('picture') || alt.toLowerCase().includes('photo')) {
      issues.push('Alt-текст содержит избыточные слова (image, picture, photo)');
    }
    if (alt === src || alt.includes(src)) {
      issues.push('Alt-текст дублирует URL изображения');
    }
    if (alt.toLowerCase() === 'image' || alt.toLowerCase() === 'img' || alt.toLowerCase() === 'picture') {
      issues.push('Alt-текст неинформативен');
    }
  }
  
  return issues;
};

// Функция для генерации улучшенного alt-текста на основе контекста
const generateImprovedAlt = (img: HTMLImageElement): string => {
  const src = img.src;
  const className = img.className;
  const parentElement = img.parentElement;
  const nearbyText = img.parentElement?.textContent?.slice(0, 100) || '';
  
  // Определяем контекст по классам и родительским элементам
  if (className.includes('logo') || src.includes('logo')) {
    return 'Логотип НОРДИНЖИНИРИНГ - климатическое оборудование';
  }
  
  if (className.includes('product') || parentElement?.className.includes('product')) {
    const productName = nearbyText.split('\n')[0]?.trim() || 'Климатическое оборудование';
    return generateProductAlt(productName);
  }
  
  if (className.includes('category') || parentElement?.className.includes('category')) {
    const categoryName = nearbyText.split('\n')[0]?.trim() || 'Категория оборудования';
    return generateCategoryAlt(categoryName);
  }
  
  if (className.includes('hero') || className.includes('banner')) {
    return 'НОРДИНЖИНИРИНГ - профессиональные решения в области климатического оборудования';
  }
  
  if (className.includes('team') || className.includes('about')) {
    return generateCompanyAlt('команда специалистов по климатическому оборудованию');
  }
  
  if (className.includes('project') || parentElement?.className.includes('project')) {
    const projectName = nearbyText.split('\n')[0]?.trim() || 'Проект';
    return generateProjectAlt(projectName, 'after');
  }
  
  if (className.includes('service') || parentElement?.className.includes('service')) {
    const serviceName = nearbyText.split('\n')[0]?.trim() || 'Услуга';
    return generateServiceAlt(serviceName);
  }
  
  // Если контекст не определен, создаем базовый alt-текст
  if (nearbyText) {
    const firstLine = nearbyText.split('\n')[0]?.trim();
    if (firstLine && firstLine.length > 5) {
      return `${firstLine} - НОРДИНЖИНИРИНГ`;
    }
  }
  
  return 'Изображение от НОРДИНЖИНИРИНГ - климатическое оборудование и системы вентиляции';
};

// Функция для аудита всех изображений на странице
export const auditPageImages = (): ImageAuditResult[] => {
  const images = document.querySelectorAll('img');
  const results: ImageAuditResult[] = [];
  
  images.forEach(img => {
    const currentAlt = img.alt || '';
    const src = img.src;
    const issues = evaluateAltText(currentAlt, src);
    const suggestedAlt = issues.length > 0 ? generateImprovedAlt(img) : currentAlt;
    
    results.push({
      element: img,
      src,
      currentAlt,
      suggestedAlt,
      issues
    });
  });
  
  return results;
};

// Функция для логирования результатов аудита (только в development)
export const logAltTextAudit = () => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const results = auditPageImages();
  const problemImages = results.filter(result => result.issues.length > 0);
  
  console.group('🖼️ Alt Text Audit Results');
  console.log(`Всего изображений: ${results.length}`);
  console.log(`Изображений с проблемами: ${problemImages.length}`);
  
  if (problemImages.length > 0) {
    console.group('Проблемные изображения:');
    problemImages.forEach((result, index) => {
      console.group(`${index + 1}. ${result.src}`);
      console.log('Текущий alt:', result.currentAlt || '(отсутствует)');
      console.log('Рекомендуемый alt:', result.suggestedAlt);
      console.log('Проблемы:', result.issues);
      console.groupEnd();
    });
    console.groupEnd();
  } else {
    console.log('✅ Все изображения имеют корректные alt-тексты');
  }
  
  console.groupEnd();
  
  return results;
};

// Функция для автоматического исправления alt-текстов (только в development)
export const autoFixAltTexts = (): number => {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Автоматическое исправление alt-текстов доступно только в режиме разработки');
    return 0;
  }
  
  const results = auditPageImages();
  const problemImages = results.filter(result => result.issues.length > 0);
  
  problemImages.forEach(result => {
    result.element.alt = result.suggestedAlt;
  });
  
  if (problemImages.length > 0) {
    console.log(`🔧 Исправлено ${problemImages.length} alt-текстов`);
  }
  
  return problemImages.length;
};

// Функция для создания отчета по alt-текстам
export const generateAltTextReport = () => {
  const results = auditPageImages();
  const problemImages = results.filter(result => result.issues.length > 0);
  
  const report = {
    timestamp: new Date().toISOString(),
    totalImages: results.length,
    problemImages: problemImages.length,
    successRate: ((results.length - problemImages.length) / results.length * 100).toFixed(1),
    issues: problemImages.map(result => ({
      src: result.src,
      currentAlt: result.currentAlt,
      suggestedAlt: result.suggestedAlt,
      issues: result.issues
    }))
  };
  
  return report;
};

// Автоматический запуск аудита при загрузке страницы (только в development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      logAltTextAudit();
    }, 1000);
  });
}