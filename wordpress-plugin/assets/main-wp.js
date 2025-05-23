/**
 * WordPress version - Traditional script loading instead of ES6 modules
 */

// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearEl = document.getElementById("otb-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    
    // Add notification styles
    addNotificationStyles();
    
    // Set up event handlers
    setupEventHandlers();
    
    console.log('Oxygen to Bricks Converter (WP) initialized');
});

// Notification system
function showNotification(message, type = "info") {
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function addNotificationStyles() {
    if (document.getElementById("notification-styles")) {
        return;
    }
    
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            background-color: #333;
            color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.success {
            background-color: #45B96F;
        }
        
        .notification.error {
            background-color: #E54D4D;
        }
        
        .notification.warning {
            background-color: #F7984B;
        }
    `;
    document.head.appendChild(style);
}

// Event handlers
function setupEventHandlers() {
    // Convert button
    const convertBtn = document.getElementById("otb-convert");
    if (convertBtn) {
        convertBtn.addEventListener("click", handleConvert);
    }
    
    // Load example button
    const loadExampleBtn = document.getElementById("otb-load-example");
    if (loadExampleBtn) {
        loadExampleBtn.addEventListener("click", handleLoadExample);
    }
    
    // Copy button
    const copyBtn = document.getElementById("otb-copy");
    if (copyBtn) {
        copyBtn.addEventListener("click", handleCopy);
    }
    
    // Download button
    const downloadBtn = document.getElementById("otb-download");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", handleDownload);
    }
}

function handleConvert() {
    const inputEl = document.getElementById("otb-input");
    const outputEl = document.getElementById("otb-output");
    
    if (!inputEl || !outputEl) {
        console.error('Input or output elements not found');
        showNotification("Error: Missing UI elements", "error");
        return;
    }
    
    try {
        const input = JSON.parse(inputEl.value);
        
        // Use the exposed global function
        if (typeof window.buildBricksJson === 'function') {
            const bricksJson = window.buildBricksJson(input);
            
            // Validate parent references
            const allParentsValid = bricksJson.content.every(
                b => b.parent === "0" || bricksJson.content.some(p => p.id === b.parent)
            );

            if (!allParentsValid) {
                showNotification("⚠️ Some elements reference missing parents.", "warning");
            }
            
            // Check if classes were converted
            if (bricksJson.globalClasses && bricksJson.globalClasses.length > 0) {
                showNotification(`Converted ${bricksJson.globalClasses.length} classes`, "success");
                displayClassInfo(bricksJson.globalClasses);
            } else {
                const classListEl = document.getElementById("otb-class-list");
                if (classListEl) {
                    classListEl.innerHTML = "<p>No classes were found or converted.</p>";
                }
            }
            
            outputEl.value = JSON.stringify(bricksJson, null, 2);
            showNotification("Conversion successful!", "success");
        } else {
            // Fallback for development
            console.warn('buildBricksJson not found, using fallback');
            const fallbackOutput = {
                content: [],
                source: "bricksCopiedElements",
                sourceUrl: "https://yourdomain.dev",
                version: "1.12.3",
                globalClasses: [],
                globalElements: []
            };
            outputEl.value = JSON.stringify(fallbackOutput, null, 2);
            showNotification("Using fallback converter", "warning");
        }
    } catch (err) {
        console.error('Conversion error:', err);
        showNotification("Invalid JSON: " + err.message, "error");
    }
}

function handleLoadExample() {
    const exampleEl = document.getElementById("otb-example-json");
    const inputEl = document.getElementById("otb-input");
    
    if (exampleEl && inputEl) {
        try {
            const exampleJson = JSON.parse(exampleEl.textContent);
            inputEl.value = JSON.stringify(exampleJson, null, 2);
            showNotification("Example loaded!", "success");
        } catch (err) {
            showNotification("Error loading example: " + err.message, "error");
        }
    } else {
        showNotification("Example not found", "error");
    }
}

function handleCopy() {
    const outputEl = document.getElementById("otb-output");
    
    if (!outputEl || !outputEl.value) {
        showNotification("Nothing to copy", "warning");
        return;
    }
    
    navigator.clipboard.writeText(outputEl.value)
        .then(() => {
            showNotification("Copied to clipboard!", "success");
        })
        .catch(err => {
            showNotification("Failed to copy: " + err.message, "error");
        });
}

function handleDownload() {
    const outputEl = document.getElementById("otb-output");
    
    if (!outputEl || !outputEl.value) {
        showNotification("Nothing to download", "warning");
        return;
    }
    
    const blob = new Blob([outputEl.value], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.href = url;
    a.download = "bricks-converted-" + new Date().getTime() + ".json";
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
    
    showNotification("JSON downloaded!", "success");
}

function displayClassInfo(globalClasses) {
    const classListEl = document.getElementById("otb-class-list");
    if (!classListEl) return;
    
    classListEl.innerHTML = "";
    
    // Create a table to display class information
    const table = document.createElement("table");
    table.className = "otb-class-table";
    
    // Add header row
    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Oxygen Class</th>
            <th>Bricks Class ID</th>
            <th>Properties</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // Add rows for each converted class
    const tbody = document.createElement("tbody");
    globalClasses.forEach(cls => {
        const tr = document.createElement("tr");
        
        // Class name
        const tdName = document.createElement("td");
        tdName.textContent = cls.name;
        
        // Class ID
        const tdId = document.createElement("td");
        tdId.textContent = cls.id;
        
        // Class properties
        const tdProps = document.createElement("td");
        const props = Object.keys(cls.settings).map(key => {
            return `${key}: ${JSON.stringify(cls.settings[key]).substring(0, 30)}...`;
        }).join(", ") || "None";
        tdProps.textContent = props;
        
        tr.appendChild(tdName);
        tr.appendChild(tdId);
        tr.appendChild(tdProps);
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    classListEl.appendChild(table);
}
