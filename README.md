# Project Overview: Can I Eat?

**"Can I Eat?"** is a web application specifically designed specifically for pregnant women, helping them determine if certain foods are safe to consume. Utilizing camera-based OCR (Optical Character Recognition), the app scans food labels or packaging and cross-references the ingredients against a comprehensive database of safe and unsafe foods for pregnancy.

### Key Features:
- **Camera OCR Integration:** Quickly scan food labels or packaging to identify ingredients.
- **Safety Database:** Access to a curated list of foods deemed safe or unsafe for pregnant women.
- **Chatbot Assistance:** Get instant answers to food safety questions via an integrated chatbot.
- **User-Friendly Interface:** Designed with ease of use in mind, ensuring quick and reliable information at your fingertips.

This service empowers pregnant women to make informed dietary choices with confidence.


# Technologies Used
- **BackEnd**
  - Java 17, Spring Boot, Gradle
  - Postgre SQL, AWS S3
  - nglok
  - Github Actions, Docker
  - Google Cloud Vision
- **FrontEnd**
  - React  
  - GPT-4o mini OpneAI
  - Netlify


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
