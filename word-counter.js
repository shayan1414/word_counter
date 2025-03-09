document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const textInput = document.getElementById('text-input');
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    const charNoSpaces = document.getElementById('char-no-spaces');
    const paragraphCount = document.getElementById('paragraph-count');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');

    // Text transformation buttons
    const uppercaseBtn = document.getElementById('uppercase');
    const lowercaseBtn = document.getElementById('lowercase');
    const capitalizeBtn = document.getElementById('capitalize');
    const sentenceCaseBtn = document.getElementById('sentence-case');
    const removeSpacesBtn = document.getElementById('remove-spaces');
    const removeLinesBtn = document.getElementById('remove-lines');

    // Update all counts
    function updateCounts() {
        const text = textInput.value;
        
        // Word count
        const words = text.trim().split(/\s+/);
        wordCount.textContent = text.trim() === '' ? 0 : words.length;
        
        // Character count (with spaces)
        charCount.textContent = text.length;
        
        // Character count (without spaces)
        charNoSpaces.textContent = text.replace(/\s+/g, '').length;
        
        // Paragraph count
        const paragraphs = text.split(/\n\s*\n/);
        paragraphCount.textContent = text.trim() === '' ? 0 : paragraphs.length;
    }

    // Text transformation functions
    function transformText(transformation) {
        const text = textInput.value;
        switch(transformation) {
            case 'uppercase':
                textInput.value = text.toUpperCase();
                break;
            case 'lowercase':
                textInput.value = text.toLowerCase();
                break;
            case 'capitalize':
                textInput.value = text.toLowerCase().replace(/(^|\s)\w/g, letter => letter.toUpperCase());
                break;
            case 'sentence':
                textInput.value = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
                break;
            case 'remove-spaces':
                textInput.value = text.replace(/\s+/g, ' ').trim();
                break;
            case 'remove-lines':
                textInput.value = text.replace(/\n+/g, ' ').trim();
                break;
        }
        updateCounts();
    }

    // Event Listeners
    textInput.addEventListener('input', updateCounts);
    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        updateCounts();
        textInput.focus();
    });

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(textInput.value);
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
            alert('Failed to copy text to clipboard');
        }
    });

    // Text transformation button listeners
    uppercaseBtn.addEventListener('click', () => transformText('uppercase'));
    lowercaseBtn.addEventListener('click', () => transformText('lowercase'));
    capitalizeBtn.addEventListener('click', () => transformText('capitalize'));
    sentenceCaseBtn.addEventListener('click', () => transformText('sentence'));
    removeSpacesBtn.addEventListener('click', () => transformText('remove-spaces'));
    removeLinesBtn.addEventListener('click', () => transformText('remove-lines'));

    // Initial count update
    updateCounts();
});
