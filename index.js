var fileList;
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
function createForm(){
    let targetEl = document.getElementById("target");
    let div = document.createElement("div");
    div.innerHTML = formTemplate[elemId];
    targetEl.innerHTML = "";
    targetEl.appendChild(div);
}
function showForm(elem){
    elemId = elem.id;
    createForm();
}

var details = {};
const RAPIDAPI_API_URL = 'https://email.microapi.dev/v1/';

const handleForm = function(e){
    e.preventDefault;
    details = {};
    let inputs = document.getElementsByTagName("input");
    let textArea = document.getElementsByTagName("textarea");
    let formInputData = new FormData();

    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "radio"){
            if(inputs[i].checked == true){
                details[inputs[i].name] = inputs[i].value;
                formInputData.append(inputs[i].name, inputs[i].value);
            }
        }else{
            if(inputs[i].type == "file"){
                formInputData.append(inputs[i].name, inputs[i].files[0]);
            }else{
                details[inputs[i].name] = inputs[i].value;
                formInputData.append(inputs[i].name, inputs[i].value);
            }
        }
    }
    if(textArea.length > 0){
        details[textArea[0].name] = textArea[0].value;
        formInputData.append(textArea[0].name, textArea[0].value);
    }

    if(elemId == "awsmail-attachment"){
        axios.post(
            RAPIDAPI_API_URL+elemId+"/",
            formInputData,
            {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then(response => {
            const data = response.data;
            alert(data.status);
            createForm();
        });
    }else{
        axios.post(RAPIDAPI_API_URL+elemId+"/", details)
        .then(response => {
            const data = response.data;
            alert(data.status);
            createForm();
        });
    }
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
            <input class="input" type="email" name="recipient" placeholder="Participant Email" required>
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
        <div class="d-flex justify-content-around wrap-input" name="radio-btns">
            <div class="input-radio">
                <input class="input radio" type="radio" name="backend_type" value="" checked>
                <label for="sendgrid">Sendgrid</label>
            </div>
            <div class="input-radio">
                <input class="input radio" type="radio" name="backend_type" value="aws">
                <label for="aws">AWS</label>
            </div>
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
            <div class="wrap-input validate-input" data-validate="Link is required">
                <input class="input" type="text" name="cc" placeholder="CC (can be left empty)">
                <span class="shadow-input"></span>
            </div>
            <div class="wrap-input validate-input" data-validate="Link is required">
                <input class="input" type="text" name="bcc" placeholder="BCC (can be left empty)">
                <span class="shadow-input"></span>
            </div>
            <div class="wrap-input validate-input" data-validate="Subject is required">
                <input class="input" type="text" name="subject" placeholder="Subject" required>
                <span class="shadow-input"></span>
            </div>
            <div class="d-flex justify-content-around wrap-input" name="radio-btns">
                <div class="input-radio">
                    <input class="input radio" type="radio" name="backend_type" value="" checked>
                    <label for="sendgrid">Sendgrid</label>
                </div>
                <div class="input-radio">
                    <input class="input radio" type="radio" name="backend_type" value="aws">
                    <label for="aws">AWS</label>
                </div>
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
            <div class="wrap-input validate-input" data-validate="Link is required">
                <input class="input" type="text" name="cc" placeholder="CC (can be left empty)">
                <span class="shadow-input"></span>
            </div>
            <div class="wrap-input validate-input" data-validate="Link is required">
                <input class="input" type="text" name="bcc" placeholder="BCC (can be left empty)">
                <span class="shadow-input"></span>
            </div>
            <div class="wrap-input validate-input" data-validate="Subject is required">
                <input class="input" type="text" name="subject" placeholder="Subject" required>
                <span class="shadow-input"></span>
            </div>
            <div class="d-flex justify-content-around wrap-input" name="radio-btns">
                <div class="input-radio">
                    <input class="input radio" type="radio" name="backend_type" value="" checked>
                    <label for="sendgrid">Sendgrid</label>
                </div>
                <div class="input-radio">
                    <input class="input radio" type="radio" name="backend_type" value="aws">
                    <label for="aws">AWS</label>
                </div>
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
                <input class="input" type="text" name="login_link" placeholder="Login Link">
                <span class="shadow-input"></span>
            </div>
            <div class="d-flex justify-content-around wrap-input" name="radio-btns">
                <div class="input-radio">
                    <input class="input radio" type="radio" name="backend_type" value="" checked>
                    <label for="sendgrid">Sendgrid</label>
                </div>
                <div class="input-radio">
                    <input class="input radio" type="radio" name="backend_type" value="aws">
                    <label for="aws">AWS</label>
                </div>
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
    "awsmail-attachment":`
        <form id="attachment-form" onsubmit="return false" class="bg-white p-3 rounded">
            <span class="contact-form-title"><span class="font-weight-bold">Attachment Mail API</span> Service</span>
            <div class="wrap-input validate-input" data-validate="">
                <input class="input bg-disabled" type="text" name="sender" placeholder="Sender" value="femiadenuga@mazzacash.com" disabled>
                <span class="shadow-input"></span>
            </div>
            <div class="wrap-input validate-input" data-validate="Recipient is required: ex@abc.xyz">
                <input class="input" type="email" name="recipient" placeholder="Recipient Email" required>
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
            <div class="wrap-input validate-input" data-validate="Subject is required">
                <input class="input" type="text" name="subject" placeholder="Subject" required>
                <span class="shadow-input"></span>
            </div>
            <div class="wrap-input validate-input" data-validate="attachment is required">
                <input class="input" type="file" name="attach" accept="image/*" placeholder="Attachment Here" required>
                <span class="shadow-input"></span>
            </div>
            <div class="d-flex justify-content-around wrap-input" name="radio-btns">
                <div class="input-radio">
                    <input class="input radio" type="radio" name="backend_type" value="" checked>
                    <label for="sendgrid">Sendgrid</label>
                </div>
                <div class="input-radio">
                    <input class="input radio" type="radio" name="backend_type" value="aws">
                    <label for="aws">AWS</label>
                </div>
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
    "send_invitation": `
        <form onsubmit="return false" class="bg-white p-3 rounded">
            <span class="contact-form-title"><span class="font-weight-bold">Invitation Mail API</span> Service</span>
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
                <input class="input" type="text" name="registration_link" placeholder="Registration Link">
                <span class="shadow-input"></span>
            </div>
            <div class="d-flex justify-content-around wrap-input" name="radio-btns">
                <div class="input-radio">
                    <input class="input radio" type="radio" name="backend_type" value="" checked>
                    <label for="sendgrid">Sendgrid</label>
                </div>
                <div class="input-radio">
                    <input class="input radio" type="radio" name="backend_type" value="aws">
                    <label for="aws">AWS</label>
                </div>
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
    "send_confirmation": `
        <form onsubmit="return false" class="bg-white p-3 rounded">
        <span class="contact-form-title"><span class="font-weight-bold">Confirmation Mail API</span> Service</span>
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
            <input class="input" type="text" name="confirmation_link" placeholder="Confirmation Link">
            <span class="shadow-input"></span>
        </div>
        <div class="d-flex justify-content-around wrap-input" name="radio-btns">
            <div class="input-radio">
                <input class="input radio" type="radio" name="backend_type" value="" checked>
                <label for="sendgrid">Sendgrid</label>
            </div>
            <div class="input-radio">
                <input class="input radio" type="radio" name="backend_type" value="aws">
                <label for="aws">AWS</label>
            </div>
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
}