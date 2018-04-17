
    /* J: NOJQUERY mini wrapper for syntax command
        https://github.com/PetersSharp/
     */

    if (typeof J === "undefined") {
        window.J = new Object();
    } else if (typeof J !== "object") {
        throw ("J global variable already exists");
    }

(function () {

    var Jerror = [
        "XMLHttpRequest not support",
        "JSON error",
        "Request error",
        "Send error",
        ", code: "
    ];

    /* J: NOJQUERY wrapper */

    J = function (id) {
        var ele = document.querySelectorAll(id, null);
        return (ele === null || typeof ele[0] === typeof void 0) ? null : ele[0];
    };

    J.Ready = function (evh) {
        if (document.readyState !== "loading") {
            evh();
        } else {
            document.addEventListener("DOMContentLoaded", evh);
        }
    };

    J.isUndefined = function (obj) {
        return ((typeof obj === typeof void 0) ? true : ((obj === null) ? true : false));
    };

    J.GetJSON = function (url, cb) {

        if (!window.XMLHttpRequest) {
            cb(Jerror[0], false);
            return;
        }
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data;
                try {
                    data = JSON.parse(request.responseText);
                } catch(e) {
                    cb(Jerror[2] + e, false)
                }
                ((data == null) ? cb(Jerror[1], false) : cb(data, true));
            } else {
                cb(Jerror[2] + Jerror[4] + request.status, false);
            }
        };
        request.onerror = function() {
            cb(Jerror[2], false);
        };
        request.send();
    };

    J.SendJSON = function (url, data, cb) {

        if (!window.XMLHttpRequest) {
            cb(Jerror[0], false);
            return;
        }
        var sdata;
        try {
            sdata = JSON.stringify(data);
        } catch(e) {
            cb(Jerror[3] + e, false)
        }
        var request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onerror = function() {
            cb(Jerror[3] + Jerror[4] + request.status, false);
        };
        request.send(sdata);
    };

    /* J: HTMLElement extension */

    if (!HTMLElement.prototype.On) {
        HTMLElement.prototype.On = function (act, fun) {

            if (J.isUndefined(this)) { return; }
            if (!J.isUndefined(this.addEventListener)) {
                this.addEventListener(act, fun, false);
            } else if (!J.isUndefined(this.attachEvent)) {
                this.attachEvent("on" + act, fun);
            } else {
                this["on" + act] = fun();
            }
        };
    }

    if (!HTMLElement.prototype.Off) {
        HTMLElement.prototype.Off = function (act, fun) {

            if (J.isUndefined(this)) { return; }
            if (!J.isUndefined(this.removeEventListener)) {
                this.removeEventListener(act, fun, false);
            } else if (!J.isUndefined(this.detachEvent)) {
                this.detachEvent("on" + act, fun);
            } else {
                this["on" + act] = null;
            }
        };
    }

    if (!HTMLElement.prototype.FadeIn) {
        HTMLElement.prototype.FadeIn = function (display) {

            if (J.isUndefined(this)) { return null; }
            var ele           = this;
            ele.style.opacity = 0;
            ele.style.display = display || "block";

            (function fade() {
                var val = parseFloat(ele.style.opacity);
                if (!((val += .02) > 1)) {
                  ele.style.opacity = val;
                  requestAnimationFrame(fade);
                }
            })();
            return this;
        };
    }

    if (!HTMLElement.prototype.FadeOut) {
        HTMLElement.prototype.FadeOut = function () {

            if (J.isUndefined(this)) { return null; }
            var ele           = this;
            ele.style.opacity = 1;

            (function fade() {
                if ((ele.style.opacity -= .05) < 0) {
                    ele.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            })();
            return this;
        };
    }

    if (!HTMLElement.prototype.Css) {
        HTMLElement.prototype.Css = function (str, val) {

            if (J.isUndefined(this)) { return null; }
            var style = getComputedStyle(this, null);
            if ((J.isUndefined(str)) || (J.isUndefined(val))) {
                return style;
            }
            style[str] = val;
            this.setAttribute("style", style);
            return style;
        };
    }

    if (!HTMLElement.prototype.AddClass) {
        HTMLElement.prototype.AddClass = function (name) {

            if (J.isUndefined(this)) { return null; }
            if (this.classList) { this.classList.add(name); }
            else { this.className += ' ' + name; }
            return this;
        };
    }

    if (!HTMLElement.prototype.RemoveClass) {
        HTMLElement.prototype.RemoveClass = function (name) {

            if (J.isUndefined(this)) { return null; }
            if (this.classList) { this.classList.remove(name); }
            return this;
        };
    }

    if (!HTMLElement.prototype.ToggleClass) {
        HTMLElement.prototype.ToggleClass = function (name) {

            if (J.isUndefined(this)) { return null; }
            if (this.classList) { this.classList.toggle(name); }
            return this;
        };
    }

    if (!HTMLElement.prototype.HasClass) {
        HTMLElement.prototype.HasClass = function (name) {

            if (J.isUndefined(this)) { return false; }
            if (this.classList) { return this.classList.contains(name); }
            return false;
        };
    }

    if (!HTMLElement.prototype.Hide) {
        HTMLElement.prototype.Hide = function () {

            if (J.isUndefined(this)) { return null; }
            this.style.display = "none";
            return this;
        };
    }

    if (!HTMLElement.prototype.Show) {
        HTMLElement.prototype.Show = function () {

            if (J.isUndefined(this)) { return null; }
            this.style.display = "block";
            return this;
        };
    }

    if (!HTMLElement.prototype.Find) {
        HTMLElement.prototype.Find = function (name) {

            if (J.isUndefined(this)) { return null; }
            return this.querySelectorAll(name);
        };
    }

    if (!HTMLElement.prototype.Html) {
        HTMLElement.prototype.Html = function (str) {

            if (J.isUndefined(this)) { return null; }
            this.innerHTML = str || "";
            return this.innerHTML;
        };
    }

    if (!HTMLElement.prototype.HtmlAppend) {
        HTMLElement.prototype.HtmlAppend = function (str) {

            if (J.isUndefined(this)) { return null; }
            this.innerHTML += str || "";
            return this.innerHTML;
        };
    }

    if (!HTMLElement.prototype.Text) {
        HTMLElement.prototype.Text = function () {

            if (J.isUndefined(this)) { return null; }
            return this.textContent;
        };
    }

    if (!HTMLElement.prototype.Before) {
        HTMLElement.prototype.Before = function (str) {

            if (J.isUndefined(this)) { return null; }
            this.insertAdjacentHTML("beforebegin", str);
            return this;
        };
    }

    if (!HTMLElement.prototype.After) {
        HTMLElement.prototype.After = function (str) {

            if (J.isUndefined(this)) { return null; }
            this.insertAdjacentHTML("afterend", str);
            return this;
        };
    }

    if (!String.prototype.ReplaceAll) {
        String.prototype.ReplaceAll = function (ptrn, str) {

            if (J.isUndefined(this)) { return null; }
            return this.replace(new RegExp(ptrn, "g"), str);
        };
    }

    if (!HTMLElement.prototype.Template) {
        HTMLElement.prototype.Template = function (obj) {

            if (J.isUndefined(this)) { return null; }
            var tmplateHtml = this.innerHTML;

            function __obj_iterate(data, tmpl, bkey) {
                bkey    = bkey || "";

                for (var key in data) {
                    if(data.hasOwnProperty(key)) {

                        if (typeof data[key] === "object") {
                            tmpl = __obj_iterate(data[key], tmpl, bkey + '.' + key);
                        } else {
                            tmpl = tmpl.ReplaceAll('{{' + bkey + '.' + key + '}}', data[key]);
                        }
                    }
                }
                return tmpl;
            }

            return __obj_iterate(obj, tmplateHtml);
        };
    }

    if (!HTMLElement.prototype.FormToObject) {
        HTMLElement.prototype.FormToObject = function () {

            if(typeof(this) !== 'object' && this.nodeName !== "FORM")
            {
                return null;
            }
            var skipName = function(el) {
                return (!el.disabled && el.value && el.value != '' && el.name && el.name.length > 0);
            }
            var ele = this.elements;
            var obj = {};
            for(var i = 0; i < ele.length; i++) {

                if (
                    (!skipName(ele[i]))                                                    ||
                    (['file', 'reset', 'submit', 'button'].indexOf(ele[i].type) != -1)     ||
                    ((['checkbox', 'radio'].indexOf(ele[i].type) != -1) && (!ele[i].checked))
                   ) { continue; }

                if (['select-multiple'].indexOf(ele[i].type) != -1) {
                    for(var n = (ele[i].options.length - 1); n >= 0; n--) {
                        if (ele[i].options[n].selected) {
                            if (J.isUndefined(obj[ele[i].name])) {
                                obj[ele[i].name] = [];
                            }
                            if (obj[ele[i].name].indexOf(ele[i].options[n].value) == -1) {
                                obj[ele[i].name].push(ele[i].options[n].value);
                            }
                        }
                    }
                } else {
                    obj[ele[i].name] = ele[i].value;
                }
            }
            return obj;
        };
    }


    if (!HTMLElement.prototype.ObjectToForm) {
        HTMLElement.prototype.ObjectToForm = function (options, styles) {

            if (typeof(this) !== 'object') { return; }
            this.FormBuilder = { form: null, onsubmit: null, cnt: 0, options: options, styles: styles };
            var owner = this;

            var __check_title = function(obj) {
                return (((J.isUndefined(obj.title)) || (!obj.title)) ? false : true);
            }
            var __check_properties = function(obj) {
                return (((J.isUndefined(obj.properties)) ||
                         (J.isUndefined(obj.properties.title)) ||
                         (!obj.properties.title)) ? false : true);
            }
            var __check_propid = function(obj, eletype) {
                if (!__check_field(obj.properties, "name")) {
                    obj.properties.name = eletype + "-" + owner.FormBuilder.cnt;
                }
                if (!__check_field(obj.properties, "id")) {
                    obj.properties.id = obj.properties.name;
                }
            }
            var __check_array = function(arr) {
                return (((J.isUndefined(arr)) ||
                         (!Array.isArray(arr))        ||
                         (!arr.length))  ? false : true);
            }
            var __check_field = function(obj, key) {
                return (((J.isUndefined(obj[key])) ||
                         (!obj[key])) ? false : true);
            }
            var __add_class = function(ele, aclass) {

                var oclass = aclass.split(' ');
                for (var i = 0; i < oclass.length; i++)
                {
                    ele.classList.add(oclass[i]);
                }
                return ele;
            }
            var  __add_properties = function(ele, properties, dstyle) {

                for (var key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        if (!properties[key]) { continue; }
                        if (key === "style")  {
                            ele.style.cssText = properties[key];
                        } else if (key === "class")  {
                            __add_class(ele, properties[key]);
                        } else  {
                            ele.setAttribute(key, properties[key]);
                        }
                    }
                }
                if (
                    (dstyle) &&
                    (!__check_field(properties, "class"))
                   ) { __add_class(ele, dstyle); }

                return ele;
            }
            var __add_label = function(ele, obj) {
                if(!__check_title(obj)) { return ele; }

                var div1 = document.createElement("div"),
                    div2 = document.createElement("div");

                if (__check_field(owner.FormBuilder.styles, "group")) {
                    __add_class(div1, owner.FormBuilder.styles.group);
                }
                if (__check_field(owner.FormBuilder.styles, "label")) {
                    __add_class(div2, owner.FormBuilder.styles.label);
                }
                if (!J.isUndefined(obj.required)) {
                    __add_class(div2, owner.FormBuilder.styles.rlabel);
                }
                div2.appendChild(
                    document.createTextNode(obj.title)
                );
                div1.appendChild(div2);
                div1.appendChild(ele);
                return div1;
            }
            var __create_ele = function(name, properties, dstyle) {
                var ele = document.createElement(name);
                __add_properties(ele, properties, dstyle);
                return ele;
            }
            var __create_xele = function(ele, obj, dstyle) {
                var lb = document.createElement("label");

                if (__check_field(obj.properties, "title")) {
                    lb.appendChild(
                        document.createTextNode(obj.properties.title)
                    );
                    delete obj.properties.title;
                }
                if (!__check_field(obj.properties, "id")) {
                    if (__check_field(obj.properties, "name")) {
                        obj.properties.id = obj.properties.name + "-id"
                    } else {
                        obj.properties.id = obj.properties.type + "-id"
                    }
                }
                lb.setAttribute("for", obj.properties.id);
                var el = __create_ele("input", obj.properties, dstyle);
                ele.appendChild(el);
                ele.appendChild(lb);
                return ele;
            }
            var __create_sring = function(obj) {
                var type = ((__check_field(obj.properties, "type")) ? obj.properties.type : "text");
                obj.properties.type = type;
                __check_propid(obj, type);

                return __add_label(
                    __create_ele("input", obj.properties, owner.FormBuilder.styles.string),
                    obj
                );
            }
            var __create_text = function(obj) {
                if (__check_field(obj.properties, "type")) {
                    delete obj.properties.type;
                }
                __check_propid(obj, "tarea");

                return __add_label(
                    __create_ele("textarea", obj.properties, owner.FormBuilder.styles.text),
                    obj
                );
            }
            var __create_bool = function(obj) {
                obj.properties.type = "checkbox";
                __check_propid(obj, obj.properties.type);
                return __add_label(
                    __create_xele(
                        __add_class(
                            document.createElement("div"),
                            owner.FormBuilder.styles.xbox
                        ),
                        obj,
                        owner.FormBuilder.styles.boolean
                    ),
                    obj
                );
            }
            var __create_enum = function(obj) {
                if (!__check_array(obj.enum)) {
                    return null;
                }

                var div1 = document.createElement("div");
                __add_class(div1, owner.FormBuilder.styles.xbox);

                for(var i = 0; i < obj.enum.length; i++) {
                    if (!__check_properties(obj.enum[i])) {
                        continue;
                    }
                    if (!__check_field(obj.enum[i].properties, "name")) {
                        obj.enum[i].properties.name = "radio-" + owner.FormBuilder.cnt;
                    }

                    var mobj             = obj.enum[i];
                    mobj.properties.id   = obj.enum[i].properties.name + "-" + i;
                    mobj.properties.type = "radio";
                    mobj.title           = mobj.properties.title;

                    div1 = __create_xele(div1, mobj, owner.FormBuilder.styles.enum);
                }
                return __add_label(div1, obj);
            }
            var __create_select = function(obj) {
                if (!__check_array(obj.list)) {
                    return null;
                }
                if (__check_field(obj.properties, "type")) {
                    delete obj.properties.type;
                }

                __check_propid(obj, "sel");
                var ele  = __create_ele("select", obj.properties, owner.FormBuilder.styles.select);

                for(var i = 0; i < obj.list.length; i++) {
                    if (!__check_properties(obj.list[i])) { continue; }

                    var mobj  = {},
                        title = (
                            ((J.isUndefined(obj.list[i].properties.title)) || (!obj.list[i].properties.title)) ?
                                ("_" + i) : obj.list[i].properties.title
                    );
                    mobj.value = (
                        ((J.isUndefined(obj.list[i].properties.value)) || (!obj.list[i].properties.value)) ?
                            title : obj.list[i].properties.value
                    );
                    if (!J.isUndefined(obj.list[i].properties.selected)) {
                        mobj.selected = true;
                    }
                    if (!J.isUndefined(obj.list[i].properties.disabled)) {
                        mobj.disabled = true;
                    }

                    var opt = __create_ele("option", mobj, null);
                    opt.appendChild(document.createTextNode(title));
                    ele.appendChild(opt);
                }
                return __add_label(ele, obj);
            }
            var __create_hidden = function(obj) {
                if (!__check_field(obj.properties, "value")) {
                    return null;
                }
                if (__check_field(obj.properties, "class")) {
                    delete obj.properties.class;
                }

                obj.properties.type = "hidden";
                __check_propid(obj, obj.properties.type);
                return __create_ele("input", obj.properties, null);
            }
            var __parse_source = function(obj) {
                if (
                    (typeof obj      !== "object") ||
                    (typeof obj.type !== "string") ||
                    (!obj.type)
                   ) { return; }

                var field;
                switch(obj.type)
                {
                    case "sring":   { field = __create_sring(obj);  break; }
                    case "text":    { field = __create_text(obj);   break; }
                    case "boolean": { field = __create_bool(obj);   break; }
                    case "enum":    { field = __create_enum(obj);   break; }
                    case "select":  { field = __create_select(obj); break; }
                    case "hidden":  { field = __create_hidden(obj); break; }
                    case "button":  {
                        __check_propid(obj, "btn");
                        obj.properties.type = "button";
                        field = __create_ele("input", obj.properties, owner.FormBuilder.styles.button);
                        break;
                    }
                    case "submit":  {
                        obj.properties.type = "submit";
                        field = __create_ele("input", obj.properties, owner.FormBuilder.styles.submit);
                        break;
                    }
                    case "reset":   {
                        obj.properties.type = "reset";
                        field = __create_ele("input", obj.properties, owner.FormBuilder.styles.reset);
                        break;
                    }
                    default:        { return; }
                }
                if (!field) { return; }
                owner.FormBuilder.form.appendChild(field);
            }

            if (!__check_array(this.FormBuilder.options.form)) { return; }

            this.FormBuilder.form = document.createElement("form");
            if (J.isUndefined(this.FormBuilder.options.properties)) {
                __add_class(
                    this.FormBuilder.form,
                    this.FormBuilder.styles.form
                );
            } else {
                __add_properties(
                    this.FormBuilder.form,
                    this.FormBuilder.options.properties,
                    this.FormBuilder.styles.form
                );
            }
            if (__check_field(this.FormBuilder.options, "title")) {
                var h3 = document.createElement("h3");
                h3.appendChild(
                    document.createTextNode(this.FormBuilder.options.title)
                );
                this.FormBuilder.form.appendChild(h3);
            }
            for (; this.FormBuilder.cnt < this.FormBuilder.options.form.length; this.FormBuilder.cnt++) {
                __parse_source(this.FormBuilder.options.form[this.FormBuilder.cnt]);
            }
            this.appendChild(this.FormBuilder.form);
            delete this.FormBuilder.styles;

            if (typeof this.FormBuilder.options.onsubmit !== "function") {
                delete this.FormBuilder.options;
                return;
            }
            this.FormBuilder.onsubmit = this.FormBuilder.options.onsubmit;
            delete this.FormBuilder.options;

            this.FormBuilder.form.onsubmit = function(e) {
                e = e || window.event;

                if (!owner.FormBuilder.onsubmit) { return false; }
                var result = owner.FormBuilder.onsubmit(
                        e,
                        owner.FormBuilder.form,
                        owner.FormBuilder.form.FormToObject()
                );
                return ((J.isUndefined(result)) ? false : result);
            };
        };
    }

}());
