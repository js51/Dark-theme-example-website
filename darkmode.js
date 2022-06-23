let prefersDarkQL = window.matchMedia('(prefers-color-scheme: dark)');
let prefersDark = prefersDarkQL.matches;
let darkModeState = false

function setDarkMode(state) {
    document.documentElement.classList.toggle("dark-mode", state);
}

function setDarkModeLocalStorage(state) {
    localStorage.setItem("dark-mode", state);
}

// Initial setting
storedPreference = localStorage.getItem("dark-mode");
console.log(storedPreference);
if (storedPreference == "true") {
    console.log("Setting dark mode to true");
    darkModeState = true;
} else if (storedPreference == "false") {
    console.log("Setting dark mode to false");
    darkModeState = false;
} else { // null
    console.log("Setting dark mode to system preference");
    darkModeState = prefersDark;
}
setDarkMode(darkModeState)

// Listen for a change in dark mode preference
prefersDarkQL.addEventListener("change", (event) => {
    prefersDark = event.matches
    darkModeState = prefersDark
    setDarkMode(darkModeState);
    localStorage.removeItem("dark-mode"); // Removes previous choice for dark mode 
});

window.onload = function() {
    const lampSwitch = document.querySelector('.lamp-switch');
    // Toggles dark mode on click
    lampSwitch.addEventListener("click", () => {
        // Animate the lamp switch
        lampSwitch.classList.remove('animate-lamp-switch');
        void lampSwitch.offsetWidth;
        lampSwitch.classList.add('animate-lamp-switch');
        // Toggle dark mode
        setTimeout(function(){
            darkModeState = !darkModeState;
            setDarkMode(darkModeState);
            setDarkModeLocalStorage(darkModeState);
        }, 300); // Delay to suit animation
    });
}