#Validator
依托于Zepto.js的一款插件。当然，也是完全支持jQuery的，只需要把源代码里的Zepto改成jQuery即可。

## 功能特性
1. 支持required, pattern, title属性定义；
2. 支持多种type，有: email, number, date, tel, url；
3. 支持实时状态更新，只需要加一个属性：data-cls="CLASS"，如果判断通过校验，则默认给当前input增加加CLASS的class，但如果有data-partner="SELECTOR"，则给$(input.data('partner'))增加CLASS。
4. 增加了data-nocls="CLASS"，功能刚好跟data-cls相反。它是移除CLASS。

## 不足（待改进）
1. 目前只支持文本类型的输入框校验；
2. 目前错误提示使用的是alter弹出，不过可以自定义回调函数：$('form').validator(function(msg, elem) { ... });
3. 未做属性支持校验。

## 例子
http://yss.github.io/html5-validator/demo.html
