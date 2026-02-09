# 🚀 @myusufazmi/ultimate-tools

A premium, lightweight, and modern JavaScript utility library designed for high-performance web development. Zero dependencies, pure ESM, and built for speed.

[![npm version](https://img.shields.io/npm/v/@myusufazmi/ultimate-tools.svg?style=flat-square)](https://www.npmjs.com/package/@myusufazmi/ultimate-tools)
[![license](https://img.shields.io/npm/l/@myusufazmi/ultimate-tools.svg?style=flat-square)](https://github.com/myusufazmi/ultimate-tools/blob/main/LICENSE)

---

## 📦 Installation

```bash
npm install @myusufazmi/ultimate-tools
```

---

## 🛠 Modules & API Reference

### 🏗 DOM Utilities

Performance-oriented DOM manipulation with event delegation.

```javascript
import { $, $$, create, on } from "@myusufazmi/ultimate-tools";
```

- **`$(selector, context = document)`**: Returns a single element.
- **`$$(selector, context = document)`**: Returns an **array** of elements.
- **`create(tag, options)`**: Create complex elements declaratively.
- **`on(parent, event, selector, handler)`**: High-performance event delegation.

---

### 🌐 HTTP Wrapper

A clean, promise-based wrapper for the Fetch API with JSON support by default.

```javascript
import { http } from "@myusufazmi/ultimate-tools";
```

- **`http.get(url, options)`**
- **`http.post(url, body, options)`**
- **`http.put(url, body, options)`**
- **`http.delete(url, options)`**

---

### 📱 Device & Clipboard (NEW v1.3.0)

Modern device detection and clipboard interactions.

```javascript
import { copyToClipboard, isMobile, getOS } from "@myusufazmi/ultimate-tools";

await copyToClipboard("Hello!");
if (isMobile()) console.log("User is on mobile");
console.log(getOS()); // "iOS", "Android", "Windows", etc.
```

---

### 🎨 Color Manipulation (NEW v1.3.0)

Advanced color tools for theming.

```javascript
import { hexToRgb, lighten, randomColor } from "@myusufazmi/ultimate-tools";

hexToRgb("#ffffff"); // {r: 255, g: 255, b: 255}
lighten("#000000", 20); // Lighten by 20%
randomColor(); // "#3a7f21"
```

---

### 🔗 URL & Query Params (NEW v1.3.0)

Manage URL state without page rereshes.

```javascript
import { getParam, updateParam } from "@myusufazmi/ultimate-tools";

const page = getParam("page"); // ?page=2 -> "2"
updateParam("sort", "desc"); // Updates URL automatically
```

---

### 🖼️ File & Image Tools (NEW v1.3.0)

Essential file handling utilities.

```javascript
import { toBase64, formatFileSize } from "@myusufazmi/ultimate-tools";

const base64 = await toBase64(fileInput.files[0]);
console.log(formatFileSize(1024 * 1024)); // "1 MB"
```

---

### 📅 Date Utilities

Simple and efficient date formatting and manipulation.

```javascript
import { formatDate, relativeTime, addDays } from "@myusufazmi/ultimate-tools";

formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"); // "2026-02-09 11:58:39"
relativeTime(new Date(Date.now() - 3600000)); // "1 hours ago"
```

---

### 💎 Formatting Utilities

Tools for number, currency, and string formatting.

```javascript
import {
  currency,
  number,
  slugify,
  truncate,
} from "@myusufazmi/ultimate-tools";
```

---

### 🛡 Validation Utilities

Common regex-based validation helpers.

```javascript
import { isEmail, isStrongPassword, isEmpty } from "@myusufazmi/ultimate-tools";
```

---

### 💾 Storage Management

Type-safe and auto-serialized storage for persistent data.

```javascript
import { local, session } from "@myusufazmi/ultimate-tools";
```

---

### 🔄 State Management

A tiny ( < 1KB) reactive state manager.

```javascript
import { createStore } from "@myusufazmi/ultimate-tools";
```

---

### ⚡ General Utilities

Essential helpers for common logic patterns.

```javascript
import {
  debounce,
  throttle,
  deepClone,
  uuid,
} from "@myusufazmi/ultimate-tools";
```

---

## 📜 License

ISC © 2026 [myusufazmi](https://github.com/myusufazmi)
