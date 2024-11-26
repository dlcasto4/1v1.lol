let dependencyUrls = []
const maxLoadTimesTrys = 4;

//Main Libraries
dependencyUrls.push("https://www.googletagmanager.com/gtag/js?id=UA-118283086-6", "js/jquery.min.js");
//Ads Libraries
dependencyUrls.push("js/adsController.js", "js/cpmstar.js", "js/moneyController.js");
//Firebase/Google Libraries
dependencyUrls.push("js/googleAnalytics.js", "js/Firebase/firebase-init.js", "js/Firebase/firebase-login.js", "js/Firebase/firebase-config.js", "js/Firebase/firebase-firestore.js")
//Game Libraries
dependencyUrls.push("js/unityUrls.js", "js/unityGame.js", "js/mobileRedirect.js", "js/fullscreen.js")
//etc. Libraries
dependencyUrls.push("js/windowResize.js", "js/blockManager.js", "js/macUserAgent.js", "js/visibilityChangeListener.js", "PC/payment/js/xsolla.js")

dynamicallyLoadScripts();

async function dynamicallyLoadScripts() {
    for (let i = 0; i < dependencyUrls.length; i++) {
        let url = dependencyUrls[i];
        let script = document.createElement("script");
        script.src = url;

        document.head.appendChild(script);
    }

    let trys = 0;
    while (window.loadedUrls === undefined || window.firebaseLoaded === undefined || window.adsLoaded === undefined
    || window.gameScriptLoaded === undefined || window.configInit === undefined || window.adsControllerLoaded === undefined) {
        await sleep(500)
        trys++;
        if(trys >= maxLoadTimesTrys) {
            break;
        }
    }

    isGameLoaded();
    initAds();
    loadGame();
    initFirebaseLibraries();
    fixMacUserAgent();
}

function loadGame() {
    let gameLoader = document.createElement("script")
    gameLoader.src = getGameLoaderUrl();
    gameLoader.id = "unity-loader"
    gameLoader.onload = function () {
        showGame();
    };

    let gameLoadDiv = document.getElementById("unity-loader-div");
    gameLoadDiv.innerHTML = "";
    gameLoadDiv.appendChild(gameLoader);
}

async function isGameLoaded() {
    await sleep(5000);
    if(window.gameStartLoading === undefined) {
        location.reload();
    }
}

function initFirebaseLibraries() {
    initializeFireBase();
    initRemoteConfig();
}

function onUnityReady() {
    checkAdBlock();
    sendConfig();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
