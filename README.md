## 自动生成目录（带有滚动吸顶和滚动高亮效果）


### 引用

```html
<link rel="stylesheet" href="${base}/resources/jquery-createTOC/index.css" />
<script type="text/javascript" src="${base}/resources/jquery-createTOC/jquery.createTOC.js"></script>
```

### 使用

```html
<div id="wrap-box-baseinfo">简介：这里有很多很多文字</div>
<script>
    // 使用
    $('#content-body').createTOC({
        title: "知识网络", // 目录树的标题
        insert: "#content-side", // 目录需要插入的地方 selector
    });
</script>

```


