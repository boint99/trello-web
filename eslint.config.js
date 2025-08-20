// eslint.config.js — Flat config cho ESLint v9 (ESM)
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Bỏ qua thư mục build
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      '*.config.js',
      'public/**',
      '.eslintcache'
    ]
  },

  // Cấu hình chung cho tất cả JS/JSX files
  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020
      }
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },

    settings: {
      react: { version: 'detect' }
    },

    rules: {
      // ===== ESLint core rules =====
      ...js.configs.recommended.rules,

      // ===== React rules =====
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // ===== React Hooks rules =====
      ...reactHooks.configs.recommended.rules,

      // ===== React Refresh (Hot Reload) =====
      // Cảnh báo khi export component không đúng cách cho HMR
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // ===== React Custom Overrides =====
      // Tắt kiểm tra PropTypes (dùng TypeScript thay thế)
      'react/prop-types': 'off',
      // Tắt yêu cầu displayName cho components
      'react/display-name': 'off',
      // Bắt buộc tuân thủ quy tắc Hooks (không được gọi trong vòng lặp, điều kiện)
      'react-hooks/rules-of-hooks': 'error',
      // Cảnh báo khi thiếu dependencies trong useEffect, useMemo, useCallback
      'react-hooks/exhaustive-deps': 'warn',

      // ===== Code Quality & Best Practices =====
      // Cảnh báo khi sử dụng console.log (nên xóa trước khi production)
      'no-console': 'warn',
      // Cảnh báo khi viết if trong else không cần thiết
      'no-lonely-if': 'warn',
      // Cảnh báo biến không dùng, bỏ qua biến VIẾT_HOA (constants)
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],

      // ===== Formatting & Style =====
      // Cảnh báo khi có khoảng trắng thừa ở cuối dòng
      'no-trailing-spaces': 'warn',
      // Cảnh báo nhiều khoảng trắng liền nhau
      'no-multi-spaces': 'warn',
      // Cảnh báo nhiều dòng trống liền nhau
      'no-multiple-empty-lines': 'warn',
      // Bắt buộc có khoảng trắng trước { } của block
      'space-before-blocks': ['error', 'always'],
      // Bắt buộc có khoảng trắng trong { object }
      'object-curly-spacing': ['warn', 'always'],
      // Bắt buộc indent 2 spaces, switch-case thêm 1 level
      'indent': ['warn', 2, { SwitchCase: 1 }],
      // Không dùng dấu ; ở cuối câu lệnh
      'semi': ['warn', 'never'],
      // Bắt buộc dùng dấu nháy đơn thay vì kép
      'quotes': ['error', 'single'],
      // Cảnh báo khoảng trắng trong [array]
      'array-bracket-spacing': 'warn',
      // Tắt kiểm tra line ending (LF vs CRLF) - tránh lỗi cross-platform
      'linebreak-style': 'off',
      // Cảnh báo xuống dòng có thể gây lỗi syntax
      'no-unexpected-multiline': 'warn',
      // Cảnh báo khoảng trắng quanh keywords (if, for, while...)
      'keyword-spacing': 'warn',
      // Không cho phép dấu phẩy thừa ở cuối object/array
      'comma-dangle': ['warn', 'never'],
      // Cảnh báo khoảng trắng sau dấu phẩy
      'comma-spacing': 'warn',
      // Cảnh báo khoảng trắng quanh => trong arrow function
      'arrow-spacing': 'warn'
    }
  }
]