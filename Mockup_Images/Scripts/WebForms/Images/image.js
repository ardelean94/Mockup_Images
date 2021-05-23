let db;
let imagesArray = [];

$(document).ready(function () {
    initServiceWorker();
    initializeDB();
    checkIndexedDbData();
});

function initServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/Scripts/ServiceWorker/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
    };
}


function initializeDB() {
    console.log("db initiliazed");
    db = new Dexie("db_test");
    db.version(1).stores({
        images: "id, createdDate, imageData",
    });

    return db;
}

async function compressImage(event) {
    const imageFile = event.target.files[0];
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    console.log(imageFile);
     
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    };
    try {
        const compressedImage = await imageCompression(imageFile, options);
        console.log(
            "compressedFile instanceof Blob",
            compressedImage instanceof Blob
        ); // true
        console.log(`compressedFile size ${compressedImage.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        await saveImageToIndexedDB(compressedImage); // write your own logic
    } catch (error) {
        console.log(error);
    }
}

async function saveImageToIndexedDB(compressedImage) {
    //console.log(compressedImage, compressedImage instanceof Blob);

    const reader = new FileReader();
    reader.readAsBinaryString(compressedImage);

    reader.onload = async function (e) {
        const bits = e.target.result;
        // console.log(bits);
        // console.log(btoa(bits));

        const id = await db.images.put({
            id: 1,
            createdDate: Date.now(),
            imageData: btoa(bits),
        });
        imagesArray.push(id);
        console.log(imagesArray);
        checkIndexedDbData();
    };
}

async function getImageFromIndexedDB() {
    //console.log("get image from memory.", e);
    const imageFromDb = await db.images.bulkGet(imagesArray); //.get(3);

    $.each(imageFromDb, function (index, value) {
        drawImage("imagesInputArea", value);
    });

    $("#btnGetImage").hide();
    $("#btnSaveImage").show();
}

function drawImage(elementLocation, imageObj) {
    let imageSrc = "data:image/jpeg;base64," + imageObj.imageData;

    //$("#imagesInputArea .table .tbody")
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
    imagesArray = [];
    //console.log(imagesArray);
}

function clearScreen() {
    clearIndexedDB();
    checkIndexedDbData();
    $("#imagesInputArea .table .tbody .row").remove();
    $("#imagesOutputArea .table .tbody .row").remove();
}

async function saveImageToServerUsingWebMethod() {
    let imageFromDb = await db.images.get(1);
    //console.log(imageFromDb);   //obj
    //console.log(JSON.stringify(imageFromDb));

    PageMethods.set_path("Image.aspx");
    PageMethods.SaveImageToFile(JSON.stringify(imageFromDb), onSucess, onError);
    
    function onSucess(result) {
        clearIndexedDB();
        checkIndexedDbData();
        //alert(result);

        const imageData = JSON.parse(result);
        drawImage("imagesOutputArea", imageData);
    }

    function onError(err) {
        console.log("Failure: ", err);
    }

    $("#btnGetImage").show(); 
    $("#btnSaveImage").hide();
}

async function checkIndexedDbData() {
    const imageFromDb = await db.images.bulkGet(imagesArray);
    console.log(imageFromDb);
    if (imageFromDb.length === 0) {
        $(".circle").css("background-color", "#68CF68");
    }
    else {
        $(".circle").css("background-color", "#FFFF33");
    }
}

async function saveImageToServerUsingAJAX() {
    let imageFromDb = await db.images.get(1);

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