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

### 📅 Date Utilities (NEW v1.1.0)

Simple and efficient date formatting and manipulation.

```javascript
import { formatDate, relativeTime, addDays } from "@myusufazmi/ultimate-tools";

formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"); // "2026-02-09 11:58:39"
relativeTime(new Date(Date.now() - 3600000)); // "1 hours ago"
addDays(new Date(), 7); // Date object + 7 days
```

---

### 💎 Formatting Utilities (NEW v1.1.0)

Tools for number, currency, and string formatting.

```javascript
import {
  currency,
  number,
  slugify,
  truncate,
} from "@myusufazmi/ultimate-tools";

currency(50000); // "Rp 50.000,00" (default id-ID)
number(1234.56, 1); // "1.234,6"
slugify("Halo Dunia!"); // "halo-dunia"
truncate("Teks yang sangat panjang sekali", 10); // "Teks yang..."
```

---

### 🛡 Validation Utilities (NEW v1.1.0)

Common regex-based validation helpers.

```javascript
import { isEmail, isStrongPassword, isEmpty } from "@myusufazmi/ultimate-tools";

isEmail("test@example.com"); // true
isStrongPassword("Pass123"); // false (too short)
isEmpty("   "); // true
```

---

### 💾 Storage Management

Type-safe and auto-serialized storage for persistent data.

```javascript
import { local, session } from "@myusufazmi/ultimate-tools";
```

- **`local.set(key, value)`** / **`session.set(key, value)`**
- **`local.get(key, fallback)`** / **`session.get(key, fallback)`**

---

### 🔄 State Management

A tiny ( < 1KB) reactive state manager.

```javascript
import { createStore } from "@myusufazmi/ultimate-tools";

const count = createStore(0);
count.subscribe((val) => console.log(val));
count.update((n) => n + 1);
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

- **`debounce(fn, delay)`**
- **`throttle(fn, limit)`**
- **`deepClone(obj)`**
- **`uuid()`**

---

## 📜 License

ISC © 2026 [myusufazmi](https://github.com/myusufazmi)
