// ============================================================
//  Кроме стандартных ключей MUI, в каждой теме есть блок `custom` —
//  цвета и «поверхности» для шапки, подвала, меню и карточек.
//  Использование: theme.palette.custom.cardBorder
//  Одинаковые ключи есть во ВСЕХ трёх темах, поэтому компоненты
//  не зависят от того, какая тема выбрана.
//
//  Иерархия поверхностей (снаружи внутрь):
//    background.default  — фон страницы
//    background.paper    — большие карточки/виджеты (Main, меню)
//    custom.surfaceAlt   — элементы внутри карточек (строки списка)
// ============================================================

// ------------------------------------------------------------
// 1. СВЕТЛАЯ ТЕМА (основная)
// ------------------------------------------------------------
// Идея: «холодный кинозал днём». Фон страницы темнее и
// насыщеннее карточек, поэтому белые виджеты чётко отделяются
// не только тенью, но и цветом и тонкой рамкой.
// Шапка и подвал глубокий бирюзовый градиент.
export const lightPalette = {
  mode: "light",
  background: {
    default: "#D6E2E8", // Холодный серо-бирюзовый фон, заметно темнее карточек
    paper: "#FFFFFF", // Белые карточки
  },
  primary: {
    main: "#0F7C8A", // Глубокий бирюзовый
    light: "#3FA3B0",
    dark: "#0A5D68",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#F2A93B", // Тёплый янтарь — акцент «изюминка»
    light: "#F7C56E",
    dark: "#C98614",
    contrastText: "#14202A", // На янтаре тёмный текст читается лучше белого
  },
  error: {
    main: "#D32F2F",
  },
  warning: {
    main: "#C77800",
  },
  info: {
    main: "#0288D1",
  },
  success: {
    main: "#2E7D32",
  },
  divider: "#C3D2DB",
  text: {
    primary: "#14202A", // Почти чёрный с холодным оттенком
    secondary: "#4B5A68", // Графитовый второстепенный
    disabled: "rgba(20, 32, 42, 0.38)",
  },
  action: {
    hover: "rgba(15, 124, 138, 0.08)",
    selected: "rgba(15, 124, 138, 0.14)",
  },
  custom: {
    // Шапка и подвал (использовать через `background`, т.к. это градиент)
    headerBg: "linear-gradient(135deg, #0C2A31 0%, #14454F 100%)",
    footerBg: "linear-gradient(135deg, #14454F 0%, #0C2A31 100%)",
    accentLine: "#F2A93B", // Янтарная линия под шапкой
    onBar: "#FFFFFF", // Текст/иконки на шапке и подвале
    onBarMuted: "rgba(255, 255, 255, 0.68)", // Второстепенный текст на них
    barBorder: "rgba(255, 255, 255, 0.10)", // Линия над подвалом
    searchBg: "rgba(255, 255, 255, 0.14)", // Поле поиска в шапке
    searchBgHover: "rgba(255, 255, 255, 0.24)",

    // Карточки и элементы внутри них
    surfaceAlt: "#F3F7F9", // Строки списка внутри белой карточки
    cardBorder: "#B9CBD5", // Рамка больших карточек
    itemBorder: "#D9E3E9", // Рамка строк списка
    cardShadow:
      "0 1px 2px rgba(12, 42, 49, 0.08), 0 8px 24px rgba(12, 42, 49, 0.12)",

    // Боковое меню
    sidebar: "#FFFFFF",
    sidebarSelected: "rgba(15, 124, 138, 0.12)",
    sidebarHover: "rgba(15, 124, 138, 0.07)",
    sidebarText: "#14202A",
    sidebarIcon: "#4B5A68",
    sidebarIconSelected: "#0F7C8A",
  },
};

// ------------------------------------------------------------
// 2. ТЁМНО-СЕРАЯ ТЕМА
// ------------------------------------------------------------
// Собрана из цветов Main / Header / Footer:
//   #3d3d3d — фон страницы (Main)
//   #2d2d2d — боковое меню (Drawer)
//   #211e1e — шапка и подвал
//   rgba(13,13,13,0.69) — выбранный пункт меню
//   #d8d8d8 — иконки меню, rgba(255,255,255,0.6) — второстепенный текст
// В исходных файлах акцентного цвета не было (всё монохромное),
// поэтому акцент добавлен тёплый янтарный — хорошо смотрится на
// сером и «кинотеатральный». Его легко поменять в primary.main.
export const grayPalette = {
  mode: "dark",
  background: {
    default: "#3D3D3D",
    paper: "#2D2D2D",
  },
  primary: {
    main: "#F0B34A", // Тёплый янтарный акцент
    light: "#F6CB7E",
    dark: "#C48A1E",
    contrastText: "#211E1E",
  },
  secondary: {
    main: "#8FBFCB", // Приглушённый голубой для второстепенных акцентов
    contrastText: "#211E1E",
  },
  error: {
    main: "#EF5350",
  },
  warning: {
    main: "#FFA726",
  },
  info: {
    main: "#4FC3F7",
  },
  success: {
    main: "#66BB6A",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.6)",
    disabled: "rgba(255, 255, 255, 0.38)",
  },
  action: {
    hover: "rgba(255, 255, 255, 0.04)",
    selected: "rgba(13, 13, 13, 0.69)",
  },
  custom: {
    headerBg: "#211E1E",
    footerBg: "#211E1E",
    accentLine: "transparent", // Линии под шапкой в этой теме нет
    onBar: "#FFFFFF",
    onBarMuted: "rgba(255, 255, 255, 0.6)",
    barBorder: "rgba(255, 255, 255, 0.08)",
    searchBg: "rgba(255, 255, 255, 0.15)",
    searchBgHover: "rgba(255, 255, 255, 0.25)",

    surfaceAlt: "#353535",
    cardBorder: "rgba(255, 255, 255, 0.06)",
    itemBorder: "rgba(255, 255, 255, 0.08)",
    cardShadow: "none",

    sidebar: "#2D2D2D",
    sidebarSelected: "rgba(13, 13, 13, 0.69)",
    sidebarHover: "rgba(255, 255, 255, 0.04)",
    sidebarText: "#FFFFFF",
    sidebarIcon: "#D8D8D8",
    sidebarIconSelected: "#FFFFFF",
  },
};

// ------------------------------------------------------------
// 3. СИНЯЯ ТЕМА
// ------------------------------------------------------------
export const spacePalette = {
  mode: "dark",
  background: {
    default: "#0B132B",
    paper: "#1C2541",
  },
  primary: {
    main: "#48CAE4",
    dark: "#0096C7",
    contrastText: "#0B132B",
  },
  secondary: {
    main: "#FFB703",
    contrastText: "#0B132B",
  },
  error: {
    main: "#FF4D4D",
  },
  warning: {
    main: "#FFB703",
  },
  info: {
    main: "#48CAE4",
  },
  success: {
    main: "#06D6A0",
  },
  divider: "#2A3A5E",
  text: {
    primary: "#F8FAFC",
    secondary: "#94A3B8",
  },
  action: {
    hover: "rgba(72, 202, 228, 0.1)",
    selected: "rgba(72, 202, 228, 0.2)",
  },
  custom: {
    headerBg: "#1C2541",
    footerBg: "#1C2541",
    accentLine: "transparent",
    onBar: "#F8FAFC",
    onBarMuted: "#94A3B8",
    barBorder: "rgba(72, 202, 228, 0.12)",
    searchBg: "rgba(255, 255, 255, 0.1)",
    searchBgHover: "rgba(255, 255, 255, 0.18)",

    surfaceAlt: "#243052",
    cardBorder: "#2A3A5E",
    itemBorder: "#2A3A5E",
    cardShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",

    sidebar: "#1C2541",
    sidebarSelected: "rgba(72, 202, 228, 0.2)",
    sidebarHover: "rgba(72, 202, 228, 0.1)",
    sidebarText: "#F8FAFC",
    sidebarIcon: "#94A3B8",
    sidebarIconSelected: "#48CAE4",
  },
};

export const palettes = {
  light: lightPalette,
  gray: grayPalette,
  space: spacePalette,
};

export const themeLabels = {
  light: "Light theme",
  gray: "Gray theme",
  space: "Space theme",
};

export const themeOrder = ["light", "gray", "space"];
