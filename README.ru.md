## J - NOTJQUERY: ##
легкое решение для быстрого создания Вэб интерфейсов в встраиваемых системах. Это является оберткой над базовыми функциями JavaScript, а не фреймворком.
Основным позывом к созданию послужило сохранение привычного синтаксиса Jquery и избавление от излишнего функционала для минимизации размера библиотеки.
Так-же добавлен ряд методов не входящих в базовый функционал Jquery.

----------

### Возможности ###

- не имеет внешних зависимостей, чистый JavaScript ([ECMA](https://ru.wikipedia.org/wiki/ECMAScript))
- метод использования [темплейтов](README.ru.md#exampleTemplateGetJSON) для обновления данных. 
- метод автоматического создания форм из внешнего источника.
- метод преобразования формы в объект.
- включает [css](J.css) стили dashboard на базе [https://github.com/mazipan/lightweight-admin-template/](https://github.com/mazipan/lightweight-admin-template/ "Lightweight admin template")
- компактный, < 10Kb размер кода в варианте минификации.

----------

#### Jquery совместимые функции: ####

расширение объекта **String**

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| - | .ReplaceAll(pattern, replace) | Глобальная замена 'pattern' на 'replace' в строке |

расширение объекта **HTMLElement**

>работа с классами:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
|   | .AddClass | Добавить класс |
|   | .RemoveClass | Удалить класс |
|   | .ToggleClass | Переключить класс |
|   | .HasClass | Имеет ли класс |
|   | .Css | Получить css элемента |

>работа с HTML/текстом:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| .empty | .Html() | Удалить текст в элементе |
| .html | .Html("текст") | Перезаписать текст в элементе |
| .text | .Text() | Получить текст из элемента |
| .append (.insertBefore) | .Before("текст") | Вставка перед выбранным элементом |
| .prepend (.insertAfter) | .After("текст") | Вставка после выбранного элемента |

>работа с объектом HTMLElement:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| $(id/class/tag) | J(id/class/tag) | Получить объект |
| .ready | .Ready() | Ожидать загрузки страницы |
| - | .isUndefined(object) | Тест объекта на undefined или null |
| .fadeIn | .FadeIn() | Исчезновение элемента |
| .fadeOut | .FadeOut() | Появление элемента |
| .find  | .Find(tag/id) | Найти среди потомков |
| -  | .[Template](README.ru.md#exampleTemplate)(object) | Получить обработанный темплейт из данных object |
| -  | .[FormToObject](README.ru.md#exampleFormToObject)() | Получить объект из данных формы |
| -  | .[ObjectToForm](README.ru.md#exampleObjectToForm)(data,style) | Создать форму из данных [object data](/example/J-test-schema-1.json) и [object style](/example/J-test-styles-1.json) |

>прием/передача данных:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| .ajax | J.[GetJSON](README.ru.md#exampleGetJSON)(url,callback) | Получить объект из дистанционных Json данных |
| .ajax | J.[SendJSON](README.ru.md#exampleSendJSON)(url,data,callback) | Послать объект методом POST в формате данных Json |

----------

### Примеры ###

<a name="exampleGetJSON"></a>
>GetJSON

    J.Ready(function () {
		J.GetJSON("http://ip.jsontest.com/", console.log.bind(console));
	});


<a name="exampleSendJSON"></a>
>SendJSON

	var data = { id: 1, other: "test" };
    J.Ready(function () {
		J.SendJSON("http://send.test.com/", data, console.log.bind(console));
	});

<a name="exampleFormToObject"></a>
>FormToObject

    J.Ready(function () {
		var data = J("#form-id").FormToObject();
		console.log(data);
	});

<a name="exampleObjectToForm"></a>
>ObjectToForm

	J("#div-id-to-form").ObjectToForm(
		/* Object form data */
		{
		    title: "This New Form",
		    properties: { name: "form2", id: "form-2" },
		    form: [
		    {
		        type: "sring", title: "First Name",  required: 1,
		            properties: { type: "text", name: "str1", id: "str1-id", class: "textfield textfield-shadow", placeholder: "I'm placeholder 1" }
		    },{
		        type: "sring", title: "No param",
		            properties: { name: "str2" }
		    },{
		        type: "text", title: "Descripton for Name",
		            properties: { name: "txtarea1", id: "txtarea1-id", class: "textfield textfield-shadow textfield-radius", rows: 3, placeholder: "I'm placeholder textarea" }
		    },{
		        type: "boolean", title: "is Yes/No checkbox?",
		            properties: { name: "chk1", title: "you Answer?", checked: true }
		    },{
		        type: "enum", title: "is Enumerator?",
	            enum: [
	                { properties: { name: "enum1", title: "FRUIT", value: "fr" }},
	                { properties: { name: "enum1", title: "APPLE", value: "ap" }},
	                { properties: { name: "enum1", title: "BANAN", value: "bn", checked: true }},
	                { properties: { name: "enum1", title: "CHERY", value: "ch" }}
	            ]
		    },{
		        type: "select", title: "is Selector?",
		            properties: { name: "select1", multiple: true },
		            list: [
		                { properties: { title: "FRUIT", value: "fr" }},
		                { properties: { title: "APPLE", value: "ap" }},
		                { properties: { title: "BANAN", value: "bn", selected: true }},
		                { properties: { title: "CHERY", value: "ch", disabled: true }}
		            ]
		    },{
		        type: "hidden",
		            properties: { value: "0987654321" }
		    },{
		        type: "submit",
		            properties: { name: "submit", id: "submit-id1", value: "Submiting.." }
		    },{
		        type: "reset",
		            properties: { name: "reset", id: "reset-id1", value: "Reseting.." }
	    }],
	    onsubmit: function(event, form, data) {
	            console.log("Data submiting:", data);
	            return false;
	    }
	},{
		/* Object css styles class name */
	    form:    "form",
	    group:   "form__group",
	    label:   "form__label",
	    rlabel:  "form__label-required",
	    xbox:    "form__wrapper-box",
	    string:  "textfield textfield-shadow textfield-radius",
	    text:    "textfield textfield-shadow textfield-radius",
	    boolean: "checkbox checkbox-blue",
	    enum:    "radio radio-blue",
	    select:  "select select-radius",
	    button:  "button button-outline-blue",
	    submit:  "button button-radius button-outline-blue",
	    reset:   "button button-radius button-outline-red"
	});

<a name="exampleTemplate"></a>
>Template

HTML source:

    <head>
		<script id="template-list-item" type="text/template">
		  <li>
		    <a href="{{.url}}">{{.p.name}}</a>, {{p.city}}, {{p.info}}
		  </li>
		</script>
    </head>
    <body>
		<div id="txt-template"></div>
    </body>


JavaScript source:

        J("#txt-template").Html(
            J("#template-list-item").Template(
				{ url: "one.org/1.html", p: { name: "Andy", city: "TownCity", info: "extended info" }},
				{ url: "one.org/2.html", p: { name: "Angry", city: "MiniCity", info: "no info" }},
				{ url: "one.org/3.html", p: { name: "Beer", city: "BeerCity", info: "" }}
			)
        );

<a name="exampleTemplateGetJSON"></a>
>Template && GetJSON remote data

    J.Ready(function () {
		J.GetJSON("http://site.com/",
			function (data, status) {
			    if (status) {
			        J("#txt-template").Html(
			            J("#template-list-item").Template(data)
			        );
				} else {
			        J("#txt-error").Html(data);
				}
			}
		);
	});

15.04.2018


