## J - NOTJQUERY: ##
Easy solution for the rapid creation of Web interfaces in embedded systems. This is a wrapper over basic JavaScript functions, not a framework.
The main urge for the creation was the preservation of the usual Jquery syntax and getting rid of unnecessary functionality to minimize the library size.
Also, a number of methods not included in the basic Jquery functionality were added.

----------

### Features ###

- does not have external dependencies, pure JavaScript ([ECMA](https://ru.wikipedia.org/wiki/ECMAScript))
- method of using [templates](README.md#exampleTemplateGetJSON) to update data.
- method of automatically creating forms from an external source.
- method of converting a form into an object.
- includes [css](J.css) styles dashboard based on [https://github.com/mazipan/lightweight-admin-template/](https://github.com/mazipan/lightweight-admin-template/ "Lightweight admin template")
- compact, <10Kb code size in the version of minification.

----------

### Demo ###

- [Demo ObjectToForm <-> FormToObject](https://peterssharp.github.io/J-NOTJQUERY/example/example-ObjectToForm-FormToObject.html)
- [Test All J Method](https://peterssharp.github.io/J-NOTJQUERY/example/testAllMethod-example.html)

----------

### Source ###

 J now on public CDN:

        <link href="https://cdn.rawgit.com/PetersSharp/J-NOTJQUERY/0.0.3/J.min.css" rel="stylesheet"/>
        <script src="https://cdn.rawgit.com/PetersSharp/J-NOTJQUERY/0.0.3/J.min.js" type="text/javascript"></script>

----------

#### Jquery compatible features: ####

>methods with DOM tree:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| .append (.insertBefore) | .Before(HTMLelement) | Insert before the selected element |
| .prepend (.insertAfter) | .After(HTMLelement) | Insert after the selected element |
| - | .Find("selector") | Find HTML element from tree |  
| - | .Filter("selector") | Filtred HTML element from tree |   
| - | .Next("selector") | Next HTML element from tree |
| - | .Prev("selector") | Prev HTML element from tree |
| - | .Parent("selector") | Parent HTML element from tree |
| - | .Children("selector") | Children HTML element from tree |

>methods with classes and styles:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
|   | .AddClass | Add class |
|   | .RemoveClass | Delete class |
|   | .ToggleClass | Toggle class |
|   | .HasClass | Has is class |
|   | .Css | Get css from element |

>methods HTML/Text:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| .html | .Html("text") | Overwrite text in an element |
| - | .HtmlAppend("text") | Append text in an element |
| - | .HtmlReplace(pattern, replace) | Replace 'pattern' to 'replace' in the text of the element |
| .empty | .HtmlEmpty() | Delete text in an element |
| .text | .Text() | Get/Set text from an element |

>methods an objects HTMLElement:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| $(id/class/tag) | J(id/class/tag) | Get element by id/class/tag |
| .ready | .Ready() | Wait for page load |
| - | J.fn.isUndefined(object) | Test for undefined or null |
| .on | .On(action,function) | Add event raising for 'action' | 
| .off | .Off(action,function) | Remove event raising for 'action' |
| .click | .Click(function) | Add event raising for action 'onclick' |  
| .hide |  .Hide() | Hide element |
| .show |  .Show() | Show element |
| .fadeIn | .FadeIn() | Disappearing element |
| .fadeOut | .FadeOut() | Appearance of an element |
| .find  | .Find(tag/id) | Find from childs |
| -  | .[Template](README.md#exampleTemplate)(object) | Get the processed template from the data object |
| -  | .[Breadcrumbs](README.md#exampleBreadcrumbs)(tag,options,bool) |
Auto navigation bar - Breadcrumbs. Parameters: tag is template id, options is named directory object, bool is add query to path
| -  | .[FormToObject](README.md#exampleFormToObject)() | Get object from form data |
| -  | .[ObjectToForm](README.md#exampleObjectToForm)(data,style) | Create a form from the data [object data](/example/J-test-schema-1.json) and [object style](/example/J-test-styles-1.json) |

>communication Network methods:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| .ajax | J.fn.[GetJSON](README.md#exampleGetJSON)(url,callback[,user,password]) | Get object from remote Json data |
| .ajax | J.fn.[SendJSON](README.md#exampleSendJSON)(url,data,callback[,user,password]) | Send object by POST method in Json data format |
| - | J.[JsonRPC](README.md#exampleJsonRPC)(url[,user,password]) | JSON-RPC Object helper |
| - | J.JsonRPC.DataRequest | (array) get/set - data Request |
| - | J.JsonRPC.DataResult | (array) get - data Result |
| - | J.JsonRPC.DataErrors | (array) get - errors before .Send |
| - | J.JsonRPC.isErrors | (bool) get - is errors found |
| - | J.JsonRPC.CallBack(function) | callback from send request  |
| - | J.JsonRPC.SetCredentials(user,password) | Basic Authorization |
| - | J.JsonRPC.Request(method, value, id) | make request  |
| - | J.JsonRPC.Send() | send request(s)  |
| - | J.JsonRPC.Parse(data) | parse data request(s), compatibility only  |

----------

### Examples ###

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

<a name="exampleFormToObject"></a>
>FormToObject

    J.Ready(function () {
		var data = J("#form-id").FormToObject();
		console.log(data);
	});

<a name="exampleObjectToForm"></a>
>ObjectToForm

short example,
see: [formDataObject](/example/J-test-schema-1.json) [defaultStyleObject](/example/J-test-styles-1.json)

	J("#div-id-to-form").ObjectToForm(formDataObject, defaultStyleObject);

or for default embedded style:

	J("#div-id-to-form").ObjectToForm(formDataObject);

full data example:

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

or include query string:

	J("#breadcrumbs-path").Breadcrumbs(
		"#template-breadcrumbs",
		true
	);

or extended named options:

set any path name in options object, replace '**-.&=?**' to '**_**'

replace example: '**myfile.html**' = '**myfile_html**'

	var opt = {
		home: "Directoy Home",
		about: "Directoy About",
		myfile_html: "My Portfolio",
		query_host: "Query show base",
     };

	J("#breadcrumbs-path").Breadcrumbs(
		"#template-breadcrumbs",
		opt,
		true
	);

<a name="exampleJsonRPC"></a>
>JsonRPC

	J.Ready(function () {

Short call:

		var jrpc = new J.JsonRPC("http://api.random.org/json-rpc/1/invoke");

Authentication:

		var user = "user", password = "passwd";
		var jrpc = new J.JsonRPC("http://api.random.org/json-rpc/1/invoke",user,password);

or

		var jrpc = new J.JsonRPC("http://api.random.org/json-rpc/1/invoke");
		jrpc.SetCredentials(user,password);

create Request:

		jrpc.Request("generateIntegers", {n:3, min:0, max:10});
			/*  
				method - RPC method (remote function),
				params - parameters for method,
				id of the RPC request, if not, it is automatically exposed.
			 */
		jrpc.CallBack(function (id, data, status) {
			/*  id - RPC request id,
				data - return request data or error string,
				status - bool, communication error or Json-RPC package, in this case false.
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