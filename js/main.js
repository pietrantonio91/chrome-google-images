window.addEventListener(
    "load",
    function () {
        generateButtons();

        document.querySelectorAll(".isv-r").forEach(function (newImage) {
            newImage.addEventListener("click", function (e) {
                try {
                    generateButtons();
                } catch (error) {
                    
                }
            });
        });
    },
    false
);

function generateButtons() {
    setTimeout(function () {
        var mainDiv = document.querySelector("#Sva75c");

        var children = mainDiv.querySelectorAll(".fwCBrd");
        var images = mainDiv.querySelectorAll(".n3VNCb");

        for (let i = 0; i < children.length; i++) {
            document
                .querySelectorAll(".gid-buttons-" + i)
                .forEach((item) => item.remove());
            var download = createDownloadButton(i, images[i]);
            var view = createViewButton(i, images[i]);
            children[i].insertBefore(
                download,
                children[i].querySelector(".fDqwl")
            );
            children[i].insertBefore(view, children[i].querySelector(".fDqwl"));
        }

        document
            .querySelectorAll(".gid-download")
            .forEach(function (downloadBtn) {
                downloadBtn.addEventListener("click", function (e) {
                    e.target.innerText = 'Downloading...';
                    var url = e.target.getAttribute("data-image-url");
                    if (checkBase64(url)) {
                        var filename = randomString(16) + '.' + getBase64Type(url);
                    } else {
                        var regex = new RegExp(
                            "(.*)(.jpg|.jpeg|.png|.gif|.svg)",
                            "i"
                        );
                        if (!regex.test(url)) {
                            var filename = url.split("/").pop() + ".jpg";
                        } else {
                            var filename = regex.exec(url);
                            filename = filename[0].split("/").pop();
                        }
                    }
                    downloadResource(url, filename);
                    e.target.innerText = 'Download';
                });
            });

        document
            .querySelectorAll(".gid-fake-url")
            .forEach(function (downloadBtn) {
                downloadBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    var url = e.target.getAttribute("data-image-url");
                    openImageBase64(url);
                });
            });
    }, 800);
}

function createDownloadButton(i, image) {
    var div = document.createElement("div");
    div.classList.add("gid-buttons-" + i, "gid-download", "dJcyOc", "D9XNA");
    div.style.padding = "5px 5px 5px 0px";

    var span = document.createElement("span");
    span.classList.add("ZsbmCf", "h04bR", "pM4Snf");
    span.style.width = "auto";
    span.setAttribute("data-image-url", image.src);
    span.innerText = "Download";
    div.appendChild(span);
    return div;
}

function createViewButton(i, image) {
    var div = document.createElement("div");
    div.classList.add("gid-buttons-" + i, "gid-view", "dJcyOc", "D9XNA");
    div.style.padding = "5px 5px 5px 0px";

    var a = document.createElement("a");
    a.href = image.src;
    if (checkBase64(image.src)) {
        a.href = "#";
        a.classList.add("gid-fake-url");
        a.setAttribute("data-image-url", image.src);
    }
    a.target = "_blank";
    a.classList.add("ZsbmCf", "h04bR", "pM4Snf");
    a.style.width = "auto";
    a.innerText = "View Image";
    div.appendChild(a);
    return div;
}

function openImageBase64(base64URL) {
    var image = new Image();
    image.src = base64URL;

    var w = window.open("");
    w.document.write(image.outerHTML);
}

function forceDownload(blob, filename) {
    var a = document.createElement("a");
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function downloadResource(url, filename) {
    if (!checkBase64(url)) {
        url = "https://cors-anywhere.herokuapp.com/" + url;
        if (!filename) filename = url.split("\\").pop().split("/").pop();
        fetch(url, {
            headers: new Headers({
                Origin: location.origin,
            }),
            mode: "cors",
        })
            .then((response) => response.blob())
            .then((blob) => {
                let blobUrl = window.URL.createObjectURL(blob);
                forceDownload(blobUrl, filename);
            })
            .catch((e) => {

            });
    } else {
        var image_data = atob(url.split(",")[1]);
        var arraybuffer = new ArrayBuffer(image_data.length);
        var view = new Uint8Array(arraybuffer);
        for (var i = 0; i < image_data.length; i++) {
            view[i] = image_data.charCodeAt(i) & 0xff;
        }
        try {
            var blob = new Blob([arraybuffer], {
                type: "application/octet-stream",
            });
        } catch (e) {
            var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder)();
            bb.append(arraybuffer);
            var blob = bb.getBlob("application/octet-stream");
        }

        var url = (window.webkitURL || window.URL).createObjectURL(blob);
        forceDownload(url, filename);
    }
}

function checkBase64(url) {
    var regex = new RegExp("^data:", "i");
    return regex.test(url);
}

function getBase64Type(url) {
    return url.split(";")[0].split("/")[1];
}

function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }