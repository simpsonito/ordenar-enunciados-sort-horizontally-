/*
Created by Adib on 18/12/15.
Modified by Adib on 01/02/17.
Added:
    - Multiple sentences
    - Horizontal scroll
*/
$(function() {
    var listas = $(".lista > .sortable");
    var bRevisor = $("#bRevisor");
    var intTotal = 0;
    var objetoOrdenar = {
        stop: alDetener
    };

    listas.each(function(){
        var estaLista = $(this);
        revolver(estaLista);
        estaLista.sortable(objetoOrdenar);
        estaLista.disableSelection();
    });

    bRevisor.click(function(){
        var contador = 0;
        listas.each(function () {
            var lista = $(this);
            var respuestaCorrecta = lista.data("respuestaCorrecta");
            var respuestaDada = obtenerEnunciado(lista);
            console.log("correcta: ", respuestaCorrecta, "actual: ", respuestaDada);
            var elmRetro = lista.next(".retroInd");
            console.log(elmRetro);
            if(respuestaCorrecta === respuestaDada){
                elmRetro.html("");
                lista.closest(".lista").addClass("bien");
                lista.closest(".lista").removeClass("mal");
                contador++;
            } else {
                lista.closest(".lista").removeClass("bien");
                lista.closest(".lista").addClass("mal");
                elmRetro.html(respuestaCorrecta)
            }
            //contador += revisar(lista);
        });
        $(".retroFinal").html(contador + " of " + listas.length + ".");
        //this.outerHTML = "Obtuviste " + contador + " de " + intTotal + ".";
    });

    function obtenerEnunciado(lista){
        return lista.children("li").toArray().map(function(elemento){
            return elemento.innerText;
        }).join(" ");
    }
    function revolver(lista){
        //Obtiene enunciado correcto:
        var respuestasOriginales = obtenerEnunciado(lista);
        //Lo salva para utilizar posteriormente al evaluar
        lista.data("respuestaCorrecta", respuestasOriginales);

        lista.children().each(function(elemento){
            var nodo = $(lista.children()[elemento]);
            nodo.attr("data-orden", elemento);
            intTotal++;
        });
        lista.children().each(function(){
            lista.append(lista.children()[Math.floor(Math.random()*lista.children().length)]);
        });

    }
    function alDetener(event, ui){
        console.log(ui.item[0]);
    }
    function revisar(lista){
        var contador = 0;
        lista.children().each(function(elemento){
            var original = lista.children()[elemento];
            var padre = $(original);
            var nodo = $(original.querySelector("span"));
            if(parseInt(padre.attr("data-orden")) === elemento){
                if(nodo.hasClass("mal")){
                    nodo.removeClass("mal");
                }
                nodo.addClass("bien");
                contador++;
            } else{
                if(nodo.hasClass("bien")){
                    nodo.removeClass("bien");
                }
                nodo.addClass("mal");
            }
        });
        return contador;
    }

});