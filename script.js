document.getElementById('inputText').addEventListener('input', processText);

function processText() {
    const input = document.getElementById('inputText').value;
    const output = document.getElementById('output');
    
    // Sanitize input
    const sanitizedText = input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[^\w\s.,!?-]/g, ''); // Keep only letters, numbers, basic punctuation
    
    // Split into words and filter empty strings
    const words = sanitizedText
        .split(/\s+/)
        .filter(word => word.length > 0);
    
    // Display results
    output.textContent = words.join(' ');
}