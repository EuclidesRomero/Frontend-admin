// helpers/formatDate.ts
export const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return new Intl.DateTimeFormat('es-CO').format(date);
};
