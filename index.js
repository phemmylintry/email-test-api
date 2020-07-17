var elemId = "sendmail";
function dragstart_handler(ev) {
 elemId = ev.target.id;
 ev.dataTransfer.setData("application/my-app", ev.target.id);
//  ev.dataTransfer.dropEffect = "copy";
}
function dragover_handler(ev) {
 ev.preventDefault();
 ev.dataTransfer.dropEffect = "copy"
}
function drop_handler(ev) {
 ev.preventDefault();
     const data = ev.dataTransfer.getData("application/my-app");
    let targetEl = document.getElementById("target");
     let div = document.createElement("div");
     div.innerHTML = formTemplate[elemId];
    targetEl.innerHTML = "";
    targetEl.appendChild(div);
}
function showForm(elem){
    console.log(elem.id)
    elemId = elem.id;
    let targetEl = document.getElementById("target");
    let div = document.createElement("div");
    div.innerHTML = formTemplate[elemId];
    targetEl.innerHTML = "";
    targetEl.appendChild(div);
}

var details = {};
const RAPIDAPI_API_URL = 'https://email.microapi.dev/v1/';

const handleForm = function(e){
    e.preventDefault;
    details = {};
    // console.log(e.parent)
    for (let i = 1; i < e.form.children.length - 1; i++) {
        if(e.form.children[i].children[0].name){
            details[e.form.children[i].children[0].name] = e.form.children[i].children[0].value;
        }else{
            details[e.form.children[i].children[1].name] = e.form.children[i].children[1].value;
        }

    }
    axios.post(RAPIDAPI_API_URL+elemId+"/", details)
    .then(response => {
        const data = response.data;
        alert(data.status);
    })
}

const formTemplate = {
    "send_certificate": `
        <form onsubmit="return false" class="bg-white p-3 rounded">
        <span class="contact-form-title"><span class="font-weight-bold">Email Certificate API</span> Service</span>
        <div class="wrap-input validate-input" data-validate="">
            <input class="input bg-disabled" type="text" name="sender" placeholder="Sender" value="femiadenuga@mazzacash.com" disabled>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Recipient is required: ex@abc.xyz">
            <input class="input" type="text" name="recipient" placeholder="Participant Email" required>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Subject is required">
            <input class="input" type="text" name="participant_name" placeholder="Participant Name" required>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Subject is required">
            <input class="input" type="text" name="certificate_link" placeholder="Link to the certificate" required>
            <span class="shadow-input"></span>
        </div>
        <div class="container-form-btn">
            <button class="form-btn" onclick="handleForm(this)">Test Service</button>
        </div>
    </form>
    `,
    "sendmail": `
        <form onsubmit="return false" class="bg-white p-3 rounded">
        <span class="contact-form-title"><span class="font-weight-bold">Simple Mail API</span> Service</span>
        <div class="wrap-input validate-input" data-validate="">
            <input class="input bg-disabled" type="text" name="sender" placeholder="Sender" value="femiadenuga@mazzacash.com" disabled>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Recipient is required: ex@abc.xyz">
            <input class="input" type="email" name="recipient" placeholder="Recipient Email" required>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Subject is required">
            <input class="input" type="text" name="subject" placeholder="Subject" required>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Link is required">
            <input class="input" type="text" name="cc" placeholder="CC (can be left empty)">
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Link is required">
            <input class="input" type="text" name="bcc" placeholder="BCC (can be left empty)">
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Message is required">
            <textarea class="input" name="body" placeholder="Message Body" spellcheck="false" required></textarea>
            <span class="shadow-input"></span>
        </div>
        <div class="container-form-btn">
            <button class="form-btn" onclick="handleForm(this)">Test Service</button>
        </div>
    </form>
    `,
    "sendmailwithtemplate": `
        <form onsubmit="return false" class="bg-white p-3 rounded">
        <span class="contact-form-title"><span class="font-weight-bold">Mail Template API</span> Service</span>
        <div class="wrap-input validate-input" data-validate="">
            <input class="input bg-disabled" type="text" name="sender" placeholder="Sender" value="femiadenuga@mazzacash.com" disabled>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Recipient is required: ex@abc.xyz">
            <input class="input" type="email" name="recipient" placeholder="Recipient Email" required>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Subject is required">
            <input class="input" type="text" name="subject" placeholder="Subject" required>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Link is required">
            <input class="input" type="text" name="cc" placeholder="CC (can be left empty)">
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Link is required">
            <input class="input" type="text" name="bcc" placeholder="BCC (can be left empty)">
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Message is required">
            <textarea class="input" name="htmlBody" placeholder="HTML Template" spellcheck="false" required></textarea>
            <span class="shadow-input"></span>
        </div>
        <div class="container-form-btn">
            <button class="form-btn" onclick="handleForm(this)">Test Service</button>
        </div>
    </form>
    `,
    "send_welcome": `
        <form onsubmit="return false" class="bg-white p-3 rounded">
        <span class="contact-form-title"><span class="font-weight-bold">Registration Mail API</span> Service</span>
        <div class="wrap-input validate-input" data-validate="">
            <input class="input bg-disabled" type="text" name="sender" placeholder="Sender" value="femiadenuga@mazzacash.com" disabled>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Recipient is required: ex@abc.xyz">
            <input class="input" type="email" name="recipient" placeholder="Recipient Email" required>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Subject is required">
            <input class="input" type="text" name="site_name" placeholder="Site Name" required>
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Link is required">
            <input class="input" type="text" name="login_link" placeholder="Registration Link">
            <span class="shadow-input"></span>
        </div>
        <div class="wrap-input validate-input" data-validate="Message is required">
            <textarea class="input" name="body" placeholder="Message Body" spellcheck="false"></textarea>
            <span class="shadow-input"></span>
        </div>
        <div class="container-form-btn">
            <button class="form-btn" onclick="handleForm(this)">Test Service</button>
        </div>
    </form>
    `,
    "send_invitation": ``,
    "send_confirmation": ``,
}
