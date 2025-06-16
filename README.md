# 🌟 PickStars Blog

A personal blog website built with **Vue 3 + TypeScript + Element Plus**, featuring responsive design, social icons, a
typing effect, and ICP record display.

![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen)
![Element Plus](https://img.shields.io/badge/Element--Plus-2.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Language 

[简体中文](./README_zh.md) | English

---

## 🚀 Features

- Developed quickly using Vue 3 + TypeScript + Vite
- Icons from Iconfont / Font Awesome
- Hover animation effects on social links
- Custom typing effect that fetches quotes from an API
- Sticky header and footer with ICP record display
- Optional PWA plugin for project build

---

## 🛠 Tech Stack

| Technology                                    | Description                         |
|-----------------------------------------------|-------------------------------------|
| [Vue 3](https://vuejs.org/)                   | Progressive JavaScript Framework    |
| [TypeScript](https://www.typescriptlang.org/) | Superset of JavaScript              |
| [Vite](https://vitejs.dev/)                   | Next-generation frontend build tool |
| [Element Plus](https://element-plus.org/)     | Vue 3 UI Framework                  |
| [Pinia](https://pinia.vuejs.org/)             | State management                    |
| [Axios](https://axios-http.com/)              | HTTP client                         |
| [Sass](https://sass-lang.com/)                | CSS preprocessor                    |

## 📁 Project Structure

````

PickstarsBlog/
├── public/                # Public resources
│   └── assets/data/       # Local JSON data (e.g. social links)
│   └── assets/images      # Image resources
├── src/
│   ├── assets/            # Static assets
│   ├── components/        # Common components (typing effect, icons, etc.)
│   ├── Views/             # Page components
│   ├── router/            # Routing configuration
│   ├── stores/            # Pinia state management
│   ├── utils/             # Utility functions
│   ├── App.vue
│   └── main.ts
├── index.html
└── vite.config.ts         # Vite configuration

````

---

## 📦 Install Dependencies

```bash
npm install
````

---

## 🔧 Local Development

```bash
npm run dev
# Runs dev server at localhost:5173, accessible on LAN with --host
```

---

## 📦 Build for Production

```bash
npm run build
```

Output folder is `/dist`.

---

## 🔍 Preview Production Build Locally


```bash
npm run preview
```
![V 1.0 Preview](./Preview/16-6-2025_123345_localhost.jpeg)

---

## 🌐 Environment Variables (Optional)

You can add a `.env` file in the root directory with the following variables:

```env
VITE_SITE_COPYRIGHT=PickStars
VITE_SITE_ICP=ICP Record Number
```

---

## 📄 License

[MIT](./LICENSE) © PickStars308

---

## 📬 Contact Me

* GitHub: [PickStars308](https://github.com/PickStars308/)
* QQ: [Chat with me](https://qm.qq.com/q/8Kg04tLXb2)
* Email: [pickstars2024@qq.com](mailto:pickstars2024@qq.com)