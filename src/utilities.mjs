export function quicksort(lista, atributo) {
    if (lista.length <= 1) {
        return lista; 
    }
  
    let izquierda = [];
    let derecha = [];
    let pivote = lista[0]; 
  
    for (let i = 1; i < lista.length; i++) {
        if (lista[i][atributo] <= pivote[atributo]) {
            izquierda.push(lista[i]);
        } else {
            derecha.push(lista[i]);
        }
    }
  
    return [...quicksort(izquierda, atributo), pivote, ...quicksort(derecha, atributo)]; // crea una copia del arreglo
}


export function buscarNombre(lista, objetivo) {

        objetivo = objetivo.toLowerCase();
    
        // Ordena la lista por nombre
        lista = quicksort(lista, "nombre"); // mejora la eficiencia del filter
    
        let resultados = lista.filter(producto => producto.nombre.toLowerCase().includes(objetivo));
    
        return resultados;
}
