export function formatearDinero(cantidad: number): string {
  return cantidad.toLocaleString("es-CO", {  
    style: 'currency',
    currency: 'COP'   
  });
}

export function formatearDinero2(cantidad:number):string {
  return new Intl.NumberFormat('es-CO', { 
    style: 'currency',
    currency: 'COP', 
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(cantidad);
}