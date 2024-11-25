document.addEventListener("visibilitychange", () => {
    if (!window.unityInstance) {
        return;
    }
    
    var isFocused = document.visibilityState === "visible";
    window.unityInstance.SendMessage("PersistentObjects", "OnApplicationFocusChange", isFocused ? 1 : 0);
}, false);
