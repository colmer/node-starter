Заготовка для Node.js проектов, с настроенными npm-скриптами, `eslint`'ом, `prettier`'ом, `source-map`'ами, `babel`'ем (пока шестым, ждём седьмой), es-модулями, алиасами в `import/require` и автоматическим запуском линтера и тестов на коммиты. Но пока без тестов.  

## Клонирование и старт

Создать новый репозиторий на гитхабе/гитлабе/битбакете и получить его урл - `git@new_project_repository_url.git`

Затем склонировать к себе `node-starter`:
```
git clone git@github.com:antixrist/node-starter.git new-project-folder
```

И перейти в папку с новым проектом:
```
cd new-project-folder
```

Далее:

- если необходимо сохранить историю коммитов из репозитория `node-starter`, выполнить:
```
cd new-project-folder
git remote remove origin
git remote add origin git@new_project_repository_url.git
git push -u origin --all
git push -u origin --tags
```

- а если нужно начать с чистого листа (убедиться, что выбрана папка с новым проектом):
```
rm -rf ./.git
git init
git remote add origin git@new_project_repository_url.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

## Переменные окружения
После клонирования переименовать файл `.env.example` в `.env`.

Что это за файл, зачем он нужен и почему его нельзя хранить в гите - читать [здесь](https://12factor.net/ru/config) и [здесь](https://github.com/motdotla/dotenv#faq).
 
## Режим разработки
```
npm run watch
---
yarn watch
```

После запуска команды `watch` и после того, как будет готов первичный билд, открыть другую консоль и запустить:
```
npm run dev ./dist
---
yarn dev ./dist
``` 

*После названия команды `dev` должен следовать путь к файлу для запуска - `./dist`, `./dist/server.js`, `./dist/worker`, etc.*

Т.е. первой командой запускается компиляция исходников из папки `./src` в папку `./dist` с полным сохранением структуры файлов и каталогов (`babel` в режиме `--watch --copy-files --source-maps`), а второй командой осуществляется непосредственный запуск приложения из скомпилированных файлов.

Такой подход позволяет иметь несколько точек входа (несколько приложений для запуска) с общей кодовой базой.

Перезапуск запущенного приложения необходимо производить вручную. Автоматический перезапуск НЕ предполагается.

### IDE от JetBrains
В репозиторий добавлена папка `.idea` (с некоторыми исключениями), в которой, в том числе, хранится настроенный `File Watcher` с `prettier`'ом.

В проекте можно настроить алиасы (благодаря `babel-plugin-module-resolver`).
Для того, чтобы IDE не спотыкалась об неизвестные ей пути в `import/require`, добавлен файл `webpack.config.js` с продублированными алиасами из конфига `.babelrc`. IDE от JetBrains умеют выполнять этот файл, чтобы вытаскивать из `webpack`-конфига алиасы для резолва модулей.

### VS Code, Atom, Sublime, etc
Необходимо в `package.json` переименовать таску `_watch` в `watch`, чтобы автоматически форматировать исходники `prettier`'ом.

## Production режим
```
npm run build
---
yarn build
```

После того, как скомпилировались исходники, можно запускать любую точку входа простой командой:
```
npm run start ./dist
---
yarn start ./dist 
```

В качестве супервизора можно использовать что угодно - `pm2`, `forever`, `nodemon`, `supervisor`. Но, конечно, `pm2` вне конкуренции.
