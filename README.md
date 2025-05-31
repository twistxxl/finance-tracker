# Финансовое приложение (Finance App)

## Описание проекта

Данное приложение — это демонстрационный проект изначально созданный на JavaScript с постепенной миграцией на TypeScript для демонстрации навыков работы с типами. 

Проект предназначен для ведения учета финансовых операций. Вы можете добавлять, просматривать и управлять данными по финансовым операциям.

В данных для каждого элемента содержится 6 полей:

- `id` — уникальный идентификатор
- `date` — дата операции
- `description` — описание операции
- `amount` — сумма операции
- `category` — категория (например, groceries, rent, salary)
- `type` — тип операции (income или expense)

## Стек технологий

- React + TypeScript
- axios для работы с API
- json-server для эмуляции бэкенда

## Перед запуском

Убедитесь, что у вас установлен [Node.js](https://nodejs.org/) и [json-server](https://github.com/typicode/json-server).

## Установка зависимостей

```bash  
git clone  
cd 
npm install

npx json-server --watch db.json --port 3001
 - server
 
npm start
 - client

