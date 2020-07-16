var elemId = "send_certificate";
function dragstart_handler(ev) {
 // Add the target element's id to the data transfer object
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
 // Get the id of the target and add the moved element to the target's DOM
     const data = ev.dataTransfer.getData("application/my-app");
    let targetEl = document.getElementById("target");
     let div = document.createElement("div");
     div.innerHTML = `
        <form onsubmit="return false" class="bg-white p-3 rounded">
        <span class="contact-form-title"><span class="font-weight-bold">Email Certificate API</span> Service</span>
        <div class="wrap-input validate-input" hidden data-validate="">
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
        `;
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
        details[e.form.children[i].children[0].name] = e.form.children[i].children[0].value 
    }
    console.log(details);
    console.log(elemId);
    axios.post(RAPIDAPI_API_URL+elemId+"/", details)
    .then(response => {
        const data = response.data;
        console.log('data', data);
    })
}
