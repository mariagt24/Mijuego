var busquedaHorizontal=0;
var busquedaVertical=0;
var buscarNuevosDulces=0;
var lencolum=["","","","","","",""];
var lenrest=["","","","","","",""];
var maximo=0;
var matriz=0;
var intervalo=0;
var eliminar=0;
var nuevosDulces=0;
var tiempo=0;
var i=0;
var contadorTotal=0;
var espera=0;
var score=0;
var mov=0;
// variables para el temporizador
var min=2;
var seg=0;


// Inicia Efecto titulo match game

$(document).ready(function(){
     setInterval(function(){
      $(".main-titulo").switchClass("main-titulo","main-titulo-gris", 800),
      $(".main-titulo").switchClass("main-titulo-gris","main-titulo", 800)
    }, 1000);
   });


// Inicio del juego 

$(".btn-reinicio").click(function(){
  i=0;
	score=0;
	mov=0;
  $(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".time").show();
	$("#score-text").html("0");
	$("#movimientos-text").html("0");
	$(this).html("Reiniciar")
	min=2;
	seg=0;
  borrartodo();
	intervalo=setInterval(function(){
		rellenarfila()
	},500);
	tiempo=setInterval(function(){
		temporizador()
	},1000);

});



// rellenar el tablero con los dulces al iniciar

function rellenarfila(){
	
	i=i+1
	var numero=0;
	var imagen=0;
	$(".elemento").draggable({disabled:true});
	if(i<8){
		for(var j=1;j<8;j++){
			if($(".col-"+j).children("img:nth-child("+i+")").html()==null){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
		
			}}}
	if(i==8){
	
	clearInterval(intervalo);
	eliminar=setInterval(function(){eliminarDulces()},150);
}
};


// Temporizador

function temporizador(){
	if(seg!=0){
		seg=seg-1;}
	if(seg==0){
		if(min==0){
			clearInterval(eliminar);
			clearInterval(nuevosDulces);
			clearInterval(intervalo);
			clearInterval(tiempo);
			$(".panel-tablero").hide("drop","slow",Resultadofinal);
			$(".time").hide();}
		seg=59;
		min=min-1;}
	
	$("#timer").html("0"+min+":"+seg);
};

// Función para sacar el resultado final en pantalla diferente

function Resultadofinal(){
	$( ".panel-score" ).animate({width:'100%'},3000);
};

// Función para borrar todo

function borrartodo(){
	for(var j=1;j<8;j++){
		$(".col-"+j).children("img").detach();}
};



// Función para eliminar los Dulces

function eliminarDulces(){
	matriz=0;
	busquedaHorizontal=horizontal();
	busquedaVertical=vertical();
	for(var j=1;j<8;j++){
		matriz=matriz+$(".col-"+j).children().length;}

	//Condicional si no encuentra 3 dulces o más, llamamos a la función para volver a completar el juego

	if(busquedaHorizontal==0 && busquedaVertical==0 && matriz!=49){
		clearTimeout(eliminar);
		buscarNuevosDulces=0;
		nuevosDulces=setInterval(function(){
			nuevosdulces()
		},600);}

	if(busquedaHorizontal==1||busquedaVertical==1){
		$(".elemento").draggable({disabled:true});
		$("div[class^='col']").css("justify-content","flex-end");
		$(".activo").hide("pulsate",1000,function(){
			var scoretmp=$(".activo").length;
			$(".activo").remove("img");
			score=score+scoretmp*10;
			$("#score-text").html(score);//Cambiamos la puntuación
		});
	}
	if(busquedaHorizontal==0 && busquedaVertical==0 && matriz==49){
		$(".elemento").draggable({
			disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40,
			start:function(event,ui){
				mov=mov+1;
				$("#movimientos-text").html(mov);}
		});
	}
	$(".elemento").droppable({
		drop:function (event,ui){
			var dropped=ui.draggable;
			var droppedOn=this;
			espera=0;
			do{
				espera=dropped.swap($(droppedOn));}
			while(espera==0);
			busquedaHorizontal=horizontal();
			busquedaVertical=vertical();
			if(busquedaHorizontal==0 && busquedaVertical==0){
				dropped.swap($(droppedOn));}
			if(busquedaHorizontal==1 || busquedaVertical==1){
				clearInterval(nuevosDulces);
				clearInterval(eliminar);
				eliminar=setInterval(function(){
					eliminarDulces()
				},150);}},
	});
};

// Función para intercambiar dulces

jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
};

// Función para crear nuevos dulces

function nuevosdulces(){
	$(".elemento").draggable({disabled:true});
	$("div[class^='col']").css("justify-content","flex-start")
	for(var j=1;j<8;j++){
		lencolum[j-1]=$(".col-"+j).children().length;}
	if(buscarNuevosDulces==0){
		for(var j=0;j<7;j++){
			lenrest[j]=(7-lencolum[j]);}
		maximo=Math.max.apply(null,lenrest);
		contadorTotal=maximo;}
	if(maximo!=0){
		if(buscarNuevosDulces==1){
			for(var j=1;j<8;j++){
				if(contadorTotal>(maximo-lenrest[j-1])){
					$(".col-"+j).children("img:nth-child("+(lenrest[j-1])+")").remove("img");}}
		}
		if(buscarNuevosDulces==0){
			buscarNuevosDulces=1;
			for(var k=1;k<8;k++){
				for(var j=0;j<(lenrest[k-1]-1);j++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
		}
		for(var j=1;j<8;j++){
			if(contadorTotal>(maximo-lenrest[j-1])){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");}
		}
	}
	if(contadorTotal==1){
		clearInterval(nuevosDulces);
		eliminar=setInterval(function(){
			eliminarDulces()
		},150);
	}
	contadorTotal=contadorTotal-1;
};

// Función para buscar dulces iguales en horizontal

function horizontal(){
	var busHori=0;
	for(var j=1;j<8;j++){
		for(var k=1;k<6;k++){
			var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
			var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
			var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				busHori=1;
			}
		}
	}
	return busHori;
};

// Función para buscar dulces iguales en vertical

function vertical(){
	var busVerti=0;
	for(var l=1;l<6;l++){
		for(var k=1;k<8;k++){
			var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src");
			var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src");
			var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo");
				busVerti=1;
			}
		}
	}
	return busVerti;
};