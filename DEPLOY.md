# Деплой на GitHub Pages

## Пошаговая инструкция

### Шаг 1: Создание репозитория на GitHub

1. **Войдите в свой аккаунт GitHub** (или создайте новый на [github.com](https://github.com))

2. **Создайте новый репозиторий:**
   - Нажмите на кнопку **"+"** в правом верхнем углу → выберите **"New repository"**
   - Или перейдите по прямой ссылке: [github.com/new](https://github.com/new)

3. **Заполните форму:**
   - **Repository name**: `ega` (или любое другое название)
   - **Description**: описание проекта (необязательно)
   - **Visibility**: выберите **Public** (для бесплатного GitHub Pages) или **Private**
   - **НЕ** ставьте галочки на "Add a README file", "Add .gitignore", "Choose a license" (у вас уже есть файлы)
   - Нажмите **"Create repository"**

4. **Скопируйте URL репозитория** (он будет показан на следующей странице)
   - Например: `https://github.com/ваш-username/ega.git`

### Шаг 2: Инициализация Git и подключение к GitHub

Откройте терминал в папке проекта и выполните:

```bash
# Перейдите в папку проекта
cd /Users/yury/Documents/Ega

# Инициализируйте git репозиторий
git init

# Установите основную ветку как main
git branch -M main

# Добавьте все файлы в staging
git add .

# Создайте первый коммит
git commit -m "Initial commit"

# Добавьте удаленный репозиторий (замените URL на ваш из Шага 1)
git remote add origin https://github.com/ваш-username/ega.git

# Отправьте код на GitHub
git push -u origin main
```

**Важно:** 
- Замените `ваш-username` и `ega` на реальные значения из вашего репозитория
- Если GitHub попросит авторизацию, используйте **Personal Access Token** вместо пароля
- Для создания токена: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token

### Шаг 3: Настройка base path в vite.config.js

1. **Откройте файл `vite.config.js`**

2. **Обновите base path:**
   - Если репозиторий называется `ega`, измените на:
     ```js
     base: '/ega/',
     ```
   - Если репозиторий в корне аккаунта (username.github.io), оставьте:
     ```js
     base: '/',
     ```

3. **Сохраните файл и закоммитьте изменения:**
   ```bash
   git add vite.config.js
   git commit -m "Configure base path for GitHub Pages"
   git push
   ```

### Шаг 4: Включение GitHub Pages

1. **Перейдите в настройки репозитория:**
   - Откройте ваш репозиторий на GitHub
   - Нажмите на вкладку **"Settings"** (в верхнем меню)

2. **Настройте GitHub Pages:**
   - В левом меню найдите раздел **"Pages"**
   - В разделе **"Source"** выберите **"GitHub Actions"**
   - Сохраните изменения

### Шаг 5: Проверка деплоя

1. **Проверьте статус деплоя:**
   - Перейдите во вкладку **"Actions"** в вашем репозитории
   - Вы должны увидеть workflow "Deploy to GitHub Pages"
   - Дождитесь завершения (обычно 1-2 минуты)

2. **После успешного деплоя:**
   - Перейдите в **Settings → Pages**
   - Там будет указан URL вашего сайта
   - Сайт будет доступен по адресу: `https://ваш-username.github.io/название-репозитория/`

### Шаг 6: Автоматический деплой

Теперь при каждом пуше в ветку `main` сайт будет автоматически обновляться!

```bash
# После любых изменений в коде:
git add .
git commit -m "Описание изменений"
git push
```

## Ручной деплой

Если нужно запустить деплой вручную:
- Перейдите в Actions → Deploy to GitHub Pages → Run workflow

## Проверка

После успешного деплоя сайт будет доступен по адресу:
- `https://ваш-username.github.io/название-репозитория/`

## Примечания

- Убедитесь, что в `vite.config.js` указан правильный `base` path
- Если репозиторий в корне аккаунта (username.github.io), используйте `base: '/'`
- Если репозиторий имеет имя (username.github.io/repo-name), используйте `base: '/repo-name/'`

