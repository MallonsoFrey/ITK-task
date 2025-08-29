# 📌 Todo List App

Приложение "Список задач" с аутентификацией, интеграцией с API и управлением состоянием через Redux Toolkit.  
Реализовано с использованием React, TypeScript, Vite, Tailwind CSS, Redux Toolkit, Axios.
---
> ⚠️ Бэкенд в этой реализации не писался. API-запросы идут на уже готовый API.
---
> Для корректной работы приложения отключите VPN

---
## 🚀 Функционал

### 🔑 Аутентификация
- Регистрация и вход по username и password
- Хранение accessToken и refreshToken в Redux + localStorage
- Axios interceptors:
  - автоматическое добавление accessToken в Authorization заголовки
  - обновление accessToken по refreshToken при 401
  - редирект на /login, если пользователь не авторизован

### ✅ Список задач
- Добавление новой задачи
- Отображение всех задач пользователя
- Возможность отметить задачу выполненной
- Удаление задачи
- Фильтры: Все / Активные / Выполненные
- Обработка loading и ошибок API (спиннер, сообщения)

---

## 🛠️ Технологии

### Фронтенд
- ⚡ Vite (React + TypeScript)
- 🎨 Tailwind CSS
- 🔄 Redux Toolkit
- 📡 Axios
- 🌍 React Router

### Бэкенд
Используется готовое API:  
- 📄 Swagger-документация → http://xserver-krv.ru:91/api-docs/#/  
- 🌐 API → http://xserver-krv.ru:91
