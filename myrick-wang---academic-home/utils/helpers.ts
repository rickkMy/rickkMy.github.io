/**
 * Creates a URL-friendly slug from a string.
 * e.g., "My Project Title" -> "my-project-title"
 */
export const createSlug = (text: string): string => 
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
/**
 * Strips markdown syntax to generate a plain text preview.
 * Removes headers, bold/italic markers, links, and images.
 */
export const getPreview = (text: string, length: number = 180): string => {
    let plain = text.replace(/^#+\s.*$/gm, ''); // Remove headers
    plain = plain.replace(/[*_`]/g, ''); // Remove bold/italic/code markers
    plain = plain.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Links to text
    plain = plain.replace(/!\[[^\]]*\]\([^)]+\)/g, ''); // Remove images
    plain = plain.replace(/\s+/g, ' ').trim(); // Normalize whitespace
    return plain.slice(0, length) + (plain.length > length ? '...' : '');
};
