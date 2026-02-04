/**
 * Génère un slug URL-friendly à partir d'une chaîne de caractères
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
        .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
        .replace(/\s+/g, '-') // Remplace les espaces par des tirets
        .replace(/-+/g, '-') // Supprime les tirets multiples
        .replace(/^-|-$/g, ''); // Supprime les tirets en début/fin
}

/**
 * Vérifie si une chaîne est un ID numérique
 */
export function isNumericId(str: string): boolean {
    return /^\d+$/.test(str);
}
