## 自动生成目录（带有滚动吸顶和滚动高亮效果）


### Install

```html
<link rel="stylesheet" href="${path}/src/index.css" />
<script type="text/javascript" src="${path}/src/jquery.createTOC.js"></script>
```

### Usage

```html
<div id="content-body">
    <h1>目录1</h1>
    <h1>目录2</h1>
    <h1>目录3</h1>
    <h1>目录4</h1>
    <h1>目录5</h1>
</div>
<div id="content-side">
    <!-- 这里侧栏 -->
</div>
<script>
    // 使用
    $('#content-body').createTOC({
        title: "知识网络", // 目录树的标题
        insert: "#content-side", // 目录需要插入的地方 selector
    });
</script>

```

### MIT License
Copyright (c) 2019 C-FED

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.