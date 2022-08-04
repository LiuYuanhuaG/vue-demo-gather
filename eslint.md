## prettier

```js
# npm i prettier -D

# script
  "scripts": {
    "prettier": "prettier --write '**/*.{js,jsx,tsx,ts,less,md,json}'",
    "eslint": "eslint ."
  },
"lint-staged": {
    "*.{js,jsx,less,md,json}": [
      "prettier --write"
    ],
    "*.ts?(x)": [
      "prettier --parser=typescript --write"
    ]
},

# .prettierrc.js
module.exports = {
    printWidth: 80,                    //（默认值）单行代码超出 80 个字符自动换行
    tabWidth: 2,                       //（默认值）一个 tab 键缩进相当于 2 个空格
    useTabs: true,                     // 行缩进使用 tab 键代替空格
    semi: false,                       //（默认值）语句的末尾加上分号
    singleQuote: true,                 // 使用单引号
    quoteProps: 'as-needed',           //（默认值）仅仅当必须的时候才会加上双引号
    jsxSingleQuote: true,              // 在 JSX 中使用单引号
    trailingComma: 'all',              // 不用在多行的逗号分隔的句法结构的最后一行的末尾加上逗号
    bracketSpacing: true,              //（默认值）在括号和对象的文字之间加上一个空格
    jsxBracketSameLine: true,          // 把 > 符号放在多行的 JSX 元素的最后一行
    arrowParens: 'avoid',              // 当箭头函数中只有一个参数的时候可以忽略括弧
    htmlWhitespaceSensitivity: 'ignore', // vue template 中的结束标签结尾尖括号掉到了下一行
    vueIndentScriptAndStyle: false,    //（默认值）对于 .vue 文件，不缩进 <script> 和 <style> 里的内容
    embeddedLanguageFormatting: 'auto', //（默认值）允许自动格式化内嵌的代码块
};
```

## 通用配置

### .eslintignore

```markdown
**/\*.svg
**/_.ico
package.json
/dist
.DS_Store
.eslintignore
_.png
_.toml
.editorconfig
.gitignore
.prettierignore
LICENSE
.eslintcache
_.lock
yarn-error.log
/public
**/node_modules/**
.npmrc
```

### .prettierignore

```markdown
**/\*.svg
**/_.ico
package.json
/dist
.DS_Store
.eslintignore
_.png
_.toml
.editorconfig
.gitignore
.prettierignore
LICENSE
.eslintcache
_.lock
yarn-error.log
/public
**/node_modules/**
.npmrc
```

### 某文件取消 eslint 检测

- 文件开头写
- /_ eslint-disable _/

## vue2

### 使用了 vue-ui 创建项目

- 我没有勾选 eslint 及 format
- 如果选了就不用手动加 devDependencies 依赖了

### vscode 下载 eslint 插件

- npm 安装完依赖如果没效果重新启动下 eslint 插件

### vscode 下载 Prettier 插件

### vscode 设置

```json
"editor.defaultFormatter": "esbenp.prettier-vscode", //自动格式化程序为prettier
  "javascript.updateImportsOnFileMove.enabled": "always", //js重命名文件自动更新路径
  //js自动格式化程序为prettier-eslint
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  // #让vue中的js按"prettier"格式进行格式化
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.js": "prettier-eslint", //主要是这一行解决冲突
  "vetur.format.defaultFormatterOptions": {
    // #vue组件中html代码格式化样式
    // "js-beautify-html": {},
    // "prettier-eslint": {},
    // "prettyhtml": {}
  },
  "editor.formatOnPaste": true, //自动格式化粘贴内容
  "editor.formatOnType": true, //键入一行后自动格式化
```

### devDependencies

```json
    "eslint-config-standard": "^10.2.1",
    "eslint-friendly-formatter": "^3.0.0",
    "eslint-loader": "^1.7.1",
    "eslint-plugin-html": "^3.0.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-node": "^5.2.0",
    "eslint-plugin-promise": "^3.4.0",
    "eslint-plugin-standard": "^3.0.1",
    "@babel/core": "^7.12.16",
    "@babel/eslint-parser": "^7.12.16",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3"
```

### package.json

```json
{
	"eslintConfig": {
		"root": true,
		"env": {
			"node": true
		},
		"extends": ["plugin:vue/essential", "eslint:recommended"],
		"parserOptions": {
			"parser": "@babel/eslint-parser"
		},
		"rules": {}
	}
}
```

### 项目根目录新建 .eslintrc.js

```js
module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', 'eslint:recommended'],
	rules: {
		'accessor-pairs': 2,
		'arrow-spacing': [
			2,
			{
				before: true,
				after: true,
			},
		],
		'block-spacing': [2, 'always'],
		'brace-style': [
			2,
			'1tbs',
			{
				allowSingleLine: true,
			},
		],
		camelcase: [
			0,
			{
				properties: 'always',
			},
		],
		'comma-dangle': [2, 'never'],
		'comma-spacing': [
			2,
			{
				before: false,
				after: true,
			},
		],
		'comma-style': [2, 'last'],
		'constructor-super': 2,
		curly: [2, 'multi-line'],
		'dot-location': [2, 'property'],
		'eol-last': 2,
		eqeqeq: [2, 'allow-null'],
		'generator-star-spacing': [
			2,
			{
				before: true,
				after: true,
			},
		],
		'handle-callback-err': [2, '^(err|error)$'],
		indent: [
			2,
			2,
			{
				SwitchCase: 1,
			},
		],
		'jsx-quotes': [2, 'prefer-single'],
		'key-spacing': [
			2,
			{
				beforeColon: false,
				afterColon: true,
			},
		],
		'keyword-spacing': [
			2,
			{
				before: true,
				after: true,
			},
		],
		'new-cap': [
			2,
			{
				newIsCap: true,
				capIsNew: false,
			},
		],
		'new-parens': 2,
		'no-array-constructor': 2,
		'no-caller': 2,
		'no-console': 'off',
		'no-class-assign': 2,
		'no-cond-assign': 2,
		'no-const-assign': 2,
		'no-control-regex': 2,
		'no-delete-var': 2,
		'no-dupe-args': 2,
		'no-dupe-class-members': 2,
		'no-dupe-keys': 2,
		'no-duplicate-case': 2,
		'no-empty-character-class': 2,
		'no-empty-pattern': 2,
		'no-eval': 2,
		'no-ex-assign': 2,
		'no-extend-native': 2,
		'no-extra-bind': 2,
		'no-extra-boolean-cast': 2,
		'no-extra-parens': [2, 'functions'],
		'no-fallthrough': 2,
		'no-floating-decimal': 2,
		'no-func-assign': 2,
		'no-implied-eval': 2,
		'no-inner-declarations': [2, 'functions'],
		'no-invalid-regexp': 2,
		'no-irregular-whitespace': 2,
		'no-iterator': 2,
		'no-label-var': 2,
		'no-labels': [
			2,
			{
				allowLoop: false,
				allowSwitch: false,
			},
		],
		'no-lone-blocks': 2,
		'no-mixed-spaces-and-tabs': 2,
		'no-multi-spaces': 2,
		'no-multi-str': 2,
		'no-multiple-empty-lines': [
			2,
			{
				max: 1,
			},
		],
		'no-native-reassign': 2,
		'no-negated-in-lhs': 2,
		'no-new-object': 2,
		'no-new-require': 2,
		'no-new-symbol': 2,
		'no-new-wrappers': 2,
		'no-obj-calls': 2,
		'no-octal': 2,
		'no-octal-escape': 2,
		'no-path-concat': 2,
		'no-proto': 2,
		'no-redeclare': 2,
		'no-regex-spaces': 2,
		'no-return-assign': [2, 'except-parens'],
		'no-self-assign': 2,
		'no-self-compare': 2,
		'no-sequences': 2,
		'no-shadow-restricted-names': 2,
		'no-spaced-func': 2,
		'no-sparse-arrays': 2,
		'no-this-before-super': 2,
		'no-throw-literal': 2,
		'no-trailing-spaces': 2,
		'no-undef': 2,
		'no-undef-init': 2,
		'no-unexpected-multiline': 2,
		'no-unmodified-loop-condition': 2,
		'no-unneeded-ternary': [
			2,
			{
				defaultAssignment: false,
			},
		],
		'no-unreachable': 2,
		'no-unsafe-finally': 2,
		'no-unused-vars': [
			2,
			{
				vars: 'all',
				args: 'none',
			},
		],
		'no-useless-call': 2,
		'no-useless-computed-key': 2,
		'no-useless-constructor': 2,
		'no-useless-escape': 0,
		'no-whitespace-before-property': 2,
		'no-with': 2,
		'one-var': [
			2,
			{
				initialized: 'never',
			},
		],
		'operator-linebreak': [
			2,
			'after',
			{
				overrides: {
					'?': 'before',
					':': 'before',
				},
			},
		],
		'padded-blocks': [2, 'never'],
		quotes: [
			2,
			'single',
			{
				avoidEscape: true,
				allowTemplateLiterals: true,
			},
		],
		semi: [2, 'always'], // 语句强制分号结尾
		'space-before-blocks': [2, 'always'],
		'space-before-function-paren': [2, 'never'],
		'space-in-parens': [2, 'never'],
		'space-infix-ops': 2,
		'space-unary-ops': [
			2,
			{
				words: true,
				nonwords: false,
			},
		],
		'spaced-comment': [
			2,
			'always',
			{
				markers: [
					'global',
					'globals',
					'eslint',
					'eslint-disable',
					'*package',
					'!',
					',',
				],
			},
		],
		'template-curly-spacing': [2, 'never'],
		'use-isnan': 2,
		'valid-typeof': 2,
		'wrap-iife': [2, 'any'],
		'yield-star-spacing': [2, 'both'],
		yoda: [2, 'never'],
		'prefer-const': 2,
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'object-curly-spacing': [
			2,
			'always',
			{
				objectsInObjects: false,
			},
		],
		'array-bracket-spacing': [2, 'never'],
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};
```

### 如果报错提示 babel-eslint

- 一块重新卸载和安装下
- npm uninstall eslint babel-eslint -g
- npm install eslint babel-eslint -g

### 测试效果

```js
# HomeView.vue
let a;
# 此时会提示 'a' is defined but never used.eslintno-unused-vars
```

## vue3

### 使用 vue-ui 创建项目

- 我没有勾选 eslint 及 format
- 如果选了就不用手动加 devDependencies 依赖了

### 依赖

```js
    "@typescript-eslint/eslint-plugin": "^5.32.0",
    "@typescript-eslint/parser": "^5.32.0",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/eslint-config-standard": "^6.1.0",
    "@vue/eslint-config-typescript": "^9.1.0",
    "eslint": "^8.21.0",
    "eslint-define-config": "^1.6.0",
    "eslint-plugin-import": "^2.25.3",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-promise": "^5.1.0",
    "eslint-plugin-vue": "^9.3.0",
    "eslint-config-prettier": "^8.5.0",
    "prettier-eslint": "^15.0.1",
```

- eslint --init

### .eslintrc.js

```js
// @ts-check
const { defineConfig } = require('eslint-define-config');
module.exports = defineConfig({
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended',
	],
	rules: {
		'vue/script-setup-uses-vars': 'error',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'vue/custom-event-name-casing': 'off',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'space-before-function-paren': 'off',

		'vue/attributes-order': 'off',
		'vue/one-component-per-file': 'off',
		'vue/html-closing-bracket-newline': 'off',
		'vue/max-attributes-per-line': 'off',
		'vue/multiline-html-element-content-newline': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/attribute-hyphenation': 'off',
		'vue/require-default-prop': 'off',
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'never',
					component: 'always',
				},
				svg: 'always',
				math: 'always',
			},
		],
	},
});
```

### 测试效果

- 此时 let a 就会报错了
- 提示没有使用
