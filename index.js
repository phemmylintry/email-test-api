function dragstart_handler(ev) {
 // Add the target element's id to the data transfer object
 ev.dataTransfer.setData("application/my-app", ev.target.id);
//  ev.dataTransfer.dropEffect = "copy";
}
function dragover_handler(ev) {
 ev.preventDefault();
 ev.dataTransfer.dropEffect = "copy"
}
function drop_handler(ev) {
 ev.preventDefault();
 // Get the id of the target and add the moved element to the target's DOM
     const data = ev.dataTransfer.getData("application/my-app");
    let targetEl = document.getElementById("target");
     let div = document.createElement("div");
     div.innerHTML = `<form class="bg-white p-3 rounded">
            <span class="contact-form-title">Test Email API Service</span>
            <div class="wrap-input validate-input" data-validate="Name is required">
                <input class="input" type="text" name="name" placeholder="Name" required>
                <span class="shadow-input"></span>
            </div>
            <div class="wrap-input validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input class="input" type="text" name="email" placeholder="Email" required>
                <span class="shadow-input"></span>
            </div>
            <div class="wrap-input validate-input" data-validate="Subject is required">
                <input class="input" type="text" name="subject" placeholder="Subject" required>
                <span class="shadow-input"></span>
            </div>
            <div class="wrap-input validate-input" data-validate="Message is required"><grammarly-extension style="position: absolute; top: 0px; left: 0px; pointer-events: none;" class="_1KJtL"></grammarly-extension>
                <textarea class="input" name="message" placeholder="Message" spellcheck="false" required></textarea>
                <span class="shadow-input"></span>
            </div>
            <div class="container-form-btn">
                <button class="form-btn"><span>Test Service</span></button>
            </div>
        </form>`;
    targetEl.innerHTML = "";
    targetEl.appendChild(div);
}



const formTemplates = {
    "certificate mail": ``
}