export function obtenerFecha(): string {
    const tiempoTranscurrido: number = Date.now();
    const hoy: Date = new Date(tiempoTranscurrido);

    const opciones: Intl.DateTimeFormatOptions = {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    return hoy.toLocaleDateString('es-ES', opciones); 
}
