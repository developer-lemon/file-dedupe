
### 介绍


检测给定目录中的重复文件, 采用哈希算法对比文件是否相同。


### 全局安装 

```bash
npm i -g  @nvae/file-dedupe
```


### 用法

检测给定目录重复文件并将结果输出到指定位置

```bash
nvae-dedupe -d ./path/to/ -o repeat.json
```

检测给定目录重复文件并删除
```bash
nvae-dedupe -d ./path/to/ -r
```


### 命令行选项

```bash

  -h, --help     显示帮助信息                                             [布尔]
  -d, --dir      搜索目录                                        [字符串] [必需]
  -r, --remove   是否删除重复文件                         [布尔] [默认值: false]
  -o, --output   输出结果文件,默认在控制输出结果                        [字符串]
  -v, --version  显示版本号  
``` 
