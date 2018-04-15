## J - NOTJQUERY: ##
Easy solution for the rapid creation of Web interfaces in embedded systems. This is a wrapper over basic JavaScript functions, not a framework.
The main urge for the creation was the preservation of the usual Jquery syntax and getting rid of unnecessary functionality to minimize the library size.
Also, a number of methods not included in the basic Jquery functionality were added.

### Features ###

- does not have external dependencies, pure JavaScript ([ECMA](https://ru.wikipedia.org/wiki/ECMAScript))
- method of using [templates](README.md#exampleTemplateGetJSON) to update data.
- method of automatically creating forms from an external source.
- method of converting a form into an object.
- includes [css](J.css) styles dashboard based on [https://github.com/mazipan/lightweight-admin-template/](https://github.com/mazipan/lightweight-admin-template/ "Lightweight admin template")
- compact, <10Kb code size in the version of minification.

#### Jquery compatible features: ####

extension of an object **String**

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| - | .ReplaceAll(pattern, replace) | Global 'pattern' replacement with 'replace' in a string |

extension of an object **HTMLElement**

>methods with classes:

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
| .empty | .Html() | Delete text in an element |
| .html | .Html("text") | Overwrite text in an element |
| .text | .Text() | Get text from an element |
| .append (.insertBefore) | .Before("text") | Insert before the selected element |
| .prepend (.insertAfter) | .After("text") | Insert after the selected element |

>methods an objects HTMLElement:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| $(id/class/tag) | J(id/class/tag) | Get element by id/class/tag |
| .ready | .Ready() | Wait for page load |
| - | .isUndefined(object) | Test for undefined or null |
| .fadeIn | .FadeIn() | Disappearing element |
| .fadeOut | .FadeOut() | Appearance of an element |
| .find  | .Find(tag/id) | Find from childs |
| -  | .[Template](README.md#exampleTemplate)(object) | Get the processed template from the data object |
| -  | .[FormToObject](README.md#exampleFormToObject)() | Get object from form data |
| -  | .[ObjectToForm](README.md#exampleObjectToForm)(data,style) | Create a form from the data [object data](/example/J-test-schema-1.json) and [object style](/example/J-test-styles-1.json) |

>communication Network methods:

|  Jquery | J  ||
| ------------ | ------------ | ------------ |
| .ajax | J.[GetJSON](README.md#exampleGetJSON)(url,callback) | Get object from remote Json data |
| .ajax | J.[SendJSON](README.md#exampleSendJSON)(url,data,callback) | Send object by POST method in Json data format |

----------

### Examples ###

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