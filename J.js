
    /* J: NOJQUERY mini wrapper for syntax command
        https://github.com/PetersSharp/
     */

    if (typeof window.J !== "undefined") {
        throw ("J global variable already exists");
    }

window.J = (function (undefined) {

    var VERSION = "0.0.6",
    TYPE = {
        FUNCTION: "function",
        STRING:   "string",
        OBJ:      "object",
        BOOL:     "boolean",
        TEXT:     "text",
        ENUM:     "enum",
        FORM:     "FORM",
        LINE:     "line",
        GROUP:    "group",
        MENU:     "menu"
    },
    STYLE = {
        SHOW: "block",
        HIDE: "none"
    },
    ELEMENT = {
        FORM:     "form",
        DIV:      "div",
        H1:       "h1",
        H3:       "h3",
        A:        "a",
        LINE:     "hr",
        GROUP:    "blockquote",
        INPUT:    "input",
        CHECKBOX: "checkbox",
        RADIO:    "radio",
        TEXTAREA: "textarea",
        SELECT:   "select",
        SELECTM:  "select-multiple",
        BUTTON:   "button",
        FILE:     "file",
        RESET:    "reset",
        SUBMIT:   "submit"
    },
    PROPERTY = {
        DISPLAY:  "display",
        ONEVENT:  "on",
        INNER:    "innerHTML",
        TEXTCTX:  "textContent",
        HREF:     "href",
        NAME:     "name",
        ID:       "id",
        TYPE:     "type",
        FOR:      "for",
        TEXT:     "text",
        STYLE:    "style",
        CLASS:    "class",
        GROUP:    "group",
        LABEL:    "label",
        TITLE:    "title",
        OPTION:   "option",
        VALUE:    "value",
        HIDDEN:   "hidden",
        QUOTE:    "quote"
    },
    EVENT = {
        CLICK: "click"
    },
    FORMSTYLEDEFAULT = {
        form:    "form",
        group:   "form__group",
        label:   "form__label",
        rlabel:  "form__label-required",
        xbox:    "form__wrapper-box",
        quote:   "bqtitle",
        string:  "textfield textfield-shadow textfield-radius",
        text:    "textfield textfield-shadow textfield-radius",
        boolean: "checkbox checkbox-blue",
        enum:    "radio radio-blue",
        select:  "select select-radius",
        button:  "button button-radius button-outline-blue",
        submit:  "button button-radius button-outline-blue",
        reset:   "button button-radius button-outline-red"
    },
    __isUndefined = function __isUndefined (obj) {
        return ((typeof obj === typeof void 0) ? true : ((obj === null) ? true : false));
    },
    __setProp = function __setProp (arr, prop, value, isAppend) {
      arr.forEach(ele => {
        if (isAppend) { ele[prop] += value; }
        else          { ele[prop]  = value; }
      });
    },
    __replaceAll = function __replaceAll (src, ptrn, str) {
        return src.replace(new RegExp(ptrn, "g"), str);
    },
    __getTemplate = function __getTemplate (tmpl, obj) {
        function __obj_iterate(data, tmpl, bkey) {
            bkey    = bkey || "";

            for (var key in data) {
                if(data.hasOwnProperty(key)) {

                    if (typeof data[key] === TYPE.OBJ) {
                        tmpl = __obj_iterate(data[key], tmpl, bkey + '.' + key);
                    } else {
                        tmpl = __replaceAll(tmpl, '{{' + bkey + '.' + key + '}}', data[key]);
                    }
                }
            }
            return tmpl;
        }
        return __obj_iterate(obj, tmpl);
    },

  prototype = {

    Has (ele) {
      return Array.from(this).includes(ele);
    },
    Add (ele) {
      var eles = ((!__isUndefined(ele.length)) ? ele : [ele]);

      Array.from(eles).forEach(ele => {
        if (ele && !this.Has(ele)) {
          Array.prototype.push.call(this, ele);
        }
      });
      return this;
    },
    Find (sel) {
      return Array.from(this).reduce(
        (cr, ele) => cr.Add(ele.querySelectorAll(sel)),
        Object.create(prototype)
      );
    },
    Filter (sel) {
      return Object.create(prototype).Add(
        Array.from(this).Filter(
            ((typeof sel === TYPE.FUNCTION) ?
                sel : ele => ele.matches(sel))
        )
      );
    },
    Next (sel) {
      return Object.create(prototype).Add(
        Array.from(this)
          .map(ele => ele.nextElementSibling)
          .filter(ele => ele && (!sel || ele.matches(sel)))
      );
    },
    Prev (sel) {
      return Object.create(prototype).Add(
        Array.from(this)
          .map(ele => ele.previousElementSibling)
          .filter(ele => ele && (!sel || ele.matches(sel)))
      );
    },
    Parent (sel) {
      return Object.create(prototype).Add(
        Array
          .from(this)
          .map(ele => ele.parentNode)
          .filter(ele => !sel || ele.matches(sel))
      );
    },
    Children (sel) {
      return Object.create(prototype).Add(
        Array
          .from(this)
          .reduce((cr, ele) => cr.concat(ele.children), [])
          .filter(ele => !sel || ele.matches(sel))
      );
    },
    Before (src) {
      Array.from(this).forEach(ele => {
        ele.insertAdjacentHTML("beforebegin", src)
      });
      return this;
    },
    After(src) {
        Array.from(this).forEach(ele => {
            ele.insertAdjacentHTML("afterend", src)
        });
        return this;
    },
    Attr(key, prop) {
        Array.from(this).forEach(ele => {
            ele.setAttribute(key, prop)
        });
        return this;
    },
    AddClass (cn) {
        Array.from(this).forEach(ele => {
            ele.classList.add(cn)
        });
        return this;
    },
    RemoveClass (cn) {
        Array.from(this).forEach(ele => {
            ele.classList.remove(cn)
        });
        return this;
    },
    ToggleClass (cn1 = null, cn2 = null) {
        Array.from(this).forEach(ele => {
            if (ele.classList) {
                if (cn1) { ele.classList.toggle(cn1); }
                if (cn2) { ele.classList.toggle(cn2); }
            }
        });
        return this;
    },
    HasClass (cn) {
        return ((!__isUndefined(this[0])) ?
                ((!__isUndefined(this[0].classList)) ?
                  this[0].classList.contains(cn) : false) : false
        );
    },
    Html (src, isAppend = false) {
        if (!src) {
            return this[0][PROPERTY.INNER];
        }
        __setProp(Array.from(this), PROPERTY.INNER, src, isAppend);
        return this;
    },
    HtmlAppend (src) {
        return this.Html(src, true);
    },
    HtmlReplace (ptrn, str) {
        return this.Html(__replaceAll(this[0][PROPERTY.INNER], ptrn, str), false);
    },
    HtmlEmpty () {
        return this.Html(" ", false);
    },
    Text (src, isAppend = false) {
        if (!src) {
            return this[0].textContent;
        }
        __setProp(Array.from(this), PROPERTY.TEXTCTX, src, isAppend);
        return this;
    },
    TextAppend (src) {
        return this.Text(src, true);
    },
    Val (src, isAppend = false) {
        if (!src) {
            return this[0].value;
        }
        __setProp(Array.from(this), PROPERTY.VALUE, src, isAppend);
        return this;
    },
    ValAppend (src) {
        return this.Val(src, true);
    },
    Css (style, value) {
        var cs = {};
        if (typeof style === TYPE.STRING) {
            if (!value) {
              return this[0] && window.getComputedStyle(this[0]).getPropertyValue(style);
            }
            cs[style] = value;
        } else {
            Object.assign(cs, style);
        }
        Array.from(this).forEach(ele => {
            Object.assign(ele.style, cs)
        });
        return this;
    },
    Hide() {
        Array.from(this).forEach(ele => {
            ele.style.display = null;
            if (window.getComputedStyle(ele).getPropertyValue(PROPERTY.DISPLAY) !== STYLE.HIDE) {
                ele.style.display = STYLE.HIDE;
            }
        });
        return this;
    },
    Show() {
        Array.from(this).forEach(ele => {
            ele.style.opacity = 1;
            ele.style.display = null;
            if (window.getComputedStyle(ele).getPropertyValue(PROPERTY.DISPLAY) === STYLE.HIDE) {
                ele.style.display = STYLE.SHOW;
            }
        });
        return this;
    },
    Each (fn) {
        Array.from(this).forEach(ele => {
            fn.call(ele)
        });
        return this;
    },
    Click () {
        Array.from(this).forEach(ele => {
            ele.click()
        });
        return this;
    },
    On (ev, fun, opt = false) {
        Array.from(this).forEach(ele => {
            if (!__isUndefined(ele.addEventListener)) {
                ele.addEventListener(ev, fun, opt);
            } else if (!__isUndefined(ele.attachEvent)) {
                ele.attachEvent(PROPERTY.ONEVENT + ev, fun);
            } else {
                ele[PROPERTY.ONEVENT + ev] = fun();
            }
        });
        return this;
    },
    Off (ev, fun, opt = false) {
        Array.from(this).forEach(ele => {
            if (!__isUndefined(ele.removeEventListener)) {
                ele.removeEventListener(ev, fun, opt);
            } else if (!__isUndefined(ele.detachEvent)) {
                ele.detachEvent(PROPERTY.ONEVENT + ev, fun);
            } else {
                ele[PROPERTY.ONEVENT + ev] = null;
            }
        });
        return this;
    },
    OnClick (fun, opt = false) {
        return this.On(EVENT.CLICK, fun, opt);
    },
    FadeIn(display) {
        Array.from(this).forEach(ele => {
            if (ele.style.display !== STYLE.SHOW) {

                ele.style.opacity = 0;
                ele.style.display = display || STYLE.SHOW;

                (function fade() {
                    var val = parseFloat(ele.style.opacity);
                    if (!((val += .02) > 1)) {
                      ele.style.opacity = val;
                      requestAnimationFrame(fade);
                    }
                })();
            }
        });
        return this;
    },
    FadeOut() {
        Array.from(this).forEach(ele => {
            if (ele.style.display !== STYLE.HIDE) {
                ele.style.opacity = 1;

                (function fade() {
                    if ((ele.style.opacity -= .05) < 0) {
                        ele.style.display = STYLE.HIDE;
                    } else {
                        requestAnimationFrame(fade);
                    }
                })();
            }
        });
        return this;
    },
    Template (obj) {
        if ((__isUndefined(this[0])) ||
            (__isUndefined(this[0][PROPERTY.INNER]))) { return null; }

        var tmpl = this[0][PROPERTY.INNER];

        if (__isUndefined(obj.length)) {
            return __getTemplate(tmpl, obj);
        }
        if (!obj.length) { return null; }
        var i, otmpl = '';
        for (i = 0; i < obj.length; i++) {
            otmpl += __getTemplate(tmpl, obj[i]);
        }
        return otmpl;
    },
    Breadcrumbs (tmpltag, options = null, isquery = false) {
        var parts  = decodeURI(window.location.pathname).split('/'),
            tmpl   = J(tmpltag),
            curent,
            obj,
            re     = /[-.,&=?@!#$%^*()'"]/g;
            //re     = /[-.]/g;

        if (__isUndefined(tmpl[0])) { return this; }

        Array.from(this).forEach(ele => {
            for (var i = 0; i < parts.length; i++) {
                if ((!i) && (!parts[i])) {
                    curent = "";
                } else if (parts[i]) {
                    curent += "/" + parts[i];
                }
                obj = {
                    url: window.location.protocol + "//" + window.location.host + curent,
                    path: (((!__isUndefined(options)) && (!__isUndefined(options[parts[i]]))) ?
                            options[parts[i].replace(re,"_")] : parts[i]),
                    sep: ((i == (parts.length - 1)) ? (((isquery) && (window.location.search)) ? "/" : "") : "/")
                };
                this.Html(
                    tmpl.Template(obj), true
                );
            }
            if ((isquery) && (window.location.search)) {
                var part = window.location.search.split("?")[1];
                if (__isUndefined(part)) { return this; }
                obj = {
                    url: window.location.protocol + "//" + window.location.host + curent + window.location.search,
                    path: "(" +
                            (((!__isUndefined(options)) && (!__isUndefined(options[part]))) ?
                                 options[part.replace(re,"_")] : part) + ")",
                    sep: ""
                };
                this.Html(
                    tmpl.Template(obj), true
                );
            }
        });
        return this;
    },
    FormToObject () {
        if ((__isUndefined(this[0]))          ||
            (__isUndefined(this[0].nodeName)) ||
            (this[0].nodeName !== TYPE.FORM)  ||
            (!this[0].elements.length)) { return null; }

        var skipName = function(ele) {
            return (!ele.disabled && ele.value && ele.value != '' && ele.name && ele.name.length > 0);
        }
        var eles = this[0].elements;
        var obj = {};
        for(var i = 0; i < eles.length; i++) {

            if (
                (!skipName(eles[i]))                                                                        ||
                ([ELEMENT.FILE, ELEMENT.RESET, ELEMENT.SUBMIT, ELEMENT.BUTTON].indexOf(eles[i].type) != -1) ||
                (([ELEMENT.CHECKBOX, ELEMENT.RADIO].indexOf(eles[i].type) != -1) && (!eles[i].checked))
               ) { continue; }

            if ([ELEMENT.SELECTM].indexOf(eles[i].type) != -1) {
                for(var n = (eles[i].options.length - 1); n >= 0; n--) {
                    if (eles[i].options[n].selected) {
                        if (__isUndefined(obj[eles[i].name])) {
                            obj[eles[i].name] = [];
                        }
                        if (obj[eles[i].name].indexOf(eles[i].options[n].value) == -1) {
                            obj[eles[i].name].push(eles[i].options[n].value);
                        }
                    }
                }
            } else {
                if (__isUndefined(obj[eles[i].name])) {
                    obj[eles[i].name] = eles[i].value;
                } else if (Array.isArray(obj[eles[i].name])) {
                    obj[eles[i].name].push(eles[i].value);
                } else {
                    var tval = obj[eles[i].name];
                    obj[eles[i].name] = [];
                    obj[eles[i].name].push(tval);
                    obj[eles[i].name].push(eles[i].value);
                }
            }
        }
        return obj;
    },
    ObjectToForm (obj, styles = FORMSTYLEDEFAULT) {
        if ((__isUndefined(this[0])) ||
            (typeof(obj) !== TYPE.OBJ)  ||
            (typeof(styles) !== TYPE.OBJ)) { return this; }

        var owner = this[0];
        owner.FormBuilder = { form: null, onsubmit: null, cnt: 0, obj: obj, styles: styles };

            var __check_title = function(obj) {
                return (((__isUndefined(obj.title)) || (!obj.title)) ? false : true);
            }
            var __check_properties = function(obj) {
                return (((__isUndefined(obj.properties)) ||
                         (__isUndefined(obj.properties.title)) ||
                         (!obj.properties.title)) ? false : true);
            }
            var __check_propid = function(obj, eletype) {
                if (!__check_field(obj.properties, PROPERTY.NAME)) {
                    obj.properties.name = eletype + "-" + owner.FormBuilder.cnt;
                }
                if (!__check_field(obj.properties, PROPERTY.ID)) {
                    obj.properties.id = obj.properties.name;
                }
            }
            var __check_array = function(arr) {
                return (((__isUndefined(arr)) ||
                         (!Array.isArray(arr))        ||
                         (!arr.length))  ? false : true);
            }
            var __check_field = function(obj, key) {
                return (((__isUndefined(obj[key])) ||
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
                        if (key === PROPERTY.STYLE)  {
                            ele.style.cssText = properties[key];
                        } else if (key === PROPERTY.CLASS)  {
                            __add_class(ele, properties[key]);
                        } else  {
                            ele.setAttribute(key, properties[key]);
                        }
                    }
                }
                if (
                    (dstyle) &&
                    (!__check_field(properties, PROPERTY.CLASS))
                   ) { __add_class(ele, dstyle); }

                return ele;
            }
            var __add_label = function(ele, obj) {
                if(!__check_title(obj)) { return ele; }

                var div1 = document.createElement(ELEMENT.DIV),
                    div2 = document.createElement(ELEMENT.DIV);

                if (__check_field(owner.FormBuilder.styles, PROPERTY.GROUP)) {
                    __add_class(div1, owner.FormBuilder.styles.group);
                }
                if (__check_field(owner.FormBuilder.styles, PROPERTY.LABEL)) {
                    __add_class(div2, owner.FormBuilder.styles.label);
                }
                if (!__isUndefined(obj.required)) {
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
                var lb = document.createElement(PROPERTY.LABEL);

                if (__check_field(obj.properties, PROPERTY.TITLE)) {
                    lb.appendChild(
                        document.createTextNode(obj.properties.title)
                    );
                    delete obj.properties.title;
                }
                if (!__check_field(obj.properties, PROPERTY.ID)) {
                    if (__check_field(obj.properties, PROPERTY.NAME)) {
                        obj.properties.id = obj.properties.name + "-" + PROPERTY.ID;
                    } else {
                        obj.properties.id = obj.properties.type + "-" + PROPERTY.ID;
                    }
                }
                lb.setAttribute(PROPERTY.FOR, obj.properties.id);
                var el = __create_ele(ELEMENT.INPUT, obj.properties, dstyle);
                ele.appendChild(el);
                ele.appendChild(lb);
                return ele;
            }
            var __create_string = function(obj) {
                var type = ((__check_field(obj.properties, PROPERTY.TYPE)) ? obj.properties.type : PROPERTY.TEXT);
                obj.properties.type = type;
                __check_propid(obj, type);

                return __add_label(
                    __create_ele(ELEMENT.INPUT, obj.properties, owner.FormBuilder.styles.string),
                    obj
                );
            }
            var __create_text = function(obj) {
                if (__check_field(obj.properties, PROPERTY.TYPE)) {
                    delete obj.properties.type;
                }
                __check_propid(obj, ELEMENT.TEXTAREA);

                return __add_label(
                    __create_ele(ELEMENT.TEXTAREA, obj.properties, owner.FormBuilder.styles.text),
                    obj
                );
            }
            var __create_bool = function(obj) {
                obj.properties.type = ELEMENT.CHECKBOX;
                __check_propid(obj, obj.properties.type);
                return __add_label(
                    __create_xele(
                        __add_class(
                            document.createElement(ELEMENT.DIV),
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

                var div1 = document.createElement(ELEMENT.DIV);
                __add_class(div1, owner.FormBuilder.styles.xbox);

                for(var i = 0; i < obj.enum.length; i++) {
                    if (!__check_properties(obj.enum[i])) {
                        continue;
                    }
                    if (!__check_field(obj.enum[i].properties, PROPERTY.NAME)) {
                        obj.enum[i].properties.name = ELEMENT.RADIO + "-" + owner.FormBuilder.cnt;
                    }

                    var mobj             = obj.enum[i];
                    mobj.properties.id   = obj.enum[i].properties.name + "-" + i;
                    mobj.properties.type = ELEMENT.RADIO;
                    mobj.title           = mobj.properties.title;

                    div1 = __create_xele(div1, mobj, owner.FormBuilder.styles.enum);
                }
                return __add_label(div1, obj);
            }
            var __create_select = function(obj) {
                if (!__check_array(obj.list)) {
                    return null;
                }
                if (__check_field(obj.properties, PROPERTY.TYPE)) {
                    delete obj.properties.type;
                }

                __check_propid(obj, ELEMENT.SELECT);
                var ele  = __create_ele(ELEMENT.SELECT, obj.properties, owner.FormBuilder.styles.select);

                for(var i = 0; i < obj.list.length; i++) {
                    if (!__check_properties(obj.list[i])) { continue; }

                    var mobj  = {},
                        title = (
                            ((__isUndefined(obj.list[i].properties.title)) || (!obj.list[i].properties.title)) ?
                                ("_" + i) : obj.list[i].properties.title
                    );
                    mobj.value = (
                        ((__isUndefined(obj.list[i].properties.value)) || (!obj.list[i].properties.value)) ?
                            title : obj.list[i].properties.value
                    );
                    if (!__isUndefined(obj.list[i].properties.selected)) {
                        mobj.selected = true;
                    }
                    if (!__isUndefined(obj.list[i].properties.disabled)) {
                        mobj.disabled = true;
                    }

                    var opt = __create_ele(PROPERTY.OPTION, mobj, null);
                    opt.appendChild(document.createTextNode(title));
                    ele.appendChild(opt);
                }
                return __add_label(ele, obj);
            }
            var __create_hidden = function(obj) {
                if (!__check_field(obj.properties, PROPERTY.VALUE)) {
                    return null;
                }
                if (__check_field(obj.properties, PROPERTY.CLASS)) {
                    delete obj.properties.class;
                }

                obj.properties.type = PROPERTY.HIDDEN;
                __check_propid(obj, obj.properties.type);
                return __create_ele(ELEMENT.INPUT, obj.properties, null);
            }
            var __create_group = function(obj) {
                if (__isUndefined(obj.title)) {
                    return null;
                }
                var ele = document.createElement(ELEMENT.GROUP);
                if (__check_field(owner.FormBuilder.styles, PROPERTY.QUOTE)) {
                    __add_class(ele, owner.FormBuilder.styles.quote);
                }
                if (!__isUndefined(obj.tag)) {
                    var tag = document.createElement(ELEMENT.A);
                    tag.setAttribute(PROPERTY.NAME, obj.tag);
                    ele.appendChild(tag);
                }
                ele.appendChild(
                    document.createTextNode(obj.title)
                );
                return ele;
            }
            var __create_menu = function(obj) {
                if ((__isUndefined(obj.tags)) || (!obj.tags.length)) {
                    return null;
                }
                var div = document.createElement(ELEMENT.DIV);
                if (__check_field(owner.FormBuilder.styles, PROPERTY.GROUP)) {
                    __add_class(div, owner.FormBuilder.styles.group);
                }
                for (var i = 0; i < obj.tags.length; i++) {
                    var tag = document.createElement(ELEMENT.A);
                    tag.setAttribute(PROPERTY.HREF, "#" + obj.tags[i].tag);
                    tag.appendChild(
                        document.createTextNode(obj.tags[i].title)
                    );
                    div.appendChild(tag);
                }
                return div;
            }
            var __parse_source = function(obj) {
                if (
                    (typeof obj      !== TYPE.OBJ) ||
                    (typeof obj.type !== TYPE.STRING) ||
                    (!obj.type)
                   ) { return; }

                var field;
                switch(obj.type)
                {
                    case TYPE.STRING:     { field = __create_string(obj); break; }
                    case PROPERTY.TEXT:   { field = __create_text(obj);   break; }
                    case TYPE.BOOL:       { field = __create_bool(obj);   break; }
                    case TYPE.ENUM:       { field = __create_enum(obj);   break; }
                    case ELEMENT.SELECT:  { field = __create_select(obj); break; }
                    case PROPERTY.HIDDEN: { field = __create_hidden(obj); break; }
                    case TYPE.MENU:       { field = __create_menu(obj);   break; }
                    case TYPE.GROUP:      { field = __create_group(obj);  break; }
                    case TYPE.LINE:       {
                        field = document.createElement(ELEMENT.LINE);
                        break;
                    }
                    case ELEMENT.BUTTON:  {
                        __check_propid(obj, ELEMENT.BUTTON);
                        obj.properties.type = ELEMENT.BUTTON;
                        field = __create_ele(ELEMENT.INPUT, obj.properties, owner.FormBuilder.styles.button);
                        break;
                    }
                    case ELEMENT.SUBMIT:  {
                        obj.properties.type = ELEMENT.SUBMIT;
                        field = __create_ele(ELEMENT.INPUT, obj.properties, owner.FormBuilder.styles.submit);
                        break;
                    }
                    case ELEMENT.RESET:   {
                        obj.properties.type = ELEMENT.RESET;
                        field = __create_ele(ELEMENT.INPUT, obj.properties, owner.FormBuilder.styles.reset);
                        break;
                    }
                    default:        { return; }
                }
                if (!field) { return; }
                owner.FormBuilder.form.appendChild(field);
            }

        if (!__check_array(owner.FormBuilder.obj.form)) { return owner; }

        owner.FormBuilder.form = document.createElement(ELEMENT.FORM);
        if (__isUndefined(owner.FormBuilder.obj.properties)) {
            __add_class(
                owner.FormBuilder.form,
                owner.FormBuilder.styles.form
            );
        } else {
            __add_properties(
                owner.FormBuilder.form,
                owner.FormBuilder.obj.properties,
                owner.FormBuilder.styles.form
            );
        }
        if (__check_field(owner.FormBuilder.obj, PROPERTY.TITLE)) {
            var h1 = document.createElement(ELEMENT.H1);
            h1.appendChild(
                document.createTextNode(owner.FormBuilder.obj.title)
            );
            owner.FormBuilder.form.appendChild(h1);
        }
        for (; owner.FormBuilder.cnt < owner.FormBuilder.obj.form.length; owner.FormBuilder.cnt++) {
            __parse_source(owner.FormBuilder.obj.form[owner.FormBuilder.cnt]);
        }
        owner.appendChild(owner.FormBuilder.form);
        delete owner.FormBuilder.styles;

        if (typeof owner.FormBuilder.obj.onsubmit !== TYPE.FUNCTION) {
            delete owner.FormBuilder.obj;
            return owner;
        }
        owner.FormBuilder.onsubmit = owner.FormBuilder.obj.onsubmit;
        delete owner.FormBuilder.obj;

        owner.FormBuilder.form.onsubmit = function(e) {
            e = e || window.event;
            if (!owner.FormBuilder.onsubmit) { return false; }
            var result = owner.FormBuilder.onsubmit(
                    e,
                    owner.FormBuilder.form,
                    J([owner.FormBuilder.form]).FormToObject()
            );
            return ((__isUndefined(result)) ? false : result);
        };
        return owner;
    }
  }

    return function createCollection (sel, context) {
        var initial = ((typeof sel === TYPE.STRING) ?
            (context || document).querySelectorAll(sel) : sel
        );
        var instance = Object.create(prototype);
        return ((initial) ? instance.Add(initial) : instance);
    }

})();

J.Ready = function Ready (evh) {
    if (document.readyState !== "loading") {
        evh.call();
    } else {
        J(document).On("DOMContentLoaded", evh, false);
    }
};

J.fn = {

    ERRORS: {
        NOTSUP:  "XMLHttpRequest not support",
        JSONERR: "JSON error",
        REQERR:  "Request error",
        SNDERR:  "Send error",
        STRCODE: ", code: "
    },
    isUndefined: function isUndefined (obj) {
        return ((typeof obj === typeof void 0) ? true : ((obj === null) ? true : false));
    },
    dataHttpRequestJsonParse: function dataHttpRequestJsonParse (req, cb, erstr) {
        var data;
        try {
            data = JSON.parse(req.responseText);
        } catch(e) {
            cb(erstr + " - " + J.fn.JSONERR + ": " + e, false)
        }
        ((data === null) ? cb(J.fn.ERRORS.JSONERR, false) : cb(data, true));
    },
    dataHttpRequestCondition: function dataHttpRequestCondition (req, cb, erstr) {
        if ((req.readyState == 4) && (req.status >= 200) && (req.status < 400)) {
            return true;
        } else {
            cb(erstr + J.fn.ERRORS.STRCODE + req.status + ":" + req.statusText, false);
            return false;
        }
    },
    HumanizeFileSize: function HumanizeFileSize (num) {
        if (num < 1024) {
            return num + " bytes";
        } else if ((num > 1024) && (num < 1048576)) {
            return (num/1024).toFixed(1) + " KB";
        } else if (num > 1048576) {
            return (num/1048576).toFixed(1) + " MB";
        }
    },
    GetJSON: function GetJSON (url, cb = function(){}, uname = null, upass = null) {
        if (!window.XMLHttpRequest) {
            cb(J.fn.ERRORS.NOTSUP, false);
            return;
        }
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.withCredentials = true;
        if ((uname) && (upass)) {
            request.setRequestHeader ("Authorization", "Basic " + btoa(uname + ":" + upass));
        }
        request.onload = function() {
            if (J.fn.dataHttpRequestCondition(request, cb, J.fn.ERRORS.REQERR)) {
                J.fn.dataHttpRequestJsonParse(request, cb, J.fn.ERRORS.REQERR);
            }
        };
        request.onerror = function() {
            cb(J.fn.ERRORS.REQERR + J.fn.ERRORS.STRCODE + request.status, false);
        };
        request.send();
    },
    SendJSON: function SendJSON (url, data, cb = function(){}, uname = null, upass = null) {
        if (!window.XMLHttpRequest) {
            cb(J.fn.ERRORS.NOTSUP, false);
            return;
        }
        var sdata;
        try {
            sdata = JSON.stringify(data);
        } catch(e) {
            cb(J.fn.ERRORS.SNDERR + " - " + J.fn.JSONERR + ": " + e, false);
        }
        var request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-Type", "application/json");
        if ((uname) && (upass)) {
            request.setRequestHeader ("Authorization", "Basic " + btoa(uname + ":" + upass));
        }
        request.onload = function() {
            if (J.fn.dataHttpRequestCondition(request, cb, J.fn.ERRORS.SNDERR)) {
                J.fn.dataHttpRequestJsonParse(request, cb, J.fn.ERRORS.SNDERR);
            }
        };
        request.onerror = function() {
            cb(J.fn.ERRORS.SNDERR + J.fn.ERRORS.STRCODE + request.status, false);
        };
        request.send(sdata);
    },
    SendBin: function UploadBin (url, data, cb = function(){}, progress_cb = function(){}, uname = null, upass = null) {
        if (!window.XMLHttpRequest) {
            cb(J.fn.ERRORS.NOTSUP, false);
            return;
        }
        if (!data) {
            return;
        }
        var request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.withCredentials = true;
        request.upload.onprogress = progress_cb;
        request.setRequestHeader("Content-Type", "application/octet-stream");
        if ((uname) && (upass)) {
            request.setRequestHeader ("Authorization", "Basic " + btoa(uname + ":" + upass));
        }
        request.upload.onprogress = function(e) {
            progress_cb(e.loaded, e.total);
        };
        request.onload = function() {
            if (J.fn.dataHttpRequestCondition(request, cb, J.fn.ERRORS.SNDERR)) {
                J.fn.dataHttpRequestJsonParse(request, cb, J.fn.ERRORS.SNDERR);
            }
        };
        request.onerror = function() {
            cb(J.fn.ERRORS.SNDERR + J.fn.ERRORS.STRCODE + request.status, false);
        };
        request.send(data);
    }
};

J.JsonRPC = function (endPoint = null, Func = function (){}, uname = null, upass = null) {
    this.jrpcver  = "2.0";
    this.id       = 0;
    this.req      = [];
    this.res      = [];
    this.err      = [];
    this.cb       = Func;
    this.endpoint = endPoint;
    this.authu    = uname;
    this.authp    = upass;

    var RPCERR = {
        JSONERR:    "not Json-RPC 2.0 ",
        JSONFOUND:  " found",
        JSONAEMPTY: "Json-RPC answer is empty array",
        TYPERR:     "return data type not support"
    };

    this.SetEndPoint = function (endpoint = null) {
        if (!J.fn.isUndefined(endpoint)) {
            this.endpoint = endpoint;
        }
    };
    this.SetCredentials = function (uname = null, upass = null) {
        this.authu = uname;
        this.authp = upass;
    };
    this.CallBack = function (Func = null) {
        if (!J.fn.isUndefined(Func)) {
            this.cb = Func;
        }
        return this.cb;
    };
    var __array_free = function (obj) {
        while (obj.length) {
            obj.pop();
        }
        obj.length = 0;
    };
    var __splice_err = function (h,b,f) {
        return "" + h + b + f;
    };
    var __normalize_param = function (val) {
        if (J.fn.isUndefined(val))         { return null; }
        if (typeof val === "string")       { encodeURIComponent(val); }
        return val;
    };
    this.Parse = function (data) {
        var str = null;
        if ((J.fn.isUndefined(data.jsonrpc))   ||
            (typeof data.jsonrpc !== "string") ||
            (data.jsonrpc !== this.jrpcver)) {
            str = __splice_err(RPCERR.JSONERR, "data", RPCERR.JSONFOUND);
        }
        if (J.fn.isUndefined(data.id)) {
            data.id = 0;
            str = __splice_err(RPCERR.JSONERR, "id", RPCERR.JSONFOUND);
        }
        else if (!J.fn.isUndefined(data.error)) {
            str = __splice_err(data.error.code, ": ", data.error.message);
        }
        else if (J.fn.isUndefined(data.result)) {
            str = __splice_err(RPCERR.JSONERR, "result", RPCERR.JSONFOUND);
        }
        if (str !== null)
        {
            this.cb(data.id, str, false);
            this.err.push(__splice_err(data.id, ": ", str));
            return;
        }
        this.cb(data.id, data.result, true);
        this.res.push(data);
    };
    this.Request = function (name, val = null, id = 0) {
        this.id  = ((!id) ? (this.id + 1) : id);
        this.req.push(
            {jsonrpc: this.jrpcver, method: name, params: __normalize_param(val), id: this.id}
        );
    };
    this.Send = function () {
        if ((!this.endpoint) || (!this.req.length)) { return; }
        var owner = this;
        __array_free(this.res);
        __array_free(this.err);
        J.fn.SendJSON(this.endpoint, this.req, function (data, status) {
            if (status) {
                if (Array.isArray(data)) {
                    if (!data.length) {
                        owner.cb(null, RPCERR.JSONAEMPTY, false);
                        return;
                    }
                    for (var i = 0; i < data.length; i++) {
                        owner.Parse(data[i]);
                    }
                } else if (typeof data === "object") {
                    owner.Parse(data);
                } else {
                    owner.cb(null, RPCERR.TYPERR, false);
                }
            } else if (typeof data === "object") {
                var str, sarr = [];
                for(var i in data) {
                    sarr.push(data[i]);
                }
                str = sarr.join(",");
                owner.cb(null, str, status);
                owner.err.push(str);
            } else if (typeof data === "string") {
                owner.cb(null, data, status);
                owner.err.push(data);
            } else {
                owner.cb(null, RPCERR.TYPERR, false);
                owner.err.push(RPCERR.TYPERR);
            }
        }, this.authu, this.authp);
        __array_free(this.req);
        this.id = 0;
    };
    return this;
};

    if (J.fn.isUndefined(J.JsonRPC.prototype.DataRequest)) {
        Object.defineProperty(J.JsonRPC.prototype, "DataRequest", {
            get: function ()  { return this.req;    },
            set: function (r) { this.req = r; }
        });
    }
    if (J.fn.isUndefined(J.JsonRPC.prototype.DataResult)) {
        Object.defineProperty(J.JsonRPC.prototype, "DataResult", {
            get: function ()  { return this.res;    }
        });
    }
    if (J.fn.isUndefined(J.JsonRPC.prototype.DataErrors)) {
        Object.defineProperty(J.JsonRPC.prototype, "DataErrors", {
            get: function ()  { return this.err;    }
        });
    }
    if (J.fn.isUndefined(J.JsonRPC.prototype.isErrors)) {
        Object.defineProperty(J.JsonRPC.prototype, "isErrors", {
            get: function ()  { return ((this.err.length) ? true : false); }
        });
    }

