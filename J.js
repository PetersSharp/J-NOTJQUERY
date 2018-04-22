
    if (typeof window.J !== "undefined") {
        throw ("J global variable already exists");
    }

window.J = (function (undefined) {

    var ERRORS = {
        NOTSUP:  "XMLHttpRequest not support",
        JSONERR: "JSON error",
        REQERR:  "Request error",
        SNDERR:  "Send error",
        STRCODE: ", code: "
    },
    TYPE = {
        FUNCTION: "function",
        STRING:   "string",
        OBJ:      "object",
        BOOL:     "boolean",
        TEXT:     "text",
        ENUM:     "enum",
        FORM:     "FORM",
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
        HIDDEN:   "hidden"
    },
    ELEMENT = {
        DIV:      "div",
        H3:       "h3",
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
    STYLE = {
        SHOW: "block",
        HIDE: "none"
    },
    PROPERTY = {
        DISPLAY: "display",
        ONEVENT: "on",
        INNER:   "innerHTML",
        VALUE:   "value",
        TEXTCTX: "textContent"
    },
    EVENT = {
        CLICK: "click"
    },
    __setProp = function __setProp (arr, prop, value, isAppend) {
      arr.forEach(el => {
        if (isAppend) { el[prop] += value; }
        else          { el[prop]  = value; }
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

    isUndefined (obj) {
        return ((typeof obj === typeof void 0) ? true : ((obj === null) ? true : false));
    },
    Has (ele) {
      return Array.from(this).includes(ele);
    },
    Add (ele) {
      var eles = ((!this.isUndefined(ele.length)) ? ele : [ele]);

      Array.from(eles).forEach(ele => {
        if (ele && !this.Has(ele)) {
          Array.prototype.push.call(this, ele);
        }
      })
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
    HasClass (cn) {
        return ((!this.isUndefined(this[0])) ?
                ((!this.isUndefined(this[0].classList)) ?
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
        return this.Html("", false);
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
    On (ev, fun, opt = false) {
        Array.from(this).forEach(ele => {
            if (!this.isUndefined(ele.addEventListener)) {
                ele.addEventListener(ev, fun, opt);
            } else if (!this.isUndefined(ele.attachEvent)) {
                ele.attachEvent(PROPERTY.ONEVENT + ev, fun);
            } else {
                ele[PROPERTY.ONEVENT + ev] = fun();
            }
        });
        return this;
    },
    Off (ev, fun, opt = false) {
        Array.from(this).forEach(ele => {
            if (!this.isUndefined(ele.removeEventListener)) {
                ele.removeEventListener(ev, fun, opt);
            } else if (!this.isUndefined(ele.detachEvent)) {
                ele.detachEvent(PROPERTY.ONEVENT + ev, fun);
            } else {
                ele[PROPERTY.ONEVENT + ev] = null;
            }
        });
        return this;
    },
    Click (fun, opt = false) {
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
        if ((this.isUndefined(this[0])) ||
            (this.isUndefined(this[0][PROPERTY.INNER]))) { return null; }

        var tmpl = this[0][PROPERTY.INNER];

        if (this.isUndefined(obj.length)) {
            return __getTemplate(tmpl, obj);
        }
        if (!obj.length) { return null; }
        var i, otmpl = '';
        for (i = 0; i < obj.length; i++) {
            otmpl += __getTemplate(tmpl, obj[i]);
        }
        return otmpl;
    },
    FormToObject () {
        if ((this.isUndefined(this[0]))          ||
            (this.isUndefined(this[0].nodeName)) ||
            (this[0].nodeName !== TYPE.FORM)     ||
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
                        if (this.isUndefined(obj[eles[i].name])) {
                            obj[eles[i].name] = [];
                        }
                        if (obj[eles[i].name].indexOf(eles[i].options[n].value) == -1) {
                            obj[eles[i].name].push(eles[i].options[n].value);
                        }
                    }
                }
            } else {
                obj[eles[i].name] = eles[i].value;
            }
        }
        return obj;
    },
    ObjectToForm (obj, styles) {
        if ((this.isUndefined(this[0])) ||
            (typeof(obj) !== TYPE.OBJ)  ||
            (typeof(styles) !== TYPE.OBJ)) { return this; }

        var root = this, owner = this[0];
        owner.FormBuilder = { form: null, onsubmit: null, cnt: 0, obj: obj, styles: styles };

            var __check_title = function(obj) {
                return (((root.isUndefined(obj.title)) || (!obj.title)) ? false : true);
            }
            var __check_properties = function(obj) {
                return (((root.isUndefined(obj.properties)) ||
                         (root.isUndefined(obj.properties.title)) ||
                         (!obj.properties.title)) ? false : true);
            }
            var __check_propid = function(obj, eletype) {
                if (!__check_field(obj.properties, TYPE.NAME)) {
                    obj.properties.name = eletype + "-" + owner.FormBuilder.cnt;
                }
                if (!__check_field(obj.properties, TYPE.ID)) {
                    obj.properties.id = obj.properties.name;
                }
            }
            var __check_array = function(arr) {
                return (((root.isUndefined(arr)) ||
                         (!Array.isArray(arr))        ||
                         (!arr.length))  ? false : true);
            }
            var __check_field = function(obj, key) {
                return (((root.isUndefined(obj[key])) ||
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
                        if (key === TYPE.STYLE)  {
                            ele.style.cssText = properties[key];
                        } else if (key === TYPE.CLASS)  {
                            __add_class(ele, properties[key]);
                        } else  {
                            ele.setAttribute(key, properties[key]);
                        }
                    }
                }
                if (
                    (dstyle) &&
                    (!__check_field(properties, TYPE.CLASS))
                   ) { __add_class(ele, dstyle); }

                return ele;
            }
            var __add_label = function(ele, obj) {
                if(!__check_title(obj)) { return ele; }

                var div1 = document.createElement(ELEMENT.DIV),
                    div2 = document.createElement(ELEMENT.DIV);

                if (__check_field(owner.FormBuilder.styles, TYPE.GROUP)) {
                    __add_class(div1, owner.FormBuilder.styles.group);
                }
                if (__check_field(owner.FormBuilder.styles, TYPE.LABEL)) {
                    __add_class(div2, owner.FormBuilder.styles.label);
                }
                if (!root.isUndefined(obj.required)) {
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
                var lb = document.createElement(TYPE.LABEL);

                if (__check_field(obj.properties, TYPE.TITLE)) {
                    lb.appendChild(
                        document.createTextNode(obj.properties.title)
                    );
                    delete obj.properties.title;
                }
                if (!__check_field(obj.properties, TYPE.ID)) {
                    if (__check_field(obj.properties, TYPE.NAME)) {
                        obj.properties.id = obj.properties.name + "-" + TYPE.ID;
                    } else {
                        obj.properties.id = obj.properties.type + "-" + TYPE.ID;
                    }
                }
                lb.setAttribute(TYPE.FOR, obj.properties.id);
                var el = __create_ele(ELEMENT.INPUT, obj.properties, dstyle);
                ele.appendChild(el);
                ele.appendChild(lb);
                return ele;
            }
            var __create_string = function(obj) {
                var type = ((__check_field(obj.properties, TYPE.TYPE)) ? obj.properties.type : TYPE.TEXT);
                obj.properties.type = type;
                __check_propid(obj, type);

                return __add_label(
                    __create_ele(ELEMENT.INPUT, obj.properties, owner.FormBuilder.styles.string),
                    obj
                );
            }
            var __create_text = function(obj) {
                if (__check_field(obj.properties, TYPE.TYPE)) {
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
                    if (!__check_field(obj.enum[i].properties, TYPE.NAME)) {
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
                if (__check_field(obj.properties, TYPE.TYPE)) {
                    delete obj.properties.type;
                }

                __check_propid(obj, ELEMENT.SELECT);
                var ele  = __create_ele(ELEMENT.SELECT, obj.properties, owner.FormBuilder.styles.select);

                for(var i = 0; i < obj.list.length; i++) {
                    if (!__check_properties(obj.list[i])) { continue; }

                    var mobj  = {},
                        title = (
                            ((root.isUndefined(obj.list[i].properties.title)) || (!obj.list[i].properties.title)) ?
                                ("_" + i) : obj.list[i].properties.title
                    );
                    mobj.value = (
                        ((root.isUndefined(obj.list[i].properties.value)) || (!obj.list[i].properties.value)) ?
                            title : obj.list[i].properties.value
                    );
                    if (!root.isUndefined(obj.list[i].properties.selected)) {
                        mobj.selected = true;
                    }
                    if (!root.isUndefined(obj.list[i].properties.disabled)) {
                        mobj.disabled = true;
                    }

                    var opt = __create_ele(TYPE.OPTION, mobj, null);
                    opt.appendChild(document.createTextNode(title));
                    ele.appendChild(opt);
                }
                return __add_label(ele, obj);
            }
            var __create_hidden = function(obj) {
                if (!__check_field(obj.properties, TYPE.VALUE)) {
                    return null;
                }
                if (__check_field(obj.properties, TYPE.CLASS)) {
                    delete obj.properties.class;
                }

                obj.properties.type = TYPE.HIDDEN;
                __check_propid(obj, obj.properties.type);
                return __create_ele(ELEMENT.INPUT, obj.properties, null);
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
                    case TYPE.STRING:    { field = __create_string(obj); break; }
                    case TYPE.TEXT:      { field = __create_text(obj);   break; }
                    case TYPE.BOOL:      { field = __create_bool(obj);   break; }
                    case TYPE.ENUM:      { field = __create_enum(obj);   break; }
                    case ELEMENT.SELECT: { field = __create_select(obj); break; }
                    case TYPE.HIDDEN:    { field = __create_hidden(obj); break; }
                    case ELEMENT.BUTTON: {
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

        owner.FormBuilder.form = document.createElement(TYPE.FORM);
        if (this.isUndefined(owner.FormBuilder.obj.properties)) {
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
        if (__check_field(owner.FormBuilder.obj, TYPE.TITLE)) {
            var h3 = document.createElement(ELEMENT.H3);
            h3.appendChild(
                document.createTextNode(owner.FormBuilder.obj.title)
            );
            owner.FormBuilder.form.appendChild(h3);
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
            return ((root.isUndefined(result)) ? false : result);
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
    GetJSON: function GetJSON (url, cb) {
        if (!window.XMLHttpRequest) {
            cb(ERRORS.NOTSUP, false);
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
                    cb(ERRORS.REQERR + e, false)
                }
                ((data == null) ? cb(ERRORS.JSONERR, false) : cb(data, true));
            } else {
                cb(ERRORS.REQERR + ERRORS.STRCODE + request.status, false);
            }
        };
        request.onerror = function() {
            cb(ERRORS.REQERR, false);
        };
        request.send();
    },
    SendJSON: function SendJSON (url, data, cb) {
        if (!window.XMLHttpRequest) {
            cb(ERRORS.NOTSUP, false);
            return;
        }
        var sdata;
        try {
            sdata = JSON.stringify(data);
        } catch(e) {
            cb(ERRORS.SNDERR + e, false)
        }
        var request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onerror = function() {
            cb(ERRORS.SNDERR + ERRORS.STRCODE + request.status, false);
        };
        request.send(sdata);
    }
};

