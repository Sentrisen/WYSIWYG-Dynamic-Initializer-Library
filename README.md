# WYSIWYG Dynamic Initializer Library

A lightweight and flexible JavaScript utility for initializing and managing WYSIWYG editors like **Trumbowyg** and **CKEditor 5** on dynamically loaded or static HTML content.

## ✨ Features

- ✅ Lazy loading of editors on visibility
- ✅ Support for Trumbowyg and CKEditor5
- ✅ Asynchronous JS/CSS loading
- ✅ Automatic unique ID assignment to editors
- ✅ Simple change tracking and event dispatching

## 📦 Installation

1. **Download the Script:**

   Download the `wysiwygIL.js` file from the repository and place it in your project's JavaScript directory.

2. **Include in HTML:**

   Add the following line to your HTML page, typically before the closing `</body>` tag:

   ```html
   <script src="/path/to/your/js/wysiwygIL.js"></script>
   ```

   Replace `/path/to/your/js/` with the actual path where you saved the file.

---

## 🛠 Usage

### 1. HTML Example

Create a `<textarea>` element with the class `editor` (or any class of your choice):

```html
<textarea class="editor"></textarea>
```

### 2. JavaScript Initialization

Call the initializer once the DOM is fully loaded. Specify the desired WYSIWYG service: either `"Trumbowyg"` or `"CKEditor"`.

```javascript
document.addEventListener("DOMContentLoaded", function() {
    init_wysiwyg_load_lazy('.editor', 'Trumbowyg'); // or 'CKEditor'
});
```

> **Note:** Service name must be either `"Trumbowyg"` or `"CKEditor"` (case-sensitive). Ensure the required editor libraries are available or included dynamically.

---

## 🔧 Available Functions

| Function                             | Description                                  |
|--------------------------------------|----------------------------------------------|
| `initwysiwyg(element, service)`      | Initialize a single editor                   |
| `init_wysiwyg_all(selector, service)`| Initialize all editors matching selector     |
| `init_wysiwyg_load_lazy(selector, service)` | Lazy-load editors on viewport entry  |
| `wysiwyginfo(service)`               | Logs documentation link                      |
| `wysiwygchangelogger(service)`       | Logs changes in all `<textarea>` elements    |

---

## 🚀 Performance Comparison

A performance benchmark was conducted using **1000** `<textarea>` elements initialized with different editors.

| Editor       | Full Initialization Time | Notes |
|--------------|--------------------------|-------|
| **Trumbowyg** | ~5 seconds (5000 ms)     | ✅ Fastest and most lightweight |
| **CKEditor** | ~18 seconds (18000 ms)    | ⚠️ Heavy for large-scale use |
| **Summernote** | ❌ Unusable (browser froze) | 🚫 Not suitable for large datasets |

### ⚙ Lazy Loading Optimization

When using `init_wysiwyg_load_lazy()`, the editors are initialized only when visible in the viewport. This improves page load performance **regardless of the editor used**, especially for large datasets.

Even with lazy loading, **Trumbowyg remains the fastest** option, making it ideal for bulk textarea editing interfaces.

### Recommendation

- ✅ Use **Trumbowyg** for high-volume or large datasets (hundreds/thousands of editors).
- ⚠️ Use **CKEditor** for high-quality rich text needs, but limit to small/medium sets.
- ❌ Avoid **Summernote** for large-scale textarea editing due to performance issues.


## 🔗 Supported Editors

- [Trumbowyg Documentation](https://alex-d.github.io/Trumbowyg/documentation/)
- [CKEditor 5 Documentation](https://ckeditor.com/docs/ckeditor5/latest/index.html)

## 📥 Download

[![Download](https://img.shields.io/badge/Download-wysiwygIL.js-blue?style=for-the-badge)](https://raw.githubusercontent.com/Sentrisen/WYSIWYG-Dynamic-Initializer-Library/main/wysiwygIL.js)

---

## 📄 License

- [MIT LICENSE](https://github.com/Sentrisen/WYSIWYG-Dynamic-Initializer-Library/blob/main/LICENSE)
