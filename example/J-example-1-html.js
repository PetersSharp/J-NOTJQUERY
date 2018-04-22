
/*
    See:
        ./J-test-schema-1.json
        ./J-test-styles-1.json
 */
<script type="text/javascript">

    J("#create-test-form").ObjectToForm(
    /* J-test-schema-1.json */
    {
        title: "This New Form",
        properties: { name: "form2", id: "form-2" },
        form: [
        {
            type: "string", title: "First Name",  required: 1,
                properties: { type: "text", name: "str1", id: "name-test1", class: "textfield textfield-shadow", placeholder: "I am placeholder One" }
        },{
            type: "string", title: "Second Name",
                properties: { type: "text", name: "str2", id: "name-test2", class: "textfield textfield-shadow", placeholder: "I am placeholder Two" }
        },{
            type: "string", title: "No param",
                properties: { name: "str33" }
        },{
            type: "string", title: "is Password",
                properties: { type: "password", name: "str44" }
        },{
            type: "text", title: "Descripton for Name",
                properties: { type: "textarea", name: "txta1", id: "desc-test1", class: "textfield textfield-shadow textfield-radius", rows: 3, placeholder: "I am placeholder Descripton" }
        },{
            type: "boolean", title: "is Yes/No?",
                properties: { type: "checkbox", name: "chk1", title: "you Answer?", checked: true }
        },{
            type: "enum", title: "is Enumerator?",
                enum: [
                    { properties: { type: "radio", name: "enum1", title: "FRUIT", value: "fr" }},
                    { properties: { type: "radio", name: "enum1", title: "APPLE", value: "ap" }},
                    { properties: { type: "radio", name: "enum1", title: "BANAN", value: "bn", checked: true }},
                    { properties: { type: "radio", name: "enum1", title: "CHERY", value: "ch" }}
                ]
        },{
            type: "select", title: "is Selector?",
                properties: { name: "select1", multiple: true },
                list: [
                    { properties: { type: "option", title: "FRUIT", value: "fr" }},
                    { properties: { type: "option", title: "APPLE", value: "ap" }},
                    { properties: { type: "option", title: "BANAN", value: "bn", selected: true }},
                    { properties: { type: "option", title: "CHERY", value: "ch", disabled: true }}
                ]
        },{
            type: "submit",
                properties: { type: "submit", name: "submit", id: "submit-test1", value: "Submiting.." }
        },{
            type: "reset",
                properties: { type: "reset", name: "reset", id: "reset-test1", value: "Reseting.." }
        }],
        onsubmit: function(event, form, data) {
            console.log("Data received. Look in console for results!");
            console.log(data);
            return false;
        }
    },
    /* J-test-styles-1.json */
    {
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
        submit:  "button button-radius button-outline-blue",
        reset:   "button button-radius button-outline-red"
    });

</script>
