Заготовка для Node.js проектов, с настроенными npm-скриптами, `eslint`'ом, `prettier`'ом, `source-map`'ами, `babel`'ем (пока шестым, седьмой на подходе), es-модулями, алиасами в `import/require` и автоматическим запуском линтера и форматирования при коммитах.  

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
После клонирования скопировать файл `.env.example` в `.env`.

Что это за файл, зачем он нужен и почему его нельзя хранить в гите - читать [здесь](https://12factor.net/ru/config) и [здесь](https://github.com/motdotla/dotenv#faq).

Вместо стандартного `dotenv` используется `dotenv-safe`, смысл которого тот же самый, но, ко всему прочему, этот пакет читает файл `.env.example` и при запуске приложения проверяет - установлены ли перечисленные в нём переменные окружения и, если нет, выдаёт ошибку.
 
## Разработка приложения
```
npm run watch
---
yarn watch
```

После запуска таски `watch` и после того, как будет готов первичный билд, открыть другую консоль и запустить:
```
npm run dev ./dist
---
yarn dev ./dist
``` 

*После названия команды `dev` должен следовать путь к файлу для запуска - `./dist`, `./dist/server.js`, `./dist/worker`, etc.*

Т.е. первой командой запускается компиляция исходников из папки `./src` в папку `./dist` с полным сохранением структуры файлов и каталогов (`babel` в режиме `--watch --copy-files --source-maps`), а второй командой осуществляется непосредственный запуск приложения из скомпилированных файлов.

Такой подход позволяет иметь несколько точек входа (несколько приложений для запуска) с общей кодовой базой.

Перезапуск запущенного приложения необходимо производить вручную. Автоматический перезапуск НЕ предполагается.

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

## Описание сборки

### Prettier
Если необходимо форматировать файлы "на лету" при их сохранении, то
- для IDE от JetBrains необходимо настроить `File Watcher` согласно официальной [инструкции](https://prettier.io/docs/en/webstorm.html). Можно добавить watcher'ы как для `*.js`, так и для `*.json`.`*.json5` файлов (в репозиторий добавлен файл `.idea/watcherTasks.xml` с настроенными вотчерами);
- для всех остальных (VS Code, Atom, Sublime, etc) - необходимо вместо таски `watch` запускать `watch:all` (или переименовать `watch:all` в `watch` для удобства).

### Алиасы и резолвинг
С помощью `babel-plugin-module-resolver` в файле `.babelrc` можно добавить алиасы для резолвинга модулей.

Чтобы `eslint` не ругался на ненайденные модули, согласно [инструкции](https://github.com/tleunen/babel-plugin-module-resolver#eslint-plugin) используется `eslint-plugin-import` совместно с `eslint-import-resolver-babel-module`.
Для предотвращения использования алиасов в относительных путях подключен `eslint-plugin-module-resolver`.

В проекте уже имеется алиас `@` => `./src`.

Чтобы резолвинг работал в IDE от JetBrains, можно
- добавить кастомный resource root с помощью `ПКМ на директории -> Mark Directory as -> Resource Root`;
- или все используемые алиасы вручную продублировать в файле `webpack.config.js` по аналогии с уже имеющимися в нём настройками. IDE автоматически подхватит этот файл и будет использовать для резолва.

Для резолвинга путей в других IDE, можно воспользоваться [инструкцией](https://github.com/tleunen/babel-plugin-module-resolver#editors-autocompletion).

### ESLint
ESLint использует конфигурацию `eslint-config-airbnb-base`.

Чтобы не было конфликтов с `prettier`-ом, конфиг также расширен с помощью `eslint-config-prettier`, как описано в [инструкции](https://prettier.io/docs/en/eslint.html#turn-off-eslint-s-formatting-rules).

...


Везде надо учитывать игнор линтинга и преттиера - `dist` и `node_modules`.
В штормах надо назначить файлам `.babelrc` и `.eslintrc` тип `json5`.