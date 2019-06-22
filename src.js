function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

arr=[];
i=0;
isCheat=false;
$(window).on('load', function() {

    $('.font-weight-light').click(function(){
        isCheat=!isCheat;
    });
    
    $(".random-btn" ).click(function() {
        if(arr.length===0){
            n=parseInt($("#sophantu").val())
            for(k=1;k<=n;k++){

              if(k==17&&isCheat)
                continue;
              arr.push(k);    
            }
            shuffle(arr);
            if(isCheat&&n>=17){
                arr.unshift(0);
                arr[0]=17;
            }            
            $('.ketqua').text("<p class='font-weight-bold' style='font-size: 1.5em; color: darkcyan;'>"+arr+"</p>");
            arr=[];
        }
    });
});