// Global variables
let currentText = '';
let typedInstance = null;

// Initialize event listeners
document.getElementById('translateButton').addEventListener('click', handleTranslate);
document.getElementById('resetButton').addEventListener('click', resetText);

function sanitizeText(text) {
    return text
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[^\w\s.,!?-]/g, '') // Keep only letters, numbers, basic punctuation
        .trim();
}

function translateToWuf(word) {
    // Extract punctuation
    const punctuation = word.match(/[.,!?-]+$/)?.[0] || '';
    const cleanWord = word.replace(/[.,!?-]+$/, '');
    
    // Only translate if there are alphanumeric characters
    if (!/[a-zA-Z0-9]/.test(cleanWord)) return word;
    
    // Determine capitalization pattern
    const isAllCaps = cleanWord === cleanWord.toUpperCase();
    const isFirstCap = cleanWord[0] === cleanWord[0].toUpperCase();
    
    // Generate base wuf with different patterns based on length
    const length = cleanWord.length;
    let result;
    if (length === 1) {
        result = 'w...';
    } else if (length === 2) {
        result = 'wu...';
    } else {
        result = 'w' + 'u'.repeat(length - 2) + 'f';
    }
    
    // Apply capitalization
    if (isAllCaps) {
        result = result.toUpperCase();
    } else if (isFirstCap) {
        result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    
    return result + punctuation;
}

function handleTranslate() {
    const input = document.getElementById('inputText').value;
    const sanitizedText = sanitizeText(input);
    const words = sanitizedText.split(/\s+/).filter(word => word.length > 0);
    const translatedWords = words.map(translateToWuf);
    const translatedText = translatedWords.join(' ');

    // Destroy previous Typed instance if it exists
    if (typedInstance) {
        typedInstance.destroy();
    }

    // Create new Typed instance
    typedInstance = new Typed('#output', {
        strings: [translatedText],
        typeSpeed: 50,
        showCursor: false
    });
}

function resetText() {
    document.getElementById('inputText').value = '';
    if (typedInstance) {
        typedInstance.destroy();
    }
    document.getElementById('output').textContent = '';
}