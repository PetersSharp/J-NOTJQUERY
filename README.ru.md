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

### Рабочие примеры ###

- [Демонстрация ObjectToForm <-> FormToObject](https://peterssharp.github.io/J-NOTJQUERY/example/testObjectToForm-FormToObject-example.html)
- [Демонстрация ObjectToForm full](https://peterssharp.github.io/J-NOTJQUERY/example/testObjectToForm-example.html)
- [Тест J методов и функций](https://peterssharp.github.io/J-NOTJQUERY/example/testAllMethod-example.html)
- [Пример данных ObjectToForm](https://peterssharp.github.io/J-NOTJQUERY/example/J-test-schema-1.json)
- [Пример данных ObjectToForm full](https://peterssharp.github.io/J-NOTJQUERY/example/J-full-schema.json)
- [Пример стилей ObjectToForm](https://peterssharp.github.io/J-NOTJQUERY/example/J-test-styles-1.json)

----------

### Файлы ###

 J теперь на общедоступном CDN:

        <link href="https://cdn.rawgit.com/PetersSharp/J-NOTJQUERY/0.0.6/J.min.css" rel="stylesheet"/>
        <script src="https://cdn.rawgit.com/PetersSharp/J-NOTJQUERY/0.0.6/J.min.js" type="text/javascript"></script>

----------

#### Jquery совместимые функции: ####

>methods with DOM tree:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| .append (.insertBefore) | .Before("текст") | Вставка перед выбранным элементом |
| .prepend (.insertAfter) | .After("текст") | Вставка после выбранного элемента |
| - | .Find("selector") | Поск HTML элемента в DOM дереве |
| - | .Filter("selector") | Отфильтровать HTML элементы в DOM дереве |   
| - | .Next("selector") | Следующий HTML элемент в DOM дереве |
| - | .Prev("selector") | Предыдущий HTML элемента в DOM дереве |
| - | .Parent("selector") | Родитель HTML элемента |
| - | .Children("selector") | Потомки HTML элемента |

>работа с классами и стилями:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
|   | .AddClass | Добавить класс |
|   | .RemoveClass | Удалить класс |
|   | .ToggleClass(classname,classname) | Переключить класс |
|   | .HasClass | Имеет ли класс |
|   | .Css | Получить css элемента |
|   | .Attr(key,value) | Установить атрибуты для элемента |

>работа с HTML/текстом:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| .html | .Html("текст") | Перезаписать текст в элементе |
| - | .HtmlAppend("text") | Добавить текст в элемент |
| - | .HtmlReplace(pattern, replace) | Заменить 'pattern' на 'replace' в тексте элемента |
| .empty | .HtmlEmpty() | Удалить текст в элементе |
| .text | .Text() | Получить текст из элемента |

>работа с объектом HTMLElement:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| $(id/class/tag) | J(id/class/tag) | Получить объект |
| .ready | .Ready() | Ожидать загрузки страницы |
| - | J.fn.isUndefined(object) | Тест объекта на undefined или null |
| .on | .On(action,function) | Добавить слежку за событием 'action' | 
| .off | .Off(action,function) | Удалить слежку за событием 'action' | 
| - | .OnClick(function) | Добавить слежку за событием 'onclick' |
| .click | .Click() | Нажать элемент |  
| .hide |  .Hide() | Спрятать элемент |
| .show |  .Show() | Показать элемент |
| .fadeIn | .FadeIn() | Исчезновение элемента |
| .fadeOut | .FadeOut() | Появление элемента |
| .find  | .Find(tag/id) | Найти среди потомков |
| -  | .[Template](README.ru.md#exampleTemplate)(object) | Получить обработанный темплейт из данных object |
| -  | .[Breadcrumbs](README.md#exampleBreadcrumbs)(tag,options,bool) | Автоматическая строка навигации на основе URL - 'Breadcrumbs'. Опции: tag указывает на id темплейта, options - списк алиасов директорий, bool - показывать query или нет, по умолчанию - нет
| -  | .[FormToObject](README.ru.md#exampleFormToObject)() | Получить объект из данных формы |
| -  | .[ObjectToForm](README.ru.md#exampleObjectToForm)(data,style) | Создать форму из данных [object data](/example/J-test-schema-1.json) и [object style](/example/J-test-styles-1.json) |
| -  | J.fn.HumanizeFileSize(number) | Размер файла в читаемом виде, возвращает строку |

>прием/передача данных:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| .ajax | J.fn.[GetJSON](README.ru.md#exampleGetJSON)(url,callback[,user,password]) | Получить объект из дистанционных Json данных |
| .ajax | J.fn.[SendJSON](README.ru.md#exampleSendJSON)(url,data,callback[,user,password]) | Послать объект методом POST в формате данных Json |
| .ajax | J.fn.[SendBin](README.ru.md#exampleSendBin)(url,data,[callback,progress,user,password]) | Послать бинарный файл методом POST, использует бинарный поток, не 'multipart/form-data' формат! |
| - | J.[JsonRPC](README.md#exampleJsonRPC)(endpoint[,user,password]) | JSON-RPC Object helper, endpoint являеться URI path |
| - | J.JsonRPC.DataRequest | (array) get/set - показать массив готовых запросов |
| - | J.JsonRPC.DataResult | (array) get - показать массив результатов последней сессии |
| - | J.JsonRPC.DataErrors | (array) get - показать массив ошибок, обнуляеться при использовании метода .Send |
| - | J.JsonRPC.isErrors | (bool) get - проверка наличия ошибок при проведении последней сессии |
| - | J.JsonRPC.SetEndPoint(endpoint) | установить URI доставки |
| - | J.JsonRPC.CallBack(function) | функция обратного вызова при отправлении запроса  |
| - | J.JsonRPC.SetCredentials(user,password) | Basic HTTP авторизация |
| - | J.JsonRPC.Request(method, value, id) | создать запрос |
| - | J.JsonRPC.Send() | отправить запрос(ы)  |
| - | J.JsonRPC.Parse(data) | разбор данных запроса, доступно только в режиме совместимости |

----------

### Примеры ###

<a name="exampleGetJSON"></a>
>GetJSON

    J.Ready(function () {
		J.fn.GetJSON("http://ip.jsontest.com/", console.log.bind(console));
	});


<a name="exampleSendJSON"></a>
>SendJSON

	var data = { id: 1, other: "test" };
    J.Ready(function () {
		J.fn.SendJSON("http://send.test.com/", data, console.log.bind(console));
	});

<a name="exampleSendBin"></a>
>SendBin отправка binary данных (например локальный файл)
>! использует бинарный поток, не 'multipart/form-data' формат !

HTML part:

	<form name="frmupload" id="upload-form">
    <input type="file" name="infile" id="in-file" accept=".*"/>
    <label for="in-file">Upload Files</label>
    <progress value="0" max="100" id="infile-pg"></progress>
	<input type="submit" value="Send"/>
	</form>

JavaScript part:

	var frmf = J("#in-file")[0],
	    file = frmf.files[0];

	J("#upload-form").On("submit", function (e) {
		if (file) {
	        J("#infile-pg").Attr("max", file.size).Show();
	        J.fn.SendBin("/url/upload?" + file.name, file,
	            function (t, s) {
					console.log("Alert",t,s);
	            },
	            function (c, t) {
	                J("#infile-pg").Attr("value", c)
		        }
			);			
		}
	});

<a name="exampleFormToObject"></a>
>FormToObject

    J.Ready(function () {
		var data = J("#form-id").FormToObject();
		console.log(data);
	});

<a name="exampleObjectToForm"></a>
>ObjectToForm

пример с внешними данными,
подробнее: [formDataObject](/example/J-test-schema-1.json) [defaultStyleObject](/example/J-test-styles-1.json)

	J("#div-id-to-form").ObjectToForm(formDataObject, defaultStyleObject);

или пример с предустановленными стилями по умолчанию:

	J("#div-id-to-form").ObjectToForm(formDataObject);

пример с данными в скрипте:

	J("#div-id-to-form").ObjectToForm(
		/* Object form data */
		{
		    title: "This New Form",
		    properties: { name: "form2", id: "form-2" },
		    form: [
		    {
		        type: "string", title: "First Name",  required: 1,
		            properties: { type: "text", name: "str1", id: "str1-id", class: "textfield textfield-shadow", placeholder: "I'm placeholder 1" }
		    },{
		        type: "string", title: "No param",
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
		    <a href="{{.url}}">{{.p.name}}</a>, {{.p.city}}, {{.p.info}}
		  </li>
		</script>
    </head>
    <body>
		<div id="txt-template"></div>
    </body>


JavaScript source:

        J("#txt-template").Html(
            J("#template-list-item").Template([
				{ url: "one.org/1.html", p: { name: "Andy", city: "TownCity", info: "extended info" }},
				{ url: "one.org/2.html", p: { name: "Angry", city: "MiniCity", info: "no info" }},
				{ url: "one.org/3.html", p: { name: "Beer", city: "BeerCity", info: "" }}
			])
        );

<a name="exampleTemplateGetJSON"></a>
>Template && GetJSON remote data

    J.Ready(function () {
		J.fn.GetJSON("http://site.com/",
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

<a name="exampleBreadcrumbs"></a>
>Breadcrumbs

HTML source:

    <head>
		<script id="template-breadcrumbs" type="text/template">
			<a href="{{.url}}">{{.path}}</a>{{.sep}}
		</script>
    </head>
    <body>
		<div class="alert alert-radius alert-blue">
			<span id="breadcrumbs-path" class="breadcrumbs">
				<a href="/"><i class="icon-home"></i></a>&nbsp;
			</span>
        </div>
    </body>

JavaScript source:

	J("#breadcrumbs-path").Breadcrumbs("#template-breadcrumbs");

или включая query параметры:

	J("#breadcrumbs-path").Breadcrumbs(
		"#template-breadcrumbs",
		true
	);

или с расширенными параметрами:

измените все символы '**-.&=?**' в именах путей на '**_**',

пример: '**myfile.html**' = '**myfile_html**'


	var opt = {
		home: "Directoy Home",
		about: "Directoy About",
		myfile_html: "My Portfolio",
		query_host: "Query show base"
     };

	J("#breadcrumbs-path").Breadcrumbs(
		"#template-breadcrumbs",
		opt,
		true
	);

<a name="exampleJsonRPC"></a>
>JsonRPC

короткий вызов:

	J.Ready(function () {
		var jrpc = new J.JsonRPC("http://api.random.org/json-rpc/1/invoke");

Авторизация:

		var user = "user", password = "passwd";
		var jrpc = new J.JsonRPC("http://api.random.org/json-rpc/1/invoke",user,password);

или

		var jrpc = new J.JsonRPC("http://api.random.org/json-rpc/1/invoke");
		jrpc.SetCredentials(user,password);

создание запроса:

		jrpc.Request("generateIntegers", {n:3, min:0, max:10}, 7);
			/*  
				method - RPC метод (функция),
				params - параметры запроса,
				id - идентификатор запроса RPC, если нет, выставляеться автоматически.
			 */
		jrpc.CallBack(function (id, data, status) {
			/*  
				id - идентификатор запроса RPC,
				data - данные запроса возврата или строка ошибки,
				status - bool, ошибки связи или пакета Json-RPC, в этом случае false.
			 */
			console.log("JsonRPC return:", id, data, status);
		});

		console.log("DataRequest", jrpc.DataRequest);

		jrpc.Send();
		if (jrpc.isErrors) {
			console.log("isErrors", jrpc.isErrors);
			console.log("DataError", jrpc.DataError);
		}
		console.log("DataResult", jrpc.DataResult);
	});


15.04.2018


