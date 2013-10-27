/**
 * 为了解决手机浏览器不支持html5表单验证
 * TODO:
    1. 需要判断浏览器是否支持required,pattern属性
    2. 所有的输入框类型都要处理
    3. 所有的checkbox,select,radio特殊处理
 * 调用：
    1. $('form').validator()
    2. $('form').validator(function(msg, elem) { ... })
 * 特别需求：
    <input type="text" required pattern="xxx" data-cls="selected" data-partner="#partner" />
    对这么一个情况下，会触发一个keyup监听事件，当当前的input校验成功，则$(input.data('partner')).addClass(input.data('cls'))
 */
;(function($) {

function Validator(form, callback) {
    var _this = this;
    _this.form = $(form);
    if (_this.form.is('form')) {
        _this.callback = callback || function (msg) { alert(msg); };
        _this.form.submit(function() {
            return _this.doSubmit();
        }).on('keyup', 'input[data-cls], input[data-nocls]', function() {
            var input = $(this),
                partner = input.data('partner'),
                cls = input.data('cls'),
                nocls = input.data('nocls'),
                hasError = !input.val() || _this._hasError(input);

            if (partner) {
                input = $(partner);
            }
            if ((hasError && cls) || (!hasError && nocls)) {
                input.removeClass(cls || nocls);
            } else {
                input.addClass(cls || nocls);
            }
        });;
    }
}

$.extend(Validator.prototype, {
    doSubmit: function() {
        var inputs = this.form.find('input'),
            input,
            len = inputs.length,
            i = 0;
        for (; i < len; ++i) {
            input = inputs[i];
            // 是文本输入框
            if (Validator.TEXT_TYPE.indexOf(input.type + ',') !== -1) {
                if (this._hasError(input)) {
                    input.focus();
                    this.callback(input.title || this.msg || '输入错误', input);
                    return false;
                }
            }
        }
        return true;
    },

    _hasError: function(elem) {
        var elem = $(elem),
            val = elem.val(),
            type = elem.attr('type'),
            isRequired = elem.prop('required') && !elem.prop('disabled');
        // 空值情况
        if (isRequired && !val) {
            this.msg = '输入不能为空';
            return true;
        }
        if (isRequired || val) {
            if (elem.attr('pattern')) {
                if (!new RegExp('^' + elem.attr('pattern') + '$').test(val)) {
                    this.msg = "输入格式不正确";
                    return true;
                }
            } else {
                if (Validator.TYPE[type]) {
                    if (!Validator.TYPE[type].test(val)) {
                        this.msg = "输入的类型不正确";
                        return true;
                    }
                }
            }
        }
        return false;
    }
});

Validator.TYPE = {
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    number: /^\d+$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    tel: /^(?:1\d{12}|\d{4}-?\d{7,8}(?:-\d{3,5})?)$/,
    url: /^[a-zA-z]+:\/\/[^\s]*$/
};

// 文本类型
Validator.TEXT_TYPE = 'text,search,email,number,date,tel,';

$.fn.validator = function(callback) {
    new Validator(this, callback);
    return this;
};

})(Zepto);
