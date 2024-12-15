window.onload = function () {
    addFallingPetals();
    postVisitorData();
};

function postVisitorData() {
    var visitorData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        pageUrl: window.location.href,
        browserName: getBrowserName(),
        deviceType: getDeviceType(),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        userLanguage: navigator.language,
        timezoneOffset: new Date().getTimezoneOffset(),
        sessionID: document.cookie.replace(/(?:(?:^|.*;\s*)session_id\s*=\s*([^;]*).*$)|^.*$/, "$1")
    };
    // var sheetUrl = 'https://script.google.com/macros/s/AKfycbztM12kIk2plaXMWYqZTKrVjevbXgrQnDd_tpyW6KzaaYo2MU5SdNf3sourMWLQ1ICs4Q/exec'
    var sheetUrl = 'https://script.google.com/macros/s/AKfycbxue05XdfjgioQwsX-8oSjd2-vL7duHQDYICWw_KKgaJucABoj8-Eb3TXBx23vLRys3vw/exec'

    fetch(sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Visitor data recorded:", data);
        })
        .catch(error => {
            console.error("Error recording visitor data:", error);
        });
}

function getBrowserName() {
    var userAgent = navigator.userAgent;
    var browserName = "Unknown Browser";
    // Check for major browsers
    if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari";
    } else if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Firefox";
    } else if (userAgent.indexOf("Edge") > -1) {
        browserName = "Edge";
    } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
        browserName = "Internet Explorer";
    } else if (userAgent.indexOf("Opera") > -1) {
        browserName = "Opera";
    } else if (userAgent.indexOf("Android") > -1) {
        browserName = "Android Browser";
    }
    return browserName;
}

function getDeviceType() {
    var userAgent = navigator.userAgent;
    var platform = navigator.platform;

    if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
        if (/iPad/i.test(userAgent)) {
            return "Tablet";
        } else {
            return "Mobile";
        }
    } else if (/Mac|Windows|Linux/i.test(platform)) {
        return "Desktop";
    } else {
        return "Unknown Device";
    }
}

function addFallingPetals() {

    let numPetals = 50; // Number of petals
    let body = document.body;
    let petalPositions = []; // To keep track of positions and prevent overlap
    let classesList = ["petal", "petal2"];
    for (let i = 0; i < numPetals; i++) {
        var classyName = classesList[Math.floor(Math.random() * classesList.length)];
        var fallingPetalsDiv = document.getElementById('falling-petals-container');
        let petal = document.createElement("div");
        petal.classList.add(classyName);

        // Randomize start position with a minimum distance between petals
        let randomLeft, randomTop;

        // Ensure no overlap by checking if the position is too close to another petal
        do {
            randomLeft = Math.random() * 100 + "%";  // Random position across screen width
            randomTop = Math.random() * 100 + "%";  // Random position across screen height
        } while (isOverlap(randomLeft, randomTop, petalPositions)); // Check for overlap

        petal.style.left = randomLeft;
        petal.style.top = randomTop;

        // Randomize animation properties
        petal.style.animationDuration = Math.random() * 5 + 4 + "s"; // Random duration between 4-9 seconds
        petal.style.animationDelay = Math.random() * 5 + "s"; // Random delay between 0-5 seconds

        // Randomize rotation (between 0 and 360 degrees)
        let rotation = Math.random() * 360;
        petal.style.transform = "rotate(" + rotation + "deg)";

        // Randomize size (between 3px and 15px)
        let size = Math.random() * 15 + 5; // Random size between 3px and 15px
        petal.style.width = size + "px";
        petal.style.height = size + "px";

        // Save the position for future overlap checks
        petalPositions.push({ left: randomLeft, top: randomTop });

        // Append petal to the body
        fallingPetalsDiv.appendChild(petal);
    }

    // Function to check if the petal's position is too close to others
    function isOverlap(left, top, positions) {
        for (let pos of positions) {
            // If the petal is too close to an existing one, return true to prevent overlap
            if (Math.abs(parseFloat(left) - parseFloat(pos.left)) < 10 && Math.abs(parseFloat(top) - parseFloat(pos.top)) < 10) {
                return true;
            }
        }
        return false;
    }
}