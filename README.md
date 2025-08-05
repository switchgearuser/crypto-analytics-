# 🚀 Crypto Tracker

Современный трекер криптовалют с графиками, конвертером и темной темой.

## ✨ Возможности

- 📊 **Реальное время**: Автоматическое обновление данных каждую минуту
- 🔍 **Поиск**: Быстрый поиск по названию или символу криптовалюты
- 📈 **Графики**: Интерактивные графики цен с разными временными периодами
- 💱 **Конвертер**: Конвертация между любыми криптовалютами
- 🌙 **Темная тема**: Переключение между светлой и темной темами
- 📱 **Адаптивный дизайн**: Работает на всех устройствах
- 🎨 **Современный UI**: Красивый интерфейс с анимациями

## 🛠️ Технологии

- **Next.js 14** - React фреймворк
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **Shadcn/ui** - UI компоненты
- **Recharts** - Графики
- **Next-themes** - Управление темами
- **CoinGecko API** - Данные о криптовалютах

## 🚀 Быстрый старт

### Локальная разработка

1. **Клонируйте репозиторий**
   \`\`\`bash
   git clone https://github.com/your-username/crypto-tracker.git
   cd crypto-tracker
   \`\`\`

2. **Установите зависимости**
   \`\`\`bash
   npm install
   \`\`\`

3. **Запустите проект**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Откройте в браузере**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Деплой на GitHub Pages

1. **Форкните репозиторий** на GitHub

2. **Включите GitHub Pages**:
   - Перейдите в Settings → Pages
   - Source: GitHub Actions

3. **Пуш в main ветку** автоматически запустит деплой

## 📊 API

Проект использует бесплатный [CoinGecko API](https://www.coingecko.com/en/api) для получения данных о криптовалютах:

- Курсы валют
- Исторические данные для графиков
- Рыночная капитализация
- Объемы торгов

## 🎨 Скриншоты

### Светлая тема
![Light Theme](https://via.placeholder.com/800x600/ffffff/000000?text=Light+Theme)

### Темная тема
![Dark Theme](https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Dark+Theme)

### Графики
![Charts](https://via.placeholder.com/800x600/f8f9fa/333333?text=Interactive+Charts)

### Конвертер
![Converter](https://via.placeholder.com/800x600/e3f2fd/1976d2?text=Currency+Converter)

## 📱 Адаптивность

Сайт полностью адаптивен и отлично работает на:
- 💻 Десктопах
- 📱 Мобильных устройствах
- 📟 Планшетах

## 🔧 Настройка

### Изменение количества отображаемых валют

В файле `app/page.tsx` измените параметр `per_page`:

\`\`\`typescript
const response = await fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
)
\`\`\`

### Изменение интервала обновления

В файле `app/page.tsx` измените интервал (в миллисекундах):

\`\`\`typescript
const interval = setInterval(fetchCryptoData, 60000) // 60 секунд
\`\`\`

## 🤝 Вклад в проект

1. Форкните проект
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для подробностей.

## 🙏 Благодарности

- [CoinGecko](https://www.coingecko.com/) за предоставление API
- [Shadcn/ui](https://ui.shadcn.com/) за компоненты UI
- [Recharts](https://recharts.org/) за библиотеку графиков

## 📞 Поддержка

Если у вас есть вопросы или предложения, создайте [Issue](https://github.com/your-username/crypto-tracker/issues) в репозитории.

---

⭐ Поставьте звезду, если проект вам понравился!
