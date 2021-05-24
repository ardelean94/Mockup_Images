let db;

$(document).ready(function () {
    initServiceWorker();
    initializeDB();
    checkIndexedDbData();
});

function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/Scripts/ServiceWorker/serviceWorker.js')
            .then(res => console.log('service worker registered'))
            .catch(err => console.log('service worker not registered', err));
    };
}

function initializeDB() {
    console.log('db initiliazed');
    db = new Dexie('db_test');
    db.version(1).stores({
        images: '++Id, CreatedDate, ImageData',
    });
}

async function compressImage(event) {
    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    console.log(imageFile);
     
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    };
    try {
        const compressedImage = await imageCompression(imageFile, options);
        console.log('compressedFile instanceof Blob', compressedImage instanceof Blob); // true
        console.log(`compressedFile size ${compressedImage.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        await saveImageToIndexedDB(compressedImage);
    } catch (error) {
        console.log(error);
    }
}

function saveImageToIndexedDB(compressedImage) {
    const reader = new FileReader();
    reader.readAsBinaryString(compressedImage);

    reader.onload = async function (e) {
        const bits = e.target.result;

        const id = await db.images.add({
            CreatedDate: new Date(),
            ImageData: btoa(bits),
        });
        console.log(id);
        checkIndexedDbData();
    };
}

async function getImageFromIndexedDB() {
    await db.images.toArray()
        .then(imageArray => {
            imageArray.forEach(image => {
                //console.log(image);
                drawImage('imagesInputArea', image);
            });
        })
        .catch(err => {
            console.log(err);
        });

    $("#btnGetImage").hide();
    $("#btnSaveImage").show();
}

function drawImage(elementLocation, imageObj) {
    let imageSrc = "data:image/jpeg;base64," + imageObj.ImageData;

    $("#" + elementLocation + " .table .tbody").append(
        `
            <tr class="row"> 
                <td><img class="image" src=${imageSrc}></td>
            </tr>
        `
    );
}

function clearIndexedDB() {
    db.images
        .clear()
        .then(() => {
            console.log("success");
        })
        .catch((err) => {
            console.log(err);
        });
}


async function checkIndexedDbData() {
    await db.images.toArray()
        .then(imageArray => {
            if (imageArray.length === 0) {
                $(".circle").css("background-color", "#68CF68");
            }
            else {
                $(".circle").css("background-color", "#FFFF33");
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function clearScreen() {
    clearIndexedDB();
    checkIndexedDbData();
    $("#imagesInputArea .table .tbody .row").remove();
    $("#imagesOutputArea .table .tbody .row").remove();
}

async function saveImageToServerUsingWebMethod() {
    PageMethods.set_path("Image.aspx");

    await db.images.toArray()
        .then(imageArray => {
            imageArray.forEach(image => {
                //console.log('image to be sent to server:', image);
                //console.log('image to be sent to server:', JSON.stringify(image));
                //alert(JSON.stringify(image));
                PageMethods.SaveImageToFile(JSON.stringify(image), onSucess, onError);

                function onSucess(result) {
                    drawImage("imagesOutputArea", JSON.parse(result));
                    //alert(result);
                }

                function onError(err) {
                    console.log("Failure: ", err);
                }
            });
        })
        .catch(err => {
            console.log(err);
        });

    clearIndexedDB();
    checkIndexedDbData();

    $("#btnGetImage").show(); 
    $("#btnSaveImage").hide();
}


/*TESTING AREA*/
async function saveImageToServerUsingAJAX() {
    let imageFromDb = await db.images.toArray();

    const data = {
        data: imageFromDb,
    };

    console.log(data);

    $.ajax({
        type: "POST",
        //url: '<%= ResolveUrl("Image.aspx/SaveImageToFile") %>',
        url: "Image.aspx/SaveImageToFile",
        data: JSON.stringify({id: 1, name: "test"}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log("Success: ", result);
            clearIndexedDB();
        },
        failure: function (response) {
            console.log("Err: ", response.d);
        }
    });

    $("#btnGetImage").show();
    $("#btnSaveImage").hide();
}