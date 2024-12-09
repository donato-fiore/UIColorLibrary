import { toast } from 'sonner';

/**
 * Copy color value to clipboard & show a toast notification
 * 
 * @param {string} colorValue 
 */
function copyColor(colorValue) {
    navigator.clipboard.writeText(colorValue);
    toast.success('Color copied to clipboard', {
        position: 'bottom-right',
        duration: 2000,
        theme: 'dark'
    });
}

/**
 * Get text color based on background color
 * 
 * @param {string} bgColor
 * @returns {string} text color
 */
function getTextColor(bgColor) {
    const rgb = parseInt(bgColor.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 229 ? 'black' : 'white';
}

/**
 * Display color value without alpha channel
 * 
 * @param {string} colorValue
 * @returns {string} color value without alpha channel
 */
function displayColor(colorValue) {
    if (colorValue.endsWith('FF')) {
        return colorValue.slice(0, -2);
    }

    return colorValue;
}

export { copyColor, getTextColor, displayColor };