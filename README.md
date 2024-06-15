### Предисловие:
При разработке использовал методологию TDD, все e2e тесты лежат в директории tests. Написал скрипты по развертыванию тестового окружения в package.json.  
Все входящие данные провалидированны. Импортировал свою коллекцию запросов в insomnia/insomnia-collection.json.  
Скриншоты с примерами лежат в директории insomnia.  

### Инструкция по запуску:
**ВАЖНО:** Должен быть установлен и запущен Докер.

Клонируйте репозиторий:
```sh
git clone https://github.com/hryashik/crafttech-test && cd crafttech-test
```
Переименуйте .env.example и установите все зависимости:
```sh
mv .env.example .env && npm i
```
Запустите контейнер с БД и сделайте миграцию:
```sh
npm run db:dev:up && npx prisma db push
```
Запустите приложение:
```sh
npm run start
# Запустить приложение в dev режиме npm run start:dev
```
Пример запроса на создание таски через терминал:
```sh
# Если порт в .env был изменен, здесь его тоже стоит изменить
curl -X POST -H "Content-Type: application/json" -d '{"title": "first task"}' http://localhost:3000/tasks
```