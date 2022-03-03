function downloadFile(url, callbackRef) {
    const xhr = new XMLHttpRequest();

    xhr.onerror = (e) => console.log("error");

    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        //console.log(`headers = ${headers}`);
        //console.log(`jsonString = ${jsonString}`);
        callbackRef(jsonString);
    };

    xhr.open("GET", url);

    xhr.send();
}

function saveFile(url, data, type="json") {
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    // Set the request header i.e. which type of content you are sending 
    xhttp.setRequestHeader("Content-Type", `application/${type}`);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            //console.log(this.responseText);
        }
    };
    xhttp.send(data);
}

export { downloadFile, saveFile};