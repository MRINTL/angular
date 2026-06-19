import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const STORAGE_KEY = 'angular-roadmap-progress-v1';

const roadmap = [
  {
    week: 1,
    title: 'TypeScript для Angular',
    goal: 'Уверенно читать и писать TS-код компонентов, сервисов и моделей.',
    days: [
      { day: 1, title: 'TS типы, interface, type', time: '2 часа', learn: ['number/string/boolean/array/object', 'interface vs type', 'типизация функций'], practice: ['Создай модели User, Task, Project', 'Напиши функции createUser, updateTask', 'Запрети any в своём коде'], done: 'Можешь объяснить разницу interface и type и типизировать объект без подсказок.' },
      { day: 2, title: 'Union, Literal, Optional, Readonly', time: '2 часа', learn: ['union types', 'literal types', 'optional fields', 'readonly'], practice: ['Создай тип TaskStatus = todo | progress | done', 'Сделай readonly id', 'Напиши функцию changeStatus(task, status)'], done: 'Ошибки TS помогают тебе, а не мешают.' },
      { day: 3, title: 'Generics', time: '2 часа', learn: ['generic function', 'generic interface', 'ApiResponse<T>'], practice: ['Создай ApiResponse<T>', 'Типизируй ответ users/tasks/projects', 'Напиши getData<T>() mock-функцию'], done: 'Понимаешь зачем нужен <T> и можешь объяснить на API response.' },
      { day: 4, title: 'Utility Types', time: '2 часа', learn: ['Partial', 'Pick', 'Omit', 'Record', 'Required'], practice: ['Создай UpdateUserDto через Partial', 'Создай UserPreview через Pick', 'Создай UserWithoutPassword через Omit'], done: 'Используешь utility types вместо копирования типов руками.' },
      { day: 5, title: 'Classes, access modifiers, abstract', time: '2 часа', learn: ['public/private/protected', 'implements', 'extends', 'abstract class'], practice: ['Создай abstract ApiService', 'Создай UserService extends ApiService', 'Сравни abstract class и interface'], done: 'Можешь коротко объяснить interface vs abstract class.' },
      { day: 6, title: 'TS контрольный день', time: '2–3 часа', learn: ['повтор всех тем недели'], practice: ['Типизируй мини-домен: users, roles, permissions, tasks', 'Сделай 10 вопросов самому себе', 'Рефакторни весь код без any'], done: 'Пишешь TS-модели и DTO уверенно.' }
    ]
  },
  {
    week: 2,
    title: 'Angular Fundamentals',
    goal: 'Понимать базовую архитектуру Angular-приложения.',
    days: [
      { day: 7, title: 'Angular CLI и структура проекта', time: '2 часа', learn: ['ng new', 'src/app', 'main.ts', 'app.config', 'standalone components'], practice: ['Создай Angular app', 'Запусти dev server', 'Разбери структуру файлов'], done: 'Понимаешь что где лежит в Angular-проекте.' },
      { day: 8, title: 'Components', time: '2 часа', learn: ['@Component', 'templateUrl', 'styleUrl', 'standalone', 'selector'], practice: ['Создай HeaderComponent', 'TaskCardComponent', 'TaskListComponent'], done: 'Создаёшь компоненты через CLI и руками.' },
      { day: 9, title: 'Templates и data binding', time: '2 часа', learn: ['interpolation', 'property binding', 'event binding', 'two-way binding'], practice: ['Выведи список задач', 'Добавь кнопку complete', 'Сделай input для поиска'], done: 'Понимаешь [], (), [()].' },
      { day: 10, title: 'Directives', time: '2 часа', learn: ['*ngIf / @if', '*ngFor / @for', 'ngClass', 'ngStyle'], practice: ['Сделай empty state', 'Подсвети completed задачи', 'Отрендери список через track'], done: 'Умеешь условно рендерить и выводить списки.' },
      { day: 11, title: 'Services и DI', time: '2 часа', learn: ['@Injectable', 'providedIn root', 'constructor injection', 'single responsibility'], practice: ['Создай TaskService', 'Перенеси данные из компонента в сервис', 'Добавь методы get/add/delete'], done: 'Понимаешь зачем сервисы и dependency injection.' },
      { day: 12, title: 'Angular контрольный день', time: '2–3 часа', learn: ['повтор компонентов, шаблонов, сервисов'], practice: ['Собери Task Manager без API', 'Добавь фильтр, удаление, статус', 'Проведи рефакторинг на компоненты'], done: 'Можешь собрать простое Angular-приложение без гайда.' }
    ]
  },
  {
    week: 3,
    title: 'Angular Forms',
    goal: 'Уметь делать рабочие формы как в продукте.',
    days: [
      { day: 13, title: 'Reactive Forms старт', time: '2 часа', learn: ['FormControl', 'FormGroup', 'ReactiveFormsModule'], practice: ['Сделай LoginForm', 'Выведи значения формы', 'Сделай reset'], done: 'Понимаешь отличие reactive forms от обычного input state.' },
      { day: 14, title: 'Validation', time: '2 часа', learn: ['Validators.required', 'minLength', 'email', 'errors', 'touched'], practice: ['Добавь email/password validation', 'Покажи ошибки только после touched', 'Заблокируй submit'], done: 'Форма не отправляется с невалидными данными.' },
      { day: 15, title: 'FormArray', time: '2 часа', learn: ['FormArray', 'динамические поля', 'add/remove controls'], practice: ['Форма проекта с массивом участников', 'Добавление и удаление участника', 'Валидация каждого email'], done: 'Можешь делать динамические поля.' },
      { day: 16, title: 'Custom validator', time: '2 часа', learn: ['ValidatorFn', 'cross-field validation', 'password confirmation'], practice: ['Сделай confirm password validator', 'Сделай forbiddenWords validator', 'Покажи ошибку в UI'], done: 'Понимаешь как писать свою валидацию.' },
      { day: 17, title: 'Form submit flow', time: '2 часа', learn: ['loading', 'disabled', 'error state', 'success state'], practice: ['Сделай fake submit через Promise', 'Добавь loading', 'Покажи server error'], done: 'Форма ведёт себя как реальная продуктовая форма.' },
      { day: 18, title: 'Forms контрольный день', time: '2–3 часа', learn: ['повтор reactive forms'], practice: ['Собери Profile Settings form', 'Добавь validation, FormArray, submit states', 'Разбей на компоненты'], done: 'Можешь сделать форму профиля уровня продукта.' }
    ]
  },
  {
    week: 4,
    title: 'RxJS',
    goal: 'Понимать Observable-мышление, без которого Angular будет тяжёлым.',
    days: [
      { day: 19, title: 'Observable basics', time: '2 часа', learn: ['Observable', 'subscribe', 'next/error/complete', 'unsubscribe'], practice: ['Создай Observable вручную', 'Подпишись и выведи значения', 'Сделай unsubscribe'], done: 'Понимаешь отличие Observable от Promise.' },
      { day: 20, title: 'Operators: map/filter/tap', time: '2 часа', learn: ['pipe', 'map', 'filter', 'tap'], practice: ['Преобразуй список пользователей', 'Отфильтруй активных', 'Добавь tap для debug'], done: 'Читаешь pipe слева направо без страха.' },
      { day: 21, title: 'Subject и BehaviorSubject', time: '2 часа', learn: ['Subject', 'BehaviorSubject', 'state stream'], practice: ['Сделай AuthService с BehaviorSubject', 'Добавь login/logout', 'Подпишись из компонента'], done: 'Понимаешь почему BehaviorSubject удобен для состояния.' },
      { day: 22, title: 'switchMap, mergeMap, concatMap', time: '2 часа', learn: ['higher-order observables', 'switchMap', 'mergeMap', 'concatMap'], practice: ['Сделай поиск задач', 'Используй switchMap для API search', 'Сравни поведение операторов'], done: 'Знаешь когда нужен switchMap.' },
      { day: 23, title: 'debounceTime и distinctUntilChanged', time: '2 часа', learn: ['debounceTime', 'distinctUntilChanged', 'search input'], practice: ['Сделай live search', 'Не делай запрос на каждый символ', 'Не повторяй одинаковый запрос'], done: 'Умеешь делать нормальный поиск.' },
      { day: 24, title: 'RxJS контрольный день', time: '2–3 часа', learn: ['повтор Observable и operators'], practice: ['Сделай search page: input → debounce → API → list', 'Добавь loading/error/empty state', 'Почисти подписки'], done: 'RxJS уже не выглядит магией.' }
    ]
  },
  {
    week: 5,
    title: 'HTTP, REST, Interceptors',
    goal: 'Уметь подключать фронтенд к API.',
    days: [
      { day: 25, title: 'REST и HTTP методы', time: '2 часа', learn: ['GET/POST/PUT/PATCH/DELETE', 'status codes', 'request/response'], practice: ['Опиши API для Tasks', 'Сделай таблицу методов', 'Объясни PUT vs PATCH'], done: 'Понимаешь REST на уровне собеса.' },
      { day: 26, title: 'Angular HttpClient', time: '2 часа', learn: ['HttpClient', 'get/post/put/delete', 'typing response'], practice: ['Подключи JSONPlaceholder', 'Получай posts', 'Типизируй response'], done: 'Делаешь typed API calls.' },
      { day: 27, title: 'CRUD service', time: '2 часа', learn: ['API layer', 'service methods', 'DTO'], practice: ['TaskApiService', 'getTasks/createTask/updateTask/deleteTask', 'Типы CreateTaskDto/UpdateTaskDto'], done: 'API-логика не лежит в компоненте.' },
      { day: 28, title: 'Loading/Error/Empty states', time: '2 часа', learn: ['loading state', 'error handling', 'retry idea', 'empty state'], practice: ['Добавь loader', 'Покажи ошибку', 'Покажи empty list'], done: 'UI не ломается при плохом API.' },
      { day: 29, title: 'Interceptors', time: '2 часа', learn: ['HTTP interceptor', 'auth token', 'global error handling'], practice: ['Добавь fake token header', 'Логируй ошибки', 'Сделай один global handler'], done: 'Понимаешь зачем interceptor в Angular.' },
      { day: 30, title: 'HTTP контрольный день', time: '2–3 часа', learn: ['REST + HttpClient + Interceptors'], practice: ['Собери CRUD Tasks с API', 'Добавь loading/error/empty', 'Вынеси всё в сервисы'], done: 'CRUD работает и код разделён по слоям.' }
    ]
  },
  {
    week: 6,
    title: 'Angular Material + SCSS/Less',
    goal: 'Быстро собирать продуктовый UI на Material.',
    days: [
      { day: 31, title: 'Angular Material setup', time: '2 часа', learn: ['install material', 'theme', 'modules/components'], practice: ['Подключи Material', 'Добавь toolbar/button/card', 'Проверь тему'], done: 'Material установлен и работает.' },
      { day: 32, title: 'Material Forms', time: '2 часа', learn: ['mat-form-field', 'mat-input', 'mat-select', 'mat-error'], practice: ['Перепиши login/profile form на Material', 'Добавь mat-error', 'Сделай аккуратную сетку'], done: 'Формы выглядят как продуктовый UI.' },
      { day: 33, title: 'Material Table', time: '2 часа', learn: ['mat-table', 'columns', 'dataSource', 'sorting idea'], practice: ['Выведи tasks в таблицу', 'Добавь actions column', 'Добавь status badge'], done: 'Умеешь собрать базовую таблицу.' },
      { day: 34, title: 'Dialog и Snackbar', time: '2 часа', learn: ['MatDialog', 'MatSnackBar', 'confirm flow'], practice: ['Confirm delete dialog', 'Success snackbar', 'Error snackbar'], done: 'Умеешь делать модалки и уведомления.' },
      { day: 35, title: 'SCSS/Less advanced refresh', time: '2 часа', learn: ['variables', 'mixins', 'nesting', 'partials', 'BEM', 'Less variables'], practice: ['Создай SCSS tokens', 'Сделай mixin для карточки', 'Перепиши один блок на Less-синтаксис'], done: 'Можешь объяснить Sass vs Less и писать без хаоса.' },
      { day: 36, title: 'UI контрольный день', time: '2–3 часа', learn: ['Material + SCSS'], practice: ['Собери Admin Dashboard screen', 'Table + filters + dialog + form', 'Приведи UI к единому стилю'], done: 'Есть аккуратный экран уровня внутреннего продукта.' }
    ]
  },
  {
    week: 7,
    title: 'Redux / NgRx',
    goal: 'Понимать Redux-подход и Angular store flow.',
    days: [
      { day: 37, title: 'Redux mental model', time: '2 часа', learn: ['store', 'action', 'reducer', 'selector', 'one-way data flow'], practice: ['Нарисуй flow action → reducer → state → UI', 'Реализуй reducer на чистом JS', 'Сделай counter reducer'], done: 'Понимаешь Redux без библиотеки.' },
      { day: 38, title: 'NgRx Store basics', time: '2 часа', learn: ['createAction', 'createReducer', 'on', 'StoreModule'], practice: ['Добавь NgRx в проект', 'Создай tasks actions', 'Создай tasks reducer'], done: 'Store подключён, actions меняют state.' },
      { day: 39, title: 'Selectors', time: '2 часа', learn: ['createSelector', 'feature selector', 'derived data'], practice: ['selectAllTasks', 'selectCompletedTasks', 'selectTasksCount'], done: 'Компоненты читают state через selectors.' },
      { day: 40, title: 'Effects', time: '2 часа', learn: ['effects', 'load actions', 'success/failure actions', 'API side effects'], practice: ['loadTasks effect', 'createTask effect', 'failure handling'], done: 'API-запросы не живут в компоненте.' },
      { day: 41, title: 'Store architecture', time: '2 часа', learn: ['feature state', 'smart/dumb components', 'facade pattern'], practice: ['Создай TasksFacade', 'Спрячь Store из компонента', 'Оставь компонент тонким'], done: 'Компонент не знает деталей NgRx.' },
      { day: 42, title: 'NgRx контрольный день', time: '2–3 часа', learn: ['Store + Selectors + Effects'], practice: ['Перепиши Task CRUD на NgRx', 'Добавь loading/error в store', 'Проверь flow руками'], done: 'Можешь объяснить Redux flow на своём проекте.' }
    ]
  },
  {
    week: 8,
    title: 'SDLC, Git, финальный проект, подготовка к переводу',
    goal: 'Показать команде, что ты готов брать реальные задачи.',
    days: [
      { day: 43, title: 'Git, Bitbucket workflow', time: '2 часа', learn: ['branch', 'commit', 'pull request', 'merge conflict', 'code review'], practice: ['Создай feature branch', 'Сделай 3 осмысленных коммита', 'Сымитируй PR описание'], done: 'Понимаешь реальный workflow в команде.' },
      { day: 44, title: 'Jira и Confluence', time: '2 часа', learn: ['Epic', 'Story', 'Task', 'Bug', 'acceptance criteria', 'documentation'], practice: ['Опиши 3 Jira задачи для своего проекта', 'Напиши acceptance criteria', 'Создай короткую Confluence-доку'], done: 'Умеешь превращать задачу в понятный план.' },
      { day: 45, title: 'Bamboo / CI понимание', time: '2 часа', learn: ['pipeline', 'build', 'test', 'artifact', 'deployment'], practice: ['Опиши pipeline: install → lint → build → deploy', 'Добавь npm scripts', 'Напиши что делать при failed build'], done: 'Понимаешь CI/CD на уровне участия в команде.' },
      { day: 46, title: 'Финальный проект: polish', time: '2–3 часа', learn: ['рефакторинг', 'naming', 'file structure', 'readme'], practice: ['Почисти код', 'Разбей features/shared/core', 'Напиши README проекта'], done: 'Проект можно показать тимлиду.' },
      { day: 47, title: 'Mock interview', time: '2 часа', learn: ['Angular questions', 'RxJS questions', 'TS questions', 'REST questions'], practice: ['Ответь письменно на 20 вопросов', 'Запиши 5 ответов голосом', 'Исправь слабые места'], done: 'Можешь отвечать без длинных пауз.' },
      { day: 48, title: 'День презентации результата', time: '2–3 часа', learn: ['самопрезентация', 'project walkthrough', 'trade-offs'], practice: ['Подготовь 5-минутный рассказ о проекте', 'Покажи архитектуру', 'Объясни что изучил и где нужна поддержка'], done: 'Готов говорить с продуктовой командой о переводе.' }
    ]
  }
];

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [activeWeek, setActiveWeek] = useState(1);

  const allDays = roadmap.flatMap(w => w.days.map(d => ({ ...d, week: w.week })));
  const completed = Object.values(progress).filter(Boolean).length;
  const percent = Math.round((completed / allDays.length) * 100);
  const currentWeek = roadmap.find(w => w.week === activeWeek);

  const toggleDay = (day) => {
    const next = { ...progress, [day]: !progress[day] };
    setProgress(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const reset = () => {
    if (!confirm('Сбросить весь прогресс?')) return;
    setProgress({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const weekProgress = useMemo(() => {
    return roadmap.map(w => {
      const done = w.days.filter(d => progress[d.day]).length;
      return { week: w.week, done, total: w.days.length };
    });
  }, [progress]);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">2 месяца · Angular Product Team</p>
          <h1>Roadmap перехода в продуктовую команду</h1>
          <p className="subtitle">48 учебных дней: TypeScript, Angular, RxJS, REST, Material, NgRx и SDLC. Каждый день — конкретная теория, практика и критерий закрытия.</p>
        </div>
        <div className="progressBox">
          <strong>{percent}%</strong>
          <span>{completed} / {allDays.length} дней закрыто</span>
          <div className="bar"><div style={{ width: `${percent}%` }} /></div>
          <button onClick={reset}>Сбросить</button>
        </div>
      </section>

      <section className="rules">
        <h2>Режим</h2>
        <div className="ruleGrid">
          <article><b>Будни</b><span>2 часа в день</span></article>
          <article><b>Суббота</b><span>2–3 часа практика</span></article>
          <article><b>Воскресенье</b><span>отдых или повтор</span></article>
          <article><b>Цель</b><span>быть готовым брать реальные Angular-задачи</span></article>
        </div>
      </section>

      <nav className="weeks">
        {roadmap.map(w => {
          const wp = weekProgress.find(item => item.week === w.week);
          return (
            <button key={w.week} className={activeWeek === w.week ? 'active' : ''} onClick={() => setActiveWeek(w.week)}>
              <span>Неделя {w.week}</span>
              <small>{wp.done}/{wp.total}</small>
            </button>
          );
        })}
      </nav>

      <section className="weekHeader">
        <p>Неделя {currentWeek.week}</p>
        <h2>{currentWeek.title}</h2>
        <span>{currentWeek.goal}</span>
      </section>

      <section className="days">
        {currentWeek.days.map(day => (
          <article className={progress[day.day] ? 'day done' : 'day'} key={day.day}>
            <div className="dayTop">
              <div>
                <p>День {day.day} · {day.time}</p>
                <h3>{day.title}</h3>
              </div>
              <label className="check">
                <input type="checkbox" checked={!!progress[day.day]} onChange={() => toggleDay(day.day)} />
                <span>{progress[day.day] ? 'Закрыто' : 'Закрыть'}</span>
              </label>
            </div>
            <div className="columns">
              <div>
                <h4>Изучить</h4>
                <ul>{day.learn.map(item => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h4>Практика</h4>
                <ul>{day.practice.map(item => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
            <div className="doneWhen"><b>Тема закрыта:</b> {day.done}</div>
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
