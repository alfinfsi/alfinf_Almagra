/** @odoo-module **/
console.log("text.esm.js");
import core from "web.core";
import textSignOca from "@sign_oca/elements/text.esm";

textSignOca.generate = function (parent, item, signatureItem) {
    var input = $(
        core.qweb.render("sign_oca.sign_iframe_field_text", {
            item: item,
            role_id: parent.info.role_id,
        })
    )[0];
    input.value = parent.info.partner[item.default_value] || "";
    input.setAttribute("readonly", "readonly");
    signatureItem[0].addEventListener("focus_signature", () => {
        input.focus();
    });
    input.addEventListener("focus", (ev) => {
        if (
            item.default_value &&
            !item.value &&
            parent.info.partner[item.default_value]
        ) {
            this.change(
                parent.info.partner[item.default_value],
                parent,
                item,
                signatureItem
            );
            ev.target.value = parent.info.partner[item.default_value];
        }
    });
    input.addEventListener("change", (ev) => {
        this.change(ev.srcElement.value, parent, item, signatureItem);
    });
    input.addEventListener("keydown", (ev) => {
        if ((ev.keyCode || ev.which) !== 9) {
            return true;
        }
        ev.preventDefault();
        var next_items = _.filter(
            parent.info.items,
            (i) => i.tabindex > item.tabindex && i.role_id === parent.info.role_id
        ).sort((a, b) => a.tabindex - b.tabindex);
        if (next_items.length > 0) {
            ev.currentTarget.blur();
            parent.items[next_items[0].id].dispatchEvent(
                new Event("focus_signature")
            );
        }
    });
    return input;
}


// registry.category("sign_oca").add("text", textSignOca);
// export default textSignOca;
