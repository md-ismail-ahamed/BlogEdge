document.addEventListener("DOMContentLoaded", function () {
    const root = document.documentElement;
    const toggleSwitch = document.getElementById("themeToggle");
    const label = document.getElementById("themeLabel");

    const savedTheme = localStorage.getItem("theme");
    const currentTheme = savedTheme || "light";
    root.setAttribute("data-bs-theme", currentTheme);
    toggleSwitch.checked = currentTheme === "dark";
    label.textContent = currentTheme === "dark" ? "Dark" : "Light";

    toggleSwitch.addEventListener("change", () => {
        const isDark = toggleSwitch.checked;
        const newTheme = isDark ? "dark" : "light";
        root.setAttribute("data-bs-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        label.textContent = isDark ? "Dark" : "Light";
    });
});
